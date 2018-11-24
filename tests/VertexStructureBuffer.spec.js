/** eslint-env jest */

import { VertexStructureBuffer, VertexStructure, BufferUsage, VertexFieldType } from '@library'

describe('VertexStructureBuffer', function () {
  const structure = new VertexStructure([
    ['identifier', VertexFieldType.BYTE],
    ['color', VertexFieldType.FLOAT_VEC3],
    ['transformation', VertexFieldType.FLOAT_MAT4],
    ['toughness', VertexFieldType.FLOAT]
  ])

  describe('#constructor', function () {
    it('create a buffer for the given structure with a capacity for 16 vertices and the STATIC_DRAW usage by default', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(buffer.vertexBuffer.capacity).toBe(structure.size * 16)
      expect(buffer.usage).toBe(BufferUsage.STATIC_DRAW)
      expect(buffer.format).toBe(structure)
    })

    it('allows to define the starting capacity and usage of the underlying buffer', function () {
      const buffer = new VertexStructureBuffer(structure, 32, BufferUsage.STREAM_DRAW)

      expect(buffer.vertexBuffer.capacity).toBe(structure.size * 32)
      expect(buffer.usage).toBe(BufferUsage.STREAM_DRAW)
      expect(buffer.format).toBe(structure)
    })
  })

})
