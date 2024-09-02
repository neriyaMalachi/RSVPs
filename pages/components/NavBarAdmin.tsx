"use client";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
            href="/About"
            className="h-10 w-full hover:bg-gray-200 hover:font-Bold_Text rounded-md transition-all duration-200"
          >
            אודות
          </a>
        </div>
      )}
    </div>
  );
};

export default NavBarAdmin;
