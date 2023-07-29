import Link from 'next/link'
import {
  ContentType,
  getSortedMarkdownContent,
} from '../../lib/parse-markdown-files'
import MeetupName from '@/components/MeetupName'

const allEventsData = getSortedMarkdownContent(ContentType.Events)

export default function Events({}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MeetupName />
      <h1>This is the Events page, bruh</h1>
      <Link href="/">Home</Link>
      <ul>
        {allEventsData.map(({ id, date, title }) => (
          <li className="event" key={id}>
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
