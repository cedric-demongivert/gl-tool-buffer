import { GLContextualisation } from '@cedric-demongivert/gl-tool-core'
import { GLContext } from '@cedric-demongivert/gl-tool-core'

import { Buffer } from './Buffer'

/**
* A contextualised buffer.
*/
export class GLBuffer<T extends Buffer> extends GLContextualisation<T> {
  public readonly buffer : WebGLBuffer

  /**
  * Create a new webgl buffer from a given descriptor and a rendering context.
  *
  * @param context - The webgl rendering context of this instance.
  * @param descriptor - The buffer descriptor to contextualise.
  */
  public constructor (descriptor : T, context : GLContext) {
    super(descriptor, context)

    this.buffer = this.webgl.createBuffer()
  }

  /**
  * @return True if this buffer is bound.
  */
  public get bound () : boolean {
    throw new Error(`GLBuffer#get bound() : boolean is not implemented.`)
  }

  /**
  * Bind this buffer.
  */
  public bind () : void {
    throw new Error(`GLBuffer#bind() : GLBuffer is not implemented.`)
  }

  /**
  * @see GLContextualisation.destroy
  */
  public destroy () {
    this.webgl.deleteBuffer(this.buffer)

    super.destroy()
  }
}
