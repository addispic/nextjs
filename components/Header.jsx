import React from 'react'

// icons
import { PiBookOpenTextFill } from "react-icons/pi";

const Header = () => {
  return (
    <header className="w-full bg-green-600 rounded-sm flex items-center justify-between px-3 py-1">
        {/* left */}
        <div>
            {/* logo */}
            <PiBookOpenTextFill className="text-3xl text-white cursor-pointer"/>
        </div>
        {/* right */}
        <div className="text-xs text-white">
            <p><span className="font-black">3</span> notes</p>
        </div>
    </header>
  )
}

export default Header