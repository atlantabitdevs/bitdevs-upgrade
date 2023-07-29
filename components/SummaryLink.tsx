export default function SummaryLink(props:any) {
    // TODO: Fetch the summary from the JSON file corresponding to this link using the props.slug
    // TODO: Figure out how to prevent this from being housed in a <p> tag when rendered, I want to use more semantic HTML intside this component
    
    return(
        <span>
            <span><a href={props.href}>{props.title}</a> {props.slug}</span>
            <span>Cliff Notes</span>
            <span>Cliff summary goes here</span>
            <span>ELI5</span>
            <span>ELI5 summary goes here</span>
        </span>
    )
}