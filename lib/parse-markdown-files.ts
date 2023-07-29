import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/*
 * This function gets a list of the posts/events from the markdown files.
 *
 * Args
 * ----
 *  contentType: Enum of either ContentType.Posts or ContentType.Events with string values.
 *
 * Returns
 * ----
 *  A sorted array of objects containing the markdown contents.
 */

export enum ContentType {
  Posts = 'posts',
  Events = 'events',
}
export function getSortedMarkdownContent(contentType: ContentType) {
  const contentDirectory = path.join(process.cwd(), `/content/${contentType}`)
  // Get file names under /posts
  const fileNames = fs.readdirSync(contentDirectory)
  const allMarkdownData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(contentDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      title: 'Example Title',
      date: '2009-01-03 00:00:00',
      ...matterResult.data,
    }
  })
  // Sort posts by date
  return allMarkdownData
    .filter((data) => data.id !== '.gitkeep')
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
}
