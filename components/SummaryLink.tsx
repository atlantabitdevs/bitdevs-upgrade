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
    <div className="bg-dark p-4 space-y-4">
      {!!props.data
        ? props.data.summary.map((n) => (
            <div key={n.title} className="space-y-2">
              <span className="text-xl font-sans font-semibold">{n.title}</span>
              <div className="pl-2">
                <p className="text-lg">{n.summary}</p>
              </div>
              <div className="pl-2">
                {' '}
                <p className="text-sm">{n.summaryeli15}</p>
              </div>
            </div>
          ))
        : null}
    </div>
  )
}
