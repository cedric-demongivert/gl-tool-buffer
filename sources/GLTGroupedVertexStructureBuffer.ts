import { upperFirst } from 'lodash'

import { GLTEndianess } from './GLTEndianess'

import { GLTVertexStructureBuffer } from './GLTVertexStructureBuffer'
import { GLTVertexFieldType } from './GLTVertexFieldType'
import { GLTVertexBuffer } from './GLTVertexBuffer'
import { GLTVertexStructure } from './GLTVertexStructure'

const ACCESSORS_FACTORIES = new Map()

/**
 * 
 */
function define(instance: any, name: string, callback: any): void {
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
function configureByteField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function setByteField(this: GLTGroupedVertexStructureBuffer, index: number, value: number): void {
    this.buffer.setByte(field.start * this.capacity + index * field.size, value)
  }

  function getByteField(this: GLTGroupedVertexStructureBuffer, index: number): number {
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
function configureUnsignedByteField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function setUnsignedByteField(this: GLTGroupedVertexStructureBuffer, index: number, value: number): void {
    this.buffer.setUnsignedByte(field.start * this.capacity + index * field.size, value)
  }

  function getUnsignedByteField(this: GLTGroupedVertexStructureBuffer, index: number): number {
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
function configureIntField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function setIntField(this: GLTGroupedVertexStructureBuffer, index: number, value: number): void {
    this.buffer.setInt(field.start * this.capacity + index * field.size, value)
  }

  function getIntField(this: GLTGroupedVertexStructureBuffer, index: number): number {
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
function configure2IntVectorField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function set2IntVectorField(this: GLTGroupedVertexStructureBuffer, index: number, x: number, y: number): void {
    this.buffer.set2IntVector(field.start * this.capacity + index * field.size, x, y)
  }

  function get2IntVectorField(this: GLTGroupedVertexStructureBuffer, index: number, component: number): number {
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
function configure3IntVectorField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function set3IntVectorField(this: GLTGroupedVertexStructureBuffer, index: number, x: number, y: number, z: number): void {
    this.buffer.set3IntVector(field.start * this.capacity + index * field.size, x, y, z)
  }

  function get3IntVectorField(this: GLTGroupedVertexStructureBuffer, index: number, component: number): number {
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
function configure4IntVectorField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function set4IntVectorField(this: GLTGroupedVertexStructureBuffer, index: number, x: number, y: number, z: number, w: number): void {
    this.buffer.set4IntVector(field.start * this.capacity + index * field.size, x, y, z, w)
  }

  function get4IntVectorField(this: GLTGroupedVertexStructureBuffer, index: number, component: number): number {
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
function configureUnsignedIntField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function setUnsignedIntField(this: GLTGroupedVertexStructureBuffer, index: number, value: number): void {
    this.buffer.setUnsignedInt(field.start * this.capacity + index * field.size, value)
  }

  function getUnsignedIntField(this: GLTGroupedVertexStructureBuffer, index: number): number {
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
function configureShortField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function setShortField(this: GLTGroupedVertexStructureBuffer, index: number, value: number): void {
    this.buffer.setShort(field.start * this.capacity + index * field.size, value)
  }

  function getShortField(this: GLTGroupedVertexStructureBuffer, index: number): number {
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
function configureFloatField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function setFloatField(this: GLTGroupedVertexStructureBuffer, index: number, value: number): void {
    this.buffer.setFloat(field.start * this.capacity + index * field.size, value)
  }

  function getFloatField(this: GLTGroupedVertexStructureBuffer, index: number): number {
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
function configure2FloatVectorField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function set2FloatVectorField(this: GLTGroupedVertexStructureBuffer, index: number, x: number, y: number): void {
    this.buffer.set2FloatVector(field.start * this.capacity + index * field.size, x, y)
  }

  function get2FloatVectorField(this: GLTGroupedVertexStructureBuffer, index: number, component: number): number {
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
function configure3FloatVectorField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function set3FloatVectorField(this: GLTGroupedVertexStructureBuffer, index: number, x: number, y: number, z: number): void {
    this.buffer.set3FloatVector(
      field.start * this.capacity + index * field.size,
      x, y, z
    )
  }

  function get3FloatVectorField(this: GLTGroupedVertexStructureBuffer, index: number, component: number): number {
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
function configure4FloatVectorField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function set4FloatVectorField(this: GLTGroupedVertexStructureBuffer, index: number, x: number, y: number, z: number, w: number): void {
    this.buffer.set4FloatVector(
      field.start * this.capacity + index * field.size,
      x, y, z, w
    )
  }

  function get4FloatVectorField(this: GLTGroupedVertexStructureBuffer, index: number, component: number): number {
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
function configure2FloatMatrixField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function set2FloatMatrixField(this: GLTGroupedVertexStructureBuffer, index: number, a: number, b: number, c: number, d: number): void {
    this.buffer.set2x2FloatMatrix(
      field.start * this.capacity + index * field.size,
      a, b, c, d
    )
  }

  function get2FloatMatrixField(this: GLTGroupedVertexStructureBuffer, index: number, x: number, y: number): number {
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
function configure3FloatMatrixField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function set3FloatMatrixField(
    this: GLTGroupedVertexStructureBuffer, index: number,
    a: number, b: number, c: number,
    d: number, e: number, f: number,
    g: number, h: number, i: number
  ): void {
    this.buffer.set3x3FloatMatrix(
      field.start * this.capacity + index * field.size,
      a, b, c,
      d, e, f,
      g, h, i
    )
  }

  function get3FloatMatrixField(this: GLTGroupedVertexStructureBuffer, index: number, x: number, y: number): number {
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
function configure4FloatMatrixField(field: GLTVertexStructure.Field, instance: GLTGroupedVertexStructureBuffer): void {
  function set4FloatMatrixField(
    this: GLTGroupedVertexStructureBuffer, index: number,
    a: number, b: number, c: number, d: number,
    e: number, f: number, g: number, h: number,
    i: number, j: number, k: number, l: number,
    m: number, n: number, o: number, p: number
  ): void {
    this.buffer.set4x4FloatMatrix(
      field.start * this.capacity + index * field.size,
      a, b, c, d,
      e, f, g, h,
      i, j, k, l,
      m, n, o, p
    )
  }

  function get4FloatMatrixField(this: GLTGroupedVertexStructureBuffer, index: number, x: number, y: number): number {
    return this.buffer.get4x4FloatMatrix(
      field.start * this.capacity + index * field.size,
      x, y
    )
  }

  define(instance, `set${upperFirst(field.name)}`, set4FloatMatrixField)
  define(instance, `get${upperFirst(field.name)}`, get4FloatMatrixField)
}

ACCESSORS_FACTORIES.set(GLTVertexFieldType.BYTE, configureByteField)
ACCESSORS_FACTORIES.set(GLTVertexFieldType.UNSIGNED_BYTE, configureUnsignedByteField)
ACCESSORS_FACTORIES.set(GLTVertexFieldType.INT, configureIntField)
ACCESSORS_FACTORIES.set(GLTVertexFieldType.INT_VEC2, configure2IntVectorField)
ACCESSORS_FACTORIES.set(GLTVertexFieldType.INT_VEC3, configure3IntVectorField)
ACCESSORS_FACTORIES.set(GLTVertexFieldType.INT_VEC4, configure4IntVectorField)
ACCESSORS_FACTORIES.set(GLTVertexFieldType.UNSIGNED_INT, configureUnsignedIntField)
ACCESSORS_FACTORIES.set(GLTVertexFieldType.SHORT, configureShortField)
ACCESSORS_FACTORIES.set(GLTVertexFieldType.FLOAT, configureFloatField)
ACCESSORS_FACTORIES.set(GLTVertexFieldType.FLOAT_VEC2, configure2FloatVectorField)
ACCESSORS_FACTORIES.set(GLTVertexFieldType.FLOAT_VEC3, configure3FloatVectorField)
ACCESSORS_FACTORIES.set(GLTVertexFieldType.FLOAT_VEC4, configure4FloatVectorField)
ACCESSORS_FACTORIES.set(GLTVertexFieldType.FLOAT_MAT2, configure2FloatMatrixField)
ACCESSORS_FACTORIES.set(GLTVertexFieldType.FLOAT_MAT3, configure3FloatMatrixField)
ACCESSORS_FACTORIES.set(GLTVertexFieldType.FLOAT_MAT4, configure4FloatMatrixField)

/**
* A vertex buffer based on a given vertex structure.
*/
export class GLTGroupedVertexStructureBuffer implements GLTVertexStructureBuffer {
  /**
   * 
   */
  public readonly buffer: GLTVertexBuffer

  /**
   * 
   */
  public readonly format: GLTVertexStructure

  /**
   * 
   */
  private _size: number

  /**
  * Create a new vertex structure buffer with a given format.
  *
  * @param format - Format of all vertex structures stored into this buffer.
  * @param [capacity = 16] - Initial capacity of the buffer.
  * @param [littleEndian = GLTEndianess.IS_LITTLE_ENDIAN] - Underlying byte format.
  */
  public constructor(format: GLTVertexStructure, capacity: number = 16, littleEndian: boolean = GLTEndianess.IS_LITTLE_ENDIAN) {
    this._size = 0
    this.buffer = GLTVertexBuffer.empty(capacity * format.size, littleEndian)
    this.buffer.size = this.buffer.capacity
    this.format = format

    for (const field of format.fields) {
      (ACCESSORS_FACTORIES.get(field.type))(field, this)
    }
  }

  /**
  * @see GLTVertexStructureBuffer#get capacity
  */
  public get capacity(): number {
    return this.buffer.capacity / this.format.size
  }

  /**
  * @see GLTVertexStructureBuffer#set capacity
  */
  public set capacity(capacity: number) {
    if (capacity !== this.capacity) {
      const oldCapacity = this.capacity

      if (capacity > oldCapacity) {
        this._expand(oldCapacity, capacity)
      } else {
        this._reduce(oldCapacity, capacity)
      }
    }
  }

  private _expand(oldCapacity: number, capacity: number): void {
    this.buffer.capacity = this.format.size * capacity
    this.buffer.size = this.format.size * capacity

    let fieldIndex: number = this.format.fields.length

    while (fieldIndex--) {
      const field: GLTVertexStructure.Field = this.format.fields[fieldIndex]

      this.buffer.copyWithin(
        field.start * capacity,
        field.start * oldCapacity,
        field.end * oldCapacity
      )
    }
  }

  private _reduce(oldCapacity: number, capacity: number): void {
    if (capacity < this._size) this._size = capacity

    for (let fieldIndex = 0; fieldIndex < this.format.fields.length; ++fieldIndex) {
      const field: GLTVertexStructure.Field = this.format.fields[fieldIndex]

      this.buffer.copyWithin(field.start * capacity, field.start * oldCapacity, field.end * oldCapacity)
    }

    this.buffer.capacity = this.format.size * capacity
    this.buffer.size = this.format.size * capacity
  }

  /**
  * @see GLTVertexStructureBuffer.size
  */
  public get size(): number {
    return this._size
  }

  /**
  * @see GLTVertexStructureBuffer.size
  */
  public set size(newSize: number) {
    if (newSize < 0) {
      throw new Error('A FaceBuffer size can\'t be negative.')
    }

    if (newSize > this.capacity) this.capacity = newSize
    const oldSize = this._size
    this._size = newSize

    let fieldIndex = this.format.fields.length

    while (fieldIndex--) {
      const field: GLTVertexStructure.Field = this.format.fields[fieldIndex]

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
  public set(vertex: number, identifier: string, value: number): void
  /**
   * 
   */
  public set(vertex: number, identifier: string, x: number, y: number): void
  /**
   * 
   */
  public set(vertex: number, identifier: string, x: number, y: number, z: number): void
  /**
   * 
   */
  public set(vertex: number, identifier: string, x: number, y: number, z: number, w: number): void
  /**
   * 
   */
  public set(
    vertex: number, identifier: string,
    a: number, b: number,
    c: number, d: number
  ): void
  /**
   * 
   */
  public set(
    vertex: number, identifier: string,
    a: number, b: number, c: number,
    d: number, e: number, f: number,
    g: number, h: number, i: number
  ): void
  /**
   * 
   */
  public set(
    vertex: number, identifier: string,
    a: number, b: number, c: number, d: number,
    e: number, f: number, g: number, h: number,
    i: number, j: number, k: number, l: number,
    m: number, n: number, o: number, p: number
  ): void
  /**
   * 
   */
  public set(vertex: number, identifier: number, value: number): void
  /**
   * 
   */
  public set(vertex: number, identifier: number, x: number, y: number): void
  /**
   * 
   */
  public set(vertex: number, identifier: number, x: number, y: number, z: number): void
  /**
   * 
   */
  public set(vertex: number, identifier: number, x: number, y: number, z: number, w: number): void
  /**
   * 
   */
  public set(
    vertex: number, identifier: number,
    a: number, b: number,
    c: number, d: number
  ): void
  /**
   * 
   */
  public set(
    vertex: number, identifier: number,
    a: number, b: number, c: number,
    d: number, e: number, f: number,
    g: number, h: number, i: number
  ): void
  /**
   * 
   */
  public set(
    vertex: number, identifier: number,
    a: number, b: number, c: number, d: number,
    e: number, f: number, g: number, h: number,
    i: number, j: number, k: number, l: number,
    m: number, n: number, o: number, p: number
  ): void
  /**
   * 
   */
  public set(
    vertex: number, identifier: number | string,
    a: number, b?: number, c?: number, d?: number,
    e?: number, f?: number, g?: number, h?: number,
    i?: number, j?: number, k?: number, l?: number,
    m?: number, n?: number, o?: number, p?: number
  ): void {
    const field: GLTVertexStructure.Field = (
      typeof identifier === 'string' ? this.format.get(identifier)
        : this.format.fields[identifier]
    )

    switch (field.type) {
      case GLTVertexFieldType.BYTE:
        return this.buffer.setByte(this.capacity * field.start + field.size * vertex, a)
      case GLTVertexFieldType.SHORT:
        return this.buffer.setShort(this.capacity * field.start + field.size * vertex, a)
      case GLTVertexFieldType.INT:
        return this.buffer.setInt(this.capacity * field.start + field.size * vertex, a)
      case GLTVertexFieldType.BOOL:
        throw new Error('Boolean type is not supported yet.')
      case GLTVertexFieldType.FLOAT:
        return this.buffer.setFloat(this.capacity * field.start + field.size * vertex, a)
      case GLTVertexFieldType.UNSIGNED_BYTE:
        return this.buffer.setUnsignedByte(this.capacity * field.start + field.size * vertex, a)
      case GLTVertexFieldType.UNSIGNED_INT:
        return this.buffer.setUnsignedInt(this.capacity * field.start + field.size * vertex, a)
      case GLTVertexFieldType.UNSIGNED_SHORT:
        return this.buffer.setUnsignedShort(this.capacity * field.start + field.size * vertex, a)
      case GLTVertexFieldType.INT_VEC2:
        return this.buffer.set2IntVector(this.capacity * field.start + field.size * vertex, a, b)
      case GLTVertexFieldType.INT_VEC3:
        return this.buffer.set3IntVector(this.capacity * field.start + field.size * vertex, a, b, c)
      case GLTVertexFieldType.INT_VEC4:
        return this.buffer.set4IntVector(this.capacity * field.start + field.size * vertex, a, b, c, d)
      case GLTVertexFieldType.BOOL_VEC2:
      case GLTVertexFieldType.BOOL_VEC3:
      case GLTVertexFieldType.BOOL_VEC4:
        throw new Error('Boolean vector type is not supported yet.')
      case GLTVertexFieldType.FLOAT_VEC2:
        return this.buffer.set2FloatVector(this.capacity * field.start + field.size * vertex, a, b)
      case GLTVertexFieldType.FLOAT_VEC3:
        return this.buffer.set3FloatVector(this.capacity * field.start + field.size * vertex, a, b, c)
      case GLTVertexFieldType.FLOAT_VEC4:
        return this.buffer.set4FloatVector(this.capacity * field.start + field.size * vertex, a, b, c, d)
      case GLTVertexFieldType.FLOAT_MAT2:
        return this.buffer.set2x2FloatMatrix(this.capacity * field.start + field.size * vertex, a, b, c, d)
      case GLTVertexFieldType.FLOAT_MAT3:
        return this.buffer.set3x3FloatMatrix(this.capacity * field.start + field.size * vertex, a, b, c, d, e, f, g, h, i)
      case GLTVertexFieldType.FLOAT_MAT4:
        return this.buffer.set4x4FloatMatrix(this.capacity * field.start + field.size * vertex, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
      default:
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
  public get(vertex: number, identifier: string): number
  /**
   * 
   */
  public get(vertex: number, identifier: string, index: number): number
  /**
   * 
   */
  public get(vertex: number, identifier: string, x: number, y: number): number
  /**
   * 
   */
  public get(vertex: number, identifier: number): number
  /**
   * 
   */
  public get(vertex: number, identifier: number, index: number): number
  /**
   * 
   */
  public get(vertex: number, identifier: number, x: number, y: number): number
  public get(vertex: number, identifier: number | string, x?: number, y?: number): number {
    const field: GLTVertexStructure.Field = (
      typeof identifier === 'string' ? this.format.get(identifier)
        : this.format.fields[identifier]
    )

    switch (field.type) {
      case GLTVertexFieldType.BYTE:
        return this.buffer.getByte(this.capacity * field.start + field.size * vertex)
      case GLTVertexFieldType.SHORT:
        return this.buffer.getShort(this.capacity * field.start + field.size * vertex)
      case GLTVertexFieldType.INT:
        return this.buffer.getInt(this.capacity * field.start + field.size * vertex)
      case GLTVertexFieldType.BOOL:
        throw new Error('Boolean type is not supported yet.')
      case GLTVertexFieldType.FLOAT:
        return this.buffer.getFloat(this.capacity * field.start + field.size * vertex)
      case GLTVertexFieldType.UNSIGNED_BYTE:
        return this.buffer.getUnsignedByte(this.capacity * field.start + field.size * vertex)
      case GLTVertexFieldType.UNSIGNED_INT:
        return this.buffer.getUnsignedInt(this.capacity * field.start + field.size * vertex)
      case GLTVertexFieldType.UNSIGNED_SHORT:
        return this.buffer.getUnsignedShort(this.capacity * field.start + field.size * vertex)
      case GLTVertexFieldType.INT_VEC2:
      case GLTVertexFieldType.INT_VEC3:
      case GLTVertexFieldType.INT_VEC4:
        return this.buffer.getIntVector(this.capacity * field.start + field.size * vertex, x)
      case GLTVertexFieldType.BOOL_VEC2:
      case GLTVertexFieldType.BOOL_VEC3:
      case GLTVertexFieldType.BOOL_VEC4:
        throw new Error('Boolean vector type is not supported yet.')
      case GLTVertexFieldType.FLOAT_VEC2:
      case GLTVertexFieldType.FLOAT_VEC3:
      case GLTVertexFieldType.FLOAT_VEC4:
        return this.buffer.getFloatVector(this.capacity * field.start + field.size * vertex, x)
      case GLTVertexFieldType.FLOAT_MAT2:
        return this.buffer.get2x2FloatMatrix(this.capacity * field.start + field.size * vertex, x, y)
      case GLTVertexFieldType.FLOAT_MAT3:
        return this.buffer.get3x3FloatMatrix(this.capacity * field.start + field.size * vertex, x, y)
      case GLTVertexFieldType.FLOAT_MAT4:
        return this.buffer.get4x4FloatMatrix(this.capacity * field.start + field.size * vertex, x, y)
      default:
        throw new Error(
          'Unable to retrieve #' + field.identifier + ' "' + field.name + '" ' +
          'data, because the given field type ' + field.type + ' is not ' +
          'supported yet.'
        )
    }
  }

  /**
  * @see GLTVertexStructureBuffer.delete
  */
  public delete(index: number, count: number = 1): void {
    const capacity: number = this.capacity
    let fieldIndex: number = this.format.fields.length

    while (fieldIndex--) {
      const field: GLTVertexStructure.Field = this.format.fields[fieldIndex]

      this.buffer.copyWithin(
        field.start * capacity + index * field.size,
        field.start * capacity + (index + count) * field.size,
        field.end * capacity
      )
    }

    this._size -= count
  }

  /**
  * @see GLTVertexStructureBuffer.push
  */
  public push(count: number = 1): void {
    this.size += count
  }

  /**
  * @see GLTVertexStructureBuffer.concat
  */
  public concat(...others: GLTVertexStructureBuffer[]): void {
    for (const other of others) {
      if (other.format.equals(this.format)) {
        this._concatIn(other)
      } else {
        throw new Error([
          'Trying to concat two GLTVertexStructureBuffer with different ',
          'vertex structure.'
        ].join(''))
      }
    }
  }

  private _concatIn(other: GLTVertexStructureBuffer) {
    const oldSize: number = this.size
    this.size += other.size

    const capacity: number = this.capacity
    let fieldIndex: number = this.format.fields.length

    while (fieldIndex--) {
      const field: GLTVertexStructure.Field = this.format.fields[fieldIndex]

      const target: number = field.start * capacity + field.size * oldSize
      const start: number = field.start * other.capacity
      const end: number = start + field.size * other.size

      this.buffer.copy(other.buffer, start, target, end - start)
    }
  }

  /**
  * @see GLTVertexStructureBuffer.copyWithin
  */
  public copyWithin(target: number, start: number = 0, end: number = this.size): void {
    const capacity: number = this.capacity
    let fieldIndex: number = this.format.fields.length

    const ftarget: number = Math.min(target, this.size)
    const fend: number = target + end - start > this.size ? start + this.size - target
      : end
    const fstart: number = start > fend ? fend : start

    while (fieldIndex--) {
      const field: GLTVertexStructure.Field = this.format.fields[fieldIndex]

      this.buffer.copyWithin(
        field.start * capacity + ftarget * field.size,
        field.start * capacity + fstart * field.size,
        field.start * capacity + fend * field.size
      )
    }
  }

  /**
  * @see GLTVertexStructureBuffer.equals
  */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other == this) return true

    if (other instanceof GLTGroupedVertexStructureBuffer) {
      if (!other.format.equals(this.format)) return false
      if (other.size !== this.size) return false

      for (let field of this.format.fields) {
        const myoffset: number = field.start * this.capacity
        const otheroffset: number = field.start * other.capacity
        const bytesize: number = this.size * field.size

        for (let index = 0; index < bytesize; ++index) {
          if (this.buffer[myoffset + index] != other.buffer[otheroffset + index]) return false
        }
      }

      return true
    }

    return false
  }

  /**
  * @see GLTVertexStructureBuffer.clone
  */
  public clone(): GLTGroupedVertexStructureBuffer {
    const result: GLTGroupedVertexStructureBuffer = new GLTGroupedVertexStructureBuffer(
      this.format, this.capacity
    )

    result.size = this.size
    result.buffer.copy(this.buffer)

    return result
  }

  /**
  * @see GLTVertexStructureBuffer.clear
  */
  public clear(): void {
    this._size = 0
  }
}

export namespace GLTGroupedVertexStructureBuffer {
  /**
  * Create a clone of another grouped vertex structure buffer.
  *
  * @param toClone - A grouped vertex structure buffer instance to clone.
  *
  * @return A clone of the given buffer instance.
  */
  export function copy(toCopy: undefined): undefined
  /**
   * 
   */
  export function copy(toCopy: null): null
  /**
   * 
   */
  export function copy(toCopy: GLTGroupedVertexStructureBuffer): GLTGroupedVertexStructureBuffer
  /**
   * 
   */
  export function copy(toCopy: GLTGroupedVertexStructureBuffer | undefined | null): GLTGroupedVertexStructureBuffer | undefined | null
  export function copy(toCopy: GLTGroupedVertexStructureBuffer | undefined | null): GLTGroupedVertexStructureBuffer | undefined | null {
    return toCopy == null ? toCopy : toCopy.clone()
  }
}
