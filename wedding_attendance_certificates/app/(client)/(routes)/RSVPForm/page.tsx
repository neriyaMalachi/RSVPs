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
    <div className="bg-yellow-100 text-black flex items-center justify-center h-[100vh] ">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>שם פרטי ומשפחה</label>
          <input
            type="text"
            name="text"
            placeholder="שם"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label>אימייל</label>
          <input
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
            type="number"
            name="0"
            value={formData.guests}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label>הוספה</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">אישור</button>
      </form>
    </div>
  );
};

export default Page;
