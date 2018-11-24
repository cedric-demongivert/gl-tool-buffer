/** eslint-env jest */

import { FaceBuffer, BufferUsage, GLFaceBuffer } from '@library'
import { createWebGLContext } from './createWebGLContext'

describe('FaceBuffer', function () {
  describe('#constructor', function () {
    it('instantiate an empty STATIC_DRAW buffer with a capacities of 16 faces by default', function () {
      expect(new FaceBuffer().usage).toBe(BufferUsage.STATIC_DRAW)
      expect(new FaceBuffer().capacity).toBe(16)
    })

    it('allows to specify the initial capacity and the buffer usage hint at instantiation', function () {
      expect(new FaceBuffer(10, BufferUsage.STREAM_DRAW).usage).toBe(
        BufferUsage.STREAM_DRAW
      )
      expect(new FaceBuffer(10, BufferUsage.STREAM_DRAW).capacity).toBe(10)
    })
  })

  describe('#empty', function () {
    it('instantiate an empty STATIC_DRAW buffer with a capacities of 16 faces by default', function () {
      expect(FaceBuffer.empty().usage).toBe(BufferUsage.STATIC_DRAW)
      expect(FaceBuffer.empty().capacity).toBe(16)
    })

    it('allows to specify the initial capacity and the buffer usage hint of the created buffer', function () {
      expect(FaceBuffer.empty(10, BufferUsage.STREAM_DRAW).usage).toBe(
        BufferUsage.STREAM_DRAW
      )
      expect(FaceBuffer.empty(10, BufferUsage.STREAM_DRAW).capacity).toBe(10)
    })
  })

  describe('#clone', function () {
    it('allow to copy another buffer instance', function () {
      const original = new FaceBuffer(15, BufferUsage.STREAM_DRAW)

      original.push(1, 2, 3)
      original.push(3, 4, 5)
      original.push(5, 6, 7)

      const copy = FaceBuffer.clone(original)

      expect(original.equals(copy)).toBeTruthy()
      expect(original).not.toBe(copy)
    })

    it('copy the current buffer instance', function () {
      const original = new FaceBuffer(15, BufferUsage.STREAM_DRAW)

      original.push(1, 2, 3)
      original.push(3, 4, 5)
      original.push(5, 6, 7)

      const copy = original.clone()

      expect(original.equals(copy)).toBeTruthy()
      expect(original).not.toBe(copy)
    })

    it('throw if you trying to copy a null instance', function () {
      expect(_ => FaceBuffer.clone(null)).toThrow()
    })
  })

  describe('#buffer', function () {
    it('return the underlying buffer', function () {
      const buffer = new FaceBuffer(5)

      buffer.push(1, 2, 3)
      buffer.push(3, 4, 5)
      buffer.push(5, 6, 7)

      expect(buffer.buffer).toBeInstanceOf(Uint16Array)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        3, 4, 5,
        5, 6, 7,
        0, 0, 0,
        0, 0, 0
      ]))
    })
  })

  describe('#capacity', function () {
    it('return the maximum size of the face buffer', function () {
      const buffer = new FaceBuffer(5)

      expect(buffer.capacity).toBe(5)
      expect(buffer.size).toBe(0)
      expect(buffer.buffer.length).toBe(5 * 3)
    })

    it('does nothing if you set the capacity of the buffer to the current capacity', function () {
      const buffer = new FaceBuffer(5)
      const oldBuffer = buffer.buffer

      buffer.capacity = 5

      expect(buffer.size).toBe(0)
      expect(buffer.capacity).toBe(5)
      expect(buffer.buffer).toBe(oldBuffer)
    })

    it('allow to expand the buffer capacity', function () {
      const buffer = new FaceBuffer(2)

      buffer.push(1, 2, 3)
      buffer.push(3, 4, 5)

      expect(buffer.buffer.length).toBe(2 * 3)
      expect(buffer.size).toBe(2)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        3, 4, 5
      ]))

      buffer.capacity = 4

      expect(buffer.capacity).toBe(4)
      expect(buffer.size).toBe(2)
      expect(buffer.buffer.length).toBe(4 * 3)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        3, 4, 5,
        0, 0, 0,
        0, 0, 0
      ]))
    })

    it('allow to reduce the buffer capacity', function () {
      const buffer = new FaceBuffer(3)

      buffer.push(1, 2, 3)
      buffer.push(3, 4, 5)
      buffer.push(5, 6, 7)

      expect(buffer.size).toBe(3)
      expect(buffer.buffer.length).toBe(3 * 3)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        3, 4, 5,
        5, 6, 7
      ]))

      buffer.capacity = 1

      expect(buffer.size).toBe(1)
      expect(buffer.capacity).toBe(1)
      expect(buffer.buffer.length).toBe(1 * 3)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3
      ]))
    })

    it('throw if you trying to set a negative capacity', function () {
      const buffer = new FaceBuffer(5)

      expect(_ => buffer.capacity = -5).toThrow()
    })
  })

  describe('#size', function () {
    it('return the current size of the face buffer', function () {
      const buffer = new FaceBuffer(5)

      expect(buffer.size).toBe(0)
      expect(buffer.buffer.length).toBe(5 * 3)

      buffer.push(1, 2, 3)

      expect(buffer.size).toBe(1)
      expect(buffer.buffer.length).toBe(5 * 3)

      buffer.push(1, 2, 3)

      expect(buffer.size).toBe(2)
      expect(buffer.buffer.length).toBe(5 * 3)
    })

    it('does nothing if you set the size of the buffer to the current size', function () {
      const buffer = new FaceBuffer(5)
      const oldBuffer = buffer.buffer

      buffer.push(1, 2, 3)

      expect(buffer.size).toBe(1)
      expect(buffer.capacity).toBe(5)
      expect(buffer.buffer).toBe(oldBuffer)

      buffer.size = 1

      expect(buffer.size).toBe(1)
      expect(buffer.capacity).toBe(5)
      expect(buffer.buffer).toBe(oldBuffer)
    })

    it('allow to expand the size of the buffer by initializing null faces', function () {
      const buffer = new FaceBuffer(2)

      buffer.push(1, 2, 3)

      expect(buffer.buffer.length).toBe(2 * 3)
      expect(buffer.size).toBe(1)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        0, 0, 0
      ]))

      buffer.size = 4

      expect(buffer.capacity).toBe(4)
      expect(buffer.size).toBe(4)
      expect(buffer.buffer.length).toBe(4 * 3)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ]))
    })

    it('allow to reducing the size', function () {
      const buffer = new FaceBuffer(4)

      buffer.push(1, 2, 3)
      buffer.push(3, 4, 5)
      buffer.push(5, 6, 7)
      buffer.push(7, 8, 9)

      expect(buffer.size).toBe(4)
      expect(buffer.capacity).toBe(4)
      expect(buffer.buffer.length).toBe(4 * 3)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        3, 4, 5,
        5, 6, 7,
        7, 8, 9
      ]))

      buffer.size = 2

      expect(buffer.size).toBe(2)
      expect(buffer.capacity).toBe(4)
      expect(buffer.buffer.length).toBe(4 * 3)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        3, 4, 5,
        5, 6, 7,
        7, 8, 9
      ]))
    })

    it('reset next faces when the size is reduced and then expanded', function () {
      const buffer = new FaceBuffer(4)

      buffer.push(1, 2, 3)
      buffer.push(3, 4, 5)
      buffer.push(5, 6, 7)
      buffer.push(7, 8, 9)

      buffer.size = 2
      buffer.size = 3

      expect(buffer.size).toBe(3)
      expect(buffer.capacity).toBe(4)
      expect(buffer.buffer.length).toBe(4 * 3)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        3, 4, 5,
        0, 0, 0,
        7, 8, 9
      ]))
    })

    it('throw if you trying to set a negative size', function () {
      const buffer = new FaceBuffer(5)

      expect(_ => buffer.size = -5).toThrow()
    })
  })

  describe('#push', function () {
    it('allow to append a new face to the buffer', function () {
      const buffer = new FaceBuffer(3)

      expect(buffer.size).toBe(0)
      expect(buffer.buffer).toEqual(new Uint16Array([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ]))

      buffer.push(1, 2, 3)

      expect(buffer.size).toBe(1)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        0, 0, 0,
        0, 0, 0
      ]))
    })

    it('can be used multiple times', function () {
      const buffer = new FaceBuffer(3)

      expect(buffer.size).toBe(0)
      expect(buffer.buffer).toEqual(new Uint16Array([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ]))

      buffer.push(1, 2, 3)
      buffer.push(4, 5, 6)
      buffer.push(7, 8, 9)

      expect(buffer.size).toBe(3)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ]))
    })
  })

  describe('#set', function () {
    it('allow to change a face of the buffer', function () {
      const buffer = new FaceBuffer(3)

      buffer.push(1, 2, 3)
      buffer.push(4, 5, 6)
      buffer.push(7, 8, 9)

      expect(buffer.size).toBe(3)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ]))

      buffer.set(1, 3, 2, 1)

      expect(buffer.size).toBe(3)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        3, 2, 1,
        7, 8, 9
      ]))
    })

    it('expand the buffer size if necessary', function () {
      const buffer = new FaceBuffer(3)

      expect(buffer.size).toBe(0)
      expect(buffer.buffer).toEqual(new Uint16Array([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ]))

      buffer.set(1, 3, 2, 1)

      expect(buffer.size).toBe(2)
      expect(buffer.buffer).toEqual(new Uint16Array([
        0, 0, 0,
        3, 2, 1,
        0, 0, 0
      ]))
    })

    it('expand the buffer capacity if necessary', function () {
      const buffer = new FaceBuffer(2)

      expect(buffer.size).toBe(0)
      expect(buffer.buffer).toEqual(new Uint16Array([
        0, 0, 0,
        0, 0, 0
      ]))

      buffer.set(3, 3, 2, 1)

      expect(buffer.size).toBe(4)
      expect(buffer.buffer).toEqual(new Uint16Array([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        3, 2, 1
      ]))
    })
  })

  describe('#concat', function () {
    it('append the content of another buffer to the current buffer', function () {
      const base = new FaceBuffer(3)
      const other = new FaceBuffer(5)

      base.push(1, 2, 3).push(3, 4, 5)
      other.push(5, 6, 7).push(7, 8, 9).push(10, 11, 12)

      base.concat(other)

      expect(base.size).toBe(5)
      expect(base.capacity).toBe(5)
      expect(base.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        3, 4, 5,
        5, 6, 7,
        7, 8, 9,
        10, 11, 12
      ]))
    })
  })

  describe('#copyWithin', function () {
    it('copy some content within the buffer', function () {
      const buffer = new FaceBuffer(5).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)
                                    .push(7, 8, 9).push(10, 11, 12)

      buffer.copyWithin(2, 1, 3)

      expect(buffer.size).toBe(5)
      expect(buffer.capacity).toBe(5)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        3, 4, 5,
        3, 4, 5,
        5, 6, 7,
        10, 11, 12
      ]))
    })

    it('do not extend the capacity nor the size of the buffer', function () {
      const buffer = new FaceBuffer(5).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)
                                    .push(7, 8, 9).push(10, 11, 12)

      buffer.copyWithin(2, 1, 5)

      expect(buffer.size).toBe(5)
      expect(buffer.capacity).toBe(5)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        3, 4, 5,
        3, 4, 5,
        5, 6, 7,
        7, 8, 9
      ]))
    })

    it('allows you to use negative indexes', function () {
      const buffer = new FaceBuffer(5).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)
                                    .push(7, 8, 9).push(10, 11, 12)

      buffer.copyWithin(-2, -4, -1)

      expect(buffer.size).toBe(5)
      expect(buffer.capacity).toBe(5)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        3, 4, 5,
        5, 6, 7,
        3, 4, 5,
        5, 6, 7
      ]))
    })
  })

  describe('#entries', function () {
    it('allows to iterate over each entry of the buffer', function () {
      const buffer = new FaceBuffer(5).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      expect([...buffer.entries()]).toEqual([
        [0, [1, 2, 3]],
        [1, [3, 4, 5]],
        [2, [5, 6, 7]]
      ])
    })
  })

  describe('#every', function () {
    it('allows you to check if every face of the buffer comply to a given insertion', function () {
      const buffer = new FaceBuffer(5).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      expect(buffer.every((face, index) => face[0] == 1)).toBeFalsy()
      expect(buffer.every((face, index) => face[1] % 2 == 0)).toBeTruthy()
    })

    it('iterate over all the faces until you return false', function () {
      const buffer = new FaceBuffer(5).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      const values = []

      buffer.every((face, index) => {
        values.push([index, face])
        return index < 1
      })

      expect(values).toEqual([
        [0, [1, 2, 3]],
        [1, [3, 4, 5]]
      ])
    })

    it('iterate over all the faces if you always return true', function () {
      const buffer = new FaceBuffer(5).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      const values = []

      buffer.every((face, index) => {
        values.push([index, face])
        return true
      })

      expect(values).toEqual([
        [0, [1, 2, 3]],
        [1, [3, 4, 5]],
        [2, [5, 6, 7]]
      ])
    })
  })

  describe('#has', function () {
    it('return true if a face exists at the given index', function () {
      const buffer = new FaceBuffer(5).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      for (let index = 0; index < buffer.size; ++index) {
        expect(buffer.has(index)).toBeTruthy()
      }
    })

    it('return false if no faces exists at the given index', function () {
      const buffer = new FaceBuffer(5).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      expect(buffer.has(3)).toBeFalsy()
      expect(buffer.has(4)).toBeFalsy()
      expect(buffer.has(5)).toBeFalsy()
      expect(buffer.has(6)).toBeFalsy()
      expect(buffer.has(-3)).toBeFalsy()
    })
  })

  describe('#get', function () {
    it('return a face of the buffer', function () {
      const buffer = new FaceBuffer(5).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      expect(buffer.get(0)).toEqual([1, 2, 3])
      expect(buffer.get(1)).toEqual([3, 4, 5])
      expect(buffer.get(2)).toEqual([5, 6, 7])
    })
  })

  describe('#face', function () {
    it('iterate over a face of the buffer', function () {
      const buffer = new FaceBuffer(5).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      expect([...buffer.face(0)]).toEqual([1, 2, 3])
      expect([...buffer.face(1)]).toEqual([3, 4, 5])
      expect([...buffer.face(2)]).toEqual([5, 6, 7])
    })
  })

  describe('#getVertex', function () {
    it('return a vertex of a face of the buffer', function () {
      const buffer = new FaceBuffer(5).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      expect([
        buffer.getVertex(0, 0),
        buffer.getVertex(0, 1),
        buffer.getVertex(0, 2)
      ]).toEqual([1, 2, 3])

      expect([
        buffer.getVertex(2, 0),
        buffer.getVertex(2, 1),
        buffer.getVertex(2, 2)
      ]).toEqual([5, 6, 7])
    })
  })

  describe('#fill', function () {
    it('fill faces with a given value', function () {
      const buffer = new FaceBuffer(5).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      buffer.fill(0, 1, 3)

      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ]))
    })

    it('allows you to use negative indexes', function () {
      const buffer = new FaceBuffer(5).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      buffer.fill(0, -3, -1)

      expect(buffer.buffer).toEqual(new Uint16Array([
        0, 0, 0,
        0, 0, 0,
        5, 6, 7,
        0, 0, 0,
        0, 0, 0
      ]))
    })
  })

  describe('#delete', function () {
    it('allow to remove a face from a buffer', function () {
      const buffer = new FaceBuffer(3).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      expect(buffer.size).toBe(3)

      buffer.delete(1)

      expect(buffer.size).toBe(2)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        5, 6, 7,
        5, 6, 7
      ]))
    })

    it('allow to remove a multiple face from a buffer', function () {
      const buffer = new FaceBuffer(3).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)
                                      .push(7, 8, 9)

      expect(buffer.size).toBe(4)

      buffer.delete(1, 2)

      expect(buffer.size).toBe(2)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        7, 8, 9,
        5, 6, 7,
        7, 8, 9
      ]))
    })
  })

  describe('#equals', function () {
    it('return true if the current buffer instance is passed', function () {
      const buffer = new FaceBuffer(3).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      expect(buffer.equals(buffer)).toBeTruthy()
    })

    it('return false if null is passed', function () {
      const buffer = new FaceBuffer(3).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      expect(buffer.equals(null)).toBeFalsy()
      expect(buffer.equals(undefined)).toBeFalsy()
    })

    it('return false if any other object is passed', function () {
      const buffer = new FaceBuffer(3).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      expect(buffer.equals("test")).toBeFalsy()
      expect(buffer.equals(5)).toBeFalsy()
      expect(buffer.equals({ })).toBeFalsy()
    })

    it('return true if both contents are equals', function () {
      const buffer = new FaceBuffer(3).push(1, 2, 3).push(5, 6, 7)
      const other = new FaceBuffer(3).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)
                                                                 .delete(1)

      expect(buffer.equals(other)).toBeTruthy()
    })

    it('return false if both contents are not equals', function () {
      const buffer = new FaceBuffer(3).push(1, 2, 3).push(5, 6, 7)
      const other = new FaceBuffer(3).push(1, 2, 3).push(3, 4, 5)

      expect(buffer.equals(other)).toBeFalsy()
    })
  })

  describe('#clear', function () {
    it('remove all faces of the buffer', function () {
      const buffer = new FaceBuffer(3).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)

      expect(buffer.size).toBe(3)

      buffer.clear()

      expect(buffer.size).toBe(0)
      expect(buffer.buffer).toEqual(new Uint16Array([
        1, 2, 3,
        3, 4, 5,
        5, 6, 7
      ]))
    })
  })

  describe('#contextualise', function () {
    it('wrap the current descriptor into a GLFaceBuffer instance', function () {
      const context = createWebGLContext(jest)
      const buffer = new FaceBuffer(3).push(1, 2, 3).push(3, 4, 5).push(5, 6, 7)
      const contextualisation = buffer.contextualise(context)
      expect(contextualisation).toBeInstanceOf(GLFaceBuffer)
      expect(contextualisation.descriptor).toBe(buffer)
    })
  })
})
