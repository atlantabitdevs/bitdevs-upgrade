import './globals.css'

import { IBM_Plex_Serif, Inter } from 'next/font/google'

import Header from '@/components/Header/Header'
import type { Metadata } from 'next'
import { ThemeProvider } from './theme-provider'
import { metaupdata } from '@/metaupdata'
import { switchThemeDuration } from '@/lib/utils'

const {
  city: { name, position },
  description,
} = metaupdata
const inter = Inter({ subsets: ['latin'] })
const ibmPlexSerif = IBM_Plex_Serif({
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
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
      <body
        className={`${
          inter.className + ' ' + ibmPlexSerif.className
        } bg-slate-50 dark:bg-[#0d1117] ${switchThemeDuration}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
