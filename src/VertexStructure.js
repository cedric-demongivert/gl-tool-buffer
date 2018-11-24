import * as VertexFieldType from './VertexFieldType'

/**
* A vertex structure.
*/
export class VertexStructure {
  /**
  * Create a new vertex structure.
  *
  * @param {Array<[string, VertexFieldType]>} fields - Fields of the structure.
  */
  constructor (fields) {
    this._topology = new Map()

    let cursor = 0

    for (const [ name, type ] of fields) {
      if (this._topology.has(name)) {
        throw new Error([
          "Unable to instanciate the given vertex structure because the name \"",
          name, "\" was given to two different fields."
        ].join(''))
      }
      this._topology.set(
        name, [type, cursor, cursor += VertexFieldType.sizeof(type)]
      )
    }

    this._fields = fields.map(x => x[0])
    this._size = cursor
  }

  /**
  * Return the size of this structure in bytes.
  *
  * @return {number} Size of this structure in bytes.
  */
  get size () {
    return this._size
  }

  /**
  * Return the number of fields in this structure.
  *
  * @return {number} The number of fields in this structure.
  */
  get fieldCount () {
    return this._fields.length
  }

  /**
  * Return the start location in bytes of a field in the structure (inclusive).
  *
  * @param {string} field - Name of the field.
  *
  * @return {number} The start location in bytes of a field in the structure (inclusive).
  */
  startof (field) {
    return this._topology.get(field)[1]
  }

  /**
  * Return the end location in bytes of a field in the structure (exclusive).
  *
  * @param {string} field - Name of the field.
  *
  * @return {number} The end location in bytes of a field in the structure (exclusive).
  */
  endof (field) {
    return this._topology.get(field)[2]
  }

  /**
  * Return the size in bytes of a field in the structure.
  *
  * @param {string} field - Name of the field.
  *
  * @return {number} The size in bytes of the given field of the structure.
  */
  sizeof (field) {
    const topology = this._topology.get(field)
    return topology[2] - topology[1]
  }

  /**
  * Return the type of a field.
  *
  * @param {string} field - Field name.
  *
  * @return {VertexFieldType} The type of the field.
  */
  typeof (field) {
    return this._topology.get(field)[0]
  }

  /**
  * Return the name of a field.
  *
  * @param {number} index - Field index.
  *
  * @return {VertexFieldType} The name of the field at the given index.
  */
  field (index) {
    return this._fields[index]
  }

  /**
  * Return true if both structure are similar.
  *
  * @param {VertexStructure} other - Format to compare.
  *
  * @return {boolean} True if both format are similar.
  */
  equals (other) {
    if (other == this) return true
    if (other == null) return false

    if (other instanceof VertexStructure) {
      if (other.fieldCount !== this.fieldCount) return false

      for (let index = 0; index < this.fieldCount; ++index) {
        if (
          other.field(index) !== this.field(index) ||
          other.typeof(other.field(index)) !== this.typeof(this.field(index))
        ) {
          return false
        }
      }

      return true
    }

    return false
  }

  /**
  * Iterate over all fields name of this format.
  *
  * @return {Iterator<string>} An iterator over all fields name of this format.
  */
  * fields () {
    yield * this._fields
  }
}
