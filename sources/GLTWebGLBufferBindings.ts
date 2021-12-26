import { GLTWebGLElementBufferBinding } from "./GLTWebGLElementBufferBinding"
import { GLTWebGLArrayBufferBinding } from "./GLTWebGLArrayBufferBinding"
import { GLTWebGLBufferBinding } from "./GLTWebGLBufferBinding"
import { GLTWebGLBufferType } from "./GLTWebGLBufferType"
import { GLTWebGLStructuredArrayBufferBinding } from "./GLTWebGLStructuredArrayBufferBinding"

/**
 * 
 */
export class GLTWebGLBufferBindings {
  /**
   * 
   */
  public readonly elements: GLTWebGLElementBufferBinding

  /**
   * 
   */
  public readonly array: GLTWebGLArrayBufferBinding

  /**
   * 
   */
  public readonly structured: GLTWebGLStructuredArrayBufferBinding

  /**
   * 
   */
  public readonly copyRead: GLTWebGLBufferBinding<GLTWebGLBufferType.COPY_READ_BUFFER>

  /**
   * 
   */
  public readonly copyWrite: GLTWebGLBufferBinding<GLTWebGLBufferType.COPY_WRITE_BUFFER>

  /**
   * 
   */
  public readonly uniform: GLTWebGLBufferBinding<GLTWebGLBufferType.UNIFORM_BUFFER>

  /**
   * 
   */
  public readonly pixelPack: GLTWebGLBufferBinding<GLTWebGLBufferType.PIXEL_PACK_BUFFER>

  /**
   * 
   */
  public readonly pixelUnpack: GLTWebGLBufferBinding<GLTWebGLBufferType.PIXEL_UNPACK_BUFFER>

  /**
   * 
   */
  public constructor(context: WebGLRenderingContext | WebGL2RenderingContext) {
    this.elements = new GLTWebGLElementBufferBinding(context)
    this.array = new GLTWebGLArrayBufferBinding(context)
    this.structured = new GLTWebGLStructuredArrayBufferBinding(context)
    this.copyRead = new GLTWebGLBufferBinding(context, GLTWebGLBufferType.COPY_READ_BUFFER)
    this.copyWrite = new GLTWebGLBufferBinding(context, GLTWebGLBufferType.COPY_WRITE_BUFFER)
    this.uniform = new GLTWebGLBufferBinding(context, GLTWebGLBufferType.UNIFORM_BUFFER)
    this.pixelPack = new GLTWebGLBufferBinding(context, GLTWebGLBufferType.PIXEL_PACK_BUFFER)
    this.pixelUnpack = new GLTWebGLBufferBinding(context, GLTWebGLBufferType.PIXEL_UNPACK_BUFFER)
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    if (other == null) return false
    return other === this
  }
}