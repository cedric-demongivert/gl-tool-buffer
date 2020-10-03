import { System } from '@cedric-demongivert/gl-tool-ecs'
import { IdentifierSet } from '@cedric-demongivert/gl-tool-collection'
import { Pack } from '@cedric-demongivert/gl-tool-collection'
import { Sequence } from '@cedric-demongivert/gl-tool-collection'

import { GeometryIdentifier } from '../GeometryIdentifier'
import { BufferIdentifier } from '../BufferIdentifier'
import { BufferType } from '../BufferType'
import { VertexStructureBuffer } from '../VertexStructureBuffer'
import { FaceBuffer } from '../FaceBuffer'

import { GeometryCollectionListener } from './GeometryCollectionListener'
import { BufferCollection } from './BufferCollection'

const EMPTY_FACES : FaceBuffer = FaceBuffer.empty(0)
const EMPTY_VERTICES : VertexStructureBuffer = null

export class GeometryCollection extends System {
  /**
  * A view over the underlying set of all existing geometries.
  */
  public readonly geometries : Sequence<number>

  /**
  * The maximum number of geometries that can be stored into this collection.
  */
  public readonly capacity : number

  /**
  * The associated collection of buffers used to store all geometries.
  */
  public readonly buffers : BufferCollection

  /**
  * A set of all existing geometries.
  */
  private readonly _geometries : IdentifierSet

  /**
  * A sequence of vertices of geometry indexed by geometry identifier.
  */
  private readonly _vertices : Pack<VertexStructureBuffer>

  /**
  * A sequence of faces of geometry indexed by geometry identifier.
  */
  private readonly _faces : Pack<FaceBuffer>

  /**
  * A sequence of buffers used to store geometries indexed by geometry identifier.
  */
  private readonly _assets : Pack<BufferIdentifier>

  /**
  * A set of all listeners.
  */
  private readonly _listeners : Set<GeometryCollectionListener>

  /**
  * Instantiate a new empty geometry system.
  *
  * @param buffers - A buffer collection to use for storing each geometry.
  * @param [shaderCapacity = 256] - Capacity to allocate for indexing all shaders of this system.
  */
  public constructor (buffers : BufferCollection, capacity : number = 256) {
    super()

    this._geometries = IdentifierSet.allocate(capacity)
    this._vertices = Pack.any(capacity)
    this._faces = Pack.any(capacity)
    this._assets = Pack.uint32(capacity * 2)
    this._listeners = new Set()

    this.buffers = buffers
    this.geometries = this._geometries.view()
    this.capacity = capacity
  }

  /**
  * Register an existing collection listener.
  *
  * @param listener - A listener to register.
  */
  public addListener (listener : GeometryCollectionListener) : void {
    this._listeners.add(listener)

    listener.afterSubscription(this)

    for (const geometry of this._geometries) {
      listener.afterGeometryCreation(geometry)
    }
  }

  /**
  * Remove a previously registered collection listener.
  *
  * @param listener - A listener to remove.
  */
  public deleteListener (listener : GeometryCollectionListener) : void {
    for (const geometry of this._geometries) {
      listener.beforeGeometryDeletion(geometry)
    }

    listener.beforeUnsubscription(this)

    this._listeners.delete(listener)
  }

  /**
  * @see System.initialize
  */
  public initialize () : void {

  }

  /**
  * Declare a new geometry into this collection.
  *
  * @param [identifier] - Identifier of the geometry to declare.
  *
  * @return The identifier of the geometry that was allocated.
  */
  public create (identifier? : number) : GeometryIdentifier {
    if (identifier == null || identifier === GeometryIdentifier.UNDEFINED) {
      identifier = this._geometries.next()
    } else if (this._geometries.has(identifier)) {
      throw new Error(
        'Unable to create geometry #' + identifier + ' because this ' +
        'geometry was already created.'
      )
    } else {
      this._geometries.add(identifier)
    }

    this._faces.set(identifier, EMPTY_FACES)
    this._vertices.set(identifier, EMPTY_VERTICES)
    this._assets.set(identifier * 2, this.buffers.create(BufferType.VERTEX))
    this._assets.set(identifier * 2 + 1, this.buffers.create(BufferType.INDEX))

    for (const listener of this._listeners) {
      listener.afterGeometryCreation(identifier)
    }

    return identifier
  }

  public setFaces (identifier : GeometryIdentifier, faces : FaceBuffer) : void {
    if (!this._geometries.has(identifier)) {
      throw new Error(
        'Unable to update faces of geometry #' + identifier + ' because ' +
        'there is no geometry with the given identifier into this system.'
      )
    }

    this._faces.set(identifier, faces || EMPTY_FACES)
  }

  public setVertices (identifier : GeometryIdentifier, vertices : VertexStructureBuffer) : void {
    if (!this._geometries.has(identifier)) {
      throw new Error(
        'Unable to update vertices of geometry #' + identifier + ' because ' +
        'there is no geometry with the given identifier into this system.'
      )
    }

    this._vertices.set(identifier, vertices || EMPTY_VERTICES)
  }

  /**
  * Commit the content of the given geometry.
  *
  * @param identifier - Identifier of the buffer to commit.
  */
  public commit (identifier : GeometryIdentifier) : void {
    if (!this._geometries.has(identifier)) {
      throw new Error(
        'Unable to commit geometry #' + identifier + ' because there is ' +
        'no geometry with the given identifier into this system.'
      )
    }

    this.buffers.commit(
      this._assets.get(identifier * 2),
      this._faces.get(identifier).buffer.buffer
    )

    this.buffers.commit(
      this._assets.get(identifier * 2 + 1),
      this._vertices.get(identifier).buffer.buffer
    )

    for (const listener of this._listeners) {
      listener.afterGeometryCommit(identifier)
    }
  }

  /**
  * Return the faces of a given geometry.
  *
  * @param identifier - Identifier of the geometry to fetch.
  *
  * @return The associated faces.
  */
  public getFaces (identifier : GeometryIdentifier) : FaceBuffer {
    if (!this._geometries.has(identifier)) {
      throw new Error(
        'Unable to get the faces of geometry #' + identifier +
        ' because there is no geometry with the given identifier into ' +
        'this system.'
      )
    }

    return this._faces.get(identifier)
  }

  /**
  * Return the vertices of a given geometry.
  *
  * @param identifier - Identifier of the geometry to fetch.
  *
  * @return The associated vertices.
  */
  public getVertices (identifier : GeometryIdentifier) : VertexStructureBuffer {
    if (!this._geometries.has(identifier)) {
      throw new Error(
        'Unable to get the vertices of geometry #' + identifier +
        ' because there is no geometry with the given identifier into ' +
        'this system.'
      )
    }

    return this._vertices.get(identifier)
  }

  public getVertexBuffer (identifier : GeometryIdentifier) : BufferIdentifier {
    if (!this._geometries.has(identifier)) {
      throw new Error(
        'Unable to get the vertex buffer of geometry #' + identifier +
        ' because there is no geometry with the given identifier into ' +
        'this system.'
      )
    }

    return this._assets.get(identifier * 2)
  }

  public getFaceBuffer (identifier : GeometryIdentifier) : BufferIdentifier {
    if (!this._geometries.has(identifier)) {
      throw new Error(
        'Unable to get the face buffer of geometry #' + identifier +
        ' because there is no geometry with the given identifier into ' +
        'this system.'
      )
    }

    return this._assets.get(identifier * 2 + 1)
  }

  /**
  * Remove a geometry from this system.
  *
  * @param identifier - Identifier of the geometry to delete.
  */
  public delete (identifier : GeometryIdentifier) : void {
    if (!this._geometries.has(identifier)) {
      throw new Error(
        'Unable to delete geometry #' + identifier + ' because there is ' +
        'no geometry with the given identifier into this system.'
      )
    }

    for (const listener of this._listeners) {
      listener.beforeGeometryDeletion(identifier)
    }

    this.buffers.delete(this._assets.get(identifier * 2))
    this.buffers.delete(this._assets.get(identifier * 2 + 1))
    this._geometries.delete(identifier)
    this._faces.set(identifier, null)
    this._vertices.set(identifier, null)
  }

  /**
  * @see System.destroy
  */
  public destroy () : void {
    while (this._geometries.size > 0) {
      this.delete(this._geometries.last)
    }

    while (this._listeners.size > 0) {
      this.deleteListener(this._listeners.values().next().value)
    }
  }

  /**
  * @see Object.equals
  */
  public equals (other : any) : boolean {
    if (other == null) return false

    return other === this
  }

  /**
  * @see Object.toString
  */
  public toString () : string {
    let result : string = ''
    let first : boolean = true

    result += 'GeometryCollection ['
    for (const shader of this._geometries) {
      if (first) {
        first = false
      } else {
        result += ', '
      }

      result += shader
    }
    result += ']'

    return result
  }
}
