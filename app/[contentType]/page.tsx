import {
  ContentType,
  getSortedMarkdownContent,
} from '../../lib/parse-markdown-files'

import Link from 'next/link'
import MeetupName from '@/components/MeetupName'

export default function Posts({ params }: { params: any }) {
  const contentType = params.contentType
  const allContentData = getSortedMarkdownContent(contentType)

  console.log(allContentData)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MeetupName />
      <h1>This is the Posts page, bruh</h1>
      <Link href="/" style={{ textDecoration: 'underline' }}>
        Home
      </Link>
      <ul>
        {allContentData.map(({ id, date, title }) => (
          <li className="post" key={id}>
            {title}
            <br />
            {id}
            <br />
            {date}
          </li>
        ))}
      </ul>
    </main>
  )
}