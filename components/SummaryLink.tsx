export default function SummaryLink(props: any) {
  // TODO: Fetch the summary from the JSON file corresponding to this link using the props.slug
  // TODO: Figure out how to prevent this from being housed in a <p> tag when rendered, I want to use more semantic HTML intside this component

  console.log(props.data)

  return (
    <span>
      <span>
        <a href={props.href}>{props.title}</a> {props.slug}
      </span>
      <span>Cliff Notes</span>
      <span>Cliff summary goes here</span>
      <span>ELI5</span>
      <span>ELI5 summary goes here</span>
      {!!props.data
        ? props.data.summary.map((n: any) => (
            <>
              <h1>{n.title}</h1>
              <p>{n.summary}</p>
              <p>{n.summaryeli15}</p>
            </>
          ))
        : null}
    </span>
  )
}
