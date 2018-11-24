import { upperFirst } from 'lodash'

import { VertexStructureBuffer } from './VertexStructureBuffer'
import { VertexFieldType } from './VertexFieldType'

import { GLInterleavedVertexStructureBuffer } from './gl/GLInterleavedVertexStructureBuffer'

const ACCESSORS_FACTORIES = new Map()

function AccessorFactory (type) {
  return function (factory) {
    ACCESSORS_FACTORIES.put(type, factory)
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

@AccessorFactory(VertexFieldType.BYTE)
function configureByteField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, value) {
      this._buffer.setByte(
        this._format.start(name) + this._format.size * index,
        value
      )

      return this
  })

  define(instance, `get${upperFirst(name)}`, function (index) {
    return this._buffer.getByte(
      this._format.start(name) + this._format.size * index
    )
  })
}

@AccessorFactory(VertexFieldType.UNSIGNED_BYTE)
function configureUnsignedByteField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, value) {
    this._buffer.setUnsignedByte(
      this._format.start(name) + this._format.size * index,
      value
    )

    return this
  })

  define(instance, `get${upperFirst(name)}`, function (index) {
    return this._buffer.getUnsignedByte(
      this._format.start(name) + this._format.size * index,
    )
  })
}

@AccessorFactory(VertexFieldType.INT)
function configureIntField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, value) {
    this._buffer.setInt(
      this._format.start(name) + this._format.size * index,
      value
    )

    return this
  })

  define(instance, `get${upperFirst(name)}`, function (index) {
    return this._buffer.getInt(
      this._format.start(name) + this._format.size * index
    )
  })
}

@AccessorFactory(VertexFieldType.INT_VEC2)
function configure2IntVectorField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, x, y) {
    this._buffer.set2IntVector(
      this._format.start(name) + this._format.size * index,
      x, y
    )

    return this
  })

  define(instance, `get${upperFirst(name)}`, function (index, component) {
    return this._buffer.getIntVector(
      this._format.start(name) + this._format.size * index,
      component
    )
  })
}

@AccessorFactory(VertexFieldType.INT_VEC3)
function configure3IntVectorField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, x, y, z) {
    this._buffer.set3IntVector(
      this._format.start(name) + this._format.size * index,
      x, y, z
    )

    return this
  })

  define(instance, `get${upperFirst(name)}`, function (index, component) {
    return this._buffer.getIntVector(
      this._format.start(name) + this._format.size * index,
      component
    )
  })
}

@AccessorFactory(VertexFieldType.INT_VEC4)
function configure4IntVectorField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, x, y, z, w) {
    this._buffer.set4IntVector(
      this._format.start(name) + this._format.size * index,
      x, y, z, w
    )

    return this
  })

  define(instance, `get${upperFirst(name)}`, function (index, component) {
    return this._buffer.getIntVector(
      this._format.start(name) + this._format.size * index,
      component
    )
  })
}

@AccessorFactory(VertexFieldType.UNSIGNED_INT)
function configureUnsignedIntField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, value) {
    this._buffer.setUnsignedInt(
      this._format.start(name) + this._format.size * index,
      value
    )

    return this
  })

  define(instance, `get${upperFirst(name)}`, function (index) {
    return this._buffer.getUnsignedInt(
      this._format.start(name) + this._format.size * index
    )
  })
}

@AccessorFactory(VertexFieldType.SHORT)
function configureShortField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, value) {
    this._buffer.setShort(
      this._format.start(name) + this._format.size * index,
      value
    )

    return this
  })

  define(instance, `get${upperFirst(name)}`, function (index) {
    return this._buffer.getShort(
      this._format.start(name) + this._format.size * index
    )
  })
}

@AccessorFactory(VertexFieldType.FLOAT)
function configureFloatField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, value) {
    this._buffer.setFloat(
      this._format.start(name) + this._format.size * index,
      value
    )

    return this
  })

  define(instance, `get${upperFirst(name)}`, function (index) {
    return this._buffer.getFloat(
      this._format.start(name) + this._format.size * index
    )
  })
}

@AccessorFactory(VertexFieldType.FLOAT_VEC2)
function configure2FloatVectorField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, x, y) {
    this._buffer.set2FloatVector(
      this._format.start(name) + this._format.size * index,
      x, y
    )

    return this
  })

  define(instance, `get${upperFirst(name)}`, function (index, component) {
    return this._buffer.getFloatVector(
      this._format.start(name) + this._format.size * index,
      component
    )
  })
}

@AccessorFactory(VertexFieldType.FLOAT_VEC3)
function configure3FloatVectorField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, x, y, z) {
    this._buffer.set3FloatVector(
      this._format.start(name) + this._format.size * index,
      x, y, z
    )

    return this
  })

  define(instance, `get${upperFirst(name)}`, function (index, component) {
    return this._buffer.getFloatVector(
      this._format.start(name) + this._format.size * index,
      component
    )
  })
}

@AccessorFactory(VertexFieldType.FLOAT_VEC4)
function configure4FloatField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, x, y, z, w) {
    this._buffer.set4FloatVector(
      this._format.start(name) + this._format.size * index,
      x, y, z, w
    )

    return this
  })

  define(instance, `get${upperFirst(name)}`, function (index, component) {
    return this._buffer.getFloatVector(
      this._format.start(name) + this._format.size * index,
      component
    )
  })
}

@AccessorFactory(VertexFieldType.FLOAT_MAT2)
function configure2FloatMatrixField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, a, b, c, d) {
    this._buffer.set2x2FloatMatrix(
      this._format.start(name) + this._format.size * index,
      a, b, c, d
    )

    return this
  })

  define(instance, `get${upperFirst(name)}`, function (index, x, y) {
    return this._buffer.get2x2FloatMatrix(
      this._format.start(name) + this._format.size * index,
      x, y
    )
  })
}

@AccessorFactory(VertexFieldType.FLOAT_MAT3)
function configure3FloatMatrixField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, a, b, c, d, e, f, g, h, i) {
    this._buffer.set3x3FloatMatrix(
      this._format.start(name) + this._format.size * index,
      a, b, c,
      d, e, f,
      g, h, i
    )

    return this
  })

  define(instance, `get${upperFirst(name)}`, function (index, x, y) {
    return this._buffer.get3x3FloatMatrix(
      this._format.start(name) + this._format.size * index,
      x, y
    )
  })
}

@AccessorFactory(VertexFieldType.FLOAT_MAT4)
function configure4FloatMatrixField (name, instance) {
  define(instance, `set${upperFirst(name)}`, function (index, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    this._buffer.set3x3FloatMatrix(
      this._format.start(name) + this._format.size * index,
      a, b, c, d,
      e, f, g, h,
      i, j, k, l,
      m, n, o, p
    )

    return this
  })

  define(instance, `get${upperFirst(name)}`, function (index, x, y) {
    return this._buffer.get4x4FloatMatrix(
      this._format.start(name) + this._format.size * index,
      x, y
    )
  })
}

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
      toClone.format, toClone.capacity
    )

    result._buffer.set(new Uint8Array(toClone.buffer), 0)
    return result
  }

  /**
  * Create a new vertex structure buffer with a given format.
  *
  * @param {VertexStructure} format - Format of all vertex structures stored into this buffer.
  * @param {number} [capacity = 16] - Initial capacity of the buffer.
  */
  constructor (format, capacity = 16) {
    super(format, capacity)

    for (const field of format.fields()) {
      ACCESSORS_FACTORIES.get(format.type(field))(field, this)
    }
  }

  /**
  * @see VertexStructureBuffer#get capacity
  */
  get capacity () {
    return this._buffer.capacity / this._format.size
  }

  /**
  * @see VertexStructureBuffer#set capacity
  */
  set capacity (capacity) {
    this._buffer.capacity = this._format.size * capacity
  }

  /**
  * @see VertexStructureBuffer#get size
  */
  get size () {
    return this._buffer.size / this._format.size
  }

  /**
  * @see VertexStructureBuffer#set size
  */
  set size (newSize) {
    this._buffer.size = this._format.size * newSize
  }

  /**
  * @see VertexStructureBuffer#delete
  */
  delete (index, count = 1) {
    this._buffer.delete(this._format.size * index, this._format.size * count)
    return this
  }

  /**
  * @see VertexStructureBuffer#push
  */
  push (count) {
    this._buffer.size += this._format.size * count
    return this
  }

  /**
  * @see VertexStructureBuffer#concatIn
  */
  concatIn (...others) {
    for (const other of others) {
      if (other.format.equals(this.format)) {
        this._buffer.concatIn(other._buffer)
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
    const entrySize = this._format.size
    this._buffer.copyWithin(
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
    if (other == null) return false

    if (other.format.equals(this.format)) {
      return this._buffer.equals(other._buffer)
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
    this._buffer.clear()
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
