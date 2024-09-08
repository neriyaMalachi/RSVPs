"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/store";

const EditGuests = (guest: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const { refresh, ChengeStatusFile }: any = useStore();

  const router = useRouter();
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    phone: 0,
    guests: 0,
    attending: false,
    side: "",
    notes: "",
  });
  useEffect(() => {
    setFormData({
      _id: guest.GuestEdit._id,
      name: guest.GuestEdit.name,
      email: guest.GuestEdit.email,
      phone: guest.GuestEdit.phone,
      guests: guest.GuestEdit.guests,
      attending: guest.GuestEdit.attending,
      side: guest.GuestEdit.side,
      notes: guest.GuestEdit.notes,
    });
  }, [guest]);
  const editguestsFunction = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(formData);

    await axios
      .put(`/api/Guests`, formData)
      .then(function (res) {
        ChengeStatusFile(!refresh);
        setIsLoading(false);

        toast.success("עודכן בהצלחה ");
      })
      .catch(function (error) {
        console.log(error);
      });
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
  const editSideFrends = (e: any) => {
    setFormData((val) => ({ ...val, side: e.target.value }));
  };

  return (
    <div className="h-full  flex flex-col justify-evenly">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-Bold_Text text-center">
        שינוי פירטי אורחים
      </h1>
      <div className="text-black text-right flex items-center justify-center h-[100vh]">
        <Toaster position="top-center" reverseOrder={false} />
        <form
          onSubmit={editguestsFunction}
          className="font-Bold_Text w-[90%] md:w-[50%] xl:w-[20%] p-5 flex flex-col justify-around items-center rounded-md space-y-6"
        >
          <div className="flex flex-col space-y-2">
            <label>שם פרטי ומשפחה</label>
            <input
              type="text"
              name="name"
              className="font-light text-right w-80 rounded-md p-3 bg-slate-100/10 border border-red-500/70"
              placeholder="שם"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label>אימייל</label>
            <input
              className="font-light text-right w-80 rounded-md p-3 bg-slate-100/10 border border-red-500/70"
              type="email"
              name="email"
              placeholder="name@gmail.com"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label>טל</label>
            <input
              className="font-light text-right w-80 rounded-md p-3 bg-slate-100/10 border border-red-500/70"
              type="number"
              name="phone"
              placeholder="012-345-6789"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label>כמות מגיעים</label>
            <input
              className="font-light text-right w-80 rounded-md p-3 bg-slate-100/10 border border-red-500/70"
              placeholder="0"
              type="number"
              name="guests"
              value={formData.guests || 0}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between w-80 space-x-4">
            <select
              onChange={editSideFrends}
              className="rounded-md bg-slate-50/70 dropdown-content bg-base-100 rounded-box z-[1] w-36 p-3 shadow"
            >
              <option className="text-right hover:bg-slate-300 block p-1 w-full text-sm text-gray-700">
                {formData.side}
              </option>
              <option
                className={`${
                  formData.side === "חברים" ? "hidden" : ""
                } text-right hover:bg-slate-300 block p-1 w-full text-sm text-gray-700`}
              >
                חברים
              </option>
              <option
                className={`${
                  formData.side === "צד חתן" ? "hidden" : ""
                } text-right hover:bg-slate-300 hover: bl w-fullock p-1 text-sm text-gray-700`}
              >
                צד חתן
              </option>
              <option
                className={`${
                  formData.side === "צד כלה" ? "hidden" : ""
                } text-right hover:bg-slate-300 block p-1 w-full text-sm text-gray-700`}
              >
                צד כלה
              </option>
            </select>

            <div className="flex flex-col items-center justify-evenly w-36">
              <p>אישור הגעה</p>
              <input
                type="checkbox"
                checked={formData.attending || false}
                onChange={(e) =>
                  setFormData({ ...formData, attending: e.target.checked })
                }
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-300/70 p-3 w-80 rounded-md mt-4"
          >
            {isLoading ? (
              <ClipLoader
                color={"blue"}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <p>עדכן</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGuests;
