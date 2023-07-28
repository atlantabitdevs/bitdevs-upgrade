import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { metaupdata } from '@/metaupdata'
const {
  city: { name, position },
  description,
} = metaupdata
const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
