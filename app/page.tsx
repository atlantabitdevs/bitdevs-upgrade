import Link from 'next/link'
import MeetupName from '@/components/MeetupName'
import { getSortedMarkdownContent, ContentType } from '@/lib/parse-markdown-files'

export default function Home({}) {
  const eventsContentData = getSortedMarkdownContent(ContentType.Events)
  const postsContentData = getSortedMarkdownContent(ContentType.Posts)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MeetupName />
      <h1>This is the home page, bruh</h1>
      <hr />
      <h2>Events Post</h2>
      <ul>
        {eventsContentData.map(({ id, date, title }) => (
          <li className="post" key={id}>
            {title}
            <br />
            {id}
            <br />
            {date}
          </li>
        ))}
      </ul>

      <Link href="/events" style={{ textDecoration: 'underline' }}>
        Click here to see all events...
      </Link>
      <h2>Blog Posts</h2>
      <ul>
        {postsContentData.map(({ id, date, title }) => (
          <li className="post" key={id}>
            {title}
            <br />
            {id}
            <br />
            {date}
          </li>
        ))}
      </ul>
      <Link href="/posts" style={{ textDecoration: 'underline' }}>
        Click here to see all posts...
      </Link>
    </main>
  )
}
