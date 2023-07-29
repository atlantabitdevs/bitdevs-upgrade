import Link from 'next/link'
import MeetupName from '@/components/MeetupName'

export default function Home({}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MeetupName />
      <h1>This is the home page, bruh</h1>
      <hr />
      <h2>The Events component goes here.</h2>
      <Link href="/events" style={{ textDecoration: 'underline' }}>
        Click here to see all events...
      </Link>
      <h2>The Posts component goes here.</h2>
      <Link href="/posts" style={{ textDecoration: 'underline' }}>
        Click here to see all posts...
      </Link>
    </main>
  )
}
