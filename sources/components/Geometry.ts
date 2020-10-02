import { GeometryIdentifier } from '../GeometryIdentifier'

import { FaceBuffer } from '../FaceBuffer'
import { VertexStructureBuffer } from '../VertexStructureBuffer'

export class Geometry {
  /**
  * Identifier of this geometry.
  */
  public identifier : GeometryIdentifier

  /**
  * Faces of this geometry.
  */
  public faces : FaceBuffer

  /**
  * Vertices of this geometry.
  */
  public vertices : VertexStructureBuffer

  /**
  * Instantiate a new geometry.
  */
  public constructor (identifier : GeometryIdentifier = GeometryIdentifier.UNDEFINED) {
    this.identifier = identifier
    this.faces = null
    this.vertices = null
  }

  /**
  * Copy the state of the given geometry component.
  *
  * @param toCopy - A geometry component instance to copy.
  */
  public copy (toCopy : Geometry) : void {
    this.faces = toCopy.faces
    this.vertices = toCopy.vertices
  }

  /**
  * Reset the state of this geometry.
  */
  public clear () : void {
    this.faces = null
    this.vertices = null
  }

  /**
  * @return An instance of geometry equals to this one.
  */
  public clone () : Geometry {
    const buffer : Geometry = new Geometry()

    buffer.copy(this)

    return buffer
  }

  /**
  * @see Object.equals
  */
  public equals (other : any) : boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Geometry) {
      return other.identifier === this.identifier &&
             FaceBuffer.equals(this.faces, other.faces) &&
             VertexStructureBuffer.equals(this.vertices, other.vertices)
    }

    return false
  }
}

export namespace Geometry {
  export function copy (toCopy : undefined) : undefined
  export function copy (toCopy : null) : null
  export function copy (toCopy : Geometry) : Geometry
  export function copy (toCopy : Geometry | undefined | null) : Geometry | undefined | null {
    return toCopy == null ? toCopy : toCopy.clone()
  }
}
