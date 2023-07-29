import Link from 'next/link'
import {
  ContentType,
  getSortedMarkdownContent,
} from '../../lib/parse-markdown-files'
import MeetupName from '@/components/MeetupName'

const allPostsData = getSortedMarkdownContent(ContentType.Posts)

export default function Posts({}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MeetupName />
      <h1>This is the Posts page, bruh</h1>
      <Link href="/">Home</Link>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
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
