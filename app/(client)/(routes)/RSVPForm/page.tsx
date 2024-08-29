"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 0,
    attending: false,
    side: "",
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
    setIsLoading(true);
    e.preventDefault();
    console.log(formData);
    try {
      console.log(formData);
      
      await axios.post("/api/guests", formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: 0,
        attending: false,
        side: "",
        notes: "",
      });
      setIsLoading(false);
      router.push("/TanksFile");
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
  
        toast.error("! בעיה בפרטים או שנרשמת כבר");
      }, 5000);
      console.error("There was an error submitting the RSVP", error);
    }
  };
  const editSideFrends = (e: any) => {
    setFormData((val) => ({ ...val, side: e.target.value }));
  };

  
  return (
    <div className="HomeFile  text-black text-right flex items-center justify-center h-[100vh]">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className=" bg-slate-200/35  font-Bold_Text h-[60%] w-[90%] md:w-96   p-5 flex flex-col justify-around items-center rounded-md "
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
        <div className="flex justify-between w-72">
          <select
            onChange={editSideFrends}
            className="rounded-md bg-slate-50/70   dropdown-content bg-base-100 rounded-box z-[1] w-32 p-2 shadow"
          >
            <option className="text-right hover:bg-slate-300 block p-1 w-full text-sm text-gray-700">
              אחר
            </option>
            <option className="text-right hover:bg-slate-300 block p-1 w-full text-sm text-gray-700">
              חברים
            </option>
            <option className="text-right hover:bg-slate-300 hover: bl w-fullock p-1 text-sm text-gray-700">
              צד חתן
            </option>
            <option className="text-right hover:bg-slate-300 block p-1 w-full text-sm text-gray-700">
              צד כלה
            </option>
          </select>

          {/*  */}

          <div className=" flex flex-col items-center justify-evenly w-32">
            <p>אישור הגעה</p>

            <input
              type="checkbox"
              onClick={() => {
                formData.attending = !formData.attending;
              }}
            />
          </div>
        </div>
        <button
          disabled={
            formData.email && formData.name && formData.guests && formData.phone
              ? false
              : true
          }
          type="submit"
          className="bg-slate-50/70 p-2 w-72 rounded-md mt-2"
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
            <p> אישור</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default Page;
