/** eslint-env jest */

import { VertexFieldType } from '@library'
import { createWebGLContext } from './createWebGLContext'

describe('VertexFieldType', function () {
  describe('#toString', function () {
    it('return the label associated with the given value', function () {
      for (const key of [
        'BYTE',
        'UNSIGNED_BYTE',
        'INT',
        'INT_VEC2',
        'INT_VEC3',
        'INT_VEC4',
        'UNSIGNED_INT',
        'SHORT',
        'FLOAT',
        'FLOAT_VEC2',
        'FLOAT_VEC3',
        'FLOAT_VEC4',
        'FLOAT_MAT2',
        'FLOAT_MAT3',
        'FLOAT_MAT4'
      ]) {
        expect(VertexFieldType.toString(VertexFieldType[key])).toBe(key)
      }
    })

    it('throw an error if an invalid constant was passed', function () {
      expect(_ => VertexFieldType.toString(-150)).toThrow()
    })
  })

  describe('#contextualise', function () {
    it('return the contextualized constant for the given context', function () {
      const context = createWebGLContext(jest)

      for (const key of [
        'BYTE',
        'UNSIGNED_BYTE',
        'INT',
        'INT_VEC2',
        'INT_VEC3',
        'INT_VEC4',
        'UNSIGNED_INT',
        'SHORT',
        'FLOAT',
        'FLOAT_VEC2',
        'FLOAT_VEC3',
        'FLOAT_VEC4',
        'FLOAT_MAT2',
        'FLOAT_MAT3',
        'FLOAT_MAT4'
      ]) {
        expect(
          VertexFieldType.contextualise(context, VertexFieldType[key])
        ).toBe(context[key])
      }
    })

    it('throw an error if an invalid constant was passed', function () {
      const context = createWebGLContext(jest)

      expect(_ => VertexFieldType.contextualise(context, -150)).toThrow()
    })
  })

  describe('#sizeof', function () {
    it('return the size of each type of field', function () {
      const context = createWebGLContext(jest)

      for (const key of [
        'BYTE',
        'UNSIGNED_BYTE',
        'INT',
        'INT_VEC2',
        'INT_VEC3',
        'INT_VEC4',
        'UNSIGNED_INT',
        'SHORT',
        'FLOAT',
        'FLOAT_VEC2',
        'FLOAT_VEC3',
        'FLOAT_VEC4',
        'FLOAT_MAT2',
        'FLOAT_MAT3',
        'FLOAT_MAT4'
      ]) {
        expect(
          VertexFieldType.sizeof(VertexFieldType[key])
        ).not.toBeNull()
      }
    })

    it('throw an error if an invalid constant was passed', function () {
      expect(_ => VertexFieldType.sizeof(-150)).toThrow()
    })
  })
})
