import { GLVertexStructureBuffer } from './GLVertexStructureBuffer'

import { VertexStructure } from './VertexStructure'
import { VertexFieldType } from './VertexFieldType'

export class GLGroupedVertexStructureBuffer
       extends GLVertexStructureBuffer
{
  /**
  * @see GLVertexStructureBuffer#upload
  */
  public upload (field : VertexStructure.Field, attribute : number) : void
  public upload (field : number, attribute : number) : void
  public upload (field : string, attribute : number) : void
  public upload (field : string | number | VertexStructure.Field, attribute : number) : void {
    const metadata : VertexStructure.Field = (
      typeof field === 'number' ? this.descriptor.format.fields[field] : (
        typeof field === 'string' ? this.descriptor.format.get(field) : field
      )
    )

    this.webgl.vertexAttribPointer(
      attribute,
      VertexFieldType.scalarSize(metadata.type),
      VertexFieldType.scalar(metadata.type),
      false,
      0,
      metadata.start * this.descriptor.capacity
    )

    this.webgl.enableVertexAttribArray(attribute)
  }
}
