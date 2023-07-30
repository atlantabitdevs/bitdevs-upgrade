import { getPageContentFromMarkdown } from '@/lib/parse-markdown-files'

import Link from 'next/link'

export default function Posts({ params }: { params: any }) {
  const currentPageData = getPageContentFromMarkdown().filter(
    (page) => page.id === params.id,
  )[0]
  console.log('params: ', params)
  console.log('currentPageData: ', currentPageData)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>This is the {} page, bruh</h1>
      <Link href="/" style={{ textDecoration: 'underline' }}>
        Home
      </Link>

      {/*
      <ul>
        {allContentData.map(({ id, date, title }) => (
          <li className="post" key={id}>
            <Link href={`/${contentType}/${id}`}>{title}</Link>
            <br />
            {id}
            <br />
            {date}
          </li>
        ))}
      </ul>
      */}
    </main>
  )
}
