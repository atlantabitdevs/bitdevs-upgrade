import { ParsedData } from '@/lib/get-json'

type Props = {
  href: string | undefined
  title: any
  slug: string
  data: ParsedData | undefined
}

export default function SummaryLink(props: Props) {
  // TODO: Fetch the summary from the JSON file corresponding to this link using the props.slug
  // TODO: Figure out how to prevent this from being housed in a <p> tag when rendered, I want to use more semantic HTML inside this component

  return (
    <div className="bg-dark text-white p-4 space-y-4">
      {' '}
      {/* Added dark background, white text, padding, and vertical spacing */}
      {!!props.data
        ? props.data.summary.map((n) => (
            <div key={n.title} className="space-y-2">
              {' '}
              {/* Added vertical spacing and unique key */}
              <h1 className="text-3xl font-bold">{n.title}</h1>{' '}
              {/* Added text size and bold font */}
              <div className="pl-2">
                {' '}
                {/* Added padding to the left */}
                <p className="text-lg">{n.summary}</p> {/* Added text size */}
              </div>
              <div className="pl-2">
                {' '}
                {/* Added padding to the left */}
                <p className="text-sm">{n.summaryeli15}</p>{' '}
                {/* Added text size */}
              </div>
            </div>
          ))
        : null}
    </div>
  )
}
