import { GLTVertexFieldType } from './GLTVertexFieldType'

/**
* A vertex structure.
*/
export class GLTVertexStructure {
  /**
   * 
   */
  private _topology: Map<string, GLTVertexStructure.Field>

  /**
   * Each field that compose this structure in order.
   */
  public readonly fields: GLTVertexStructure.Field[]

  /**
   * The size of this structure in bytes.
   */
  public readonly size: number

  /**
   * Create a new vertex structure.
   *
   * @param names - Name of each field of the structure.
   * @param types - Type of each field of the structure.
   */
  public constructor(names: string[], types: GLTVertexFieldType[]) {
    if (names.length > types.length) {
      throw new Error(
        'Unable to instantiate the given vertex structure because some ' +
        'fields does not have an associated type [' +
        names.slice(types.length).map(x => `"${x}"`).join(', ') + '].'
      )
    }

    this._topology = new Map()

    let cursor: number = 0

    for (let index = 0; index < names.length; ++index) {
      if (this._topology.has(names[index])) {
        throw new Error(
          'Unable to instanciate the given vertex structure because the name ' +
          '"' + name + '" was given to two different fields.'
        )
      }

      this._topology.set(names[index], {
        identifier: index,
        name: names[index],
        type: types[index],
        start: cursor,
        end: cursor += GLTVertexFieldType.sizeof(types[index]),
        size: GLTVertexFieldType.sizeof(types[index])
      })
    }

    this.fields = [...this._topology.values()]
    this.size = cursor
  }

  /**
   * Return a field by using its name
   *
   * @param field - Name of the field.
   *
   * @return The requested field.
   */
  public get(field: string): GLTVertexStructure.Field {
    return this._topology.get(field)
  }

  /**
   * @see Object.equals
   */
  public equals(other: any): boolean {
    if (other == this) return true
    if (other == null) return false

    if (other instanceof GLTVertexStructure) {
      if (other.fields.length !== this.fields.length) return false

      for (let index = 0; index < this.fields.length; ++index) {
        if (
          other.fields[index].name !== this.fields[index].name ||
          other.fields[index].type !== this.fields[index].type
        ) { return false }
      }

      return true
    }

    return false
  }
}

/**
 * 
 */
export namespace GLTVertexStructure {
  /**
   * 
   */
  export type Field = {
    identifier: number,
    name: string,
    type: GLTVertexFieldType,
    start: number,
    end: number,
    size: number
  }

  /**
   * 
   */
  export const EMPTY: Readonly<GLTVertexStructure> = Object.freeze(new GLTVertexStructure([], []))
}
