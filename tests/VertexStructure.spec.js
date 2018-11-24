/** eslint-env jest */

import { VertexFieldType, VertexStructure } from '@library'

describe('VertexStructure', function () {
  describe('#constructor', function () {
    it('it allows to instanciate a new vertex structure definition', function () {
      const structure = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect([... structure.fields()]).toEqual([
        'identifier', 'color', 'transformation', 'toughness'
      ])
      expect(structure.typeof('identifier')).toBe(VertexFieldType.BYTE)
      expect(structure.typeof('color')).toBe(VertexFieldType.FLOAT_VEC3)
      expect(structure.typeof('transformation')).toBe(VertexFieldType.FLOAT_MAT4)
      expect(structure.typeof('toughness')).toBe(VertexFieldType.FLOAT)
    })

    it('it throw an error if a name is given to two different fields', function () {
      expect(_ => new VertexStructure([
        ['transformation', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])).toThrow()
    })
  })

  describe('#size', function () {
    it('return the entire size of the structure in bytes', function () {
      const structure = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(structure.size).toBe([
        VertexFieldType.BYTE,
        VertexFieldType.FLOAT_VEC3,
        VertexFieldType.FLOAT_MAT4,
        VertexFieldType.FLOAT
      ].map(VertexFieldType.sizeof).reduce((a, b) => a + b))
    })
  })

  describe('#fieldCount', function () {
    it('return the number of fields in the structure', function () {
      const structure = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(structure.fieldCount).toBe(4)
    })
  })

  describe('#startof', function () {
    it('return a field starting index in the structure (inclusive)', function () {
      const structure = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(structure.startof('identifier')).toBe(0)
      expect(structure.startof('color')).toBe(
        VertexFieldType.sizeof(VertexFieldType.BYTE)
      )
      expect(structure.startof('transformation')).toBe([
        VertexFieldType.BYTE,
        VertexFieldType.FLOAT_VEC3,
      ].map(VertexFieldType.sizeof).reduce((a, b) => a + b))
      expect(structure.startof('toughness')).toBe([
        VertexFieldType.BYTE,
        VertexFieldType.FLOAT_VEC3,
        VertexFieldType.FLOAT_MAT4
      ].map(VertexFieldType.sizeof).reduce((a, b) => a + b))
    })
  })

  describe('#endof', function () {
    it('return a field ending index in the structure (exclusive)', function () {
      const structure = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(structure.endof('identifier')).toBe(VertexFieldType.sizeof(VertexFieldType.BYTE))
      expect(structure.endof('color')).toBe([
        VertexFieldType.BYTE,
        VertexFieldType.FLOAT_VEC3,
      ].map(VertexFieldType.sizeof).reduce((a, b) => a + b))
      expect(structure.endof('transformation')).toBe([
        VertexFieldType.BYTE,
        VertexFieldType.FLOAT_VEC3,
        VertexFieldType.FLOAT_MAT4
      ].map(VertexFieldType.sizeof).reduce((a, b) => a + b))
      expect(structure.endof('toughness')).toBe(structure.size)
    })
  })

  describe('#sizeof', function () {
    it('return the size of a field in bytes', function () {
      const structure = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(structure.sizeof('identifier')).toBe(
        VertexFieldType.sizeof(VertexFieldType.BYTE)
      )
      expect(structure.sizeof('color')).toBe(
        VertexFieldType.sizeof(VertexFieldType.FLOAT_VEC3)
      )
      expect(structure.sizeof('transformation')).toBe(
        VertexFieldType.sizeof(VertexFieldType.FLOAT_MAT4)
      )
      expect(structure.sizeof('toughness')).toBe(
        VertexFieldType.sizeof(VertexFieldType.FLOAT)
      )
    })
  })

  describe('#typeof', function () {
    it('return the type of a field', function () {
      const structure = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(structure.typeof('identifier')).toBe(
        VertexFieldType.BYTE
      )
      expect(structure.typeof('color')).toBe(
        VertexFieldType.FLOAT_VEC3
      )
      expect(structure.typeof('transformation')).toBe(
        VertexFieldType.FLOAT_MAT4
      )
      expect(structure.typeof('toughness')).toBe(
        VertexFieldType.FLOAT
      )
    })
  })

  describe('#field', function () {
    it('return the name of a field by its index', function () {
      const structure = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(structure.field(0)).toBe('identifier')
      expect(structure.field(1)).toBe('color')
      expect(structure.field(2)).toBe('transformation')
      expect(structure.field(3)).toBe('toughness')
    })
  })

  describe('#equals', function () {
    it('return true if the current instance was given', function () {
      const structure = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(structure.equals(structure)).toBeTruthy()
    })

    it('return false if null was given', function () {
      const structure = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(structure.equals(null)).toBeFalsy()
      expect(structure.equals(undefined)).toBeFalsy()
    })

    it('return false if another type of value was given', function () {
      const structure = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(structure.equals(2)).toBeFalsy()
      expect(structure.equals('plopl')).toBeFalsy()
      expect(structure.equals({})).toBeFalsy()
    })

    it('return false if both structures does not have the same size', function () {
      const left = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      const right = new VertexStructure([
        ['identifier', VertexFieldType.INT],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(left.equals(right)).toBeFalsy()
    })

    it('return false if both structures does not have the same number of fields', function () {
      const left = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4]
      ])

      const right = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(left.equals(right)).toBeFalsy()
    })

    it('return false if both structures does not have fields with same names', function () {
      const left = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['pouet', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      const right = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(left.equals(right)).toBeFalsy()
    })

    it('return false if both structures does not have fields with same types', function () {
      const left = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT3],
        ['toughness', VertexFieldType.FLOAT]
      ])

      const right = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(left.equals(right)).toBeFalsy()
    })

    it('return true if both structures are equals', function () {
      const left = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      const right = new VertexStructure([
        ['identifier', VertexFieldType.BYTE],
        ['color', VertexFieldType.FLOAT_VEC3],
        ['transformation', VertexFieldType.FLOAT_MAT4],
        ['toughness', VertexFieldType.FLOAT]
      ])

      expect(left.equals(right)).toBeTruthy()
    })
  })
})
