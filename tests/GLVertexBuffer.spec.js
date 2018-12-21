/** eslint-env jest */

import { GLContext } from '@cedric-demongivert/gl-tool-core'

import { VertexBuffer, GLVertexBuffer } from '@library'
import { createWebGLContext } from './createWebGLContext'

describe('GLVertexBuffer', function () {
  describe('#bound', function () {
    it('return true if the current buffer is bound to its endpoint', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new VertexBuffer()
      const contextualisation = new GLVertexBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(buffer)
      contextualisation.synchronize()

      context.getParameter.mockReturnValue(buffer)

      expect(contextualisation.bound).toBeTruthy()
      expect(context.getParameter).toHaveBeenCalledWith(
        context.ARRAY_BUFFER_BINDING
      )
    })

    it('return false if the buffer was not created', function () {
      const context = createWebGLContext(jest)
      const descriptor = new VertexBuffer()
      const contextualisation = new GLVertexBuffer(context, descriptor)

      expect(contextualisation.buffer).toBeNull()
      expect(contextualisation.bound).toBeFalsy()
    })

    it('return false if the buffer was not bound', function () {
      const context = createWebGLContext(jest)
      const descriptor = new VertexBuffer()
      const contextualisation = new GLVertexBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(Symbol())
      contextualisation.synchronize()

      context.getParameter.mockReturnValue(Symbol())

      expect(contextualisation.bound).toBeFalsy()
      expect(context.getParameter).toHaveBeenCalledWith(
        context.ARRAY_BUFFER_BINDING
      )
    })
  })

  describe('#bind', function () {
    it('it bind the current buffer to its endpoint', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new VertexBuffer()
      const contextualisation = new GLVertexBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(buffer)
      contextualisation.synchronize()
      context.bindBuffer.mockClear()

      contextualisation.bind()

      expect(context.bindBuffer).toHaveBeenCalledWith(
        context.ARRAY_BUFFER,
        buffer
      )
    })
  })

  describe('#synchronize', function () {
    it('it bind the current buffer to its endpoint and upload its descriptor content', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new VertexBuffer()
      const contextualisation = new GLVertexBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(buffer)
      contextualisation.synchronize()

      expect(context.bindBuffer).toHaveBeenCalledWith(
        context.ARRAY_BUFFER,
        buffer
      )

      expect(context.bufferData).toHaveBeenCalledWith(
        context.ARRAY_BUFFER,
        descriptor.buffer,
        context.STATIC_DRAW
      )

      expect(context.synchronized).toBeTruthy()
    })
  })

  describe('#size', function () {
    it('it return the size of the bound buffer', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new VertexBuffer()
      const contextualisation = new GLVertexBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(buffer)
      contextualisation.synchronize()

      context.getBufferParameter.mockReturnValue(25)

      expect(contextualisation.size).toBe(25)
      expect(context.getBufferParameter).toHaveBeenCalledWith(
        context.ARRAY_BUFFER,
        context.BUFFER_SIZE
      )
    })
  })

  describe('#data', function () {
    it('call webgl bufferData function', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new VertexBuffer()
      const contextualisation = new GLVertexBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(buffer)
      contextualisation.synchronize()

      contextualisation.data(...[1, 2, 3])

      expect(context.bufferData).toHaveBeenCalledWith(
        context.ARRAY_BUFFER,
        ...[1, 2, 3]
      )
    })
  })

  describe('#subdata', function () {
    it('call webgl bufferSubData function', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new VertexBuffer()
      const contextualisation = new GLVertexBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(buffer)
      contextualisation.synchronize()

      contextualisation.subdata(...[1, 2, 3])

      expect(context.bufferSubData).toHaveBeenCalledWith(
        context.ARRAY_BUFFER,
        ...[1, 2, 3]
      )
    })
  })

  describe('#usage', function () {
    it('it return the usage hint of the bound buffer', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new VertexBuffer()
      const contextualisation = new GLVertexBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(buffer)
      contextualisation.synchronize()

      context.getBufferParameter.mockReturnValue(context.STATIC_DRAW)

      expect(contextualisation.usage).toBe(context.STATIC_DRAW)
      expect(context.getBufferParameter).toHaveBeenCalledWith(
        context.ARRAY_BUFFER,
        context.BUFFER_USAGE
      )
    })
  })
})
