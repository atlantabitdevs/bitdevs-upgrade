import Link from 'next/link'
import { BitcoinCircleIcon, ArrowRightIcon } from '@bitcoin-design/bitcoin-icons-react/outline'
import { getSortedMarkdownContent, ContentType } from '@/lib/parse-markdown-files'
import MeetupName from '@/components/MeetupName'
import PostPreview from '@/components/PostPreview'
import Image from 'next/image'
import newBitDevsDefault from "../public/new-bitdevs-default.jpg"

export default function Home({}) {
  const eventsContentData = getSortedMarkdownContent(ContentType.Events)
  const postsContentData = getSortedMarkdownContent(ContentType.Posts)

  return (
    <main className="container mx-auto max-w-5xl">
      <div className="border-b-gray-300 border-b py-20">
        <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
          <Image src={newBitDevsDefault} alt="" width="400" height="200" className="object-cover h-full" />
        </div>
        

        <h1 className="font-extrabold text-[100px]"><MeetupName /></h1>

        <p className="text-[2.5rem]">
          BitDevs is a community for those interested in discussing and participating in the research and development of Bitcoin and related protocols.
        </p>
      </div>
      

      <h2>Upcoming and Recent Events</h2>

      <div className="flex flex-col gap-4">
        {eventsContentData.map(({ id, date, title }) => (
          <PostPreview
            key={id}
            title={title}
            date={date}
            previewText={"Our monthly Socratic Seminar events are formatted to foster debate, information sharing and lively discussion."}
          />
        ))}
      </div>

      <Link href="/events" className="flex gap-2">
        See All Events <ArrowRightIcon className="w-6 h-6" />
      </Link>

      <h2>Recent Blog Posts</h2>

      <div className="flex flex-col gap-4">
        {postsContentData.map(({ id, date, title }) => (
          <PostPreview
            key={id}
            title={title}
            date={date}
            previewText={"Our monthly Socratic Seminar events are formatted to foster debate, information sharing and lively discussion."}
          />
        ))}
      </div>

      <Link href="/posts" className="flex gap-2">
        See All Blog Posts <ArrowRightIcon className="w-6 h-6" />
      </Link>
    </main>
  )
}
