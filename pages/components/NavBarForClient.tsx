"use client";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBarForClient = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-black"
      >
        <GiHamburgerMenu size={24} />
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-lg flex flex-col text-center p-4 font-Regular_Text space-y-2 z-10">
          <a
            href="/"
            className="h-10 w-full hover:bg-gray-200 hover:font-Bold_Text rounded-md transition-all duration-200"
          >
            דף הבית
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

export default NavBarForClient;
