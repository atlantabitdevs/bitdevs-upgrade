import Link from 'next/link'
import { getSortedPostsData } from '../../lib/parse-posts'
import MeetupName from '@/components/MeetupName'

const allPostsData = getSortedPostsData()

export default function Home({}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MeetupName />
      <h1>This is the Events page, bruh</h1>
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
