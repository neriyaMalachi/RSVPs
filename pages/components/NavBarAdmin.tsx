'use client'
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
  //   <div className="NavBar">
  //   <button onClick={() => setIsOpen(!isOpen)} className="p-1">
  //     <GiHamburgerMenu size={24} />
  //   </button>
  //     {isOpen ? (
  //       <div className="absolute  bg-slate-100 flex flex-col text-center p-1 font-Regular_Text">
  //         <a href="/Admin/AllGuests" className="h-6 w-28  hover:font-Bold_Text b">אורחים</a>
          
  //         <a href="/Admin/ControlerToGuests" className="hover:font-Bold_Text h-6 w-28">פרטי חתונה</a>
  //         <a href="" className="hover:font-Bold_Text h-6 w-28">אחר</a>
  //       </div>
  //     ) : (
  //       <></>
  //     )}
  // </div>
  <div className="relative">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="p-2 text-gray-700 hover:text-gray-900"
  >
    <GiHamburgerMenu size={24} />
  </button>

  {isOpen && (
    <div className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-lg flex flex-col text-center p-4 font-Regular_Text space-y-2 z-10">
      <a
        href="/Admin/AllGuests"
        className="h-10 w-full hover:bg-gray-200 hover:font-Bold_Text rounded-md transition-all duration-200"
      >
        אורחים
      </a>
      <a
        href="/Admin/ControlerToGuests"
        className="h-10 w-full hover:bg-gray-200 hover:font-Bold_Text rounded-md transition-all duration-200"
      >
        פרטי חתונה
      </a>
      <a
        href="#"
        className="h-10 w-full hover:bg-gray-200 hover:font-Bold_Text rounded-md transition-all duration-200"
      >
        אחר
      </a>
    </div>
  )}
</div>

  )
}

export default NavBarAdmin