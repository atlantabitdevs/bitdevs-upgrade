import Layout from '@/components/Layout'
import Link from 'next/link'
import { getSortedPostsData } from '../utils/posts'
import MeetupName from '@/components/MeetupName'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const allPostsData = getSortedPostsData()

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '')
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )
    const { data: frontmatter } = matter(markdownWithMeta)

    return { slug, frontmatter }
  })

  return {
    props: {
      posts: posts,
    },
  }
}

export default function Home({ posts }: { posts: Array<any> }) {
  const formattedPosts = () => {
    let formatted: any[] = []

    for (let i = 0; i < posts.length; i++) {
      formatted = [
        ...formatted,
        {
          slug: posts[i].slug,
          title: posts[i].frontmatter.title,
          type: posts[i].frontmatter.type,
          meetup: posts[i].frontmatter.meetup,
        },
      ]
    }

    return formatted
  }

  return (
    <Layout>
      <MeetupName />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="px-8 pb-16">
          <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between my-8">
            <div className="grid grid-cols gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
              {formattedPosts().map((post) => (
                <div className="flex flex-col">
                  <Link href={'/posts/' + post.slug}>
                    <div className="bg-dark-1 bg-center bg-cover p-12 mb-4 relative">
                      <span className="bg-bd-navy-200 text-bd-orange-500 p-2 drop-shadow-md absolute bottom-8 right-8">
                        {post.title}
                      </span>
                    </div>
                  </Link>
                  <h3 className="text-2xl mb-2">
                    <Link href={'/posts/' + post.slug}>{post.title}</Link>
                  </h3>
                  <p className="text-lg font-semibold">
                    <Link href={'/posts/' + post.slug}>{post.meetup}</Link>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
