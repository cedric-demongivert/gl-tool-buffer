import { upperFirst } from 'lodash'

import { GLTEndianess } from './GLTEndianess'

import { GLTVertexBuffer } from './GLTVertexBuffer'
import { GLTVertexStructureBuffer } from './GLTVertexStructureBuffer'
import { GLTVertexFieldType } from './GLTVertexFieldType'
import { GLTVertexStructure } from './GLTVertexStructure'

/**
 * 
 */
type AccessorFactory = (name: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer) => void

/**
 * 
 */
const ACCESSORS_FACTORIES = new Map<GLTVertexFieldType, AccessorFactory>()

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
function configureByteField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function setByteField(this: GLTInterleavedVertexStructureBuffer, index: number, value: number): void {
    this.buffer.setByte(field.start + this.format.size * index, value)
  }

  function getByteField(this: GLTInterleavedVertexStructureBuffer, index: number): number {
    return this.buffer.getByte(field.start + this.format.size * index)
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
function configureUnsignedByteField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function setUnsignedByteField(this: GLTInterleavedVertexStructureBuffer, index: number, value: number): void {
    this.buffer.setUnsignedByte(field.start + this.format.size * index, value)
  }

  function getUnsignedByteField(this: GLTInterleavedVertexStructureBuffer, index: number): number {
    return this.buffer.getUnsignedByte(field.start + this.format.size * index)
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
function configureIntField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function setIntField(this: GLTInterleavedVertexStructureBuffer, index: number, value: number): void {
    this.buffer.setInt(
      field.start + this.format.size * index,
      value
    )
  }

  function getIntField(this: GLTInterleavedVertexStructureBuffer, index: number): number {
    return this.buffer.getInt(
      field.start + this.format.size * index
    )
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
function configure2IntVectorField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function get2IntVectorField(this: GLTInterleavedVertexStructureBuffer, index: number, x: number, y: number): void {
    this.buffer.set2IntVector(field.start + this.format.size * index, x, y)
  }

  function set2IntVectorField(this: GLTInterleavedVertexStructureBuffer, index: number, component: number): number {
    return this.buffer.getIntVector(field.start + this.format.size * index, component)
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
function configure3IntVectorField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function set3IntVectorField(this: GLTInterleavedVertexStructureBuffer, index: number, x: number, y: number, z: number): void {
    this.buffer.set3IntVector(field.start + this.format.size * index, x, y, z)
  }

  function get3IntVectorField(this: GLTInterleavedVertexStructureBuffer, index: number, component: number): number {
    return this.buffer.getIntVector(field.start + this.format.size * index, component)
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
function configure4IntVectorField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function set4IntVectorField(this: GLTInterleavedVertexStructureBuffer, index: number, x: number, y: number, z: number, w: number): void {
    this.buffer.set4IntVector(field.start + this.format.size * index, x, y, z, w)
  }

  function get4IntVectorField(this: GLTInterleavedVertexStructureBuffer, index: number, component: number): number {
    return this.buffer.getIntVector(field.start + this.format.size * index, component)
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
function configureUnsignedIntField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function setUnsignedIntField(this: GLTInterleavedVertexStructureBuffer, index: number, value: number): void {
    this.buffer.setUnsignedInt(field.start + this.format.size * index, value)
  }

  function getUnsignedIntField(this: GLTInterleavedVertexStructureBuffer, index: number): number {
    return this.buffer.getUnsignedInt(field.start + this.format.size * index)
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
function configureShortField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function setShortField(this: GLTInterleavedVertexStructureBuffer, index: number, value: number): void {
    this.buffer.setShort(field.start + this.format.size * index, value)
  }

  function getShortField(this: GLTInterleavedVertexStructureBuffer, index: number): number {
    return this.buffer.getShort(field.start + this.format.size * index)
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
function configureFloatField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function setFloatField(this: GLTInterleavedVertexStructureBuffer, index: number, value: number): void {
    this.buffer.setFloat(field.start + this.format.size * index, value)
  }

  function getFloatField(this: GLTInterleavedVertexStructureBuffer, index: number): number {
    return this.buffer.getFloat(field.start + this.format.size * index)
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
function configure2FloatVectorField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function set2FloatVectorField(this: GLTInterleavedVertexStructureBuffer, index: number, x: number, y: number): void {
    this.buffer.set2FloatVector(
      field.start + this.format.size * index,
      x, y
    )
  }

  function get2FloatVectorField(this: GLTInterleavedVertexStructureBuffer, index: number, component: number): number {
    return this.buffer.getFloatVector(
      field.start + this.format.size * index,
      component
    )
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
function configure3FloatVectorField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function set3FloatVectorField(this: GLTInterleavedVertexStructureBuffer, index: number, x: number, y: number, z: number): void {
    this.buffer.set3FloatVector(field.start + this.format.size * index, x, y, z)
  }

  function get3FloatVectorField(this: GLTInterleavedVertexStructureBuffer, index: number, component: number): number {
    return this.buffer.getFloatVector(field.start + this.format.size * index, component)
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
function configure4FloatVectorField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function set4FloatVectorField(this: GLTInterleavedVertexStructureBuffer, index: number, x: number, y: number, z: number, w: number): void {
    this.buffer.set4FloatVector(field.start + this.format.size * index, x, y, z, w)
  }

  function get4FloatVectorField(this: GLTInterleavedVertexStructureBuffer, index: number, component: number): number {
    return this.buffer.getFloatVector(field.start + this.format.size * index, component)
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
function configure2FloatMatrixField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function set2FloatMatrixField(this: GLTInterleavedVertexStructureBuffer, index: number, a: number, b: number, c: number, d: number): void {
    this.buffer.set2x2FloatMatrix(field.start + this.format.size * index, a, b, c, d)
  }

  function get2FloatMatrixField(this: GLTInterleavedVertexStructureBuffer, index: number, x: number, y: number): number {
    return this.buffer.get2x2FloatMatrix(field.start + this.format.size * index, x, y)
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
function configure3FloatMatrixField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function set3FloatMatrixField(
    this: GLTInterleavedVertexStructureBuffer, index: number,
    a: number, b: number, c: number,
    d: number, e: number, f: number,
    g: number, h: number, i: number
  ): void {
    this.buffer.set3x3FloatMatrix(
      field.start + this.format.size * index,
      a, b, c,
      d, e, f,
      g, h, i
    )
  }

  function get3FloatMatrixField(this: GLTInterleavedVertexStructureBuffer, index: number, x: number, y: number): number {
    return this.buffer.get3x3FloatMatrix(field.start + this.format.size * index, x, y)
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
function configure4FloatMatrixField(field: GLTVertexStructure.Field, instance: GLTInterleavedVertexStructureBuffer): void {
  function set4FloatMatrixField(
    this: GLTInterleavedVertexStructureBuffer, index: number,
    a: number, b: number, c: number, d: number,
    e: number, f: number, g: number, h: number,
    i: number, j: number, k: number, l: number,
    m: number, n: number, o: number, p: number
  ): void {
    this.buffer.set4x4FloatMatrix(
      field.start + this.format.size * index,
      a, b, c, d,
      e, f, g, h,
      i, j, k, l,
      m, n, o, p
    )
  }

  function get4FloatMatrixField(this: GLTInterleavedVertexStructureBuffer, index: number, x: number, y: number): number {
    return this.buffer.get4x4FloatMatrix(
      field.start + this.format.size * index,
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
export class GLTInterleavedVertexStructureBuffer implements GLTVertexStructureBuffer {
  /**
   * 
   */
  public readonly buffer: GLTVertexBuffer

  /**
   * 
   */
  public readonly format: GLTVertexStructure

  /**
  * Create a new vertex structure buffer with a given format.
  *
  * @param format - Format of all vertex structures stored into this buffer.
  * @param [capacity = 16] - Initial capacity of the buffer.
  * @param [littleEndian = GLTEndianess.IS_LITTLE_ENDIAN] - Underlying byte format.
  */
  public constructor(format: GLTVertexStructure, capacity: number = 16, littleEndian: boolean = GLTEndianess.IS_LITTLE_ENDIAN) {
    this.buffer = GLTVertexBuffer.empty(capacity * format.size, littleEndian)
    this.format = format

    for (const field of format.fields) {
      (ACCESSORS_FACTORIES.get(field.type))(field, this)
    }
  }

  /**
  * @see GLTVertexStructureBuffer.capacity
  */
  public get capacity(): number {
    return this.buffer.capacity / this.format.size
  }

  /**
  * @see GLTVertexStructureBuffer#set capacity
  */
  public set capacity(capacity: number) {
    this.buffer.capacity = this.format.size * capacity
  }

  /**
  * @see GLTVertexStructureBuffer.size
  */
  public get size(): number {
    return this.buffer.size / this.format.size
  }

  /**
  * @see GLTVertexStructureBuffer.size
  */
  public set size(newSize: number) {
    this.buffer.size = this.format.size * newSize
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
        return this.buffer.setByte(vertex * this.format.size + field.start, a)
      case GLTVertexFieldType.SHORT:
        return this.buffer.setShort(vertex * this.format.size + field.start, a)
      case GLTVertexFieldType.INT:
        return this.buffer.setInt(vertex * this.format.size + field.start, a)
      case GLTVertexFieldType.BOOL:
        throw new Error('Boolean type is not supported yet.')
      case GLTVertexFieldType.FLOAT:
        return this.buffer.setFloat(vertex * this.format.size + field.start, a)
      case GLTVertexFieldType.UNSIGNED_BYTE:
        return this.buffer.setUnsignedByte(vertex * this.format.size + field.start, a)
      case GLTVertexFieldType.UNSIGNED_INT:
        return this.buffer.setUnsignedInt(vertex * this.format.size + field.start, a)
      case GLTVertexFieldType.UNSIGNED_SHORT:
        return this.buffer.setUnsignedShort(vertex * this.format.size + field.start, a)
      case GLTVertexFieldType.INT_VEC2:
        return this.buffer.set2IntVector(vertex * this.format.size + field.start, a, b)
      case GLTVertexFieldType.INT_VEC3:
        return this.buffer.set3IntVector(vertex * this.format.size + field.start, a, b, c)
      case GLTVertexFieldType.INT_VEC4:
        return this.buffer.set4IntVector(vertex * this.format.size + field.start, a, b, c, d)
      case GLTVertexFieldType.BOOL_VEC2:
      case GLTVertexFieldType.BOOL_VEC3:
      case GLTVertexFieldType.BOOL_VEC4:
        throw new Error('Boolean vector type is not supported yet.')
      case GLTVertexFieldType.FLOAT_VEC2:
        return this.buffer.set2FloatVector(vertex * this.format.size + field.start, a, b)
      case GLTVertexFieldType.FLOAT_VEC3:
        return this.buffer.set3FloatVector(vertex * this.format.size + field.start, a, b, c)
      case GLTVertexFieldType.FLOAT_VEC4:
        return this.buffer.set4FloatVector(vertex * this.format.size + field.start, a, b, c, d)
      case GLTVertexFieldType.FLOAT_MAT2:
        return this.buffer.set2x2FloatMatrix(vertex * this.format.size + field.start, a, b, c, d)
      case GLTVertexFieldType.FLOAT_MAT3:
        return this.buffer.set3x3FloatMatrix(vertex * this.format.size + field.start, a, b, c, d, e, f, g, h, i)
      case GLTVertexFieldType.FLOAT_MAT4:
        return this.buffer.set4x4FloatMatrix(vertex * this.format.size + field.start, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
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
        return this.buffer.getByte(vertex * this.format.size + field.start)
      case GLTVertexFieldType.SHORT:
        return this.buffer.getShort(vertex * this.format.size + field.start)
      case GLTVertexFieldType.INT:
        return this.buffer.getInt(vertex * this.format.size + field.start)
      case GLTVertexFieldType.BOOL:
        throw new Error('Boolean type is not supported yet.')
      case GLTVertexFieldType.FLOAT:
        return this.buffer.getFloat(vertex * this.format.size + field.start)
      case GLTVertexFieldType.UNSIGNED_BYTE:
        return this.buffer.getUnsignedByte(vertex * this.format.size + field.start)
      case GLTVertexFieldType.UNSIGNED_INT:
        return this.buffer.getUnsignedInt(vertex * this.format.size + field.start)
      case GLTVertexFieldType.UNSIGNED_SHORT:
        return this.buffer.getUnsignedShort(vertex * this.format.size + field.start)
      case GLTVertexFieldType.INT_VEC2:
      case GLTVertexFieldType.INT_VEC3:
      case GLTVertexFieldType.INT_VEC4:
        return this.buffer.getIntVector(vertex * this.format.size + field.start, x)
      case GLTVertexFieldType.BOOL_VEC2:
      case GLTVertexFieldType.BOOL_VEC3:
      case GLTVertexFieldType.BOOL_VEC4:
        throw new Error('Boolean vector type is not supported yet.')
      case GLTVertexFieldType.FLOAT_VEC2:
      case GLTVertexFieldType.FLOAT_VEC3:
      case GLTVertexFieldType.FLOAT_VEC4:
        return this.buffer.getFloatVector(vertex * this.format.size + field.start, x)
      case GLTVertexFieldType.FLOAT_MAT2:
        return this.buffer.get2x2FloatMatrix(vertex * this.format.size + field.start, x, y)
      case GLTVertexFieldType.FLOAT_MAT3:
        return this.buffer.get3x3FloatMatrix(vertex * this.format.size + field.start, x, y)
      case GLTVertexFieldType.FLOAT_MAT4:
        return this.buffer.get4x4FloatMatrix(vertex * this.format.size + field.start, x, y)
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
    this.buffer.delete(this.format.size * index, this.format.size * count)
  }

  /**
  * @see GLTVertexStructureBuffer.push
  */
  public push(count: number = 1): void {
    this.buffer.size += this.format.size * count
  }

  /**
  * @see GLTVertexStructureBuffer.concat
  */
  public concat(...others: GLTVertexStructureBuffer[]): void {
    for (const other of others) {
      if (other.format.equals(this.format)) {
        this.buffer.concat(other.buffer)
      } else {
        throw new Error([
          'Trying to concat two GLTVertexStructureBuffer with different ',
          'vertex structure.'
        ].join(''))
      }
    }
  }

  /**
  * @see GLTVertexStructureBuffer.copyWithin
  */
  public copyWithin(target: number, start: number = 0, end: number = this.size): void {
    const entrySize: number = this.format.size

    this.buffer.copyWithin(target * entrySize, start * entrySize, end * entrySize)
  }

  /**
  * @see GLTVertexStructureBuffer.equals
  */
  public equals(other: any): boolean {
    if (other == this) return true
    if (other == null) return false

    if (other instanceof GLTInterleavedVertexStructureBuffer) {
      if (!other.format.equals(this.format)) return false
      return this.buffer.equals(other.buffer)
    }

    return false
  }

  /**
  * @see GLTVertexStructureBuffer.clone
  */
  public clone() {
    const result: GLTInterleavedVertexStructureBuffer = new GLTInterleavedVertexStructureBuffer(
      this.format, this.capacity
    )

    result.size = this.size
    result.buffer.copy(this.buffer)

    return result
  }

  /**
  * @see GLTVertexStructureBuffer.clear
  */
  public clear() {
    this.buffer.clear()
  }
}

export namespace GLTInterleavedVertexStructureBuffer {
  /**
  * Create a clone of another interleaved vertex structure buffer.
  *
  * @param toClone - An interleaved vertex structure buffer instance to clone.
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
  export function copy(toCopy: GLTInterleavedVertexStructureBuffer): GLTInterleavedVertexStructureBuffer
  /**
   * 
   */
  export function copy(toCopy: GLTInterleavedVertexStructureBuffer | undefined | null): GLTInterleavedVertexStructureBuffer | undefined | null
  export function copy(toCopy: GLTInterleavedVertexStructureBuffer | undefined | null): GLTInterleavedVertexStructureBuffer | undefined | null {
    return toCopy == null ? toCopy : toCopy.clone()
  }
}
