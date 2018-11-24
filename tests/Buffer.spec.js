/** eslint-env jest */

import { Buffer, BufferUsage } from '@library'
import { createWebGLContext } from './createWebGLContext'

describe('Buffer', function () {
  describe('#constructor', function () {
    it('instantiate an empty STATIC_DRAW buffer by default', function () {
      expect(new Buffer().usage).toBe(BufferUsage.STATIC_DRAW)
    })

    it('allows to specify the buffer usage hint at instantiation', function () {
      expect(new Buffer(BufferUsage.STREAM_DRAW).usage).toBe(
        BufferUsage.STREAM_DRAW
      )
    })
  })

  describe('#usage', function () {
    it('return the current usage hint of the buffer', function () {
      expect(new Buffer().usage).toBe(BufferUsage.STATIC_DRAW)
    })

    it('allows to change the usage hint of the buffer', function () {
      const buffer = new Buffer()

      buffer.usage = BufferUsage.STREAM_DRAW

      expect(buffer.usage).toBe(BufferUsage.STREAM_DRAW)
    })
  })

  describe('#commit', function () {
    it('mark all the contextualisation of this buffer as unsynchronized', function () {
      const contexts = []

      for (let index = 0; index < 10; ++index) contexts.push(
        createWebGLContext(jest)
      )

      const buffer = new Buffer()

      for (const context of contexts) {
        buffer.contextualisation(context).synchronized = true
      }

      buffer.commit()

      for (const context of contexts) {
        expect(buffer.contextualisation(context).synchronized).toBeFalsy()
      }
    })
  })
})
