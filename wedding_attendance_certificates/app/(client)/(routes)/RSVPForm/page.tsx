"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
// import {TanksFile} from '@/app/(client)/(routes)/TanksFile'
const Page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 0,
    attending: false,
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(formData);
    e.preventDefault();
    try {
      await axios.post("/api/guests", formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: 0,
        attending: false,
        notes: "",
      });
      toast.success("האישור עבר בהצלחה מחכים לראותכם ");
      router.push("/TanksFile");
    } catch (error) {
      console.error("There was an error submitting the RSVP", error);
    }
  };

  return (
    <div className="HomeFile  text-white text-right flex items-center justify-center h-[100vh]">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className=" bg-slate-200/35  font-Bold_Text w-[80%] p-5 flex flex-col justify-around items-center rounded-md "
      >
        <div className="flex flex-col">
          <label>שם פרטי ומשפחה</label>
          <input
            type="text"
            name="name"
            className=" font-light text-white text-right w-72 rounded-md p-1 bg-slate-100/10 border border-red-500/70"
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
        <div className="flex flex-col w-72 rounded-sm p-1">
          <label>הוספה</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className=" font-light text-right w-72 rounded-md p-1 bg-slate-100/10 border border-red-500/70"
          ></textarea>
        </div>
        <div className="flex justify-evenly w-full">
          <input
            type="checkbox"
            onClick={() => {
              formData.attending = !formData.attending;
            }}
          />
          <p>אישור שמגיעים</p>
        </div>
        <button
          type="submit"
          className="bg-amber-400/30 p-2 w-[100%] rounded-md hover:bg-slate-100/10 mt-2"
        >
          אישור
        </button>
      </form>
    </div>
  );
};

export default Page;
