import Link from 'next/link'
import { getSortedPostsData } from '../utils/posts'
import MeetupName from '@/components/MeetupName'
import { BitcoinCircleIcon } from '@bitcoin-design/bitcoin-icons-react/outline'
import Header from '@/components/Header'


const allPostsData = getSortedPostsData()

export default function Home({}) {
  return (
    <main className="">
      <Header />

      <h1>This is the home page, bruh</h1>
      <Link href="/events">Events</Link>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li className="post" key={id}>
            <BitcoinCircleIcon className="w-12 h-12" /> {title}
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
