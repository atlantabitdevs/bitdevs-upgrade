import './globals.css'
import type { Metadata } from 'next'
import { Inter, IBM_Plex_Serif } from 'next/font/google'
import { metaupdata } from '@/metaupdata'
import Header from '@/components/Header/Header'

const {
  city: { name, position },
  description,
} = metaupdata
const inter = Inter({ subsets: ['latin'] })
const ibmPlexSerif = IBM_Plex_Serif({
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title:
    position === 'right'
      ? `BitDevs ${name} | ${description}`
      : `${name} BitDevs | ${description}`,
  description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " " + ibmPlexSerif.className}>
        <Header />
          {children}
      </body>
    </html>
  )
}
