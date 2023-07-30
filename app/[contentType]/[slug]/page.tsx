import getJsonFile, { ParsedData } from '@/lib/get-json'

import { FC } from 'react'
import { Mdx } from '@/components/MDX-components'
import { allDocs } from 'contentlayer/generated'

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
        <div className="w-1/3 min-w-[300px] max-w-[480px] h-screen p-8 shadow-2xl sticky top-[82px] left-0 z-50 bg-white overflow-y-auto">
          <header className="font-sans">
            <h1>Title</h1>
            <time>Date</time>
            <p><a href={""}>Meetup Link</a></p>
          </header>
          <nav>
            <ul>
              <li>Content Outline</li>
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="ml-10 relative z-1 w-full">
          <div className="container mx-auto max-w-5xl p-4">
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
