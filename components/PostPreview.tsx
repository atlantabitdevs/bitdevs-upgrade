interface PostPreviewProps {
    title: string;
    date?: string;
    author?: string;
    previewText: string;
}

export default function PostPreview(props:PostPreviewProps){
    return(
        <div>
            <div>    
                <h3>{props.title}</h3>
                <time>{props.date}</time>
                <p>{props.author}</p>
            </div>
            <p>{props.previewText}</p>
        </div>
    )
}