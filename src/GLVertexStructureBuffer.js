import { GLContextualisation } from '@cedric-demongivert/gl-tool-core'
import { GLBuffer } from './GLBuffer'

export class GLVertexStructureBuffer extends GLContextualisation {
  constructor (context, descriptor) {
    super(context, descriptor)
    descriptor.vertexBuffer.contextualise(context)
  }

  get vertexBuffer () {
    return GLContextualisation.of(this.descriptor.vertexBuffer, this.context)
  }

  uploadTo (program, alias) {
    throw new Error('uploadTo is not implemented.')
  }

  destroy () {
    const vertexBuffer = this.vertexBuffer
    super.destroy()
    vertexBuffer.destroy()
  }
}
