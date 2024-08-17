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
        <div className="absolute flex flex-col text-center p-1 font-Regular_Text">
          <a href="/Admin/AllGuests">אורחים</a>
          <a href="/Admin/ControlerToGuests">פרטי חתונה</a>
          <a href="">אחר</a>
        </div>
      ) : (
        <></>
      )}
  </div>
  )
}

export default NavBarAdmin