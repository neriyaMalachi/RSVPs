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
    try {
      await axios
        .post(`${process.env.API_URL}/api/Guests`, formData)
        .then((results) => {
          console.log(results.data);
          
          if (results.data.status === 201) {
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
          } else if (results.data.status === 400) {
            setIsLoading(false);
            toast.error("פרטיך כבר קיימים במערכת");
          } else {
            setIsLoading(false);
            toast.error("!1 בעיה בפרטים או שנרשמת כבר");
          }
        })
        .catch((error: any) => {
          setIsLoading(false);
          toast.error("! 2בעיה בפרטים או שנרשמת כבר");
        });
    } catch (error) {
        setIsLoading(false);
        toast.error("! 3בעיה בפרטים או שנרשמת כבר");
    }
  };
  const editSideFrends = (e: any) => {
    setFormData((val) => ({ ...val, side: e.target.value }));
  };

  return (
    <div className="HomeFile text-black text-right flex items-center justify-center h-[100vh]">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className="bg-slate-200/35 font-Bold_Text h-[90%] w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] p-8 flex flex-col justify-around items-center rounded-md shadow-lg"
      >
        <div className="flex flex-col mb-4 w-full">
          <label className="text-lg mb-2">שם פרטי ומשפחה</label>
          <input
            type="text"
            name="name"
            className="font-light text-right w-full rounded-md p-3 bg-slate-100/10 border border-red-500/70"
            placeholder="שם"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4 w-full">
          <label className="text-lg mb-2">אימייל</label>
          <input
            className="font-light text-right w-full rounded-md p-3 bg-slate-100/10 border border-red-500/70"
            type="email"
            name="email"
            placeholder="name@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4 w-full">
          <label className="text-lg mb-2">טל</label>
          <input
            className="font-light text-right w-full rounded-md p-3 bg-slate-100/10 border border-red-500/70"
            type="number"
            name="phone"
            placeholder="012-345-6789"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4 w-full">
          <label className="text-lg mb-2">כמות מגיעים</label>
          <input
            className="font-light text-right w-full rounded-md p-3 bg-slate-100/10 border border-red-500/70"
            placeholder="0"
            type="number"
            name="guests"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4 w-full">
          <label className="text-lg mb-2">הוספה</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="font-light text-right w-full rounded-md p-3 bg-slate-100/10 border border-red-500/70"
          ></textarea>
        </div>
        <div className="flex justify-between w-full mb-4">
          <select
            onChange={editSideFrends}
            className="rounded-md bg-slate-50/70 w-48 p-3 shadow"
          >
            <option className="text-right hover:bg-slate-300 block p-1 text-sm text-gray-700">
              אחר
            </option>
            <option className="text-right hover:bg-slate-300 block p-1 text-sm text-gray-700">
              חברים
            </option>
            <option className="text-right hover:bg-slate-300 block p-1 text-sm text-gray-700">
              צד חתן
            </option>
            <option className="text-right hover:bg-slate-300 block p-1 text-sm text-gray-700">
              צד כלה
            </option>
          </select>
          <div className="flex flex-col items-center w-48">
            <p className="text-lg mb-2">אישור הגעה</p>
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
          className="bg-slate-50/70 font-Bold_Text text-black hover:bg-slate-100 p-3 w-full rounded-md mt-4"
        >
          {isLoading ? (
            <ClipLoader
              color={"blue"}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <p>אישור</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default Page;
