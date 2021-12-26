import { GLTFaceBuffer } from "./GLTFaceBuffer"
import { GLTWebGLBufferBinding } from "./GLTWebGLBufferBinding"
import { GLTWebGLBufferType } from "./GLTWebGLBufferType"
import { GLTWebGLBufferUsage } from "./GLTWebGLBufferUsage"
import { GLTWebGLDrawing } from "./GLTWebGLDrawing"
import { GLTWebGLElementType } from "./GLTWebGLElementType"

/**
 * 
 */
export class GLTWebGLElementBufferBinding extends GLTWebGLBufferBinding<GLTWebGLBufferType.ELEMENT_ARRAY_BUFFER> {
  /**
   * 
   */
  public constructor(context: WebGLRenderingContext | WebGL2RenderingContext) {
    super(context, GLTWebGLBufferType.ELEMENT_ARRAY_BUFFER)
  }

  /**
   * 
   */
  public fullyCommitGLTBuffer(buffer: GLTFaceBuffer, usage: GLTWebGLBufferUsage): void {
    this.context.bufferData(this.type, buffer.buffer, usage)
  }

  /**
   * 
   */
  public commitGLTBuffer(buffer: GLTFaceBuffer, usage: GLTWebGLBufferUsage, srcOffset: number, length: number): void {
    this.context.bufferData(this.type, buffer.buffer, usage, srcOffset, length)
  }

  /**
   * 
   */
  public draw(mode: GLTWebGLDrawing, count: number, type: GLTWebGLElementType, offset: number): void {
    this.context.drawElements(mode, count, type, offset)
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    return super.equals(other) && other instanceof GLTWebGLElementBufferBinding
  }
}