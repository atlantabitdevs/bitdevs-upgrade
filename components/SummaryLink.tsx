export default function SummaryLink(props:any) {
    // Fetch the summary from the JSON file corresponding to this link
    
    return(
        <div>
            <h3><a href={props.href}>{props.title}</a></h3>
            <h4>Cliff Notes</h4>
            <p>Cliff summary goes here</p>
            <h4>ELI5</h4>
            <p>ELI5 summary goes here</p>
        </div>
    )
}