import { Metaupdata } from './types/Metaupdata'

export const metaupdata: Metaupdata = {
  city: {
    name: 'NYC',
    position: 'right',
  },
  description:
    'BitDevs is a community for those interested in discussing and participating in the research and development of Bitcoin and related protocols',
  colors: {
    primary: {
      hex: '#FFFFFF',
      rgb: 'rgb(255, 153, 0)',
    },
    secondary: {
      hex: '#333333',
      rgb: 'rgb(51, 51, 51)',
    },
    tertiary: {
      hex: '#FF9900',
      rgb: 'rgb(255, 255, 255)',
    },
  },
  mainNav: [
    {
      text: 'Home',
      link: '/'
    },
    {
      text: 'About',
      link: '/about'
    }
  ],
}
