"use client";
import EditGuests from "@/pages/components/EditGuests";
import Louding from "@/pages/components/Louding";
import NavBarAdmin from "@/pages/components/NavBarAdmin";
import { useStore } from "@/context/store";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Futer from "@/pages/components/Futer";

const Page = () => {
  const [guests, setGuests] = useState([]);
  const [GuestEdit, setGuestEdit] = useState();
  const [louding, setLouding] = useState(true);
  const { refresh }: any = useStore();

  useEffect(() => {
    axios
      .get("/api/guests")
      .then(function (results) {
        setGuests(results.data.guests);
        setLouding(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [refresh]);
  let indexGuests = 1;

  return (
    <div className="w-full p-2">
      <NavBarAdmin />

      <div className="flex flex-col items-end m-2 md:flex-row ">
        <div className=" w-full md:w-[50%]">
          <div className="flexActionFLC font-Bold_Text w-[95%]  ">
            <p></p>
            <p>שם ושם משפחה</p>
            <p>פלאפון</p>
            <p>כמות</p>
          </div>
          <div className="AllGuests w-full  overflow-auto  border-t-4 border-b-4 border-red-500 h-[80vh] flex flex-col justify-around bg-slate-100 shadow-md ">
            {louding ? (
              <Louding />
            ) : (
              <>
                {" "}
                {guests.map((item: any) => (
                  <div
                    onClick={() => {
                      setGuestEdit(item);
                    }}
                    className={`bg-slate-200 border text-xs md:text-lg h-96 cursor-pointer hover:bg-slate-300  shadow-black/40 flex justify-between p-2 mt-2 rounded-md`}
                    key={item._id}
                  >
                    <p className="text-left w-4 bg">{indexGuests++})</p>
                    <p
                      className={` ${
                        item.attending ? "text-black" : "text-red-400 "
                      } `}
                    >
                      {" "}
                      <strong>{item.name}</strong>
                    </p>
                    <p className="">{item.phone}</p>
                    <p>{item.guests}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="w-full md:w-[50%] h-[80vh] bg-slate-200">
          <EditGuests GuestEdit={GuestEdit || ""} />
        </div>
      </div>
      <div className="w-full  h-28 bg-slate-200 ">
       <Futer/>
      </div>
    </div>
  );
};

export default Page;
