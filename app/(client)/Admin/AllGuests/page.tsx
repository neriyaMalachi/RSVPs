"use client";
import NavBarAdmin from "@/pages/components/NavBarAdmin";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [guests, setGuests] = useState([]);
useEffect(()=>{

  axios.get('/api/guests').then(function(results){
    console.log("pppp",results.data.guests);
    setGuests(results.data.guests)
    
  }).catch(function(error){
    console.log(error);
    
  })
},[])
  return (
    <div>
      <NavBarAdmin />
      <div className="AllGuests">
       { guests.map((item:any) => (
        <div className="w-full h-full flex flex-col justify-around bg-slate-300 shadow-md shadow-black/40" key={item._id}>

        <p className="h-32" >{item.name}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Page;
