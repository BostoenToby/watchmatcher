export default interface Brand {
  name: string
  country: string
  city: string
  foundingDate: number
  history?: History
}

interface History {
  head: string
  altImage?: string
  information: Information[]
}

interface Information {
  title: string
  informationblocks: InformationBlock[]
}

interface InformationBlock {
  subtitle: string
  altImage?: string
  information: string
}
