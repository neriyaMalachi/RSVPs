"use client";
import NavBarAdmin from "@/pages/components/NavBarAdmin";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [guests, setGuests] = useState();
useEffect(()=>{

  axios.get('/api/guests').then(function(results){{
    console.log(results.data);
    setGuests(results.data)
    
  }}).catch(function(error){
    console.log(error);
    
  })
},[])
  return (
    <div>
      <NavBarAdmin />
      <div className="AllGuests">
       {/* { guests.array.forEach((item:any) => {
        <p>{item}</p>
       })} */}
      </div>
    </div>
  );
};

export default Page;
