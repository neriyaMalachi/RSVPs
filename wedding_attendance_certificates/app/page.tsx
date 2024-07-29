"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/store";
import { CiLocationOn } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";

export default function Home() {
  const router = useRouter();

  const {
    DayOfTheWedding,
    NmaeOfBride,
    MonthOfTheWedding,
    NameOfGroom,
    YearOfTheWedding,
    LocationOfTheWedding,
    HourOfTheWedding,
    MinuteOfTheWedding,
    DescriptionOfTheWedding,
  }: any = useStore();

  return (
    <div className=" HomeFile text-white  h-[100vh] flex flex-col justify-around items-center ">
      <header className=" h-[20%] flex flex-col items-center justify-evenly ">
        <h1 className="font-Regular_Text text-xl">ברוכים הבאים לחתונת השנה</h1>
        <h2 className="text-3xl font-Bold_Text ">
          {NmaeOfBride} & {NameOfGroom}
        </h2>
      </header>

      <main className="bg-slate-100/20 h-[60%] flex flex-col justify-evenly items-center ">
        <p className="text-2xl font-Bold_Text text-slate-950">
          {DayOfTheWedding}/{MonthOfTheWedding}/{YearOfTheWedding}
        </p>
     <div className=" flex flex-col justify-around items-end  h-[13%]">

        <p className=" flex font-Regular_Text">{LocationOfTheWedding} <CiLocationOn size={25} /></p>
        <p className="flex font-Regular_Text">
          {HourOfTheWedding}:{MinuteOfTheWedding} <IoMdTime size={22} />

        </p>
     </div>
        <p className="text-center font-Light_Text" datatype="הזמנה">
        
          {DescriptionOfTheWedding}
        </p>
      </main>
      <footer className=" h-[20%] flex items-center">
        <button
          className="bg-slate-50/70 font-Bold_Text text-black hover:bg-slate-100 p-2 rounded-md "
          onClick={() => {
            router.push("RSVPForm");
          }}
        >
          לאישור ההגעה
        </button>
      </footer>
    </div>
  );
}
