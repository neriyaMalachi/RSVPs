"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  return (
    <div className="text-black bg-slate-200 h-[100vh] flex flex-col justify-around items-center ">
      <header className=" h-[20%] flex items-center ">
        <h1 className="font-serif text-xl">
          ברוכים הבאים לחתונה של פלוני ופלונית
        </h1>
      </header>

      <main className="bg-slate-500 h-[60%]">
      ברוכים הבאים עם הודעת הזמנה אישית.
      תיאור קצר על החתונה (תאריך, מיקום, זמן וכו').
      </main>
      <footer className=" h-[20%]">
        <button
          className="bg-slate-50 hover:bg-slate-100 p-2 rounded-md"
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
