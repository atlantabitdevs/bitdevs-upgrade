import MeetupName from "./MeetupName"
import { metaupdata } from "@/metaupdata"

const Header =() => {
    return (
        <header className="header w-full border-b-2 p-6 flex flex-row justify-between">
            <h1 className="font-black text-2xl"><MeetupName /></h1>
            <nav>
                <ul className="flex flex-row gap-4 font-semibold">
                    {metaupdata.mainNav.map((item) => (
                        <li key={item.text} className="">
                            <a href={item.link}>{item.text}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default Header