"use client";
import EditGuests from "@/pages/components/EditGuests";
import NavBarAdmin from "@/pages/components/NavBarAdmin";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [guests, setGuests] = useState([]);
  const [GuestEdit, setGuestEdit] = useState();
  useEffect(() => {
    axios
      .get("/api/guests")
      .then(function (results) {
        setGuests(results.data.guests);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  let indexGuests = 1;
  return (
    <div className="">
      <NavBarAdmin />
      <div className="flex flex-col md:flex-row ">
        <div className=" w-full md:w-[50%]">
          <div className="flexActionFLC font-Bold_Text w-[95%]  ">
            <p></p>
            <p>שם ושם משפחה</p>
            <p>פלאפון</p>
            <p>כמות</p>
          </div>
          <div className="AllGuests w-[95%]  overflow-auto  border-t-4 border-b-4 border-red-500 h-[80vh] flex flex-col justify-around bg-slate-100 shadow-md m-2">
            {guests.map((item: any) => (
              <div
                onClick={() => {
                  setGuestEdit(item);
                 
                }}
                className={`bg-slate-200 border h-96  shadow-black/40 flex justify-between p-2 mt-2 rounded-md`}
                key={item._id}
              >
                <p className="text-left w-4 bg">{indexGuests++})</p>
                <p className={` ${item.attending ? "text-black" : "text-red-400 text-lg"}`}>
                  {" "}
                  <strong>{item.name}</strong>
                </p>
                <p>{item.phone}</p>
                <p>{item.guests}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-[50%] h-[80vh] bg-slate-100">
          <EditGuests GuestEdit={GuestEdit} />
        </div>
      </div>
    </div>
  );
};

export default Page;
