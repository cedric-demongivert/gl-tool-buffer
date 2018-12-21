/** eslint-env jest */

import { GLContext } from '@cedric-demongivert/gl-tool-core'

import { FaceBuffer, GLFaceBuffer } from '@library'
import { createWebGLContext } from './createWebGLContext'

describe('GLFaceBuffer', function () {
  describe('#bound', function () {
    it('return true if the current buffer is bound to its endpoint', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new FaceBuffer()
      const contextualisation = new GLFaceBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(buffer)
      contextualisation.synchronize()

      context.getParameter.mockReturnValue(buffer)

      expect(contextualisation.bound).toBeTruthy()
      expect(context.getParameter).toHaveBeenCalledWith(
        context.ELEMENT_ARRAY_BUFFER_BINDING
      )
    })

    it('return false if the buffer was not created', function () {
      const context = createWebGLContext(jest)
      const descriptor = new FaceBuffer()
      const contextualisation = new GLFaceBuffer(context, descriptor)

      expect(contextualisation.buffer).toBeNull()
      expect(contextualisation.bound).toBeFalsy()
    })

    it('return false if the buffer was not bound', function () {
      const context = createWebGLContext(jest)
      const descriptor = new FaceBuffer()
      const contextualisation = new GLFaceBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(Symbol())
      contextualisation.synchronize()

      context.getParameter.mockReturnValue(Symbol())

      expect(contextualisation.bound).toBeFalsy()
      expect(context.getParameter).toHaveBeenCalledWith(
        context.ELEMENT_ARRAY_BUFFER_BINDING
      )
    })
  })

  describe('#bind', function () {
    it('it bind the current buffer to its endpoint', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new FaceBuffer()
      const contextualisation = new GLFaceBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(buffer)
      contextualisation.synchronize()
      context.bindBuffer.mockClear()

      contextualisation.bind()

      expect(context.bindBuffer).toHaveBeenCalledWith(
        context.ELEMENT_ARRAY_BUFFER,
        buffer
      )
    })
  })

  describe('#synchronize', function () {
    it('it bind the current buffer to its endpoint and upload its descriptor content', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new FaceBuffer()
      const contextualisation = new GLFaceBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(buffer)
      contextualisation.synchronize()

      expect(context.bindBuffer).toHaveBeenCalledWith(
        context.ELEMENT_ARRAY_BUFFER,
        buffer
      )

      expect(context.bufferData).toHaveBeenCalledWith(
        context.ELEMENT_ARRAY_BUFFER,
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
      const descriptor = new FaceBuffer()
      const contextualisation = new GLFaceBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(buffer)
      contextualisation.synchronize()

      context.getBufferParameter.mockReturnValue(25)

      expect(contextualisation.size).toBe(25)
      expect(context.getBufferParameter).toHaveBeenCalledWith(
        context.ELEMENT_ARRAY_BUFFER,
        context.BUFFER_SIZE
      )
    })
  })

  describe('#usage', function () {
    it('it return the usage hint of the bound buffer', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new FaceBuffer()
      const contextualisation = new GLFaceBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(buffer)
      contextualisation.synchronize()

      context.getBufferParameter.mockReturnValue(context.STATIC_DRAW)

      expect(contextualisation.usage).toBe(context.STATIC_DRAW)
      expect(context.getBufferParameter).toHaveBeenCalledWith(
        context.ELEMENT_ARRAY_BUFFER,
        context.BUFFER_USAGE
      )
    })
  })
})
