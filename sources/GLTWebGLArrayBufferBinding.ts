import { GLTVertexBuffer } from "./GLTVertexBuffer"
import { GLTWebGLBufferBinding } from "./GLTWebGLBufferBinding"
import { GLTWebGLBufferType } from "./GLTWebGLBufferType"
import { GLTWebGLBufferUsage } from "./GLTWebGLBufferUsage"
import { GLTWebGLVertexFieldType } from "./GLTWebGLVertexFieldType"

/**
 * 
 */
export class GLTWebGLArrayBufferBinding extends GLTWebGLBufferBinding<GLTWebGLBufferType.ARRAY_BUFFER> {
  /**
   * 
   */
  public constructor(context: WebGLRenderingContext | WebGL2RenderingContext) {
    super(context, GLTWebGLBufferType.ARRAY_BUFFER)
  }

  /**
   * 
   */
  public fullyCommitGLTBuffer(buffer: GLTVertexBuffer, usage: GLTWebGLBufferUsage): void {
    this.context.bufferData(this.type, buffer.buffer, usage)
  }

  /**
   * 
   */
  public commitGLTBuffer(buffer: GLTVertexBuffer, usage: GLTWebGLBufferUsage, srcOffset: number, length: number): void {
    this.context.bufferData(this.type, buffer.buffer, usage, srcOffset, length)
  }

  /**
   * 
   */
  public upload(attribute: number, size: number, type: GLTWebGLVertexFieldType, normalized: boolean, stride: number, offset: number): void {
    const context: WebGLRenderingContext | WebGL2RenderingContext = this.context
    context.enableVertexAttribArray(attribute)
    context.vertexAttribPointer(attribute, size, type, normalized, stride, offset)
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    return super.equals(other) && other instanceof GLTWebGLArrayBufferBinding
  }
}