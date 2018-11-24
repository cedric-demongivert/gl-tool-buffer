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

  describe('#get buffer', function () {
    it('return its underlying vertex buffer buffer', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(buffer.buffer).toBe(buffer.vertexBuffer.buffer)
    })
  })

  describe('#get usage', function () {
    it('return its underlying vertex buffer usage', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(buffer.usage).toBe(buffer.vertexBuffer.usage)
    })
  })

  describe('#set usage', function () {
    it('alows to update the underlying vertex buffer usage', function () {
      const buffer = new VertexStructureBuffer(structure)

      buffer.usage = BufferUsage.STREAM_DRAW

      expect(buffer.usage).toBe(buffer.vertexBuffer.usage)
      expect(buffer.usage).toBe(BufferUsage.STREAM_DRAW)
    })
  })

  describe('#get capacity', function () {
    it('throws if it is not overrided', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(_ => buffer.capacity).toThrow()
    })
  })

  describe('#set capacity', function () {
    it('throws if it is not overrided', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(_ => buffer.capacity = 10).toThrow()
    })
  })

  describe('#get size', function () {
    it('throws if it is not overrided', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(_ => buffer.size).toThrow()
    })
  })

  describe('#set size', function () {
    it('throws if it is not overrided', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(_ => buffer.size = 10).toThrow()
    })
  })

  describe('#concat', function () {
    it('throws if it is not overrided', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(_ => buffer.concat()).toThrow()
    })
  })

  describe('#copyWithin', function () {
    it('throws if it is not overrided', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(_ => buffer.copyWithin()).toThrow()
    })
  })

  describe('#delete', function () {
    it('throws if it is not overrided', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(_ => buffer.delete()).toThrow()
    })
  })

  describe('#push', function () {
    it('throws if it is not overrided', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(_ => buffer.push()).toThrow()
    })
  })

  describe('#equals', function () {
    it('throws if it is not overrided', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(_ => buffer.equals(buffer)).toThrow()
    })
  })

  describe('#clone', function () {
    it('throws if it is not overrided', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(_ => buffer.clone()).toThrow()
    })
  })

  describe('#clear', function () {
    it('throws if it is not overrided', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(_ => buffer.clear()).toThrow()
    })
  })

  describe('#commit', function () {
    it('it commit the underlying buffer', function () {
      const buffer = new VertexStructureBuffer(structure)
      buffer.vertexBuffer.commit = jest.fn()

      buffer.commit()
      expect(buffer.vertexBuffer.commit).toHaveBeenCalled()
    })
  })

  describe('#contextualise', function () {
    it('throws if it is not overrided', function () {
      const buffer = new VertexStructureBuffer(structure)

      expect(_ => buffer.contextualise()).toThrow()
    })
  })
})
