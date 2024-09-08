"use client";
import SecureAdminFils from "@/pages/componentForAdmin/SecureAdminFils";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const Page = () => {
  const [formData, setFormData] = useState({
    BrideName: "",
    GroomName: "",
    Title: "",
    Location: "",
    Hour: 0,
    Year: 0,
    Month: 0,
    Day: 0,
    Minute: 0,
    Description: "",
    img: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handelSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    await axios
      .put(`/api/DitelsOfThePage`, formData)
      .then(function (response) {
        console.log(response);
        setIsLoading(false)
        toast.success("פרטים עודכנו");
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  return (
    <SecureAdminFils>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Toaster position="top-center" reverseOrder={false} />

        <form onSubmit={handelSubmit} className="flex-grow">
          <div className="container mx-auto p-6 flex flex-col justify-around items-center text-right space-y-6">
            <h1 className="font-semibold text-2xl text-gray-800">
              פרטי החתונה
            </h1>

            <input
              className="w-full max-w-md bg-white border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:ring-2 focus:ring-yellow-200"
              type="text"
              name="Title"
              placeholder="כותרת"
              onChange={handleChange}
            />

            <input
              className="w-full max-w-md bg-white border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:ring-2 focus:ring-yellow-200"
              type="text"
              name="BrideName"
              placeholder="שם החתן"
              onChange={handleChange}
            />

            <input
              className="w-full max-w-md bg-white border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:ring-2 focus:ring-yellow-200"
              type="text"
              name="GroomName"
              placeholder="שם הכלה"
              onChange={handleChange}
            />

            <input
              className="w-full max-w-md bg-white border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:ring-2 focus:ring-yellow-200"
              type="text"
              name="Location"
              placeholder="מיקום"
              onChange={handleChange}
            />

            <div className="w-full max-w-md grid grid-cols-2 gap-4">
              <input
                className="bg-white border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:ring-2 focus:ring-yellow-200"
                type="number"
                name="Year"
                placeholder="שנה"
                onChange={handleChange}
              />
              <input
                className="bg-white border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:ring-2 focus:ring-yellow-200"
                type="number"
                name="Month"
                placeholder="חודש"
                onChange={handleChange}
              />
              <input
                className="bg-white border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:ring-2 focus:ring-yellow-200"
                type="Number"
                name="Day"
                placeholder="יום"
                onChange={handleChange}
              />
              <input
                className="bg-white border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:ring-2 focus:ring-yellow-200"
                type="number"
                name="Hour"
                placeholder="שעה"
                onChange={handleChange}
              />
              <input
                className="bg-white border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:ring-2 focus:ring-yellow-200"
                type="number"
                name="Minute"
                placeholder="דקות"
                onChange={handleChange}
              />
            </div>

            <input
              className="w-full max-w-md bg-white border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:ring-2 focus:ring-yellow-200"
              type="url"
              name="img"
              placeholder="תמונת רקע"
              onChange={handleChange}
            />

            <textarea
              className="w-full max-w-md bg-white border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:ring-2 focus:ring-yellow-200"
              name="Description"
              placeholder="תיאור קצר על החתונה"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full max-w-xs bg-yellow-200 text-gray-700 font-semibold rounded-md shadow-md py-3 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200"
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
          </div>
        </form>
      </div>
    </SecureAdminFils>
  );
};

export default Page;
