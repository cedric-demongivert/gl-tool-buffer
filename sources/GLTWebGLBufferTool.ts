import { GLTWebGLBufferBinding } from "./GLTWebGLBufferBinding"
import { GLTWebGLBuffer } from "./GLTWebGLBuffer"
import { GLTVertexStructure } from "./GLTVertexStructure"
import { GLTVertexFieldType } from "."

/**
 * 
 */
export namespace GLTWebGLBufferTool {
  /**
   *  
   */
  export namespace upload {
    /**
     * Upload the given vertex structure field to the given shader attribute.
     */
    export function grouped(context: WebGLRenderingContext, capacity: number, field: GLTVertexStructure.Field, attribute: number): void {
      context.enableVertexAttribArray(attribute)
      context.vertexAttribPointer(
        attribute,
        GLTVertexFieldType.elements(field.type),
        GLTVertexFieldType.scalar(field.type),
        false,
        0,
        field.start * capacity
      )
    }

    /**
     * Upload the given vertex structure field to the given shader attribute.
     */
    export function interleaved(context: WebGLRenderingContext, size: number, field: GLTVertexStructure.Field, attribute: number): void {
      context.enableVertexAttribArray(attribute)
      context.vertexAttribPointer(
        attribute,
        GLTVertexFieldType.elements(field.type),
        GLTVertexFieldType.scalar(field.type),
        false,
        size,
        field.start
      )
    }
  }
}