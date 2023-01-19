export default interface Watch {
  watch: string
  brand: string
  type: string
  ref: string
  categories: string[]
  information: string
  specifications: Specification
  calibre: Calibre
  history: History[] | null
}

interface Specification {
  case: Case
  glass: Glass
  dial: Dial
  bracelet: Bracelet
  buckle: Buckle
  watch: WatchInfo
}

interface Case {
  info: string
  size: number
  thickness: number
  waterResistanceM: number | null
  waterResistanceB: number | null
  material: string
}

interface Glass {
  material: string
  info: string
}

interface Dial {
  material: string
}

interface Bracelet {
  number: number
  material: string
  size: string | null
}

interface Buckle {
  type: string | null
  material: string | null
}

interface WatchInfo {
  weight: number | null
  origin: string
}

interface Calibre {
  name: string
  functions: string[]
  jewels: number
  mechanism: string
  powerReserve: number
  totalDiameter: number
  parts: number
  frequencyHZ: number
  frequencyVPH: number
  thickness: number
}

interface History {
  subtitle: string
  altImage?: string
  text: string
}
