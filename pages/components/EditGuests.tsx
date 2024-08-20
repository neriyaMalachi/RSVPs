"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const EditGuests = (guest:any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: guest.GuestEdit.name,
        email: guest.GuestEdit.email,
        phone: guest.GuestEdit.phone,
        guests: 0,
        attending: false,
        side: "",
        notes: "",
      });
    
console.log(formData);

  const editguestsFunction = () => {
    console.log(formData);
    
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="border  h-full flex flex-col justify-evenly ">
        <h1 className="text-2xl font-Bold_Text text-center">שינוי פירטי אורחים</h1>
      <div className=" text-black text-right flex items-center justify-center h-[100vh]">
        <Toaster position="top-center" reverseOrder={false} />
        <form
          onSubmit={editguestsFunction}
          className="  font-Bold_Text w-[90%] md:w-[50%] xl:w-[20%]   p-5 flex flex-col justify-around items-center rounded-md "
        >
          <div className="flex flex-col">
            <label>שם פרטי ומשפחה</label>
            <input
              type="text"
              name="name"
              className=" font-light text-right w-72 rounded-md p-1 bg-slate-100/10 border border-red-500/70"
              placeholder="שם"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>אימייל</label>
            <input
              className="font-light text-right w-72 rounded-md p-1 bg-slate-100/10 border border-red-500/70"
              type="email"
              name="email"
              placeholder="name@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>טל</label>
            <input
              className="font-light text-right w-72 rounded-md p-1 bg-slate-100/10 border border-red-500/70"
              type="number"
              name="phone"
              placeholder="012-345-6789"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>כמות מגיעים</label>
            <input
              className="font-light text-right w-72 rounded-md p-1 bg-slate-100/10 border border-red-500/70"
              placeholder="0"
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
            />
          </div>
         
         
          <button
            type="submit"
            className="bg-green-300/70 p-2 w-72 rounded-md mt-2"
          >
            {isLoading ? (
              <ClipLoader
                color={"blue"}
                // loading={loading}
                // cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <p> עדכן</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGuests;
