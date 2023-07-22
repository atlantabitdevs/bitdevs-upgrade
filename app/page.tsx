import Link from 'next/link'
import { getSortedPostsData } from '../utils/posts'

// interface Post {
//   id: string;
//   date: string;
//   title: string;
// }

const allPostsData = getSortedPostsData()
console.log('app/page.tsx > allPostsData: ', allPostsData)

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>This is the home page, bruh</h1>
      <Link href="/events">Events</Link>
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

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData,
//     },
//   }
// }
