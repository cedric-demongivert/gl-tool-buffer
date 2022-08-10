import { GLTTriangleBuffer } from './GLTTriangleBuffer'
import { GLTVertexStructureBuffer } from './GLTVertexStructureBuffer'

/**
 * 
 */
export class GLTGeometry {
  /**
   * Faces of this GLTGeometry.
   */
  public faces: GLTTriangleBuffer | undefined

  /**
   * Vertices of this GLTGeometry.
   */
  public vertices: GLTVertexStructureBuffer | undefined

  /**
   * Instantiate a new GLTGeometry.
   */
  public constructor() {
    this.faces = undefined
    this.vertices = undefined
  }

  /**
   * Copy the state of the given GLTGeometry component.
   *
   * @param toCopy - A GLTGeometry component instance to copy.
   */
  public copy(toCopy: GLTGeometry): void {
    this.faces = toCopy.faces
    this.vertices = toCopy.vertices
  }

  /**
   * Reset the state of this GLTGeometry.
   */
  public clear(): void {
    this.faces = undefined
    this.vertices = undefined
  }

  /**
   * @return An instance of GLTGeometry equals to this one.
   */
  public clone(): GLTGeometry {
    const buffer: GLTGeometry = new GLTGeometry()

    buffer.copy(this)

    return buffer
  }

  /**
   * @see Object.equals
   */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof GLTGeometry) {
      return (
        GLTTriangleBuffer.equals(this.faces, other.faces) &&
        GLTVertexStructureBuffer.equals(this.vertices, other.vertices)
      )

    }

    return false
  }
}

/**
 * 
 */
export namespace GLTGeometry {
  /**
   * 
   */
  export function copy(toCopy: undefined): undefined
  /**
   * 
   */
  export function copy(toCopy: null): null
  /**
   * 
   */
  export function copy(toCopy: GLTGeometry): GLTGeometry
  /**
   * 
   */
  export function copy(toCopy: GLTGeometry | undefined | null): GLTGeometry | undefined | null
  export function copy(toCopy: GLTGeometry | undefined | null): GLTGeometry | undefined | null {
    return toCopy == null ? toCopy : toCopy.clone()
  }
}
