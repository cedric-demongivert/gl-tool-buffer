import { GLTWebGLBufferType } from "./GLTWebGLBufferType"
import { GLTWebGLBufferParameter } from "./GLTWebGLBufferParameter"
import { GLTWebGLBufferBindingParameter } from "./GLTWebGLBufferBindingParameter"
import { GLTWebGLBufferUsage } from "./GLTWebGLBufferUsage"

/**
 * 
 */
export class GLTWebGLBufferBinding<BufferType extends GLTWebGLBufferType = GLTWebGLBufferType> {
  /**
   * 
   */
  public readonly context: WebGLRenderingContext | WebGL2RenderingContext

  /**
   * 
   */
  public readonly type: BufferType

  /**
   * 
   */
  public get buffer(): WebGLBuffer {
    return this.context.getParameter(GLTWebGLBufferBindingParameter.fromType(this.type))
  }

  /**
   * 
   */
  public get size(): number {
    return this.context.getBufferParameter(this.type, GLTWebGLBufferParameter.BUFFER_SIZE)
  }

  /**
   * 
   */
  public get usage(): GLTWebGLBufferUsage {
    return this.context.getBufferParameter(this.type, GLTWebGLBufferParameter.BUFFER_USAGE)
  }

  /**
   * 
   */
  public constructor(context: WebGLRenderingContext | WebGL2RenderingContext, type: BufferType) {
    this.context = context
    this.type = type
  }

  /**
   *  
   */
  public allocate(size: number, usage: GLTWebGLBufferUsage): void {
    this.context.bufferData(this.type, size, usage)
  }

  /**
   *  
   */
  public fullyCommit(data: ArrayBuffer | ArrayBufferView, usage: GLTWebGLBufferUsage): void {
    this.context.bufferData(this.type, data, usage)
  }

  /**
   * 
   */
  public commit(data: ArrayBufferView, usage: GLTWebGLBufferUsage, srcOffset: number, length: number): void {
    this.context.bufferData(this.type, data, usage, srcOffset, length)
  }

  /**
   * 
   */
  // @Todo Validate return value type, notably when no buffer are bound.
  public getBuffer(): WebGLBuffer {
    return this.context.getParameter(GLTWebGLBufferBindingParameter.fromType(this.type))
  }

  /**
   * 
   */
  public getParameter(parameter: GLTWebGLBufferParameter.BUFFER_USAGE): GLTWebGLBufferUsage
  /**
   * 
   */
  public getParameter(parameter: GLTWebGLBufferParameter.BUFFER_SIZE): number
  /**
   * 
   */
  public getParameter(parameter: GLTWebGLBufferParameter): any
  public getParameter(parameter: GLTWebGLBufferParameter): any {
    return this.context.getBufferParameter(this.type, parameter)
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    if (other == null) return null
    if (other === this) return true

    if (other instanceof GLTWebGLBufferBinding) {
      return (
        other.context === this.context &&
        other.type === this.type
      )
    }

    return false
  }
}