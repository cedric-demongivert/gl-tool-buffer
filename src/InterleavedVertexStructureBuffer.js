import { upperFirst } from 'lodash'

import { STATIC_DRAW } from './BufferUsage'
import { VertexStructureBuffer } from './VertexStructureBuffer'
import * as VertexFieldType from './VertexFieldType'

import { GLInterleavedVertexStructureBuffer } from './GLInterleavedVertexStructureBuffer'

const ACCESSORS_FACTORIES = new Map()

function AccessorFactory (type) {
  return function (factory) {
    ACCESSORS_FACTORIES.set(type, factory)
    return factory
  }
}

function define (instance, name, callback) {
  Object.defineProperty(instance, name, {
    value: callback,
    writable: false,
    configurable: false
  })
}

AccessorFactory(VertexFieldType.BYTE)(
  function configureByteField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, value) {
        this.vertexBuffer.setByte(
          this.format.startof(name) + this.format.size * index,
          value
        )

        return this
    })

    define(instance, `get${upperFirst(name)}`, function (index) {
      return this.vertexBuffer.getByte(
        this.format.startof(name) + this.format.size * index
      )
    })
  }
)

AccessorFactory(VertexFieldType.UNSIGNED_BYTE)(
  function configureUnsignedByteField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, value) {
      this.vertexBuffer.setUnsignedByte(
        this.format.startof(name) + this.format.size * index,
        value
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index) {
      return this.vertexBuffer.getUnsignedByte(
        this.format.startof(name) + this.format.size * index,
      )
    })
  }
)

AccessorFactory(VertexFieldType.INT)(
  function configureIntField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, value) {
      this.vertexBuffer.setInt(
        this.format.startof(name) + this.format.size * index,
        value
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index) {
      return this.vertexBuffer.getInt(
        this.format.startof(name) + this.format.size * index
      )
    })
  }
)

AccessorFactory(VertexFieldType.INT_VEC2)(
  function configure2IntVectorField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, x, y) {
      this.vertexBuffer.set2IntVector(
        this.format.startof(name) + this.format.size * index,
        x, y
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, component) {
      return this.vertexBuffer.getIntVector(
        this.format.startof(name) + this.format.size * index,
        component
      )
    })
  }
)

AccessorFactory(VertexFieldType.INT_VEC3)(
  function configure3IntVectorField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, x, y, z) {
      this.vertexBuffer.set3IntVector(
        this.format.startof(name) + this.format.size * index,
        x, y, z
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, component) {
      return this.vertexBuffer.getIntVector(
        this.format.startof(name) + this.format.size * index,
        component
      )
    })
  }
)

AccessorFactory(VertexFieldType.INT_VEC4)(
  function configure4IntVectorField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, x, y, z, w) {
      this.vertexBuffer.set4IntVector(
        this.format.startof(name) + this.format.size * index,
        x, y, z, w
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, component) {
      return this.vertexBuffer.getIntVector(
        this.format.startof(name) + this.format.size * index,
        component
      )
    })
  }
)

AccessorFactory(VertexFieldType.UNSIGNED_INT)(
  function configureUnsignedIntField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, value) {
      this.vertexBuffer.setUnsignedInt(
        this.format.startof(name) + this.format.size * index,
        value
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index) {
      return this.vertexBuffer.getUnsignedInt(
        this.format.startof(name) + this.format.size * index
      )
    })
  }
)

AccessorFactory(VertexFieldType.SHORT)(
  function configureShortField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, value) {
      this.vertexBuffer.setShort(
        this.format.startof(name) + this.format.size * index,
        value
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index) {
      return this.vertexBuffer.getShort(
        this.format.startof(name) + this.format.size * index
      )
    })
  }
)

AccessorFactory(VertexFieldType.FLOAT)(
  function configureFloatField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, value) {
      this.vertexBuffer.setFloat(
        this.format.startof(name) + this.format.size * index,
        value
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index) {
      return this.vertexBuffer.getFloat(
        this.format.startof(name) + this.format.size * index
      )
    })
  }
)

AccessorFactory(VertexFieldType.FLOAT_VEC2)(
  function configure2FloatVectorField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, x, y) {
      this.vertexBuffer.set2FloatVector(
        this.format.startof(name) + this.format.size * index,
        x, y
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, component) {
      return this.vertexBuffer.getFloatVector(
        this.format.startof(name) + this.format.size * index,
        component
      )
    })
  }
)

AccessorFactory(VertexFieldType.FLOAT_VEC3)(
  function configure3FloatVectorField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, x, y, z) {
      this.vertexBuffer.set3FloatVector(
        this.format.startof(name) + this.format.size * index,
        x, y, z
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, component) {
      return this.vertexBuffer.getFloatVector(
        this.format.startof(name) + this.format.size * index,
        component
      )
    })
  }
)

AccessorFactory(VertexFieldType.FLOAT_VEC4)(
  function configure4FloatField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, x, y, z, w) {
      this.vertexBuffer.set4FloatVector(
        this.format.startof(name) + this.format.size * index,
        x, y, z, w
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, component) {
      return this.vertexBuffer.getFloatVector(
        this.format.startof(name) + this.format.size * index,
        component
      )
    })
  }
)

AccessorFactory(VertexFieldType.FLOAT_MAT2)(
  function configure2FloatMatrixField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, a, b, c, d) {
      this.vertexBuffer.set2x2FloatMatrix(
        this.format.startof(name) + this.format.size * index,
        a, b, c, d
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, x, y) {
      return this.vertexBuffer.get2x2FloatMatrix(
        this.format.startof(name) + this.format.size * index,
        x, y
      )
    })
  }
)

AccessorFactory(VertexFieldType.FLOAT_MAT3)(
  function configure3FloatMatrixField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, a, b, c, d, e, f, g, h, i) {
      this.vertexBuffer.set3x3FloatMatrix(
        this.format.startof(name) + this.format.size * index,
        a, b, c,
        d, e, f,
        g, h, i
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, x, y) {
      return this.vertexBuffer.get3x3FloatMatrix(
        this.format.startof(name) + this.format.size * index,
        x, y
      )
    })
  }
)

AccessorFactory(VertexFieldType.FLOAT_MAT4)(
  function configure4FloatMatrixField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
      this.vertexBuffer.set4x4FloatMatrix(
        this.format.startof(name) + this.format.size * index,
        a, b, c, d,
        e, f, g, h,
        i, j, k, l,
        m, n, o, p
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, x, y) {
      return this.vertexBuffer.get4x4FloatMatrix(
        this.format.startof(name) + this.format.size * index,
        x, y
      )
    })
  }
)

/**
* A vertex buffer based on a given vertex structure.
*/
export class InterleavedVertexStructureBuffer extends VertexStructureBuffer {
  /**
  * Create a clone of another interleaved vertex structure buffer.
  *
  * @param {InterleavedVertexStructureBuffer} toClone - An interleaved vertex structure buffer instance to clone.
  *
  * @return {InterleavedVertexStructureBuffer} A clone of the given buffer instance.
  */
  static clone (toClone) {
    const result = new InterleavedVertexStructureBuffer(
      toClone.format, toClone.capacity, toClone.usage
    )

    result.size = toClone.size
    result.buffer.set(toClone.buffer, 0)
    return result
  }

  /**
  * Create a new vertex structure buffer with a given format.
  *
  * @param {VertexStructure} format - Format of all vertex structures stored into this buffer.
  * @param {number} [capacity = 16] - Initial capacity of the buffer.
  * @param {BufferUsage} [usage = STATIC_DRAW] - Initial usage hint of the buffer.
  */
  constructor (format, capacity = 16, usage = STATIC_DRAW) {
    super(format, capacity, usage)

    for (const field of format.fields()) {
      ACCESSORS_FACTORIES.get(format.typeof(field))(field, this)
    }
  }

  /**
  * @see VertexStructureBuffer#get capacity
  */
  get capacity () {
    return this.vertexBuffer.capacity / this.format.size
  }

  /**
  * @see VertexStructureBuffer#set capacity
  */
  set capacity (capacity) {
    this.vertexBuffer.capacity = this.format.size * capacity
  }

  /**
  * @see VertexStructureBuffer#get size
  */
  get size () {
    return this.vertexBuffer.size / this.format.size
  }

  /**
  * @see VertexStructureBuffer#set size
  */
  set size (newSize) {
    this.vertexBuffer.size = this.format.size * newSize
  }

  /**
  * @see VertexStructureBuffer#delete
  */
  delete (index, count = 1) {
    this.vertexBuffer.delete(this.format.size * index, this.format.size * count)
    return this
  }

  /**
  * @see VertexStructureBuffer#push
  */
  push (count = 1) {
    this.vertexBuffer.size += this.format.size * count
    return this
  }

  /**
  * @see VertexStructureBuffer#concat
  */
  concat (...others) {
    for (const other of others) {
      if (other.format.equals(this.format)) {
        this.vertexBuffer.concat(other._buffer)
      } else {
        throw new Error([
          'Trying to concat two VertexStructureBuffer with different ',
          'vertex structure.'
        ].join(''))
      }
    }

    return this
  }

  /**
  * @see VertexStructureBuffer#copyWithin
  */
  copyWithin (target, start = 0, end = this.size) {
    const entrySize = this.format.size
    this.vertexBuffer.copyWithin(
      target * entrySize,
      start * entrySize,
      end * entrySize
    )
    return this
  }

  /**
  * @see VertexStructureBuffer#equals
  */
  equals (other) {
    if (other == this) return true
    if (other == null) return false

    if (other instanceof InterleavedVertexStructureBuffer) {
      if (!other.format.equals(this.format)) return false
      return this.vertexBuffer.equals(other.vertexBuffer)
    }

    return false
  }

  /**
  * @see VertexStructureBuffer#clone
  */
  clone () {
    return InterleavedVertexStructureBuffer.clone(this)
  }

  /**
  * @see VertexStructureBuffer#clear
  */
  clear () {
    this.vertexBuffer.clear()
    return this
  }

  /**
  * @see Descriptor#contextualise
  */
  contextualise (context) {
    return new GLInterleavedVertexStructureBuffer(context, this)
  }
}

VertexStructureBuffer.Interleaved = InterleavedVertexStructureBuffer
