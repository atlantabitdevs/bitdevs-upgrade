import MeetupName from "./MeetupName"
import { metaupdata } from "@/metaupdata"

const Header =() => {
    return (
        <div className="header">
            <h1><MeetupName /></h1>
            <nav>
                <ul>
                    {metaupdata.mainNav.map((item) => (
                        <li key={item.text}>
                            <a href={item.link}>{item.text}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Header