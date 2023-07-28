export interface Metaupdata {
  description: string
  city: {
    name: string
    position: string
  }
  colors: {
    primary: {
      hex: string
      rgb: string
    }
    secondary: {
      hex: string
      rgb: string
    }
    tertiary: {
      hex: string
      rgb: string
    }
  }
}
