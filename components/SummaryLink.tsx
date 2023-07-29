import { ParsedData } from '@/lib/get-json'

type Props = {
  href: string | undefined
  title: any
  slug: string
  data: ParsedData | undefined
}

export default function SummaryLink(props: Props) {
  // TODO: Fetch the summary from the JSON file corresponding to this link using the props.slug
  // TODO: Figure out how to prevent this from being housed in a <p> tag when rendered, I want to use more semantic HTML intside this component

  return (
    <div>
      {!!props.data
        ? props.data.summary.map((n) => (
            <>
              <h1>{n.title}</h1>
              <p>{n.summary}</p>
              <p>{n.summaryeli15}</p>
            </>
          ))
        : null}
    </div>
  )
}
