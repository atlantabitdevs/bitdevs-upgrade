export type Metaupdata = {
  city: {
    name: string
    position: string
  }
  description: string
}

export const metaupdata: Metaupdata = {
  city: {
    name: 'NYC',
    position: 'right',
  },
  description:
    'BitDevs is a community for those interested in discussing and participating in the research and development of Bitcoin and related protocols',
}
