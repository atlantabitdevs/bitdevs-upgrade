import getJsonFile, { ParsedData } from '@/lib/get-json'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'
import { Mdx } from '@/components/MDX-components'
import { allDocs } from 'contentlayer/generated'
import Image from 'next/image'
import socraticDiscussion from "public/socratic-discussion-default.jpg"

const contentType = 'events'

interface PageProps {
  params: {
    slug: string
    contentType: string
  }
}

type Args = {
  slug: string
  contentType: string
}

async function getDocFromParams(params: Args) {
  let data: ParsedData | undefined
  const post = allDocs.find((post) => post.slugAsParams === params.slug)

  if (params.contentType === contentType) {
    data = await getJsonFile({ fileName: params.slug })
  }

  return { post, data }
}

const page = async ({ params }: PageProps) => {
  const { post, data } = await getDocFromParams(params)



  if (!post) {
    return <div>404 sorry you poor bitdev</div>
  }

  return (
    <main className="w-full">
      <article className="flex flex-row w-full">
        {/* Nav */}
        <div className="w-1/3 min-w-[300px] max-w-[480px] h-screen p-8 drop-shadow-sidebar sticky top-[82px] left-0 z-50 bg-white overflow-y-auto flex flex-col gap-4">
          <header className="font-sans flex flex-col gap-2">
            <h1 className="text-4xl font-black">{post.title}</h1>
            <time className="text-2xl text-gray-500">{post.date}</time>
            <p className="text-xl flex flex-row gap-2 items-center">
              <a href={""}>Meetup Link</a>
              <ArrowTopRightOnSquareIcon className="w-6 h-6" />
            </p>
          </header>
          <nav>
            <ul className="list-disc font-sans">
              <li>Content Outline</li>
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="ml-10 relative z-1 w-full">
          <div className="container mx-auto max-w-5xl px-4 pb-4">
            <Image src={socraticDiscussion} width="960" height="540" className="w-full h-auto" alt="" />

            {params.contentType === contentType && data === undefined ? (
              <div>{`No summary generated for ${params.slug}`}</div>
            ) : null}
            
            <Mdx code={post.body.code} slug={params.slug} jsonData={data} />
          </div>
        </div>
      </article>
    </main>
  )
}

export default page
