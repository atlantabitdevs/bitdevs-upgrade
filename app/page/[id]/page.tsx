import getJsonFile, { ParsedData } from '@/lib/get-json'
import { getPageContentFromMarkdown } from '@/lib/parse-markdown-files'
import { Mdx } from '@/components/MDX-components'
import { allDocs } from 'contentlayer/generated'
import Link from 'next/link'

const contentType = 'page'

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

export default async function Posts({ params }: { params: any }) {
  const { post, data } = await getDocFromParams(params)
  const currentPageData = getPageContentFromMarkdown().filter(
    (page) => page.id === params.id,
  )[0]
  console.log('params: ', params)
  console.log('currentPageData: ', currentPageData)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>This is the {} page, bruh</h1>
      <Link href="/" style={{ textDecoration: 'underline' }}>
        Home
      </Link>

      {/*
      <ul>
        {allContentData.map(({ id, date, title }) => (
          <li className="post" key={id}>
            <Link href={`/${contentType}/${id}`}>{title}</Link>
            <br />
            {id}
            <br />
            {date}
          </li>
        ))}
      </ul>
      */}
      <Mdx
        code={post.body.code}
        slug={params.slug}
        jsonData={data}
        page={true}
      />
    </main>
  )
}
