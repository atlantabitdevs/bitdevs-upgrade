import Link from 'next/link'

export default function FirstEvent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <code>/events/first-event</code>
      <h1>This is the FirstEvent page, bruh</h1>
      <a>
        hello
      </a>
      <Link href="/">Home</Link>
      <Link href="/events">Events</Link>
      </main>
  )
}
