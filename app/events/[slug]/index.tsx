import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'

import Layout from '@/components/Layout'

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )
  const { data: frontmatter, content } = matter(markdownWithMeta)

  if (frontmatter.related) {
    frontmatter.related.map((post: string) => {
      let relatedMarkdownWithMeta = fs.readFileSync(
        path.join('posts', post + '.md'),
        'utf-8'
      )
      let parsed = matter(relatedMarkdownWithMeta)
      parsed.data.slug = post
    })
  }

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  }
}

export default function FirstEvent({
  frontmatter,
  slug,
  content,
}: {
  frontmatter: {
    type: string
    title: string
    meetup: string
  }
  slug: string
  content: string
}) {
  return (
    <Layout title={frontmatter.title} slug={slug}>
      <div className="bg-bd-navy-200 relative h-0 w-full pb-[56.25%] overflow-hidden cursor-pointer"></div>
      <div className="p-8 max-w-4xl mx-auto flex flex-col space-y-4">
        <h1 className="text-4xl">{frontmatter.title}</h1>
        <p className="text-2xl">{frontmatter.meetup}</p>
        <div
          className="flex flex-col space-y-4 episode-notes"
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        ></div>
      </div>
    </Layout>
  )
}
