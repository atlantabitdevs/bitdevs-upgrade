import Link from 'next/link'
import { getSortedPostsData } from '../lib/parse-posts'
import MeetupName from '@/components/MeetupName'

const allPostsData = getSortedPostsData()

export default function Home({}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MeetupName />
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
// import Link from 'next/link'

// import { FC } from 'react'
// import {allDocs} from "contentlayer/generated"
// import { Mdx } from '@/components/MDX-components';

// interface PageProps {
//     params: {
//         slug: string
//     }
// }

// // async fucntion getDocFromParams(slug: string) {
// //     const post = allDocs.find((post) => post.slugAsParams === slug);
// //     return post;
// // }

// async function getDocFromParams(slug: string) {
//     // const post = allDocs.find((post) => post.slugAsParams === slug);
//     const post = allDocs[0]
//     // console.log(allDocs)
//     return post;
//   }

// const page = async ({ params }: PageProps) => {
//     const post = await getDocFromParams(params.slug)

//     console.log(post._raw.flattenedPath)

//     // return <div>{JSON.stringify(post)}</div>
//     return <div>
//         {/* <Mdx code={post.body.code} /> */}
//         {/* <Link href="/events/first-event">"hello"</Link> */}
//         {/* <Link href="${post._raw.flattenedPath}">"hello"</Link> */}
//         {/* <Link href="/"
//         onClick=
//           "location.href=this.href+post._raw.flattenedPath;return false;"
//         >hello</Link> */}

//     </div>
// }

// export default page
