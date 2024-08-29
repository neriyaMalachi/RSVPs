"use client";
import EditGuests from "@/pages/components/EditGuests";
import Louding from "@/pages/components/Louding";
import NavBarAdmin from "@/pages/components/NavBarAdmin";
import { useStore } from "@/context/store";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Futer from "@/pages/components/Futer";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [guests, setGuests] = useState([]);
  const [GuestEdit, setGuestEdit] = useState();
  const [louding, setLouding] = useState(true);
  const { refresh, ChengeStatusFile }: any = useStore();

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
  const deleteGustse = async () => {
    await axios
      .delete("/api/guests", GuestEdit)
      .then(function () {
        ChengeStatusFile(!refresh);
        toast.success("נמחק בהצלחה ");
      })
      .catch(function (error) {
        toast.success(error);
      });
  };
  return (
    <div className="w-full p-2">
      <Toaster position="top-center" reverseOrder={false} />

      <NavBarAdmin />

      <div className="flex flex-col justify-between items-end m-2 md:flex-row ">
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
                      deleteGustse();
                    }}
                    className={`bg-slate-200 border text-xs md:text-base h-96 cursor-pointer hover:bg-slate-300  shadow-black/40 flex justify-between p-2 mt-2 rounded-md`}
                    key={item._id}
                  >
                    <div className="flex justify-between items-center">
                      <p
                        onClick={() => setGuestEdit(item)}
                        className="text-red-500 hover:text-xl "
                      >
                        <MdDelete />
                      </p>
                      <p className="text-left w-4 "> {indexGuests++})</p>
                    </div>
                    <p
                      className={` ${
                        item.attending ? "text-black" : "text-red-400 "
                      }  `}
                    >
                      {" "}
                      <strong>{item.name}</strong>
                    </p>
                    <p className="">{item.phone}</p>
                    <p className="">{item.guests}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="w-full md:w-[50%] rounded-xl md:ml-2 h-[80vh] bg-slate-200">
          <EditGuests GuestEdit={GuestEdit || ""} />
        </div>
      </div>
      <div className="w-full rounded-xl  h-28 bg-slate-200 ">
        <Futer />
      </div>
    </div>
  );
};

export default Page;
