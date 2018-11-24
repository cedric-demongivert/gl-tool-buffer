import { upperFirst } from 'lodash'

import { VertexStructureBuffer } from './VertexStructureBuffer'
import * as VertexFieldType from './VertexFieldType'
import { STATIC_DRAW } from './BufferUsage'

import { GLGroupedVertexStructureBuffer } from './GLGroupedVertexStructureBuffer'

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
          this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
          value
        )

        return this
    })

    define(instance, `get${upperFirst(name)}`, function (index) {
      return this.vertexBuffer.getByte(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
      )
    })
  }
)


AccessorFactory(VertexFieldType.UNSIGNED_BYTE)(
  function configureUnsignedByteField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, value) {
      this.vertexBuffer.setUnsignedByte(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        value
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index) {
      return this.vertexBuffer.getUnsignedByte(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
      )
    })
  }
)

AccessorFactory(VertexFieldType.INT)(
  function configureIntField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, value) {
      this.vertexBuffer.setInt(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        value
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index) {
      return this.vertexBuffer.getInt(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
      )
    })
  }
)

AccessorFactory(VertexFieldType.INT_VEC2)(
  function configure2IntVectorField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, x, y) {
      this.vertexBuffer.set2IntVector(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        x, y
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, component) {
      return this.vertexBuffer.getIntVector(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        component
      )
    })
  }
)

AccessorFactory(VertexFieldType.INT_VEC3)(
  function configure3IntVectorField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, x, y, z) {
      this.vertexBuffer.set3IntVector(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        x, y, z
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, component) {
      return this.vertexBuffer.getIntVector(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        component
      )
    })
  }
)

AccessorFactory(VertexFieldType.INT_VEC4)(
  function configure4IntVectorField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, x, y, z, w) {
      this.vertexBuffer.set4IntVector(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        x, y, z, w
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, component) {
      return this.vertexBuffer.getIntVector(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        component
      )
    })
  }
)

AccessorFactory(VertexFieldType.UNSIGNED_INT)(
  function configureUnsignedIntField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, value) {
      this.vertexBuffer.setUnsignedInt(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        value
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index) {
      return this.vertexBuffer.getUnsignedInt(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
      )
    })
  }
)

AccessorFactory(VertexFieldType.SHORT)(
  function configureShortField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, value) {
      this.vertexBuffer.setShort(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        value
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index) {
      return this.vertexBuffer.getShort(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
      )
    })
  }
)

AccessorFactory(VertexFieldType.FLOAT)(
  function configureFloatField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, value) {
      this.vertexBuffer.setFloat(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        value
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index) {
      return this.vertexBuffer.getFloat(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
      )
    })
  }
)

AccessorFactory(VertexFieldType.FLOAT_VEC2)(
  function configure2FloatVectorField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, x, y) {
      this.vertexBuffer.set2FloatVector(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        x, y
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, component) {
      return this.vertexBuffer.getFloatVector(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        component
      )
    })
  }
)

AccessorFactory(VertexFieldType.FLOAT_VEC3)(
  function configure3FloatVectorField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, x, y, z) {
      this.vertexBuffer.set3FloatVector(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        x, y, z
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, component) {
      return this.vertexBuffer.getFloatVector(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        component
      )
    })
  }
)

AccessorFactory(VertexFieldType.FLOAT_VEC4)(
  function configure4FloatField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, x, y, z, w) {
      this.vertexBuffer.set4FloatVector(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        x, y, z, w
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, component) {
      return this.vertexBuffer.getFloatVector(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        component
      )
    })
  }
)

AccessorFactory(VertexFieldType.FLOAT_MAT2)(
  function configure2FloatMatrixField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, a, b, c, d) {
      this.vertexBuffer.set2x2FloatMatrix(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        a, b, c, d
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, x, y) {
      return this.vertexBuffer.get2x2FloatMatrix(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        x, y
      )
    })
  }
)

AccessorFactory(VertexFieldType.FLOAT_MAT3)(
  function configure3FloatMatrixField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, a, b, c, d, e, f, g, h, i) {
      this.vertexBuffer.set3x3FloatMatrix(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        a, b, c,
        d, e, f,
        g, h, i
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, x, y) {
      return this.vertexBuffer.get3x3FloatMatrix(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        x, y
      )
    })
  }
)

AccessorFactory(VertexFieldType.FLOAT_MAT4)(
  function configure4FloatMatrixField (name, instance) {
    define(instance, `set${upperFirst(name)}`, function (index, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
      this.vertexBuffer.set4x4FloatMatrix(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        a, b, c, d,
        e, f, g, h,
        i, j, k, l,
        m, n, o, p
      )

      return this
    })

    define(instance, `get${upperFirst(name)}`, function (index, x, y) {
      return this.vertexBuffer.get4x4FloatMatrix(
        this.format.startof(name) * this.capacity + index * this.format.sizeof(name),
        x, y
      )
    })
  }
)

/**
* A vertex buffer based on a given vertex structure.
*/
export class GroupedVertexStructureBuffer extends VertexStructureBuffer {
  /**
  * Create a clone of another grouped vertex structure buffer.
  *
  * @param {GroupedVertexStructureBuffer} toClone - A grouped vertex structure buffer instance to clone.
  *
  * @return {GroupedVertexStructureBuffer} A clone of the given buffer instance.
  */
  static clone (toClone) {
    const result = new GroupedVertexStructureBuffer(
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
  * @param {BufferUsage} [usage = BufferUsage.STATIC_DRAW] - Initial usage hint of the buffer.
  */
  constructor (format, capacity = 16, usage = STATIC_DRAW) {
    super(format, capacity, usage)
    this._size = 0

    this.vertexBuffer.size = this.vertexBuffer.capacity
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
    if (capacity !== this.capacity) {
      const oldCapacity = this.capacity

      if (capacity > oldCapacity) {
        this._expand(oldCapacity, capacity)
      } else {
        this._reduce(oldCapacity, capacity)
      }
    }
  }

  _expand (oldCapacity, capacity) {
    this.vertexBuffer.capacity = this.format.size * capacity
    this.vertexBuffer.size = this.format.size * capacity

    let fieldIndex = this.format.fieldCount

    while (fieldIndex --) {
      const field = this.format.field(fieldIndex)

      this.vertexBuffer.copyWithin(
        this.format.startof(field) * capacity,
        this.format.startof(field) * oldCapacity,
        this.format.endof(field) * oldCapacity
      )
    }
  }

  _reduce (oldCapacity, capacity) {
    if (capacity < this._size) this._size = capacity

    for (let fieldIndex = 0; fieldIndex < this.format.fieldCount; ++fieldIndex) {
      const field = this.format.field(fieldIndex)

      this.vertexBuffer.copyWithin(
        this.format.startof(field) * capacity,
        this.format.startof(field) * oldCapacity,
        this.format.endof(field) * oldCapacity
      )
    }

    this.vertexBuffer.capacity = this.format.size * capacity
    this.vertexBuffer.size = this.format.size * capacity
  }

  /**
  * @see VertexStructureBuffer#get size
  */
  get size () {
    return this._size
  }

  /**
  * @see VertexStructureBuffer#set size
  */
  set size (newSize) {
    if (newSize < 0) throw new Error('A FaceBuffer size can\'t be negative.')
    if (newSize > this.capacity) this.capacity = newSize
    const oldSize = this._size
    this._size = newSize

    let fieldIndex = this.format.fieldCount

    while (fieldIndex --) {
      const field = this.format.field(fieldIndex)

      this.vertexBuffer.fill(
        0,
        this.format.startof(field) * this.capacity + this.format.sizeof(field) * oldSize,
        this.format.startof(field) * this.capacity + this.format.sizeof(field) * newSize
      )
    }
  }

  /**
  * @see VertexStructureBuffer#delete
  */
  delete (index, count = 1) {
    const capacity = this.capacity
    let fieldIndex = this.format.fieldCount

    while (fieldIndex --) {
      const field = this.format.field(fieldIndex)
      const offset = this.format.startof(field) * capacity
      const end = this.format.endof(field) * capacity
      const fieldSize = this.format.sizeof(field)

      this.vertexBuffer.copyWithin(
        offset + index * fieldSize,
        offset + (index + count) * fieldSize,
        end
      )
    }

    this._size -= count
    return this
  }

  /**
  * @see VertexStructureBuffer#push
  */
  push (count = 1) {
    this.size += count
    return this
  }

  /**
  * @see VertexStructureBuffer#concat
  */
  concat (...others) {
    for (const other of others) {
      if (other.format.equals(this.format)) {
        this._concatIn(other)
      } else {
        throw new Error([
          'Trying to concat two VertexStructureBuffer with different ',
          'vertex structure.'
        ].join(''))
      }
    }

    return this
  }

  _concatIn (other) {
    const oldSize = this.size
    this.size += other.size

    const capacity = this.capacity
    let fieldIndex = this.format.fieldCount

    while (fieldIndex --) {
      const field = this.format.field(fieldIndex)
      const fieldSize = this.format.sizeof(field)

      const target = this.format.startof(field) * capacity + fieldSize * oldSize
      const start = this.format.startof(field) * other.capacity
      const end = start + fieldSize * other.size

      this.buffer.set(other.buffer.slice(start, end), target)
    }
  }

  /**
  * @see VertexStructureBuffer#copyWithin
  */
  copyWithin (target, start = 0, end = this.size) {
    const capacity = this.capacity
    let fieldIndex = this.format.fieldCount

    const ftarget = Math.min(target, this.size)
    const fend = target + end - start > this.size ? start + this.size - target
                                                  : end
    const fstart = start > fend ? fend : start

    while (fieldIndex --) {
      const field = this.format.field(fieldIndex)
      const offset = this.format.startof(field) * capacity
      const fieldSize = this.format.sizeof(field)

      this.vertexBuffer.copyWithin(
        offset + ftarget * fieldSize,
        offset + fstart * fieldSize,
        offset + fend * fieldSize
      )
    }

    return this
  }

  /**
  * @see VertexStructureBuffer#equals
  */
  equals (other) {
    if (other == null) return false
    if (other == this) return true

    if (other instanceof GroupedVertexStructureBuffer) {
      if (!other.format.equals(this.format)) return false
      if (other.size !== this.size) return false

      for (let field of this.format.fields()) {
        const myoffset = this.format.startof(field) * this.capacity
        const otheroffset = this.format.startof(field) * other.capacity
        const bytesize = this.size * this.format.sizeof(field)

        for (let index = 0; index < bytesize; ++index) {
          if (this.buffer[myoffset + index] != other.buffer[otheroffset + index]) return false
        }
      }

      return true
    }

    return false
  }

  /**
  * @see VertexStructureBuffer#clone
  */
  clone () {
    return GroupedVertexStructureBuffer.clone(this)
  }

  /**
  * @see VertexStructureBuffer#clear
  */
  clear () {
    this._size = 0
    return this
  }

  /**
  * @see Descriptor#contextualise
  */
  contextualise (context) {
    return new GLGroupedVertexStructureBuffer(context, this)
  }
}

VertexStructureBuffer.Grouped = GroupedVertexStructureBuffer
