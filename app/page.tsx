import {
  ArrowRightIcon,
  BitcoinCircleIcon,
} from '@bitcoin-design/bitcoin-icons-react/outline'
import {
  ContentType,
  getSortedMarkdownContent,
} from '@/lib/parse-markdown-files'

import Image from 'next/image'
import Link from 'next/link'
import MeetupName from '@/components/MeetupName'
import PostPreview from '@/components/PostPreview'
import newBitDevsDefault from '../public/new-bitdevs-default.jpg'

export default function Home({}) {
  const eventsContentData = getSortedMarkdownContent(ContentType.Events)
  const postsContentData = getSortedMarkdownContent(ContentType.Posts)

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <div className="border-b-gray-300 border-b py-20">
        <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] rounded-full overflow-hidden mx-auto">
          <Image
            src={newBitDevsDefault}
            alt=""
            width="400"
            height="200"
            className="object-cover h-full"
          />
        </div>

        <h1 className="font-extrabold text-[100px] sm:text-[120px] lg:text-[140px] text-center">
          <MeetupName />
        </h1>

        <p className="text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] text-center">
          BitDevs is a community for those interested in discussing and
          participating in the research and development of Bitcoin and related
          protocols.
        </p>
      </div>

      <div className="flex flex-col gap-10 border-b border-b-400 py-10">
        <h2 className="text-center">Upcoming and Recent Events</h2>

        {eventsContentData.map(({ id, date, title }, i) => (
          <PostPreview
            id={id}
            title={title}
            date={date}
            type="events"
            previewText={
              'Our monthly Socratic Seminar events are formatted to foster debate, information sharing and lively discussion.'
            }
            key={i}
          />
        ))}

        <Link href="/events" className="flex gap-2 justify-center">
          See All Events <ArrowRightIcon className="w-6 h-6" />
        </Link>
      </div>

      <div className="flex flex-col gap-10 py-10">
        <h2 className="text-center">Recent Blog Posts</h2>

        <div className="flex flex-col gap-4">
          {postsContentData.map(({ id, date, title }, i) => (
            <PostPreview
              id={id}
              title={title}
              date={date}
              type="posts"
              previewText={
                'Our monthly Socratic Seminar events are formatted to foster debate, information sharing and lively discussion.'
              }
              key={i}
            />
          ))}
        </div>

        <Link href="/posts" className="flex gap-2 justify-center">
          See All Blog Posts <ArrowRightIcon className="w-6 h-6" />
        </Link>
      </div>
    </main>
  )
}
