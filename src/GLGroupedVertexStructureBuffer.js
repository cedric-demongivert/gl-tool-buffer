import { GLVertexStructureBuffer } from './GLVertexStructureBuffer'

export class GLGroupedVertexStructureBuffer
       extends GLVertexStructureBuffer
{
  /**
  * @see GLVertexStructureBuffer#uploadTo
  */
  uploadTo (program, alias) {
    const descriptor = this.descriptor
    const format = descriptor.format
    const attributes = program.attributes

    this.vertexBuffer.bind()

    for (const field of format.fields()) {
      const attributeName = alias ? alias[field] || field : field

      if (attributes.has(attributeName)) {
        attributes.set(
          attributeName,
          false,
          0,
          format.startof(field) * descriptor.capacity
        )

        attributes.enable(attributeName)
      }
    }
  }
}
