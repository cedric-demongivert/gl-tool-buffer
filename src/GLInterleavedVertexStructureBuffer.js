import { GLVertexStructureBuffer } from './GLVertexStructureBuffer'

export class GLInterleavedVertexStructureBuffer
       extends GLVertexStructureBuffer
{
  uploadTo (program, alias) {
    const descriptor = this.descriptor
    const format = descriptor.format
    const attributes = program.attributes

    this.vertexBuffer.bind()

    for (const field of format.fields()) {
      const attributeName = alias ? alias[field] || field : field

      if (attributeName in attributes) {
        attributes.set(
          attributeName, false,
          format.size,
          format.start(field)
        )

        attributes.enable(attributeName)
      }
    }
  }
}
