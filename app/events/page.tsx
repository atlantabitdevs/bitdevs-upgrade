import Link from 'next/link'
import { getSortedPostsData } from '../../utils/posts'
import {allDocs} from "contentlayer/generated"


const allPostsData = getSortedPostsData()

// interface PageProps {
//   params: {
//       slug: string
//   }
// }


export default function Events() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <code>/events</code>
      <h1>This is the Events page, bruh</h1>
      <Link href="/">Home</Link>
      
      {allPostsData.map(({ id, date, title }) => (
            <li className="post" key={id}>
              <Link href="/events/first-event">{title}</Link>
              {/* {title} */}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
    </main>
  )
}
