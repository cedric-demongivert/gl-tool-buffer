import { GLTWebGLBufferType } from "./GLTWebGLBufferType"

/**
 * 
 */
export class GLTWebGLBuffer<BufferType extends GLTWebGLBufferType = GLTWebGLBufferType> {
  /**
   * 
   */
  public readonly context: WebGLRenderingContext

  /**
   * 
   */
  public readonly buffer: WebGLBuffer

  /**
   * 
   */
  public readonly type: BufferType

  /**
   * 
   */
  public constructor(context: WebGLRenderingContext, buffer: WebGLBuffer, type: BufferType) {
    this.context = context
    this.buffer = buffer
    this.type = type
  }

  /**
   * 
   */
  public free(): void {
    this.context.deleteBuffer(this.buffer)
  }

  /**
   * 
   */
  public bind(): void {
    this.context.bindBuffer(this.type, this.buffer)
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof GLTWebGLBuffer) {
      return (
        other.context === this.context &&
        other.buffer === this.buffer &&
        other.type === this.type
      )
    }
  }
}

/**
 * 
 */
export namespace GLTWebGLBuffer {
  /**
   * 
   */
  export type GLTWebGLFaceBuffer = GLTWebGLBuffer<GLTWebGLBufferType.ELEMENT_ARRAY_BUFFER>

  /**
   * 
   */
  export type GLTWebGLVertexBuffer = GLTWebGLBuffer<GLTWebGLBufferType.ARRAY_BUFFER>

  /**
   * 
   */
  export function create<BufferType extends GLTWebGLBufferType>(context: WebGLRenderingContext, type: BufferType): GLTWebGLBuffer<BufferType> {
    return new GLTWebGLBuffer(context, context.createBuffer(), type)
  }

  /**
   * 
   */
  export function createVertexBuffer(context: WebGLRenderingContext): GLTWebGLVertexBuffer {
    return new GLTWebGLBuffer(context, context.createBuffer(), GLTWebGLBufferType.ARRAY_BUFFER)
  }

  /**
   * 
   */
  export function createFaceBuffer(context: WebGLRenderingContext): GLTWebGLFaceBuffer {
    return new GLTWebGLBuffer(context, context.createBuffer(), GLTWebGLBufferType.ELEMENT_ARRAY_BUFFER)
  }

  /**
   * 
   */
  export function wrap<BufferType extends GLTWebGLBufferType>(context: WebGLRenderingContext, buffer: WebGLBuffer, type: BufferType): GLTWebGLBuffer<BufferType> {
    return new GLTWebGLBuffer(context, buffer, type)
  }
}