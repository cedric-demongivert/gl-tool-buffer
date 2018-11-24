/** eslint-env jest */

import { upperFirst } from 'lodash'
import {
  BufferUsage,
  VertexStructure,
  VertexBuffer,
  InterleavedVertexStructureBuffer,
  GLInterleavedVertexStructureBuffer,
  VertexFieldType
} from '@library'

import { createWebGLContext } from './createWebGLContext'

describe('InterleavedVertexStructureBuffer', function () {
  function * zeroes (count) {
    let index = count
    while (index --) yield 0
  }

  function * range (count) {
    for (let index = 0; index < count; ++index) yield index
  }

  describe('#constructor', function () {
    it('create a buffer for the given structure with a capacity for 16 vertices and the STATIC_DRAW usage by default', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure)

      expect(buffer.vertexBuffer.capacity).toBe(structure.size * 16)
      expect(buffer.capacity).toBe(16)
      expect(buffer.usage).toBe(BufferUsage.STATIC_DRAW)
      expect(buffer.format).toBe(structure)
    })

    it('allows to define the starting capacity and usage of the underlying buffer', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 32, BufferUsage.STREAM_DRAW)

      expect(buffer.vertexBuffer.capacity).toBe(structure.size * 32)
      expect(buffer.capacity).toBe(32)
      expect(buffer.usage).toBe(BufferUsage.STREAM_DRAW)
      expect(buffer.format).toBe(structure)
    })
  })

  describe('#clone', function () {
    it('clone the given buffer instance', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 3)

      buffer.push(2)
            .setToughness(0, 1)
            .setToughness(1, 2)
            .setColor(0, 1, 2)
            .setColor(1, 2, 3)
            .setTransformation(0, 1, 2, 3, 4)
            .setTransformation(1, 2, 3, 4, 5)

      const clone = InterleavedVertexStructureBuffer.clone(buffer)

      expect(buffer.equals(clone)).toBeTruthy()
      expect(buffer.usage).toBe(clone.usage)
      expect(buffer.capacity).toBe(clone.capacity)
      expect(buffer).not.toBe(clone)
    })

    it('clone the current buffer instance', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 3)

      buffer.push(2)
            .setToughness(0, 1)
            .setToughness(1, 2)
            .setColor(0, 1, 2)
            .setColor(1, 2, 3)
            .setTransformation(0, 1, 2, 3, 4)
            .setTransformation(1, 2, 3, 4, 5)

      const clone = buffer.clone()

      expect(buffer.equals(clone)).toBeTruthy()
      expect(buffer.usage).toBe(clone.usage)
      expect(buffer.capacity).toBe(clone.capacity)
      expect(buffer).not.toBe(clone)
    })
  })

  describe('#capacity', function () {
    it('return the current buffer capacity', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 18)

      expect(buffer.capacity).toBe(18)
      expect(buffer.vertexBuffer.capacity).toBe(18 * structure.size)
    })

    it('change the current buffer capacity', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 18)

      buffer.capacity = 24

      expect(buffer.capacity).toBe(24)
      expect(buffer.vertexBuffer.capacity).toBe(24 * structure.size)

      buffer.capacity = 32

      expect(buffer.capacity).toBe(32)
      expect(buffer.vertexBuffer.capacity).toBe(32 * structure.size)
    })

    it('correctly format the underlying buffer when the capacity is expanded', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 3)

      buffer.push(3)
            .setToughness(0, 1).setToughness(1, 2).setToughness(2, 3)
            .setColor(0, 1, 2).setColor(1, 2, 3).setColor(2, 3, 4)
            .setTransformation(0, 1, 2, 3, 4)
            .setTransformation(1, 2, 3, 4, 5)
            .setTransformation(2, 3, 4, 5, 6)

      buffer.capacity = 5

      expect(buffer.size).toBe(3)

      for (let index = 0; index < 3; ++index) {
        expect(buffer.getToughness(index)).toBe(index + 1)
        expect(buffer.getColor(index, 0)).toBe(index + 1)
        expect(buffer.getColor(index, 1)).toBe(index + 2)
        expect(buffer.getTransformation(index, 0, 0)).toBe(index + 1)
        expect(buffer.getTransformation(index, 1, 0)).toBe(index + 2)
        expect(buffer.getTransformation(index, 0, 1)).toBe(index + 3)
        expect(buffer.getTransformation(index, 1, 1)).toBe(index + 4)
      }
    })

    it('correctly format the underlying buffer when the capacity is reduced', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 3)

      buffer.push(3)
            .setToughness(0, 1).setToughness(1, 2).setToughness(2, 3)
            .setColor(0, 1, 2).setColor(1, 2, 3).setColor(2, 3, 4)
            .setTransformation(0, 1, 2, 3, 4)
            .setTransformation(1, 2, 3, 4, 5)
            .setTransformation(2, 3, 4, 5, 6)

      buffer.capacity = 2

      expect(buffer.size).toBe(2)

      for (let index = 0; index < 2; ++index) {
        expect(buffer.getToughness(index)).toBe(index + 1)
        expect(buffer.getColor(index, 0)).toBe(index + 1)
        expect(buffer.getColor(index, 1)).toBe(index + 2)
        expect(buffer.getTransformation(index, 0, 0)).toBe(index + 1)
        expect(buffer.getTransformation(index, 1, 0)).toBe(index + 2)
        expect(buffer.getTransformation(index, 0, 1)).toBe(index + 3)
        expect(buffer.getTransformation(index, 1, 1)).toBe(index + 4)
      }
    })

    it('throw if you trying to set a negative capacity', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 3)

      expect(_ => buffer.capacity = -5).toThrow()
    })
  })

  describe('#size', function () {
    it('return the current buffer size', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 20)

      expect(buffer.size).toBe(0)
      expect(buffer.capacity).toBe(20)
    })

    it('change the current buffer size', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 60)

      expect(buffer.size).toBe(0)
      expect(buffer.capacity).toBe(60)

      buffer.size = 24

      expect(buffer.size).toBe(24)
      expect(buffer.capacity).toBe(60)

      buffer.size = 12

      expect(buffer.size).toBe(12)
      expect(buffer.capacity).toBe(60)
    })

    it('can expand the buffer capacity if necessary', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 2)

      expect(buffer.size).toBe(0)
      expect(buffer.capacity).toBe(2)

      buffer.size = 24

      expect(buffer.size).toBe(24)
      expect(buffer.capacity).toBe(24)

      buffer.size = 12

      expect(buffer.size).toBe(12)
      expect(buffer.capacity).toBe(24)
    })

    it('reset to zero structures when size is reduced and then expanded', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 3)

      buffer.push(3)
            .setToughness(0, 1).setToughness(1, 2).setToughness(2, 3)
            .setColor(0, 1, 2).setColor(1, 2, 3).setColor(2, 3, 4)
            .setTransformation(0, 1, 2, 3, 4)
            .setTransformation(1, 2, 3, 4, 5)
            .setTransformation(2, 3, 4, 5, 6)

      buffer.size = 2
      buffer.size = 3

      expect(buffer.size).toBe(3)

      for (let index = 0; index < 2; ++index) {
        expect(buffer.getToughness(index)).toBe(index + 1)
        expect(buffer.getColor(index, 0)).toBe(index + 1)
        expect(buffer.getColor(index, 1)).toBe(index + 2)
        expect(buffer.getTransformation(index, 0, 0)).toBe(index + 1)
        expect(buffer.getTransformation(index, 1, 0)).toBe(index + 2)
        expect(buffer.getTransformation(index, 0, 1)).toBe(index + 3)
        expect(buffer.getTransformation(index, 1, 1)).toBe(index + 4)
      }

      expect(buffer.getToughness(2)).toBe(0)
      expect(buffer.getColor(2, 0)).toBe(0)
      expect(buffer.getColor(2, 1)).toBe(0)
      expect(buffer.getTransformation(2, 0, 0)).toBe(0)
      expect(buffer.getTransformation(2, 1, 0)).toBe(0)
      expect(buffer.getTransformation(2, 0, 1)).toBe(0)
      expect(buffer.getTransformation(2, 1, 1)).toBe(0)
    })

    it('throw if you trying to set a negative size', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 3)

      expect(_ => buffer.size = -5).toThrow()
    })
  })

  describe('#push', function () {
    it('append a zero structure to the buffer', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure)

      expect(buffer.size).toBe(0)

      buffer.push().push().push()

      expect(buffer.size).toBe(3)

      buffer.push(3)

      expect(buffer.size).toBe(6)

      for (let index = 0; index < buffer.size * structure.size; ++index) {
        expect(buffer.vertexBuffer.get(index)).toBe(0)
      }
    })
  })

  for (
    const [structureType, vertexBufferType] of [
      [VertexFieldType.BYTE, 'Byte'],
      [VertexFieldType.UNSIGNED_BYTE, 'UnsignedByte'],
      [VertexFieldType.INT, 'Int'],
      [VertexFieldType.UNSIGNED_INT, 'UnsignedInt'],
      [VertexFieldType.SHORT, 'Short'],
      [VertexFieldType.FLOAT, 'Float']
    ]
  ) {
    describe(`#setters(${VertexFieldType.toString(structureType)})`, function () {
      it(`create a setter for ${VertexFieldType.toString(structureType)} fields on demand`, function () {
        const structure = new VertexStructure([
          ['color', VertexFieldType.FLOAT_VEC3],
          ['value', structureType],
          ['transformation', VertexFieldType.FLOAT_MAT2]
        ])
        const buffer = new InterleavedVertexStructureBuffer(structure, 3).push(3)

        buffer.setColor(0, 1, 2, 3)
              .setColor(1, 4, 5, 6)
              .setValue(1, 8)
              .setTransformation(1, 1, 2, 3, 4)

        expect(buffer.vertexBuffer.equals(
          new VertexBuffer().push3FloatVector(1, 2, 3)
                            [`push${vertexBufferType}`](0)
                            .push2x2FloatMatrix(0, 0, 0, 0)
                            .push3FloatVector(4, 5, 6)
                            [`push${vertexBufferType}`](8)
                            .push2x2FloatMatrix(1, 2, 3, 4)
                            .push3FloatVector(0, 0, 0)
                            [`push${vertexBufferType}`](0)
                            .push2x2FloatMatrix(0, 0, 0, 0)
        )).toBeTruthy()
      })
    })

    describe(`#getters(${VertexFieldType.toString(structureType)})`, function () {
      it(`create a getter for ${VertexFieldType.toString(structureType)} fields on demand`, function () {
        const structure = new VertexStructure([
          ['color', VertexFieldType.FLOAT_VEC3],
          ['value', structureType],
          ['transformation', VertexFieldType.FLOAT_MAT2]
        ])
        const buffer = new InterleavedVertexStructureBuffer(structure, 3).push(3)

        buffer.setColor(0, 1, 2, 3)
              .setColor(1, 4, 5, 6)
              .setValue(1, 8)
              .setTransformation(1, 1, 2, 3, 4)

        expect(buffer.getValue(0)).toBe(0)
        expect(buffer.getValue(1)).toBe(8)
        expect(buffer.getValue(2)).toBe(0)
      })
    })
  }

  for (
    const [structureType, vertexBufferType, vectorSize] of [
      [VertexFieldType.INT_VEC2, '2IntVector', 2],
      [VertexFieldType.INT_VEC3, '3IntVector', 3],
      [VertexFieldType.INT_VEC4, '4IntVector', 4],
      [VertexFieldType.FLOAT_VEC2, '2FloatVector', 2],
      [VertexFieldType.FLOAT_VEC3, '3FloatVector', 3],
      [VertexFieldType.FLOAT_VEC4, '4FloatVector', 4]
    ]
  ) {
    describe(`#setters(${VertexFieldType.toString(structureType)})`, function () {
      it(`create a setter for ${VertexFieldType.toString(structureType)} fields on demand`, function () {
        const structure = new VertexStructure([
          ['color', VertexFieldType.FLOAT_VEC3],
          ['value', structureType],
          ['transformation', VertexFieldType.FLOAT_MAT2]
        ])
        const buffer = new InterleavedVertexStructureBuffer(structure, 3).push(3)

        buffer.setColor(0, 1, 2, 3)
              .setColor(1, 4, 5, 6)
              .setValue(1, ...range(vectorSize))
              .setTransformation(1, 1, 2, 3, 4)

        expect(buffer.vertexBuffer.equals(
          new VertexBuffer().push3FloatVector(1, 2, 3)
                            [`push${vertexBufferType}`](...zeroes(vectorSize))
                            .push2x2FloatMatrix(0, 0, 0, 0)
                            .push3FloatVector(4, 5, 6)
                            [`push${vertexBufferType}`](...range(vectorSize))
                            .push2x2FloatMatrix(1, 2, 3, 4)
                            .push3FloatVector(0, 0, 0)
                            [`push${vertexBufferType}`](...zeroes(vectorSize))
                            .push2x2FloatMatrix(0, 0, 0, 0)
        )).toBeTruthy()
      })
    })

    describe(`#getters(${VertexFieldType.toString(structureType)})`, function () {
      it(`create a getter for ${VertexFieldType.toString(structureType)} fields on demand`, function () {
        const structure = new VertexStructure([
          ['color', VertexFieldType.FLOAT_VEC3],
          ['value', structureType],
          ['transformation', VertexFieldType.FLOAT_MAT2]
        ])
        const buffer = new InterleavedVertexStructureBuffer(structure, 3).push(2)

        buffer.setColor(0, 1, 2, 3)
              .setColor(1, 4, 5, 6)
              .setValue(1, ...range(vectorSize))
              .setTransformation(1, 1, 2, 3, 4)

        for (let index = 0; index < vectorSize; ++index) {
          expect(buffer.getValue(0, index)).toBe(0)
          expect(buffer.getValue(1, index)).toBe(index)
          expect(buffer.getValue(2, index)).toBe(0)
        }
      })
    })
  }

  for (
    const [structureType, vertexBufferType, order] of [
      [VertexFieldType.FLOAT_MAT2, '2x2FloatMatrix', 2],
      [VertexFieldType.FLOAT_MAT3, '3x3FloatMatrix', 3],
      [VertexFieldType.FLOAT_MAT4, '4x4FloatMatrix', 4]
    ]
  ) {
    const cells = order * order

    describe(`#setters(${VertexFieldType.toString(structureType)})`, function () {
      it(`create a setter for ${VertexFieldType.toString(structureType)} fields on demand`, function () {
        const structure = new VertexStructure([
          ['color', VertexFieldType.FLOAT_VEC3],
          ['value', structureType],
          ['transformation', VertexFieldType.FLOAT_MAT2]
        ])
        const buffer = new InterleavedVertexStructureBuffer(structure, 3).push(3)

        buffer.setColor(0, 1, 2, 3)
              .setColor(1, 4, 5, 6)
              .setValue(1, ...range(cells))
              .setTransformation(1, 1, 2, 3, 4)

        expect(buffer.vertexBuffer.equals(
          new VertexBuffer().push3FloatVector(1, 2, 3)
                            [`push${vertexBufferType}`](...zeroes(cells))
                            .push2x2FloatMatrix(0, 0, 0, 0)
                            .push3FloatVector(4, 5, 6)
                            [`push${vertexBufferType}`](...range(cells))
                            .push2x2FloatMatrix(1, 2, 3, 4)
                            .push3FloatVector(0, 0, 0)
                            [`push${vertexBufferType}`](...zeroes(cells))
                            .push2x2FloatMatrix(0, 0, 0, 0)
        )).toBeTruthy()
      })
    })

    describe(`#getters(${VertexFieldType.toString(structureType)})`, function () {
      it(`create a getter for ${VertexFieldType.toString(structureType)} fields on demand`, function () {
        const structure = new VertexStructure([
          ['color', VertexFieldType.FLOAT_VEC3],
          ['value', structureType],
          ['transformation', VertexFieldType.FLOAT_MAT2]
        ])
        const buffer = new InterleavedVertexStructureBuffer(structure, 3).push(2)

        buffer.setColor(0, 1, 2, 3)
              .setColor(1, 4, 5, 6)
              .setValue(1, ...range(cells))
              .setTransformation(1, 1, 2, 3, 4)

        for (let x = 0; x < order; ++x) {
          for (let y = 0; y < order; ++y) {
            expect(buffer.getValue(0, x, y)).toBe(0)
            expect(buffer.getValue(1, x, y)).toBe(x + y * order)
            expect(buffer.getValue(2, x, y)).toBe(0)
          }
        }
      })
    })
  }

  describe('#delete', function () {
    it('delete some content of the buffer', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 3)

      buffer.push(3)
            .setToughness(0, 1)
            .setToughness(1, 3)
            .setToughness(2, 2)
            .setColor(0, 1, 2)
            .setColor(1, 3, 4)
            .setColor(2, 2, 3)
            .setTransformation(0, 1, 2, 3, 4)
            .setTransformation(1, 3, 4, 5, 6)
            .setTransformation(2, 2, 3, 4, 5)

      buffer.delete(1)
      expect(buffer.size).toBe(2)
      expect(buffer.vertexBuffer.equals(
        new VertexBuffer().pushFloat(1)
                          .push2FloatVector(1, 2)
                          .push2x2FloatMatrix(1, 2, 3, 4)
                          .pushFloat(2)
                          .push2FloatVector(2, 3)
                          .push2x2FloatMatrix(2, 3, 4, 5)
      )).toBeTruthy()
    })
  })

  describe('#concat', function () {
    it('concat buffers with same structure', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 3)

      buffer.push(2)
            .setToughness(0, 1)
            .setToughness(1, 2)
            .setColor(0, 1, 2)
            .setColor(1, 2, 3)
            .setTransformation(0, 1, 2, 3, 4)
            .setTransformation(1, 2, 3, 4, 5)

      const toConcatenate = [
        new InterleavedVertexStructureBuffer(structure, 3).push(2)
          .setToughness(0, 3)
          .setToughness(1, 4)
          .setColor(0, 3, 4)
          .setColor(1, 4, 5)
          .setTransformation(0, 3, 4, 5, 6)
          .setTransformation(1, 4, 5, 6, 7),
        new InterleavedVertexStructureBuffer(structure, 2).push(1)
          .setToughness(0, 5)
          .setColor(0, 5, 6)
          .setTransformation(0, 5, 6, 7, 8)
      ]

      buffer.concat(...toConcatenate)
      expect(buffer.size).toBe(5)

      for (let index = 0; index < buffer.size; ++index) {
        expect(buffer.getToughness(index)).toBe(index + 1)
        expect(buffer.getColor(index, 0)).toBe(index + 1)
        expect(buffer.getColor(index, 1)).toBe(index + 2)
        expect(buffer.getTransformation(index, 0, 0)).toBe(index + 1)
        expect(buffer.getTransformation(index, 1, 0)).toBe(index + 2)
        expect(buffer.getTransformation(index, 0, 1)).toBe(index + 3)
        expect(buffer.getTransformation(index, 1, 1)).toBe(index + 4)
      }
    })

    it('throw when you trying to concat two buffers with different format', function () {
      const buffer = new InterleavedVertexStructureBuffer(new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ]), 3)

      buffer.push(2)
            .setToughness(0, 1).setToughness(1, 2)
            .setColor(0, 1, 2).setColor(1, 2, 3)
            .setTransformation(0, 1, 2, 3, 4)
            .setTransformation(1, 2, 3, 4, 5)

      const toConcatenate = new InterleavedVertexStructureBuffer(new VertexStructure([
        ['toughness', VertexFieldType.INT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ]), 3).push(2)
          .setToughness(0, 3).setToughness(1, 4)
          .setColor(0, 3, 4).setColor(1, 4, 5)
          .setTransformation(0, 3, 4, 5, 6)
          .setTransformation(1, 4, 5, 6, 7)

      expect(_ => buffer.concat(toConcatenate)).toThrow()
    })
  })

  describe('#copyWithin', function () {
    it('copy content within the buffer', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 3)

      buffer.push(3)
            .setToughness(0, 1)
            .setToughness(1, 2)
            .setColor(0, 1, 2)
            .setColor(1, 2, 3)
            .setTransformation(0, 1, 2, 3, 4)
            .setTransformation(1, 2, 3, 4, 5)

      buffer.copyWithin(1, 0, 3)

      expect(buffer.size).toBe(3)

      expect(buffer.vertexBuffer.equals(
        new VertexBuffer().pushFloat(1)
                          .push2FloatVector(1, 2)
                          .push2x2FloatMatrix(1, 2, 3, 4)
                          .pushFloat(1)
                          .push2FloatVector(1, 2)
                          .push2x2FloatMatrix(1, 2, 3, 4)
                          .pushFloat(2)
                          .push2FloatVector(2, 3)
                          .push2x2FloatMatrix(2, 3, 4, 5)
      )).toBeTruthy()
    })
  })

  describe('#equals', function () {
    it('return true if the current instance is passed', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 3)

      buffer.push(3)
            .setToughness(0, 1)
            .setToughness(1, 2)
            .setColor(0, 1, 2)
            .setColor(1, 2, 3)
            .setTransformation(0, 1, 2, 3, 4)
            .setTransformation(1, 2, 3, 4, 5)

      expect(buffer.equals(buffer)).toBeTruthy()
    })

    it('return false if null is passed', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 3)

      buffer.push(3)
            .setToughness(0, 1)
            .setToughness(1, 2)
            .setColor(0, 1, 2)
            .setColor(1, 2, 3)
            .setTransformation(0, 1, 2, 3, 4)
            .setTransformation(1, 2, 3, 4, 5)

      expect(buffer.equals(null)).toBeFalsy()
      expect(buffer.equals(undefined)).toBeFalsy()
    })

    it('return false if another type is passed', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 3)

      buffer.push(3)
            .setToughness(0, 1)
            .setToughness(1, 2)
            .setColor(0, 1, 2)
            .setColor(1, 2, 3)
            .setTransformation(0, 1, 2, 3, 4)
            .setTransformation(1, 2, 3, 4, 5)

      expect(buffer.equals("plopl")).toBeFalsy()
      expect(buffer.equals(32)).toBeFalsy()
      expect(buffer.equals(buffer.vertexBuffer)).toBeFalsy()
    })

    it('return false if both buffer does not have the same structure', function () {
      const left = new InterleavedVertexStructureBuffer(new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ]), 3)

      const right = new InterleavedVertexStructureBuffer(new VertexStructure([
        ['toughness', VertexFieldType.INT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ]), 3)

      left.push(2)
          .setToughness(0, 1)
          .setToughness(1, 2)
          .setColor(0, 1, 2)
          .setColor(1, 2, 3)
          .setTransformation(0, 1, 2, 3, 4)
          .setTransformation(1, 2, 3, 4, 5)

      right.push(2)
           .setToughness(0, 1)
           .setToughness(1, 2)
           .setColor(0, 1, 2)
           .setColor(1, 2, 3)
           .setTransformation(0, 1, 2, 3, 4)
           .setTransformation(1, 2, 3, 4, 5)

      expect(left.equals(right)).toBeFalsy()
    })

    it('return false if both buffer does not have the same size', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const left = new InterleavedVertexStructureBuffer(structure, 3)

      const right = new InterleavedVertexStructureBuffer(structure, 3)

      left.push(2)
          .setToughness(0, 1)
          .setToughness(1, 2)
          .setColor(0, 1, 2)
          .setColor(1, 2, 3)
          .setTransformation(0, 1, 2, 3, 4)
          .setTransformation(1, 2, 3, 4, 5)

      right.push(2)
           .setToughness(0, 1)
           .setToughness(1, 2)
           .setColor(0, 1, 2)
           .setColor(1, 2, 3)
           .setTransformation(0, 1, 2, 3, 4)
           .setTransformation(1, 2, 3, 4, 5)

      right.size = 1

      expect(left.equals(right)).toBeFalsy()
    })

    it('return false if both buffer content are not equals', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const left = new InterleavedVertexStructureBuffer(structure, 3)

      const right = new InterleavedVertexStructureBuffer(structure, 3)

      left.push(2)
          .setToughness(0, 1)
          .setToughness(1, 2)
          .setColor(0, 1, 2)
          .setColor(1, 2, 3)
          .setTransformation(0, 1, 2, 3, 4)
          .setTransformation(1, 2, 3, 4, 5)

      right.push(2)
           .setToughness(0, 1)
           .setToughness(1, 2)
           .setColor(0, 1, 2)
           .setColor(1, 2, 4)
           .setTransformation(0, 1, 2, 3, 4)
           .setTransformation(1, 2, 3, 4, 5)

      expect(left.equals(right)).toBeFalsy()
    })

    it('return true if both buffer are equals', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const left = new InterleavedVertexStructureBuffer(structure, 3)

      const right = new InterleavedVertexStructureBuffer(structure, 3)

      left.push(2)
          .setToughness(0, 1)
          .setToughness(1, 2)
          .setColor(0, 1, 2)
          .setColor(1, 2, 3)
          .setTransformation(0, 1, 2, 3, 4)
          .setTransformation(1, 2, 3, 4, 5)

      right.push(2)
           .setToughness(0, 1)
           .setToughness(1, 2)
           .setColor(0, 1, 2)
           .setColor(1, 2, 3)
           .setTransformation(0, 1, 2, 3, 4)
           .setTransformation(1, 2, 3, 4, 5)

      expect(left.equals(right)).toBeTruthy()
    })
  })

  describe('#clear', function () {
    it('empty a buffer', function () {
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const buffer = new InterleavedVertexStructureBuffer(structure, 3)

      buffer.push(2)
            .setToughness(0, 1).setToughness(1, 2)
            .setColor(0, 1, 2).setColor(1, 2, 3)
            .setTransformation(0, 1, 2, 3, 4)
            .setTransformation(1, 2, 3, 4, 5)

      buffer.clear()

      expect(buffer.size).toBe(0)
      expect(buffer.equals(new InterleavedVertexStructureBuffer(structure, 3))).toBeTruthy()
    })
  })

  describe('#contextualise', function () {
    it('return a contextualisation of this buffer', function () {
      const context = createWebGLContext(jest)
      const structure = new VertexStructure([
        ['toughness', VertexFieldType.FLOAT],
        ['color', VertexFieldType.FLOAT_VEC2],
        ['transformation', VertexFieldType.FLOAT_MAT2]
      ])
      const descriptor = new InterleavedVertexStructureBuffer(structure, 3)
      const contextualisation = descriptor.contextualise(context)

      expect(contextualisation.descriptor).toBe(descriptor)
      expect(contextualisation).toBeInstanceOf(GLInterleavedVertexStructureBuffer)
    })
  })
})
