import Link from 'next/link'
import { BitcoinCircleIcon } from '@bitcoin-design/bitcoin-icons-react/outline'
import { getSortedMarkdownContent, ContentType } from '@/lib/parse-markdown-files'

export default function Home({}) {
  const eventsContentData = getSortedMarkdownContent(ContentType.Events)
  const postsContentData = getSortedMarkdownContent(ContentType.Posts)

  return (
    <main className="">
      <h1>This is the home page, bruh</h1>
      <hr />
      <h2>Events Post</h2>
      <ul>
        {eventsContentData.map(({ id, date, title }) => (
          <li className="post" key={id}>
            <a href={`/events/${id}`}>
              <BitcoinCircleIcon className="w-12 h-12" /> {title}
              <br />
              {id}
              <br />
              {date}
            </a>
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
            <a href={`/posts/${id}`}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </a>
          </li>
        ))}
      </ul>
      <Link href="/posts" style={{ textDecoration: 'underline' }}>
        Click here to see all posts...
      </Link>
    </main>
  )
}
