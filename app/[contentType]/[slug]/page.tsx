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

  // return <div>{JSON.stringify(post)}</div>
  return (
    <div>
      {params.contentType === contentType && data === undefined ? (
        <div>{`No summary generated for ${params.slug}`}</div>
      ) : null}

      <Mdx code={post.body.code} slug={params.slug} jsonData={data} />
    </div>
  )
}

export default page
