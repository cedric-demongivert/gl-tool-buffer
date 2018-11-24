/** eslint-env jest */

import { GLContext } from '@cedric-demongivert/gl-tool-core'

import {
  VertexStructure,
  VertexFieldType,
  VertexStructureBuffer,
  GLVertexStructureBuffer
} from '@library'

import { createWebGLContext } from './createWebGLContext'

describe('GLVertexStructureBuffer', function () {
  const structure = new VertexStructure([
    ['identifier', VertexFieldType.BYTE],
    ['color', VertexFieldType.FLOAT_VEC3],
    ['transformation', VertexFieldType.FLOAT_MAT4],
    ['toughness', VertexFieldType.FLOAT]
  ])

  describe('#bound', function () {
    it('return true if its underlying buffer is bound to this endpoint', function () {
      const context = createWebGLContext(jest)
      const vertexBuffer = Symbol()
      const descriptor = new VertexStructureBuffer(structure)
      const contextualisation = new GLVertexStructureBuffer(context, descriptor)

      context.createBuffer.mockReturnValueOnce(vertexBuffer)
      contextualisation.synchronize()

      context.getParameter.mockReturnValue(vertexBuffer)

      expect(contextualisation.bound).toBeTruthy()
    })

    it('return false if the buffer was not created', function () {
      const context = createWebGLContext(jest)
      const descriptor = new VertexStructureBuffer(structure)
      const contextualisation = new GLVertexStructureBuffer(context, descriptor)

      expect(contextualisation.buffer).toBeNull()
      expect(contextualisation.bound).toBeFalsy()
    })

    it('return false if the buffer was not bound', function () {
      const context = createWebGLContext(jest)
      const descriptor = new VertexStructureBuffer(structure)
      const contextualisation = new GLVertexStructureBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(Symbol())
      contextualisation.synchronize()

      context.getParameter.mockReturnValue(Symbol())

      expect(contextualisation.bound).toBeFalsy()
    })
  })

  describe('#bind', function () {
    it('it bind the current buffer to its endpoint', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new VertexStructureBuffer(structure)
      const contextualisation = new GLVertexStructureBuffer(context, descriptor)

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
    it('it call the underying buffer synchronize function and then set synchronized to true', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new VertexStructureBuffer(structure)
      const contextualisation = new GLVertexStructureBuffer(context, descriptor)

      contextualisation.vertexBuffer.synchronize = jest.fn()
      contextualisation.synchronize()

      expect(contextualisation.vertexBuffer.synchronize).toHaveBeenCalled()
      expect(contextualisation.synchronized).toBeTruthy()
    })
  })

  describe('#size', function () {
    it('it return the size of the bound buffer', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new VertexStructureBuffer(structure)
      const contextualisation = new GLVertexStructureBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(buffer)
      contextualisation.synchronize()

      context.getBufferParameter.mockReturnValue(25)

      expect(contextualisation.size).toBe(25)
    })
  })

  describe('#data', function () {
    it('call the underying buffer data function', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new VertexStructureBuffer(structure)
      const contextualisation = new GLVertexStructureBuffer(context, descriptor)

      contextualisation.vertexBuffer.data = jest.fn()
      contextualisation.synchronize()

      contextualisation.data(...[1, 2, 3])

      expect(contextualisation.vertexBuffer.data).toHaveBeenCalledWith(
        ...[1, 2, 3]
      )
    })
  })

  describe('#subdata', function () {
    it('call the underying buffer subdata function', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new VertexStructureBuffer(structure)
      const contextualisation = new GLVertexStructureBuffer(context, descriptor)

      contextualisation.vertexBuffer.subdata = jest.fn()
      contextualisation.synchronize()

      contextualisation.subdata(...[1, 2, 3])

      expect(contextualisation.vertexBuffer.subdata).toHaveBeenCalledWith(
        ...[1, 2, 3]
      )
    })
  })

  describe('#usage', function () {
    it('it return the usage hint of the bound buffer', function () {
      const context = createWebGLContext(jest)
      const buffer = Symbol()
      const descriptor = new VertexStructureBuffer(structure)
      const contextualisation = new GLVertexStructureBuffer(context, descriptor)

      context.createBuffer.mockReturnValue(buffer)
      contextualisation.synchronize()

      context.getBufferParameter.mockReturnValue(context.STATIC_DRAW)

      expect(contextualisation.usage).toBe(context.STATIC_DRAW)
    })
  })

  describe('#uploadTo', function () {
    it('it throw', function () {
      const context = createWebGLContext(jest)
      const descriptor = new VertexStructureBuffer(structure)
      const contextualisation = new GLVertexStructureBuffer(context, descriptor)

      expect(_ => contextualisation.uploadTo()).toThrow()
    })
  })

  describe('#destroy', function () {
    it('it also destroy its underlying vertex buffer', function () {
      const context = createWebGLContext(jest)
      const descriptor = new VertexStructureBuffer(structure)
      const contextualisation = new GLVertexStructureBuffer(context, descriptor)
      const vertexBuffer = contextualisation.vertexBuffer

      vertexBuffer.destroy = jest.fn()

      contextualisation.destroy()

      expect(vertexBuffer.destroy).toHaveBeenCalled()
    })
  })
})
