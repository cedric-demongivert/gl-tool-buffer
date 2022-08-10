/**
 * @return The endianness type used by the underlying hardware.
 */
function getEndianess(): GLTEndianess {
  const bytes: ArrayBuffer = new ArrayBuffer(2)
  const uint8: Uint8Array = new Uint8Array(bytes)
  const uint16: Uint16Array = new Uint16Array(bytes)

  uint8[0] = 0xAA
  uint8[1] = 0xBB

  if (uint16[0] === 0xBBAA) {
    return GLTEndianess.LITTLE_ENDIAN
  } else if (uint16[0] === 0xAABB) {
    return GLTEndianess.BIG_ENDIAN
  } else {
    return GLTEndianess.MIDDLE_ENDIAN
  }
}

/**
 * 
 */
export type GLTEndianess = (
  GLTEndianess.LITTLE_ENDIAN |
  GLTEndianess.BIG_ENDIAN |
  GLTEndianess.MIDDLE_ENDIAN
)

/**
 * 
 */
export namespace GLTEndianess {
  /**
   * 
   */
  export const LITTLE_ENDIAN: LITTLE_ENDIAN = 0

  /**
   * 
   */
  export type LITTLE_ENDIAN = 0

  /**
   * 
   */
  export const BIG_ENDIAN: BIG_ENDIAN = 1

  /**
   * 
   */
  export type BIG_ENDIAN = 1

  /**
   * 
   */
  export const MIDDLE_ENDIAN: MIDDLE_ENDIAN = 2

  /**
   * 
   */
  export type MIDDLE_ENDIAN = 2

  /**
   * 
   */
  export const ALL = [
    LITTLE_ENDIAN,
    BIG_ENDIAN,
    MIDDLE_ENDIAN
  ]

  /**
   * 
   */
  export function toString(endianess: GLTEndianess): string | undefined {
    switch (endianess) {
      case LITTLE_ENDIAN: return 'LITTLE_ENDIAN'
      case BIG_ENDIAN: return 'BIG_ENDIAN'
      case MIDDLE_ENDIAN: return 'MIDDLE_ENDIAN'
      default: return undefined
    }
  }

  /**
   * 
   */
  export function toDebugString(endianess: GLTEndianess): string {
    return `GLTEndianess #${endianess} (${toString(endianess) || 'undefined'})`
  }

  /**
   * 
   */
  export const ENDIANESS: GLTEndianess = getEndianess()

  /**
   * 
   */
  export const IS_BIG_ENDIAN: boolean = ENDIANESS === BIG_ENDIAN

  /**
   * @returns True if the underlying hardware use big endianess.
   */
  export function isBigEndian(): boolean {
    return IS_BIG_ENDIAN
  }

  /**
   * 
   */
  export const IS_LITTLE_ENDIAN: boolean = ENDIANESS === LITTLE_ENDIAN

  /**
   * @returns True if the underlying hardware use little endianess.
   */
  export function isLittleEndian(): boolean {
    return IS_LITTLE_ENDIAN
  }

  /**
   * 
   */
  export const IS_MIDDLE_ENDIAN: boolean = ENDIANESS === MIDDLE_ENDIAN

  /**
   * @returns True if the underlying hardware use middle endianess.
   */
  export function isMiddleEndian(): boolean {
    return IS_MIDDLE_ENDIAN
  }
}
