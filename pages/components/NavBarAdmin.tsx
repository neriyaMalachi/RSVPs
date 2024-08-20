'use client'
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="NavBar">
    <button onClick={() => setIsOpen(!isOpen)} className="p-1">
      <GiHamburgerMenu size={24} />
    </button>
      {isOpen ? (
        <div className="absolute  bg-slate-100 flex flex-col text-center p-1 font-Regular_Text">
          <a href="/Admin/AllGuests" className="h-6 w-28  hover:font-Bold_Text b">אורחים</a>
          
          <a href="/Admin/ControlerToGuests" className="hover:font-Bold_Text h-6 w-28">פרטי חתונה</a>
          <a href="" className="hover:font-Bold_Text h-6 w-28">אחר</a>
        </div>
      ) : (
        <></>
      )}
  </div>
  )
}

export default NavBarAdmin