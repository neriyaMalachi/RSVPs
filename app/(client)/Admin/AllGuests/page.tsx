"use client";
import EditGuests from "@/pages/components/EditGuests";
import Louding from "@/pages/components/Louding";
import { useStore } from "@/context/store";
import { MdDelete } from "react-icons/md";
import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import Futer from "@/pages/components/Futer";
import toast, { Toaster } from "react-hot-toast";
import SecureAdminFils from "@/pages/componentForAdmin/SecureAdminFils";

const Page = () => {
  const [guests, setGuests] = useState([]);
  const [GuestEdit, setGuestEdit] = useState<any>();
  const [louding, setLouding] = useState(true);
  const { refresh, ChengeStatusFile }: any = useStore();
  const [nameFilter, steNameFilter] = useState<string>("");
  let indexGuests = 1;

  useEffect(() => {
    axios
      .get("/api/Guests")
      .then(function (results) {
        setGuests(results.data.guests);
        setLouding(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [refresh]);

  const deleteGustse = async (id: AxiosRequestConfig) => {
    const isConfirmed = window.confirm("האם אתה בטוח שאתה רוצה למחוק את האורח הזה?");
  
  if (!isConfirmed) {
    return;
  }

    await axios
      .delete("/api/Guests", { data: { id } })
      .then((results) => {
        console.log(results.data.message);

        ChengeStatusFile(!refresh);
        setGuestEdit("");
        toast.success("נמחק בהצלחה ");
      })
      .catch((error) => {
        toast.success(error);
      });
  };
  
  return (
    <SecureAdminFils>
    <div className="w-full p-4 bg-gray-100 ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col mt-5 md:flex-row justify-between items-start md:items-center m-2">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <div className="flex flex-col w-full">
            <div className="w-full mb-2">
              <input
                type="text"
                className="bg-white text-right border border-gray-300 shadow-md rounded-lg w-full p-2"
                placeholder="חיפוש לפי שם"
                onChange={(e) => {
                  steNameFilter(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-between bg-gray-200 py-2 px-4 rounded-lg shadow-inner">
              <p></p>
              <p>שם ושם משפחה</p>
              <p>פלאפון</p>
              <p>כמות</p>
            </div>
          </div>
          <div className="AllGuests w-full overflow-auto border-t-4 border-b-4 border-red-500 h-[70vh] bg-white shadow-lg mt-2 rounded-lg p-4">
            {louding ? (
              <Louding />
            ) : (
              <>
                {guests
                  .filter((item: any) =>
                    item.name.toLowerCase().includes(nameFilter.toLowerCase())
                  )
                  .map((item: any) => (
                    <div
                      onClick={() => {
                        setGuestEdit(item);
                      }}
                      className="bg-gray-50 hover:bg-gray-100 shadow-md border text-xs md:text-sm cursor-pointer flex justify-between p-3 mt-2 rounded-lg"
                      key={item._id}
                    >
                      <div className="flex items-center space-x-2">
                        <p
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteGustse(item._id);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <MdDelete />
                        </p>
                        <p className="text-left w-4"> {indexGuests++})</p>
                      </div>
                      <p
                        className={`${
                          item.attending ? "text-black" : "text-red-400"
                        }`}
                      >
                        <strong>{item.name}</strong>
                      </p>
                      <p>{item.phone}</p>
                      <p>{item.guests}</p>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 h-[80vh]  p-4">
          <EditGuests GuestEdit={GuestEdit || ""} />
        </div>
      </div>

      <div className="w-full rounded-md h-28 bg-gray-200 mt-4 shadow-lg">
        <Futer />
      </div>
    </div>
    </SecureAdminFils>
  );
};

export default Page;
