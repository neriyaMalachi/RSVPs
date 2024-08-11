"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  // axios.get("/api/guests").then(function (response) {
  //   console.log(response.data.data);
  // });

  return (
    <div className="HomeFile  h-[100vh] flex flex-col justify-between items-center">
      <div className=" bg-slate-200/35 h-96 w-[80%] mt-52 md:w-[50%] xl:w-[20%]  flex flex-col justify-around items-center text-center rounded-md font-Regular_Text text-white text-2xl">
        תודה רבה
        <br />
        מחכים לראותכם
      </div>
      <Link href={"https://nm-ambition.com/"} className="text-white" >

      N.M AMBITION © 2024 כל הזכיות שמורות 
      </Link>
    </div>
  );
};

export default page;
