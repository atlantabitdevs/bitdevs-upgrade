import Head from 'next/head'
import React, { ReactNode } from 'react'
import Link from 'next/link'

interface LayoutProps {
  title?: string
  children: ReactNode
  slug?: string
}

export default function Layout(props: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="w-full">
        <div className="container max-w-screen-xl mx-auto bg-white dark:bg-bd-navy-200 drop-shadow-2xl min-h-screen">
          <header className="bg-white dark:bg-bd-navy-200 sticky top-0 z-50 drop-shadow-lg flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-row p-4 md:pr-0 justify-between w-full relative bg-white dark:bg-bd-navy-200 z-[51] grow-1">
              <div className="flex flex-row items-center text-navy-200 dark:text-white">
                <Link
                  href="/"
                  className="flex flex-row space-x-2 items-center"
                ></Link>
              </div>
            </div>
          </header>

          {props.children}
        </div>
      </main>
    </div>
  )
}
