interface PostPreviewProps {
    title: string;
    date?: string;
    author?: string;
    previewText: string;
    type: string;
    id: string;
}

export default function PostPreview(props:PostPreviewProps){
    return(
        <div>
            <div>    
                <h3>
                    <a href={"/" + props.type + "/" + props.id} className="no-underline">{props.title}</a>
                </h3>
                <time>{props.date}</time>
                <p>{props.author}</p>
            </div>
            <p>{props.previewText}</p>
        </div>
    )
}