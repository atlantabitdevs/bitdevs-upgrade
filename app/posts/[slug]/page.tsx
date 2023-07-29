import { FC } from 'react'
import {allDocs} from "contentlayer/generated"
import { Mdx } from '@/components/MDX-components';

interface PageProps {
    params: {
        slug: string
    }
}

// async fucntion getDocFromParams(slug: string) {
//     const post = allDocs.find((post) => post.slugAsParams === slug);
//     return post;
// }

async function getDocFromParams(slug: string) {
    const post = allDocs.find((post) => post.slugAsParams === slug);
    return post;
  }

const page = async ({ params }: PageProps) => {
    const post = await getDocFromParams(params.slug)
    
    if(!post) {
        return <div>404 sorry you poor bitdev</div>
    }
    
    console.log(post._raw.flattenedPath)

    // return <div>{JSON.stringify(post)}</div>
    return <div>
        <Mdx code={post.body.code} />
    </div>
}

export default page