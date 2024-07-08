"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [number, setNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [isButtonDisabaled, setisButtonDisabaled] = useState(false);
 
 useEffect(()=>{
if(!number||!lastName){
setisButtonDisabaled(true)
}else{
  setisButtonDisabaled(false)
}
 },[number,lastName])
 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.post("/api/addInvited", {
      number,
      lastName,
    });
    // const data = await res.json();
    if (true) {
      setMessage("User added successfully!");
    } else {
      setMessage("Error adding user.");
    }
  };

  return (
    <div className="HomeFile flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black text-right">
      <h1 className="text-4xl font-extrabold  ">ישי & רונית</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white/35 p-8 rounded shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-6">אישור הגעה</h1>
        <div className="mb-4">
          <label className="block text-gray-700">כמות מגיעים</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">שם משפחה</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isButtonDisabaled}
          className="w-full bg-red-500/75 text-white py-2 px-4 rounded hover:bg-red-400/75"
        >
          אישור
        </button>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </form>
    </div>
  );
}
