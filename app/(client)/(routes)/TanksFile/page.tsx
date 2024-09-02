"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  return (
    <div className="HomeFile  h-[100vh] flex flex-col justify-between items-center">
      <div className=" bg-slate-200/35 h-[60%]  w-[90%] mt-44 md:w-96  flex flex-col justify-around items-center text-center rounded-md font-Regular_Text text-white text-2xl">
        תודה רבה
        <br />
        מחכים לראותכם
      </div>
      <footer className="w-full flex justify-center items-center py-4">
    <Link href="https://nm-ambition.com/" className="text-sm text-white hover:underline">
      N.M AMBITION © 2024 כל הזכויות שמורות
    </Link>
  </footer>
    </div>
  );
};

export default page;
