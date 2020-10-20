import { upperFirst } from 'lodash'

import { endianess } from './endianess'

import { VertexStructureBuffer } from './VertexStructureBuffer'
import { VertexFieldType } from './VertexFieldType'
import { VertexBuffer } from './VertexBuffer'
import { VertexStructure } from './VertexStructure'

const ACCESSORS_FACTORIES = new Map()

function define (instance : any, name : string, callback : any) : void {
  Object.defineProperty(instance, name, {
    value: callback,
    writable: false,
    configurable: false,
    enumerable: false
  })
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configureByteField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function setByteField (this : GroupedVertexStructureBuffer, index : number, value : number) : void {
      this.buffer.setByte(field.start * this.capacity + index * field.size, value)
  }

  function getByteField (this : GroupedVertexStructureBuffer, index : number) : number {
    return this.buffer.getByte(field.start * this.capacity + index * field.size)
  }

  define(instance, `set${upperFirst(field.name)}`, setByteField)
  define(instance, `get${upperFirst(field.name)}`, getByteField)
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configureUnsignedByteField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function setUnsignedByteField (this : GroupedVertexStructureBuffer, index : number, value : number) : void {
   this.buffer.setUnsignedByte(field.start * this.capacity + index * field.size, value)
 }

 function getUnsignedByteField (this : GroupedVertexStructureBuffer, index : number) : number {
   return this.buffer.getUnsignedByte(field.start * this.capacity + index * field.size)
 }

  define(instance, `set${upperFirst(field.name)}`, setUnsignedByteField)
  define(instance, `get${upperFirst(field.name)}`, getUnsignedByteField)
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configureIntField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function setIntField (this : GroupedVertexStructureBuffer, index : number, value : number) : void {
    this.buffer.setInt(field.start * this.capacity + index * field.size, value)
  }

  function getIntField (this : GroupedVertexStructureBuffer, index : number) : number {
    return this.buffer.getInt(field.start * this.capacity + index * field.size)
  }

  define(instance, `set${upperFirst(field.name)}`, setIntField)
  define(instance, `get${upperFirst(field.name)}`, getIntField)
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configure2IntVectorField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function set2IntVectorField (this : GroupedVertexStructureBuffer, index : number, x : number, y : number) : void {
    this.buffer.set2IntVector(field.start * this.capacity + index * field.size, x, y)
  }

  function get2IntVectorField (this : GroupedVertexStructureBuffer, index : number, component : number) : number {
    return this.buffer.getIntVector(field.start * this.capacity + index * field.size, component)
  }

  define(instance, `set${upperFirst(field.name)}`, set2IntVectorField)
  define(instance, `get${upperFirst(field.name)}`, get2IntVectorField)
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configure3IntVectorField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function set3IntVectorField (this : GroupedVertexStructureBuffer, index : number, x : number, y : number, z : number) : void {
    this.buffer.set3IntVector(field.start * this.capacity + index * field.size, x, y, z)
  }

  function get3IntVectorField (this : GroupedVertexStructureBuffer, index : number, component : number) : number {
    return this.buffer.getIntVector(field.start * this.capacity + index * field.size, component)
  }

  define(instance, `set${upperFirst(field.name)}`, set3IntVectorField)
  define(instance, `get${upperFirst(field.name)}`, get3IntVectorField)
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configure4IntVectorField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function set4IntVectorField (this : GroupedVertexStructureBuffer, index : number, x : number, y : number, z : number, w : number) : void {
    this.buffer.set4IntVector(field.start * this.capacity + index * field.size, x, y, z, w)
  }

  function get4IntVectorField (this : GroupedVertexStructureBuffer, index : number, component : number) : number {
    return this.buffer.getIntVector(field.start * this.capacity + index * field.size, component)
  }

  define(instance, `set${upperFirst(field.name)}`, set4IntVectorField)
  define(instance, `get${upperFirst(field.name)}`, get4IntVectorField)
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configureUnsignedIntField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function setUnsignedIntField (this : GroupedVertexStructureBuffer, index : number, value : number) : void {
    this.buffer.setUnsignedInt(field.start * this.capacity + index * field.size, value)
  }

  function getUnsignedIntField (this : GroupedVertexStructureBuffer, index : number) : number {
    return this.buffer.getUnsignedInt(field.start * this.capacity + index * field.size)
  }

  define(instance, `set${upperFirst(field.name)}`, setUnsignedIntField)
  define(instance, `get${upperFirst(field.name)}`, getUnsignedIntField)
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configureShortField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function setShortField (this : GroupedVertexStructureBuffer, index : number, value : number) : void {
    this.buffer.setShort(field.start * this.capacity + index * field.size, value)
  }

  function getShortField (this : GroupedVertexStructureBuffer, index : number) : number {
    return this.buffer.getShort(field.start * this.capacity + index * field.size)
  }

  define(instance, `set${upperFirst(field.name)}`, setShortField)
  define(instance, `get${upperFirst(field.name)}`, getShortField)
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configureFloatField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function setFloatField (this : GroupedVertexStructureBuffer, index : number, value : number) : void {
    this.buffer.setFloat(field.start * this.capacity + index * field.size, value)
  }

  function getFloatField (this : GroupedVertexStructureBuffer, index : number) : number {
    return this.buffer.getFloat(field.start * this.capacity + index * field.size)
  }

  define(instance, `set${upperFirst(field.name)}`, setFloatField)
  define(instance, `get${upperFirst(field.name)}`, getFloatField)
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configure2FloatVectorField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function set2FloatVectorField (this : GroupedVertexStructureBuffer, index : number, x : number, y : number) : void {
    this.buffer.set2FloatVector(field.start * this.capacity + index * field.size, x, y)
  }

  function get2FloatVectorField (this : GroupedVertexStructureBuffer, index : number, component : number) : number {
    return this.buffer.getFloatVector(field.start * this.capacity + index * field.size, component)
  }

  define(instance, `set${upperFirst(field.name)}`, set2FloatVectorField)
  define(instance, `get${upperFirst(field.name)}`, get2FloatVectorField)
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configure3FloatVectorField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function set3FloatVectorField (this : GroupedVertexStructureBuffer, index : number, x : number, y : number, z : number) : void {
    this.buffer.set3FloatVector(
      field.start * this.capacity + index * field.size,
      x, y, z
    )
  }

  function get3FloatVectorField (this : GroupedVertexStructureBuffer, index : number, component : number) : number {
    return this.buffer.getFloatVector(
      field.start * this.capacity + index * field.size,
      component
    )
  }

  define(instance, `set${upperFirst(field.name)}`, set3FloatVectorField)
  define(instance, `get${upperFirst(field.name)}`, get3FloatVectorField)
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configure4FloatVectorField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function set4FloatVectorField (this : GroupedVertexStructureBuffer, index : number, x : number, y : number, z : number, w : number) : void {
    this.buffer.set4FloatVector(
      field.start * this.capacity + index * field.size,
      x, y, z, w
    )
  }

  function get4FloatVectorField (this : GroupedVertexStructureBuffer, index : number, component : number) : number {
    return this.buffer.getFloatVector(
      field.start * this.capacity + index * field.size,
      component
    )
  }

  define(instance, `set${upperFirst(field.name)}`, set4FloatVectorField)
  define(instance, `get${upperFirst(field.name)}`, get4FloatVectorField)
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configure2FloatMatrixField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function set2FloatMatrixField (this : GroupedVertexStructureBuffer, index : number, a : number, b : number, c : number, d : number) : void {
    this.buffer.set2x2FloatMatrix(
      field.start * this.capacity + index * field.size,
      a, b, c, d
    )
  }

  function get2FloatMatrixField (this : GroupedVertexStructureBuffer, index : number, x : number, y : number) : number {
    return this.buffer.get2x2FloatMatrix(
      field.start * this.capacity + index * field.size,
      x, y
    )
  }

  define(instance, `set${upperFirst(field.name)}`, set2FloatMatrixField)
  define(instance, `get${upperFirst(field.name)}`, get2FloatMatrixField)
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configure3FloatMatrixField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function set3FloatMatrixField (
    this : GroupedVertexStructureBuffer, index : number,
    a : number, b : number, c : number,
    d : number, e : number, f : number,
    g : number, h : number, i : number
  ) : void {
    this.buffer.set3x3FloatMatrix(
      field.start * this.capacity + index * field.size,
      a, b, c,
      d, e, f,
      g, h, i
    )
  }

  function get3FloatMatrixField (this : GroupedVertexStructureBuffer, index : number, x : number, y : number) : number {
    return this.buffer.get3x3FloatMatrix(
      field.start * this.capacity + index * field.size,
      x, y
    )
  }

  define(instance, `set${upperFirst(field.name)}`, set3FloatMatrixField)
  define(instance, `get${upperFirst(field.name)}`, get3FloatMatrixField)
}

/**
* Configure accessors for the given field on the given instance.
*
* @param field - Field to configure.
* @param instance - Instante to mutate.
*/
function configure4FloatMatrixField (field : VertexStructure.Field, instance : GroupedVertexStructureBuffer) : void {
  function set4FloatMatrixField (
    this : GroupedVertexStructureBuffer, index : number,
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number,
    i : number, j : number, k : number, l : number,
    m : number, n : number, o : number, p : number
  ) : void {
    this.buffer.set4x4FloatMatrix(
      field.start * this.capacity + index * field.size,
      a, b, c, d,
      e, f, g, h,
      i, j, k, l,
      m, n, o, p
    )
  }

  function get4FloatMatrixField (this : GroupedVertexStructureBuffer, index : number, x : number, y : number) : number {
    return this.buffer.get4x4FloatMatrix(
      field.start * this.capacity + index * field.size,
      x, y
    )
  }

  define(instance, `set${upperFirst(field.name)}`, set4FloatMatrixField)
  define(instance, `get${upperFirst(field.name)}`, get4FloatMatrixField)
}

ACCESSORS_FACTORIES.set(VertexFieldType.BYTE, configureByteField)
ACCESSORS_FACTORIES.set(VertexFieldType.UNSIGNED_BYTE, configureUnsignedByteField)
ACCESSORS_FACTORIES.set(VertexFieldType.INT, configureIntField)
ACCESSORS_FACTORIES.set(VertexFieldType.INT_VEC2, configure2IntVectorField)
ACCESSORS_FACTORIES.set(VertexFieldType.INT_VEC3, configure3IntVectorField)
ACCESSORS_FACTORIES.set(VertexFieldType.INT_VEC4, configure4IntVectorField)
ACCESSORS_FACTORIES.set(VertexFieldType.UNSIGNED_INT, configureUnsignedIntField)
ACCESSORS_FACTORIES.set(VertexFieldType.SHORT, configureShortField)
ACCESSORS_FACTORIES.set(VertexFieldType.FLOAT, configureFloatField)
ACCESSORS_FACTORIES.set(VertexFieldType.FLOAT_VEC2, configure2FloatVectorField)
ACCESSORS_FACTORIES.set(VertexFieldType.FLOAT_VEC3, configure3FloatVectorField)
ACCESSORS_FACTORIES.set(VertexFieldType.FLOAT_VEC4, configure4FloatVectorField)
ACCESSORS_FACTORIES.set(VertexFieldType.FLOAT_MAT2, configure2FloatMatrixField)
ACCESSORS_FACTORIES.set(VertexFieldType.FLOAT_MAT3, configure3FloatMatrixField)
ACCESSORS_FACTORIES.set(VertexFieldType.FLOAT_MAT4, configure4FloatMatrixField)

/**
* A vertex buffer based on a given vertex structure.
*/
export class GroupedVertexStructureBuffer implements VertexStructureBuffer {
  public readonly buffer : VertexBuffer
  public readonly format : VertexStructure

  private _size : number

  /**
  * Create a new vertex structure buffer with a given format.
  *
  * @param format - Format of all vertex structures stored into this buffer.
  * @param [capacity = 16] - Initial capacity of the buffer.
  * @param [littleEndian = endianess.IS_LITTLE_ENDIAN] - Underlying byte format.
  */
  public constructor (format : VertexStructure, capacity : number = 16, littleEndian : boolean = endianess.IS_LITTLE_ENDIAN) {
    this._size = 0
    this.buffer = VertexBuffer.empty(capacity * format.size, littleEndian)
    this.buffer.size = this.buffer.capacity
    this.format = format

    for (const field of format.fields) {
      (ACCESSORS_FACTORIES.get(field.type))(field, this)
    }
  }

  /**
  * @see VertexStructureBuffer#get capacity
  */
  public get capacity () : number {
    return this.buffer.capacity / this.format.size
  }

  /**
  * @see VertexStructureBuffer#set capacity
  */
  public set capacity (capacity : number) {
    if (capacity !== this.capacity) {
      const oldCapacity = this.capacity

      if (capacity > oldCapacity) {
        this._expand(oldCapacity, capacity)
      } else {
        this._reduce(oldCapacity, capacity)
      }
    }
  }

  private _expand (oldCapacity : number, capacity : number) : void {
    this.buffer.capacity = this.format.size * capacity
    this.buffer.size = this.format.size * capacity

    let fieldIndex : number = this.format.fields.length

    while (fieldIndex --) {
      const field : VertexStructure.Field = this.format.fields[fieldIndex]

      this.buffer.copyWithin(
        field.start * capacity,
        field.start * oldCapacity,
        field.end * oldCapacity
      )
    }
  }

  private _reduce (oldCapacity : number, capacity : number) : void {
    if (capacity < this._size) this._size = capacity

    for (let fieldIndex = 0; fieldIndex < this.format.fields.length; ++fieldIndex) {
      const field : VertexStructure.Field = this.format.fields[fieldIndex]

      this.buffer.copyWithin(field.start * capacity, field.start * oldCapacity, field.end * oldCapacity)
    }

    this.buffer.capacity = this.format.size * capacity
    this.buffer.size = this.format.size * capacity
  }

  /**
  * @see VertexStructureBuffer.size
  */
  public get size () : number {
    return this._size
  }

  /**
  * @see VertexStructureBuffer.size
  */
  public set size (newSize : number) {
    if (newSize < 0) {
      throw new Error('A FaceBuffer size can\'t be negative.')
    }

    if (newSize > this.capacity) this.capacity = newSize
    const oldSize = this._size
    this._size = newSize

    let fieldIndex = this.format.fields.length

    while (fieldIndex --) {
      const field : VertexStructure.Field = this.format.fields[fieldIndex]

      this.buffer.fill(
        0,
        field.start * this.capacity + field.size * oldSize,
        field.start * this.capacity + field.size * newSize
      )
    }
  }

  /**
  * Update the value of a given field of a given vertex.
  */
  public set (vertex : number, identifier : string, value : number) : void
  public set (vertex : number, identifier : string, x : number, y : number) : void
  public set (vertex : number, identifier : string, x : number, y : number, z : number) : void
  public set (vertex : number, identifier : string, x : number, y : number, z : number, w : number) : void
  public set (
    vertex : number, identifier : string,
    a : number, b : number,
    c : number, d : number
  ) : void
  public set (
    vertex : number, identifier : string,
    a : number, b : number, c : number,
    d : number, e : number, f : number,
    g : number, h : number, i : number
  ) : void
  public set (
    vertex : number, identifier : string,
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number,
    i : number, j : number, k : number, l : number,
    m : number, n : number, o : number, p : number
  ) : void
  public set (vertex : number, identifier : number, value : number) : void
  public set (vertex : number, identifier : number, x : number, y : number) : void
  public set (vertex : number, identifier : number, x : number, y : number, z : number) : void
  public set (vertex : number, identifier : number, x : number, y : number, z : number, w : number) : void
  public set (
    vertex : number, identifier : number,
    a : number, b : number,
    c : number, d : number
  ) : void
  public set (
    vertex : number, identifier : number,
    a : number, b : number, c : number,
    d : number, e : number, f : number,
    g : number, h : number, i : number
  ) : void
  public set (
    vertex : number, identifier : number,
    a : number, b : number, c : number, d : number,
    e : number, f : number, g : number, h : number,
    i : number, j : number, k : number, l : number,
    m : number, n : number, o : number, p : number
  ) : void
  public set (
    vertex : number, identifier : number | string,
    a : number, b? : number, c? : number, d? : number,
    e? : number, f? : number, g? : number, h? : number,
    i? : number, j? : number, k? : number, l? : number,
    m? : number, n? : number, o? : number, p? : number
  ) : void {
    const field : VertexStructure.Field = (
      typeof identifier === 'string' ? this.format.get(identifier)
                                     : this.format.fields[identifier]
    )

    switch (field.type) {
      case VertexFieldType.BYTE           :
        return this.buffer.setByte(this.capacity * field.start + field.size * vertex, a)
      case VertexFieldType.SHORT          :
        return this.buffer.setShort(this.capacity * field.start + field.size * vertex, a)
      case VertexFieldType.INT            :
        return this.buffer.setInt(this.capacity * field.start + field.size * vertex, a)
      case VertexFieldType.BOOL           :
        throw new Error('Boolean type is not supported yet.')
      case VertexFieldType.FLOAT          :
        return this.buffer.setFloat(this.capacity * field.start + field.size * vertex, a)
      case VertexFieldType.UNSIGNED_BYTE  :
        return this.buffer.setUnsignedByte(this.capacity * field.start + field.size * vertex, a)
      case VertexFieldType.UNSIGNED_INT   :
        return this.buffer.setUnsignedInt(this.capacity * field.start + field.size * vertex, a)
      case VertexFieldType.UNSIGNED_SHORT :
        return this.buffer.setUnsignedShort(this.capacity * field.start + field.size * vertex, a)
      case VertexFieldType.INT_VEC2       :
        return this.buffer.set2IntVector(this.capacity * field.start + field.size * vertex, a, b)
      case VertexFieldType.INT_VEC3       :
        return this.buffer.set3IntVector(this.capacity * field.start + field.size * vertex, a, b, c)
      case VertexFieldType.INT_VEC4       :
        return this.buffer.set4IntVector(this.capacity * field.start + field.size * vertex, a, b, c, d)
      case VertexFieldType.BOOL_VEC2      :
      case VertexFieldType.BOOL_VEC3      :
      case VertexFieldType.BOOL_VEC4      :
        throw new Error('Boolean vector type is not supported yet.')
      case VertexFieldType.FLOAT_VEC2     :
        return this.buffer.set2FloatVector(this.capacity * field.start + field.size * vertex, a, b)
      case VertexFieldType.FLOAT_VEC3     :
        return this.buffer.set3FloatVector(this.capacity * field.start + field.size * vertex, a, b, c)
      case VertexFieldType.FLOAT_VEC4     :
        return this.buffer.set4FloatVector(this.capacity * field.start + field.size * vertex, a, b, c, d)
      case VertexFieldType.FLOAT_MAT2     :
        return this.buffer.set2x2FloatMatrix(this.capacity * field.start + field.size * vertex, a, b, c, d)
      case VertexFieldType.FLOAT_MAT3     :
        return this.buffer.set3x3FloatMatrix(this.capacity * field.start + field.size * vertex, a, b, c, d, e, f, g, h, i)
      case VertexFieldType.FLOAT_MAT4     :
        return this.buffer.set4x4FloatMatrix(this.capacity * field.start + field.size * vertex, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
      default             :
        throw new Error(
          'Unable to update the #' + field.identifier + ' "' + field.name +
          '" data, because the given field type ' + field.type + ' is not ' +
          'supported yet.'
        )
    }
  }

  /**
  * Get the value of a given field of a given vertex.
  */
  public get (vertex : number, identifier : string) : number
  public get (vertex : number, identifier : string, index : number) : number
  public get (vertex : number, identifier : string, x : number, y : number) : number
  public get (vertex : number, identifier : number) : number
  public get (vertex : number, identifier : number, index : number) : number
  public get (vertex : number, identifier : number, x : number, y : number) : number
  public get (vertex : number, identifier : number | string, x? : number, y? : number) : number {
    const field : VertexStructure.Field = (
      typeof identifier === 'string' ? this.format.get(identifier)
                                     : this.format.fields[identifier]
    )

    switch (field.type) {
      case VertexFieldType.BYTE           :
        return this.buffer.getByte(this.capacity * field.start + field.size * vertex)
      case VertexFieldType.SHORT          :
        return this.buffer.getShort(this.capacity * field.start + field.size * vertex)
      case VertexFieldType.INT            :
        return this.buffer.getInt(this.capacity * field.start + field.size * vertex)
      case VertexFieldType.BOOL           :
        throw new Error('Boolean type is not supported yet.')
      case VertexFieldType.FLOAT          :
        return this.buffer.getFloat(this.capacity * field.start + field.size * vertex)
      case VertexFieldType.UNSIGNED_BYTE  :
        return this.buffer.getUnsignedByte(this.capacity * field.start + field.size * vertex)
      case VertexFieldType.UNSIGNED_INT   :
        return this.buffer.getUnsignedInt(this.capacity * field.start + field.size * vertex)
      case VertexFieldType.UNSIGNED_SHORT :
        return this.buffer.getUnsignedShort(this.capacity * field.start + field.size * vertex)
      case VertexFieldType.INT_VEC2       :
      case VertexFieldType.INT_VEC3       :
      case VertexFieldType.INT_VEC4       :
        return this.buffer.getIntVector(this.capacity * field.start + field.size * vertex, x)
      case VertexFieldType.BOOL_VEC2      :
      case VertexFieldType.BOOL_VEC3      :
      case VertexFieldType.BOOL_VEC4      :
        throw new Error('Boolean vector type is not supported yet.')
      case VertexFieldType.FLOAT_VEC2     :
      case VertexFieldType.FLOAT_VEC3     :
      case VertexFieldType.FLOAT_VEC4     :
        return this.buffer.getFloatVector(this.capacity * field.start + field.size * vertex, x)
      case VertexFieldType.FLOAT_MAT2     :
        return this.buffer.get2x2FloatMatrix(this.capacity * field.start + field.size * vertex, x, y)
      case VertexFieldType.FLOAT_MAT3     :
        return this.buffer.get3x3FloatMatrix(this.capacity * field.start + field.size * vertex, x, y)
      case VertexFieldType.FLOAT_MAT4     :
        return this.buffer.get4x4FloatMatrix(this.capacity * field.start + field.size * vertex, x, y)
      default             :
        throw new Error(
          'Unable to retrieve #' + field.identifier + ' "' + field.name + '" ' +
          'data, because the given field type ' + field.type + ' is not ' +
          'supported yet.'
        )
    }
  }

  /**
  * @see VertexStructureBuffer.delete
  */
  public delete (index : number , count : number = 1) : void {
    const capacity : number = this.capacity
    let fieldIndex : number = this.format.fields.length

    while (fieldIndex --) {
      const field : VertexStructure.Field = this.format.fields[fieldIndex]

      this.buffer.copyWithin(
        field.start * capacity + index * field.size,
        field.start * capacity + (index + count) * field.size,
        field.end * capacity
      )
    }

    this._size -= count
  }

  /**
  * @see VertexStructureBuffer.push
  */
  public push (count : number = 1) : void {
    this.size += count
  }

  /**
  * @see VertexStructureBuffer.concat
  */
  public concat (...others : VertexStructureBuffer[]) : void {
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
  }

  private _concatIn (other : VertexStructureBuffer) {
    const oldSize : number = this.size
    this.size += other.size

    const capacity : number = this.capacity
    let fieldIndex : number = this.format.fields.length

    while (fieldIndex --) {
      const field : VertexStructure.Field = this.format.fields[fieldIndex]

      const target : number = field.start * capacity + field.size * oldSize
      const start : number = field.start * other.capacity
      const end : number = start + field.size * other.size

      this.buffer.copy(other.buffer, start, target, end - start)
    }
  }

  /**
  * @see VertexStructureBuffer.copyWithin
  */
  public copyWithin (target : number, start : number = 0, end : number = this.size) : void {
    const capacity : number = this.capacity
    let fieldIndex : number = this.format.fields.length

    const ftarget : number = Math.min(target, this.size)
    const fend : number = target + end - start > this.size ? start + this.size - target
                                                           : end
    const fstart : number  = start > fend ? fend : start

    while (fieldIndex --) {
      const field : VertexStructure.Field = this.format.fields[fieldIndex]

      this.buffer.copyWithin(
        field.start * capacity + ftarget * field.size,
        field.start * capacity + fstart * field.size,
        field.start * capacity + fend * field.size
      )
    }
  }

  /**
  * @see VertexStructureBuffer.equals
  */
  public equals (other : any) : boolean {
    if (other == null) return false
    if (other == this) return true

    if (other instanceof GroupedVertexStructureBuffer) {
      if (!other.format.equals(this.format)) return false
      if (other.size !== this.size) return false

      for (let field of this.format.fields) {
        const myoffset : number = field.start * this.capacity
        const otheroffset : number = field.start * other.capacity
        const bytesize : number = this.size * field.size

        for (let index = 0; index < bytesize; ++index) {
          if (this.buffer[myoffset + index] != other.buffer[otheroffset + index]) return false
        }
      }

      return true
    }

    return false
  }

  /**
  * @see VertexStructureBuffer.clone
  */
  public clone () : GroupedVertexStructureBuffer {
    const result  : GroupedVertexStructureBuffer = new GroupedVertexStructureBuffer(
      this.format, this.capacity
    )

    result.size = this.size
    result.buffer.copy(this.buffer)

    return result
  }

  /**
  * @see VertexStructureBuffer.clear
  */
  public clear () : void {
    this._size = 0
  }
}

export namespace GroupedVertexStructureBuffer {
  /**
  * Create a clone of another grouped vertex structure buffer.
  *
  * @param toClone - A grouped vertex structure buffer instance to clone.
  *
  * @return A clone of the given buffer instance.
  */
  export function copy (toCopy : undefined) : undefined
  export function copy (toCopy : null) : null
  export function copy (toCopy : GroupedVertexStructureBuffer) : GroupedVertexStructureBuffer
  export function copy (toCopy : GroupedVertexStructureBuffer | undefined | null) : GroupedVertexStructureBuffer | undefined | null {
    return toCopy == null ? toCopy : toCopy.clone()
  }
}
