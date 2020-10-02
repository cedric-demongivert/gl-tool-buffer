import { System } from '@cedric-demongivert/gl-tool-ecs'
import { Pack } from '@cedric-demongivert/gl-tool-collection'

import { GeometryCollectionListener } from '../systems/GeometryCollectionListener'
import { GeometryCollection } from '../systems/GeometryCollection'

import { BufferIdentifier } from '../BufferIdentifier'
import { GeometryIdentifier } from '../GeometryIdentifier'
import { VertexStructure } from '../VertexStructure'
import { VertexFieldType } from '../VertexFieldType'
import { VertexStructureBuffer } from '../VertexStructureBuffer'
import { GroupedVertexStructureBuffer } from '../GroupedVertexStructureBuffer'
import { InterleavedVertexStructureBuffer } from '../InterleavedVertexStructureBuffer'

import { WebGLGeometryState } from './WebGLGeometryState'
import { WebGLBufferUsage } from './WebGLBufferUsage'
import { WebGLBufferCollection } from './WebGLBufferCollection'

export class WebGLGeometryCollection extends System implements GeometryCollectionListener {
  /**
  * This collection buffering system.
  */
  private _buffers : WebGLBufferCollection

  /**
  * A sequence of all existing geometry states indexed by their application identifier.
  */
  private _states : Pack<WebGLGeometryState>

  /**
  * Parent application geometry collection.
  */
  private _descriptors : GeometryCollection

  /**
  * The geometry that was previoulsy bound.
  */
  private _bound : GeometryIdentifier

  /**
  * Instantiate a new webgl geometry collection for a given context.
  *
  * @param buffers - A buffer collection.
  */
  public constructor (buffers : WebGLBufferCollection) {
    super()
    this._buffers = buffers
    this._states = Pack.uint8(0)
    this._descriptors = null
    this._bound = GeometryIdentifier.UNDEFINED
  }

  /**
  * @see GeometryCollectionListener.afterSubscription
  */
  public afterSubscription (collection : GeometryCollection) : void {
    if (this._descriptors == null) {
      this._descriptors = collection
      this._states.reallocate(this._descriptors.capacity)
    } else {
      throw new Error(
        'Unable to subscribe this WebGLGeometryCollection to the given ' +
        'GeometryCollection because this WebGLGeometryCollection was already ' +
        'registered into another GeometryCollection instance.'
      )
    }
  }

  /**
  * @see GeometryCollectionListener.beforeUnsubscription
  */
  public beforeUnsubscription (collection : GeometryCollection) : void {
    if (this._descriptors === collection) {
      this._descriptors = null
      this._states.reallocate(0)
    } else {
      throw new Error(
        'Unable to unsubscribe this WebGLGeometryCollection from the given ' +
        'GeometryCollection because this WebGLGeometryCollection was registered ' +
        'into another GeometryCollection instance.'
      )
    }
  }

  /**
  * @see GeometryCollectionListener.beforeGeometryDeletion
  */
  public beforeGeometryDeletion (identifier : GeometryIdentifier) : void {
    if (this._states.get(identifier) !== WebGLGeometryState.BLANK) {
      this.free(identifier)
    }
  }

  /**
  * @see GeometryCollectionListener.afterGeometryCreation
  */
  public afterGeometryCreation (identifier : GeometryIdentifier) : void {
    this._states.set(identifier, WebGLGeometryState.BLANK)
  }

  /**
  * @see GeometryCollectionListener.afterGeometryCommit
  */
  public afterGeometryCommit (identifier : GeometryIdentifier) : void {
    if (this._states.get(identifier) !== WebGLGeometryState.BLANK) {
      this._states.set(identifier, WebGLGeometryState.DIRTY)
    }
  }

  /**
  * Instantiate the requested geometry.
  *
  * @param identifier - The geometry to instantiate.
  */
  public instantiate (identifier : GeometryIdentifier) : void {
    const state : WebGLGeometryState = this._states.get(identifier)

    if (state === WebGLGeometryState.BLANK) {
      this._buffers.instantiate(this._descriptors.getFaceBuffer(identifier))
      this._buffers.instantiate(this._descriptors.getVertexBuffer(identifier))

      this._states.set(identifier, WebGLGeometryState.DIRTY)
    } else {
      throw new Error(
        'Unable to instantiate the geometry #' + identifier + ' because this ' +
        'geometry was already instantiated and is currently in #' + state +
        ' "' + WebGLGeometryState.toString(state) + '" state.'
      )
    }
  }

  /**
  * Commit the content of the geometry to the rendering context.
  *
  * @param identifier - The geometry to commit.
  * @param usage - Usage hint.
  */
  public commit (identifier : GeometryIdentifier, usage : WebGLBufferUsage) : WebGLBuffer {
    const faces : BufferIdentifier = this._descriptors.getFaceBuffer(identifier)
    const vertices : BufferIdentifier = this._descriptors.getVertexBuffer(identifier)
    const state : WebGLGeometryState = this._states.get(identifier)

    switch (state) {
      case WebGLGeometryState.BLANK:
        throw new Error(
          'Unable to commit geometry #' + identifier + ' because the given ' +
          'geometry was not instantiated.'
        )
      case WebGLGeometryState.ERROR:
      case WebGLGeometryState.DIRTY:
        this._buffers.commit(faces, usage)
        this._buffers.commit(vertices, usage)

        this._states.set(identifier, WebGLGeometryState.READY)
      case WebGLGeometryState.READY:
        return
      default:
        throw new Error(
          'Unable to compile geometry #' + identifier + ' in state #' + state +
          ' "' + WebGLGeometryState.toString(state) + '" because this ' +
          'WebGLGeometryCollection does not define a compilation procedure ' +
          'for geometries in this state.'
        )
    }
  }

  /**
  * Instantiate and Commit the given geometry.
  *
  * @param identifier - The geometry to bootstrap.
  * @param usage - Usage hint.
  */
  public bootstrap (identifier : GeometryIdentifier, usage : WebGLBufferUsage) : void {
    const state : WebGLGeometryState = this._states.get(identifier)

    switch (state) {
      case WebGLGeometryState.BLANK:
        this.instantiate(identifier)
      case WebGLGeometryState.ERROR:
      case WebGLGeometryState.DIRTY:
        this.commit(identifier, usage)
      case WebGLGeometryState.READY:
        return
      default:
        throw new Error(
          'Unable to bootstrap the geometry #' + identifier + ' in state #' +
          state + ' "' + WebGLGeometryState.toString(state) + '" because this ' +
          'WebGLGeometryCollection does not define a bootstrap procedure for ' +
          'geometries in this state.'
        )
    }
  }

  /**
  * Release the requested geometry.
  *
  * @param identifier - Geometry to free.
  */
  public free (identifier : GeometryIdentifier) : void {
    const state : WebGLGeometryState = this._states.get(identifier)

    if (state !== WebGLGeometryState.BLANK) {
      this._buffers.free(this._descriptors.getFaceBuffer(identifier))
      this._buffers.free(this._descriptors.getVertexBuffer(identifier))
      this._states.set(identifier, WebGLGeometryState.BLANK)
    } else {
      throw new Error(
        'Unable to free the geometry #' + identifier + ' because this ' +
        'geometry was not instantiated into this context.'
      )
    }
  }

  /**
  * Bind the requested geometry.
  *
  * @param identifier - Geometry to bind.
  */
  public bind (identifier : GeometryIdentifier) : void {
    const state : WebGLGeometryState = this._states.get(identifier)

    if (state === WebGLGeometryState.READY) {
      this._buffers.bind(this._descriptors.getFaceBuffer(identifier))
      this._buffers.bind(this._descriptors.getVertexBuffer(identifier))
      this._bound = identifier
    } else {
      throw new Error(
        'Unable to bind the geometry #' + identifier + ' because this ' +
        'geometry was not ready into this context.'
      )
    }
  }

  /**
  * Upload the given vertex structure field to the given shader attribute.
  *
  * @param field - The field to upload.
  * @param attribute - The related attribute.
  */
  public upload (field : VertexStructure.Field, attribute : number) : void
  /**
  * Upload the given vertex structure field to the given shader attribute.
  *
  * @param field - The field to upload.
  * @param attribute - The related attribute.
  */
  public upload (field : number, attribute : number) : void
  /**
  * Upload the given vertex structure field to the given shader attribute.
  *
  * @param field - The field to upload.
  * @param attribute - The related attribute.
  */
  public upload (field : string, attribute : number) : void
  /**
  * Upload the given vertex structure field to the given shader attribute.
  *
  * @param field - The field to upload.
  * @param attribute - The related attribute.
  */
  public upload (field : string | number | VertexStructure.Field, attribute : number) : void {
    const vertices : VertexStructureBuffer = this._descriptors.getVertices(this._bound)
    const format : VertexStructure = vertices.format

    const metadata : VertexStructure.Field = (
      typeof field === 'number' ? format.fields[field] : (
        typeof field === 'string' ? format.get(field) : field
      )
    )

    if (vertices instanceof GroupedVertexStructureBuffer) {
      this._uploadGrouped(vertices, metadata, attribute)
    } else if (vertices instanceof InterleavedVertexStructureBuffer) {
      this._uploadInterleaved(vertices, metadata, attribute)
    } else {
      throw new Error(
        'Unable to upload VertexStructureBuffer of type ' +
        vertices.constructor.name + ' because this WebGLGeometryCollection ' +
        'does not define a procedure in order to upload this type of buffer.'
      )
    }
  }

  private _uploadGrouped (vertices : GroupedVertexStructureBuffer, field : VertexStructure.Field, attribute : number) : void {
    const webgl : WebGLRenderingContext = this._buffers.getContext()

    webgl.vertexAttribPointer(
      attribute,
      VertexFieldType.scalarSize(field.type),
      VertexFieldType.scalar(field.type),
      false,
      0,
      field.start * vertices.capacity
    )

    webgl.enableVertexAttribArray(attribute)
  }

  private _uploadInterleaved (vertices : InterleavedVertexStructureBuffer, field : VertexStructure.Field, attribute : number) : void {
    const webgl : WebGLRenderingContext = this._buffers.getContext()

    webgl.vertexAttribPointer(
      attribute,
      VertexFieldType.scalarSize(field.type),
      VertexFieldType.scalar(field.type),
      false,
      vertices.format.size,
      field.start
    )

    webgl.enableVertexAttribArray(attribute)
  }

  /**
  * @return The parent application shader collection.
  */
  public getDescriptors () : GeometryCollection {
    return this._descriptors
  }

  /**
  * @return The WebGLContext of this collection.
  */
  public getContext () : WebGLRenderingContext {
    return this._buffers.getContext()
  }

  public getState (identifier : GeometryIdentifier) : WebGLGeometryState {
    return this._states.get(identifier)
  }

  /**
  * @see System.destroy
  */
  public destroy () {
    if (this._descriptors != null) {
      this._descriptors.deleteListener(this)
    }
  }
}
