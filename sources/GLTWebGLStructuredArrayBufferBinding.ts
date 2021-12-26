import { GLTWebGLArrayBufferBinding } from "./GLTWebGLArrayBufferBinding"
import { GLTWebGLBufferUsage } from "./GLTWebGLBufferUsage"
import { GLTWebGLVertexFieldType } from "./GLTWebGLVertexFieldType"
import { GLTVertexStructureBuffer } from "./GLTVertexStructureBuffer"
import { GLTVertexStructure } from "./GLTVertexStructure"
import { GLTGroupedVertexStructureBuffer } from "./GLTGroupedVertexStructureBuffer"
import { GLTVertexFieldType } from "./GLTVertexFieldType"

/**
 * 
 */
export class GLTWebGLStructuredArrayBufferBinding extends GLTWebGLArrayBufferBinding {
  /**
   * 
   */
  private _structure: Readonly<GLTVertexStructure>

  /**
   * 
   */
  private _capacity: number

  /**
   * 
   */
  private _grouped: boolean

  /**
   * 
   */
  public constructor(context: WebGLRenderingContext | WebGL2RenderingContext) {
    super(context)

    this._structure = GLTVertexStructure.EMPTY
    this._grouped = false
    this._capacity = 0
  }

  /**
   * 
   */
  public fullyCommitStructuredGLTBuffer(buffer: GLTVertexStructureBuffer, usage: GLTWebGLBufferUsage): void {
    this.context.bufferData(this.type, buffer.buffer.buffer, usage)
    this.useStructuredBufferProfile(buffer)
  }

  /**
   * 
   */
  public useStructuredBufferProfile(buffer: GLTVertexStructureBuffer): void {
    this._structure = buffer.format
    this._grouped = buffer instanceof GLTGroupedVertexStructureBuffer
    this._capacity = buffer.capacity
  }

  /**
   * 
   */
  public useGroupedBufferProfile(format: GLTVertexStructure, capacity: number): void {
    this._structure = format
    this._grouped = true
    this._capacity = capacity
  }

  /**
   * 
   */
  public useInterleavedBufferProfile(format: GLTVertexStructure): void {
    this._structure = format
    this._grouped = false
    this._capacity = 0
  }

  /**
   * 
   */
  public clearBufferProfile(): void {
    this._structure = GLTVertexStructure.EMPTY
    this._grouped = false
    this._capacity = 0
  }

  /**
   * 
   */
  public uploadStructureField(field: GLTVertexStructure.Field, attribute: number, normalized: boolean): void
  /**
   * 
   */
  public uploadStructureField(field: number, attribute: number, normalized: boolean): void
  /**
   * 
   */
  public uploadStructureField(field: string, attribute: number, normalized: boolean): void
  /**
   * 
   */
  public uploadStructureField(field: GLTVertexStructure.Field | number | string, attribute: number, normalized: boolean): void
  public uploadStructureField(field: GLTVertexStructure.Field | number | string, attribute: number, normalized: boolean): void {
    const structure: Readonly<GLTVertexStructure> = this._structure
    const metadata: GLTVertexStructure.Field | undefined = (
      typeof field === 'number' ? structure.fields[field] : (
        typeof field === 'string' ? structure.get(field) : field
      )
    )

    if (metadata == null) {
      throw new Error(
        `Unable to upload the field ${field} of the underlying structured buffer model ` +
        `because the underlying buffer model does not contain the requested field.`
      )
    }

    const context: WebGLRenderingContext | WebGL2RenderingContext = this.context
    context.enableVertexAttribArray(attribute)

    if (this._grouped) {
      context.vertexAttribPointer(
        attribute,
        GLTVertexFieldType.elements(metadata.type),
        GLTWebGLVertexFieldType.fromGLTType(GLTVertexFieldType.scalar(metadata.type)),
        normalized,
        0,
        metadata.start * this._capacity
      )
    } else {
      context.vertexAttribPointer(
        attribute,
        GLTVertexFieldType.elements(metadata.type),
        GLTWebGLVertexFieldType.fromGLTType(GLTVertexFieldType.scalar(metadata.type)),
        normalized,
        structure.size,
        metadata.start
      )
    }
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    return (
      super.equals(other) &&
      other instanceof GLTWebGLStructuredArrayBufferBinding &&
      other._structure.equals(this._structure) &&
      other._grouped === this._grouped &&
      other._capacity === this._capacity
    )
  }
}