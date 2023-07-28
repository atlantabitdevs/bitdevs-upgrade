import Link from 'next/link'

export default function Events() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <code>/events</code>
      <h1>This is the Events page, bruh</h1>
      <Link href="/">Home</Link>
      <Link href="/events/first-event">First Event</Link>
    </main>
  )
}
