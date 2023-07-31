import MeetupName from '../MeetupName'
import { metaupdata } from '@/metaupdata'
import './Header.css'

const Header = () => {
  return (
    <header className="header w-full p-6 flex flex-row justify-between font-sans sticky top-0 left-0 w-full bg-white z-50 drop-shadow-header">
      <h1 className="font-black text-2xl">
        <a href="/" className="no-underline">
          <MeetupName />
        </a>
      </h1>
      <nav>
        <ul className="flex flex-row gap-4 font-semibold">
          {metaupdata.mainNav.map((item) => (
            <li key={item.text} className="">
              <a href={item.link} className="no-underline">
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
