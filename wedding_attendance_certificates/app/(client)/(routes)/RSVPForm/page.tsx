"use client";
import React, { useState } from "react";
import axios from "axios";

const Page = () => {
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
    e.preventDefault();
    try {
      await axios.post("/api/guests", formData);
      alert("RSVP submitted!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: 0,
        attending: false,
        notes: "",
      });
    } catch (error) {
      console.error("There was an error submitting the RSVP", error);
    }
  };

  return (
    <div className="HomeFile  text-white text-right flex items-center justify-center h-[100vh]">
      <form onSubmit={handleSubmit} className="bg-slate-200/35 w-[80%] p-3 flex flex-col justify-around rounded-sm">
        <div className="flex flex-col">
          <label>שם פרטי ומשפחה</label>
          <input
            type="text"
            name="text"
            className="font-light text-right w-72 rounded-sm p-1 bg-slate-100/10 border border-red-500/70"
            placeholder="שם"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label>אימייל</label>
          <input
            className="font-light text-right w-72 rounded-sm p-1 bg-slate-100/10 border border-red-500/70"
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
            className="font-light text-right w-72 rounded-sm p-1 bg-slate-100/10 border border-red-500/70"
            type="text"
            name="phone"
            placeholder="012-345-6789"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label>כמות מגיעים</label>
          <input
            className="font-light text-right w-72 rounded-sm p-1 bg-slate-100/10 border border-red-500/70"
            placeholder="0"
            type="number"
            // value={formData.guests}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-72 rounded-sm p-1">
          <label>הוספה</label>
          <textarea
            name="notes"
            // value={formData.notes}
            // onChange={handleChange}
            className=" font-light text-right w-72 rounded-sm p-1 bg-slate-100/10 border border-red-500/70"
          ></textarea>
        </div>
        <button type="submit" className="bg-rose-800/40 p-2 w-[100%] rounded-sm hover:bg-slate-100/10 mt-2">אישור</button>
      </form>
    </div>
  );
};

export default Page;
