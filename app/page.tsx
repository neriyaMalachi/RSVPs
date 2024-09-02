"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import axios from "axios";
import Louding from "@/pages/components/Louding";

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
  const [louding, setLouding] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/DitelsOfThePage").then(function (results) {
      const data = results.data.data as PageDetails;
      setDetels(data);
      setLouding(false);
    });
  }, []);

  return (
    <div className="HomeFile text-white h-[100vh] flex flex-col justify-around items-center">
      {louding ? (
        <Louding />
      ) : (
        <>
          <header className="h-[20%] flex flex-col items-center justify-evenly">
            <h1 className="font-Regular_Text text-2xl">{detels?.Title}</h1>
            <h2 className="text-2xl md:text-4xl font-Bold_Text text-center">
              {detels?.BrideName} & {detels?.GroomName}
            </h2>
          </header>

          <main className="bg-slate-100/20 h-[60%] w-[90%] md:w-96 rounded-md p-4 flex flex-col justify-evenly items-center space-y-4">
            <p className="text-3xl font-Bold_Text text-slate-950">
              {detels?.Day}/{detels?.Month}/{detels?.Year}
            </p>
            <div className="flex flex-col justify-around items-end space-y-2">
              <p className="flex font-Regular_Text text-xl">
                {detels?.Location} <CiLocationOn size={30} />
              </p>
              <p className="flex font-Regular_Text text-xl">
                {detels?.Hour}:{detels?.Minute} <IoMdTime size={27} />
              </p>
            </div>
            <p className="text-center font-Light_Text text-lg" datatype="הזמנה">
              {detels?.Description}
            </p>
          </main>
          <footer className="h-[20%] flex items-start mt-4">
            <button
              className="bg-slate-50/70 font-Bold_Text text-lg text-black hover:bg-slate-100 p-3 rounded-md"
              onClick={() => {
                router.push("RSVPForm");
              }}
            >
              לאישור ההגעה
            </button>
          </footer>
        </>
      )}
    </div>
  );
}
