import { ParsedData } from '@/lib/get-json'
import Accordion from './Accordion'

type Props = {
  href: string | undefined
  title: any
  slug: string
  data: ParsedData | undefined
}

export default function SummaryLink(props: Props) {
  // TODO: Fetch the summary from the JSON file corresponding to this link using the props.slug
  // TODO: Figure out how to prevent this from being housed in a <p> tag when rendered, I want to use more semantic HTML inside this component

  const entry = props.data?.summary.find((item) => item.title == props.title)

  return (
    <span className="pt-4 pb-8 block">
      {!!props.data ? (
        <span key={props.title} className="flex flex-col gap-2">
          <span className="text-xl font-sans font-semibold">{props.title}</span>
          {entry ? (
            <>
              <Accordion content={entry?.summary} type="cliff" />
              <Accordion content={entry?.summaryeli15} type="eli5" />
            </>
          ) : (
            <>
              <em>Summary unavailable</em>
            </>
          )}
        </span>
      ) : null}
    </span>
  )
}
