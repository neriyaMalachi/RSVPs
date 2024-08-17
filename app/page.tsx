"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/store";
import { CiLocationOn } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import axios from "axios";

// Define the interface for the details of the page
interface PageDetails {
  BrideName: string;
  GroomName: string;
  Title: string;
  Location: string;
  Year: number;
  Month: number;
  Day: number;
  Hour: number;
  Minute: number;
  Description?: string;
  img?: string;
}

export default function Home() {
  const [detels, setDetels] = useState<PageDetails | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    axios.get("/api/DitelsOfThePage").then(function (results) {
      const data = results.data.data as PageDetails;
      setDetels(data);
    });
  }, []);



  return (
    <div className=" HomeFile  text-white  h-[100vh] flex flex-col justify-around items-center ">
      <header className=" h-[20%] flex flex-col items-center justify-evenly ">
        <h1 className="font-Regular_Text text-xl">{detels?.Title}</h1>
        <h2 className="text-3xl font-Bold_Text ">
          {detels?.BrideName} & {detels?.GroomName}
        </h2>
      </header>

      <main className="bg-slate-100/20 h-[60%] w-[90%] md:w-[50%] rounded-md p-1 flex flex-col justify-evenly items-center ">
        <p className="text-2xl font-Bold_Text text-slate-950">
          {detels?.Day}/{detels?.Month}/{detels?.Year}
        </p>
        <div className=" flex flex-col justify-around items-end  h-[13%]">
          <p className=" flex font-Regular_Text">
            {detels?.Location} <CiLocationOn size={25} />
          </p>
          <p className="flex font-Regular_Text">
            {detels?.Hour}:{detels?.Minute} <IoMdTime size={22} />
          </p>
        </div>
        <p className="text-center font-Light_Text" datatype="הזמנה">
          {detels?.Description}
        </p>
      </main>
      <footer className=" h-[20%] flex items-start mt-3">
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
