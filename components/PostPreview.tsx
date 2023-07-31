interface PostPreviewProps {
  title: string
  date?: string
  author?: string
  previewText: string
  type: string
  id: string
}

export default function PostPreview(props: PostPreviewProps) {
  return (
    <article>
      <header className="flex flex-col gap-1 ">
        <h3>
          <a href={'/' + props.type + '/' + props.id} className="no-underline">
            {props.title}
          </a>
        </h3>
        <time className="font-sans text-gray-500 text-lg order-first ">
          {props.date}
        </time>
        {props.author ? (
          <p className="order-last text-xl font-sans ">{props.author}</p>
        ) : (
          ``
        )}
      </header>
      <p>{props.previewText}</p>
    </article>
  )
}
