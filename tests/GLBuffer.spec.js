/** eslint-env jest */

import { GLContext } from '@cedric-demongivert/gl-tool-core'

import { Buffer, GLBuffer } from '@library'
import { createWebGLContext } from './createWebGLContext'

describe('GLBuffer', function () {
  describe('#constructor', function () {
    it('instantiate a new unsyncrhonized contextualisation of a given Buffer descriptor', function () {
      const context = createWebGLContext(jest)
      const buffer = new Buffer()
      const glbuffer = new GLBuffer(context, buffer)

      expect(glbuffer.descriptor).toBe(buffer)
      expect(glbuffer.context).toBe(GLContext.of(context))
      expect(glbuffer.synchronized).toBeFalsy()
    })
  })

  describe('#synchronized', function () {
    it('return true if the current contextualised instance is synchronized with its descriptor', function () {
      const context = createWebGLContext(jest)
      const buffer = new Buffer()
      const glbuffer = new GLBuffer(context, buffer)

      expect(glbuffer.synchronized).toBeFalsy()
    })

    it('allow to change the synchronization state of the contextualised instance', function () {
      const context = createWebGLContext(jest)
      const buffer = new Buffer()
      const glbuffer = new GLBuffer(context, buffer)

      glbuffer.synchronized = true

      expect(glbuffer.synchronized).toBeTruthy()
    })
  })

  describe('#synchronize', function () {
    it('create the underlying buffer if the buffer was not already initialized', function () {
      const context = createWebGLContext(jest)
      const bufferReference = Symbol()
      const buffer = new Buffer()
      const glbuffer = new GLBuffer(context, buffer)

      context.createBuffer.mockReturnValue(bufferReference)

      expect(glbuffer.buffer).toBeNull()

      glbuffer.synchronize()

      expect(glbuffer.buffer).toBe(bufferReference)
    })

    it('does nothing if the buffer was already initialized', function () {
      const context = createWebGLContext(jest)
      const bufferReference = Symbol()
      const buffer = new Buffer()
      const glbuffer = new GLBuffer(context, buffer)

      context.createBuffer.mockReturnValue(bufferReference)
      glbuffer.synchronize()
      glbuffer.synchronize()

      expect(context.createBuffer).toHaveBeenCalledTimes(1)
    })
  })

  describe('#bound', function () {
    it('throw in waiting of an implementation', function () {
      const context = createWebGLContext(jest)
      const buffer = new Buffer()
      const glbuffer = new GLBuffer(context, buffer)

      expect(_ => glbuffer.bound).toThrow()
    })
  })

  describe('#bind', function () {
    it('throw in waiting of an implementation', function () {
      const context = createWebGLContext(jest)
      const buffer = new Buffer()
      const glbuffer = new GLBuffer(context, buffer)

      expect(_ => glbuffer.bind()).toThrow()
    })
  })

  describe('#size', function () {
    it('throw in waiting of an implementation', function () {
      const context = createWebGLContext(jest)
      const buffer = new Buffer()
      const glbuffer = new GLBuffer(context, buffer)

      expect(_ => glbuffer.size).toThrow()
    })
  })

  describe('#usage', function () {
    it('throw in waiting of an implementation', function () {
      const context = createWebGLContext(jest)
      const buffer = new Buffer()
      const glbuffer = new GLBuffer(context, buffer)

      expect(_ => glbuffer.usage).toThrow()
    })
  })

  describe('#destroy', function () {
    it('release the underlying buffer', function () {
      const context = createWebGLContext(jest)
      const bufferReference = Symbol()
      const buffer = new Buffer()
      const glbuffer = new GLBuffer(context, buffer)

      context.createBuffer.mockReturnValue(bufferReference)
      glbuffer.synchronize()

      expect(glbuffer.buffer).toBe(bufferReference)

      glbuffer.destroy()

      expect(glbuffer.buffer).toBeNull()
      expect(context.deleteBuffer).toHaveBeenCalledWith(bufferReference)
    })
  })
})
