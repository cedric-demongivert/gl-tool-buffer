function checkLittleEndian () : boolean {
    const bytes  : ArrayBuffer = new ArrayBuffer(2)
    const uint8  : Uint8Array  = new Uint8Array(bytes)
    const uint16 : Uint16Array = new Uint16Array(bytes)

    uint8[0] = 0xAA
    uint8[1] = 0xBB

    if(uint16[0] === 0xBBAA) {
      return true;
    } else if (uint16[0] === 0xAABB) {
      return false;
    } else {
      throw new Error('No little nor big endian hardware.')
    }
}

export namespace endianess {
  export const IS_LITTLE_ENDIAN : boolean = checkLittleEndian()

  export function isBigEndian () {
    return !IS_LITTLE_ENDIAN
  }

  export function isLittleEndian () {
    return IS_LITTLE_ENDIAN
  }
}
