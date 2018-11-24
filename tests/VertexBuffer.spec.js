/** eslint-env jest */

import { VertexBuffer, BufferUsage, GLVertexBuffer } from '@library'
import { createWebGLContext } from './createWebGLContext'

describe('VertexBuffer', function () {
  describe('#constructor', function () {
    it('instantiate an empty STATIC_DRAW buffer with a capacities of 16 bytes by default', function () {
      expect(new VertexBuffer().usage).toBe(BufferUsage.STATIC_DRAW)
      expect(new VertexBuffer().capacity).toBe(16)
    })

    it('allows to specify the initial capacity and the buffer usage hint at instantiation', function () {
      expect(new VertexBuffer(10, BufferUsage.STREAM_DRAW).usage).toBe(
        BufferUsage.STREAM_DRAW
      )
      expect(new VertexBuffer(10, BufferUsage.STREAM_DRAW).capacity).toBe(10)
    })
  })

  describe('#empty', function () {
    it('instantiate an empty STATIC_DRAW buffer with a capacities of 16 faces by default', function () {
      expect(VertexBuffer.empty().usage).toBe(BufferUsage.STATIC_DRAW)
      expect(VertexBuffer.empty().capacity).toBe(16)
    })

    it('allows to specify the initial capacity and the buffer usage hint of the created buffer', function () {
      expect(VertexBuffer.empty(10, BufferUsage.STREAM_DRAW).usage).toBe(
        BufferUsage.STREAM_DRAW
      )
      expect(VertexBuffer.empty(10, BufferUsage.STREAM_DRAW).capacity).toBe(10)
    })
  })

  describe('#clone', function () {
    it('copy a given buffer instance', function () {
      const base = new VertexBuffer()
      base.pushFloat(5).push3FloatVector(1, 2, 3).push3x3FloatMatrix(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      )

      const copy = VertexBuffer.clone(base)

      expect(base.equals(copy)).toBeTruthy()
      expect(base).not.toBe(copy)
    })

    it('copy the current buffer instance', function () {
      const base = new VertexBuffer()
      base.pushFloat(5).push3FloatVector(1, 2, 3).push3x3FloatMatrix(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      )

      expect(base.equals(base.clone())).toBeTruthy()
      expect(base).not.toBe(base.clone())
    })
  })

  describe('#buffer', function () {
    it('return the underlying buffer', function () {
      const base = new VertexBuffer(6)
      base.pushByte(5).push3ByteVector(1, 2, 3)

      expect(base.buffer).toEqual(new Uint8Array([
        5, 1, 2, 3, 0, 0
      ]))
    })
  })

  describe('#capacity', function () {
    it('return the maximum size of the buffer', function () {
      const buffer = new VertexBuffer(5)

      expect(buffer.capacity).toBe(5)
      expect(buffer.size).toBe(0)
      expect(buffer.buffer.length).toBe(5)
    })

    it('does nothing if you set the capacity of the buffer to the current capacity', function () {
      const buffer = new VertexBuffer(5)
      const oldBuffer = buffer.buffer

      buffer.capacity = 5

      expect(buffer.size).toBe(0)
      expect(buffer.capacity).toBe(5)
      expect(buffer.buffer).toBe(oldBuffer)
    })

    it('allow to expand the buffer capacity', function () {
      const buffer = new VertexBuffer(5).pushByte(1)
                                        .pushByte(2)
                                        .pushByte(3)

      expect(buffer.buffer.length).toBe(5)
      expect(buffer.size).toBe(3)

      buffer.capacity = 10

      expect(buffer.capacity).toBe(10)
      expect(buffer.size).toBe(3)
      expect(buffer.buffer.length).toBe(10)
      expect(buffer.equals(
        new VertexBuffer().pushByte(1).pushByte(2).pushByte(3)
      )).toBeTruthy()
    })

    it('allow to reduce the buffer capacity', function () {
      const buffer = new VertexBuffer(3).pushByte(1)
                                        .pushByte(2)
                                        .pushByte(3)

      expect(buffer.size).toBe(3)
      expect(buffer.buffer.length).toBe(3)

      buffer.capacity = 1

      expect(buffer.size).toBe(1)
      expect(buffer.capacity).toBe(1)
      expect(buffer.buffer.length).toBe(1)
      expect(buffer.equals(new VertexBuffer(3).pushByte(1))).toBeTruthy()
    })

    it('throw if you trying to set a negative capacity', function () {
      const buffer = new VertexBuffer(5)

      expect(_ => buffer.capacity = -5).toThrow()
    })
  })

  describe('#size', function () {
    it('return the current size of the vertex buffer', function () {
      const buffer = new VertexBuffer(5)

      expect(buffer.size).toBe(0)
      expect(buffer.buffer.length).toBe(5)

      buffer.pushByte(1).pushByte(2).pushByte(3)

      expect(buffer.size).toBe(3)
      expect(buffer.buffer.length).toBe(5)

      buffer.pushByte(4)

      expect(buffer.size).toBe(4)
      expect(buffer.buffer.length).toBe(5)
    })

    it('does nothing if you set the size of the buffer to the current size', function () {
      const buffer = new VertexBuffer(5)
      const oldBuffer = buffer.buffer

      buffer.pushByte(1).pushByte(2).pushByte(3)

      expect(buffer.size).toBe(3)
      expect(buffer.capacity).toBe(5)
      expect(buffer.buffer).toBe(oldBuffer)

      buffer.size = 3

      expect(buffer.size).toBe(3)
      expect(buffer.capacity).toBe(5)
      expect(buffer.buffer).toBe(oldBuffer)
    })

    it('allow to expand the size of the buffer by initializing bytes to zero', function () {
      const buffer = new VertexBuffer(5)

      buffer.pushByte(1).pushByte(2).pushByte(3)

      expect(buffer.buffer.length).toBe(5)
      expect(buffer.size).toBe(3)

      buffer.size = 5

      expect(buffer.capacity).toBe(5)
      expect(buffer.size).toBe(5)
      expect(buffer.buffer.length).toBe(5)
      expect(buffer.equals(
        new VertexBuffer(5).pushByte(1)
                           .pushByte(2)
                           .pushByte(3)
                           .pushByte(0)
                           .pushByte(0)
      )).toBeTruthy()
    })

    it('allow to reducing the size', function () {
      const buffer = new VertexBuffer(5)

      buffer.pushByte(1).pushByte(2).pushByte(3).pushByte(4).pushByte(5)

      expect(buffer.size).toBe(5)
      expect(buffer.capacity).toBe(5)
      expect(buffer.buffer.length).toBe(5)

      buffer.size = 2

      expect(buffer.size).toBe(2)
      expect(buffer.capacity).toBe(5)
      expect(buffer.buffer.length).toBe(5)
      expect(buffer.equals(
        new VertexBuffer(5).pushByte(1)
                           .pushByte(2)
      )).toBeTruthy()
    })

    it('reset next bytes when the size is reduced and then expanded', function () {
      const buffer = new VertexBuffer(4)

      buffer.pushByte(1).pushByte(2).pushByte(3).pushByte(4).pushByte(5)

      buffer.size = 2
      buffer.size = 3

      expect(buffer.size).toBe(3)
      expect(buffer.capacity).toBe(5)
      expect(buffer.buffer.length).toBe(5)
      expect(buffer.equals(
        new VertexBuffer(5).pushByte(1)
                           .pushByte(2)
                           .pushByte(0)
      )).toBeTruthy()
    })

    it('throw if you trying to set a negative size', function () {
      const buffer = new VertexBuffer(5)

      expect(_ => buffer.size = -5).toThrow()
    })
  })

  for (const [type, size] of [
    ['Float', Float32Array.BYTES_PER_ELEMENT],
    ['Double', Float64Array.BYTES_PER_ELEMENT],
    ['Byte', Int8Array.BYTES_PER_ELEMENT],
    ['UnsignedByte', Uint8Array.BYTES_PER_ELEMENT],
    ['Short', Int16Array.BYTES_PER_ELEMENT],
    ['UnsignedShort', Uint16Array.BYTES_PER_ELEMENT],
    ['Int', Int32Array.BYTES_PER_ELEMENT],
    ['UnsignedInt', Uint32Array.BYTES_PER_ELEMENT]
  ]) {
    describe(`#push${type}`, function () {
      it(`push a value of type ${type} into the buffer`, function () {
        const base = new VertexBuffer(2)
        base.pushByte(5).pushByte(1).pushByte(3)

        expect(base.size).toBe(3)

        base[`push${type}`](8)

        expect(base.size).toBe(3 + size)
        expect(base[`get${type}`](3)).toBe(8)
        expect(base.getByte(0)).toBe(5)
        expect(base.getByte(1)).toBe(1)
        expect(base.getByte(2)).toBe(3)
      })
    })

    describe(`#delete${type}`, function () {
      it(`delete a value of type ${type} from the buffer`, function () {
        const base = new VertexBuffer(2)
        base.pushByte(5).pushByte(1)

        base[`push${type}`](8)

        base.pushByte(3)

        expect(base.size).toBe(3 + size)

        base[`delete${type}`](2)

        expect(base.size).toBe(3)
        expect(base.getByte(0)).toBe(5)
        expect(base.getByte(1)).toBe(1)
        expect(base.getByte(2)).toBe(3)
      })
    })

    for (const value of [
      [1, 2],
      [1, 2, 3],
      [1, 2, 3, 4]
    ]) {
      describe(`#push${value.length}${type}Vector`, function () {
        it(`push a ${value.length} dimensional vector of type ${type} into the buffer`, function () {
          const base = new VertexBuffer(2)
          base.pushByte(5).pushByte(1).pushByte(3)

          expect(base.size).toBe(3)

          base[`push${value.length}${type}Vector`](...value)

          expect(base.size).toBe(3 + size * value.length)
          for (let index = 0; index < value.length; ++index) {
            expect(base[`get${type}Vector`](3, index)).toBe(value[index])
          }
          expect(base.getByte(0)).toBe(5)
          expect(base.getByte(1)).toBe(1)
          expect(base.getByte(2)).toBe(3)
        })
      })

      describe(`#delete${value.length}${type}Vector`, function () {
        it(`delete a ${value.length} dimensional vector of type ${type} from the buffer`, function () {
          const base = new VertexBuffer(2)
          base.pushByte(5).pushByte(1)

          base[`push${value.length}${type}Vector`](...value)

          base.pushByte(3)

          expect(base.size).toBe(3 + size * value.length)

          base[`delete${value.length}${type}Vector`](2)

          expect(base.size).toBe(3)
          expect(base.getByte(0)).toBe(5)
          expect(base.getByte(1)).toBe(1)
          expect(base.getByte(2)).toBe(3)
        })
      })
    }
  }

  for (const [type, size] of [
    ['Float', Float32Array.BYTES_PER_ELEMENT],
    ['Double', Float64Array.BYTES_PER_ELEMENT]
  ]) {
    for (const [columns, rows, value] of [
      [
        2, 2, [
          1, 2,
          3, 4
        ]
      ],
      [
        2, 3, [
          1, 2,
          3, 4,
          5, 6
        ]
      ],
      [
        2, 4, [
          1, 2,
          3, 4,
          5, 6,
          7, 8
        ]
      ],
      [
        3, 2, [
          1, 2, 3,
          4, 5, 6
        ]
      ],
      [
        3, 3, [
          1, 2, 3,
          4, 5, 6,
          7, 8, 9
        ]
      ],
      [
        3, 4, [
          1, 2, 3, 4,
          5, 6, 7, 8,
          9, 10, 11, 12
        ]
      ],
      [
        2, 4, [
          1, 2,
          3, 4,
          5, 6,
          7, 8
        ]
      ],
      [
        4, 2, [
          1, 2, 3, 4,
          5, 6, 7, 8
        ]
      ],
      [
        4, 3, [
          1, 2, 3, 4,
          5, 6, 7, 8,
          9, 10, 11, 12
        ]
      ],
      [
        4, 4, [
          1, 2, 3, 4,
          5, 6, 7, 8,
          9, 10, 11, 12,
          13, 14, 15, 16
        ]
      ]
    ]) {
      describe(`#push${columns}x${rows}${type}Matrix`, function () {
        it(`push a ${columns}x${rows} dimensional matrix of type ${type} into the buffer`, function () {
          const base = new VertexBuffer(2)
          base.pushByte(5).pushByte(1).pushByte(3)

          expect(base.size).toBe(3)

          base[`push${columns}x${rows}${type}Matrix`](...value)

          expect(base.size).toBe(3 + size * value.length)
          for (let column = 0; column < columns; ++column) {
            for (let row = 0; row < rows; ++row) {
              expect(
                base[`get${columns}x${rows}${type}Matrix`](3, column, row)
              ).toBe(value[row * columns + column])
            }
          }
          expect(base.getByte(0)).toBe(5)
          expect(base.getByte(1)).toBe(1)
          expect(base.getByte(2)).toBe(3)
        })
      })

      describe(`#delete${columns}x${rows}${type}Matrix`, function () {
        it(`delete a ${columns}x${rows} dimensional matrix of type ${type} from the buffer`, function () {
          const base = new VertexBuffer(2)
          base.pushByte(5).pushByte(1)

          base[`push${columns}x${rows}${type}Matrix`](...value)

          base.pushByte(3)

          expect(base.size).toBe(3 + size * value.length)

          base[`delete${columns}x${rows}${type}Matrix`](2)

          expect(base.size).toBe(3)
          expect(base.getByte(0)).toBe(5)
          expect(base.getByte(1)).toBe(1)
          expect(base.getByte(2)).toBe(3)
        })
      })
    }
  }

  describe(`#copy`, function () {
    it(`copy some content from a buffer to another`, function () {
      const source = new VertexBuffer(0).push2IntVector(5, 6)
                                       .push3FloatVector(1, 2, 3)
      const destination = new VertexBuffer(0).push3DoubleVector(
        5, 6, 7
      ).push3IntVector(8, 9, 10).pushByte(2)

      destination.copy(source, 0, destination.size - 1)

      expect(destination.equals(
        new VertexBuffer().push3DoubleVector(5, 6, 7)
                          .push3IntVector(8, 9, 10)
                          .push2IntVector(5, 6)
                          .push3FloatVector(1, 2, 3)
      )).toBeTruthy()
    })
  })

  describe(`#concat`, function () {
    it(`copy some content from a buffer to another`, function () {
      const buffers = [
        new VertexBuffer().push2IntVector(5, 6)
                          .push3FloatVector(1, 2, 3),
        new VertexBuffer().push3x3FloatMatrix(
          1, 2, 3, 4, 5, 6, 7, 8, 9
        ).push2FloatVector(5, 2)
         .pushInt(6)
      ]

      const destination = new VertexBuffer().push3DoubleVector(5, 6, 7)
                                            .push3IntVector(8, 9, 10)
                                            .pushByte(2)



      destination.concat(...buffers)

      expect(destination.equals(
        new VertexBuffer().push3DoubleVector(5, 6, 7)
                          .push3IntVector(8, 9, 10)
                          .pushByte(2)
                          .push2IntVector(5, 6)
                          .push3FloatVector(1, 2, 3)
                          .push3x3FloatMatrix(
                            1, 2, 3, 4, 5, 6, 7, 8, 9
                          ).push2FloatVector(5, 2)
                           .pushInt(6)
      )).toBeTruthy()
    })
  })

  describe(`#copyWithin`, function () {
    it(`copy some content of the current buffer`, function () {
      const buffer = new VertexBuffer().pushByte(1)
                                       .push3DoubleVector(5, 6, 7)
                                       .push3IntVector(8, 9, 10)
                                       .pushByte(2)



      buffer.copyWithin(1, 0, buffer.size)

      expect(buffer.equals(
        new VertexBuffer().pushByte(1)
                          .pushByte(1)
                          .push3DoubleVector(5, 6, 7)
                          .push3IntVector(8, 9, 10)
      )).toBeTruthy()
    })
  })

  describe('#fill', function () {
    it('fill the current buffer with a given value', function () {
      const buffer = new VertexBuffer().pushByte(1)
                                       .push3DoubleVector(5, 6, 7)
                                       .push3IntVector(8, 9, 10)
                                       .pushByte(2)

      const oldSize = buffer.size

      buffer.fill(5)

      expect(buffer.size).toBe(oldSize)
      for (let index = 0; index < buffer.size; ++index) {
        expect(buffer.get(0)).toBe(5)
      }
    })
  })

  describe('#equals', function () {
    it('return true if both instance are the same', function () {
      const buffer = new VertexBuffer().pushByte(1)
                                       .push3DoubleVector(5, 6, 7)
                                       .push3IntVector(8, 9, 10)
                                       .pushByte(2)

      expect(buffer.equals(buffer)).toBeTruthy()
    })

    it('return false if null was given', function () {
      const buffer = new VertexBuffer().pushByte(1)
                                       .push3DoubleVector(5, 6, 7)
                                       .push3IntVector(8, 9, 10)
                                       .pushByte(2)

      expect(buffer.equals(null)).toBeFalsy()
      expect(buffer.equals(undefined)).toBeFalsy()
    })

    it('return false if another object instance was passed', function () {
      const buffer = new VertexBuffer().pushByte(1)
                                       .push3DoubleVector(5, 6, 7)
                                       .push3IntVector(8, 9, 10)
                                       .pushByte(2)

      expect(buffer.equals(buffer.buffer)).toBeFalsy()
      expect(buffer.equals("ploup")).toBeFalsy()
      expect(buffer.equals(5)).toBeFalsy()
    })

    it('return false if both vertex buffer does not have equals content', function () {
      const left = new VertexBuffer().pushByte(1)
                                     .push3DoubleVector(5, 6, 7)
                                     .push3IntVector(8, 9, 10)
                                     .pushByte(2)

      const right = new VertexBuffer().pushByte(1)
                                      .push3DoubleVector(5, 8, 7)
                                      .push3IntVector(8, 9, 10)
                                      .pushByte(2)

      expect(left.equals(right)).toBeFalsy()
    })

    it('return false if both vertex buffer does not have the same size', function () {
      const left = new VertexBuffer().pushByte(1)
                                     .push3DoubleVector(5, 6, 7)
                                     .push3IntVector(8, 9, 10)
                                     .pushByte(2)

      const right = new VertexBuffer().pushByte(1)
                                      .push3DoubleVector(5, 6, 7)

      expect(left.equals(right)).toBeFalsy()
    })

    it('return true if both vertex buffer have the same content', function () {
      const left = new VertexBuffer(100).pushByte(1)
                                     .push3DoubleVector(5, 6, 7)
                                     .push3IntVector(8, 9, 10)
                                     .pushByte(2)

      const right = new VertexBuffer(800).pushByte(1)
                                     .push3DoubleVector(5, 6, 7)
                                     .push3IntVector(8, 9, 10)
                                     .pushByte(2)

      expect(left.equals(right)).toBeTruthy()
    })
  })

  describe('#clear', function () {
    it('empty the given buffer', function () {
      const buffer = new VertexBuffer().pushByte(1)
                                       .push3DoubleVector(5, 6, 7)
                                       .push3IntVector(8, 9, 10)
                                       .pushByte(2)

      buffer.clear()
      expect(buffer.equals(new VertexBuffer())).toBeTruthy()
    })
  })

  describe('#contextualise', function () {
    it('return a contextualisation of this buffer', function () {
      const context = createWebGLContext(jest)
      const descriptor = new VertexBuffer()
      const contextualisation = descriptor.contextualise(context)

      expect(contextualisation.descriptor).toBe(descriptor)
      expect(contextualisation).toBeInstanceOf(GLVertexBuffer)
    })
  })
})
