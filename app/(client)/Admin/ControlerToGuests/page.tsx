"use client";
import axios from "axios";
import React, { useState } from "react";

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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handelSubmit = async () => {
    await axios
      .put("/api/DitelsOfThePage", formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handelSubmit}>
      <div className="bg-lime-100 w-full h-[100vh] flex flex-col justify-around items-center text-right">
        <h1>מילוי מלל</h1>
        <input
          className="text-right border shadow-md p-2  rounded-md"
          type="text"
          name="Title"
          placeholder="כותרת"
          onChange={handleChange}
        />
        <input
          className="text-right border shadow-md p-2  rounded-md"
          type="text"
          name="BrideName"
          placeholder="שם החתן"
          onChange={handleChange}
        />
        <input
          className="text-right border shadow-md p-2  rounded-md"
          type="text"
          name="GroomName"
          placeholder="שם הכלה"
          onChange={handleChange}
        />
        <input
          className="text-right border shadow-md p-2  rounded-md"
          type="text"
          name="Location"
          placeholder="מיקום"
          onChange={handleChange}
        />
        <input
          className="text-right border shadow-md p-2  rounded-md"
          type="number"
          name="year"
          placeholder="שנה"
          onChange={handleChange}
        />{" "}
        <input
          className="text-right border shadow-md p-2  rounded-md"
          type="number"
          name="Month"
          placeholder="חודש"
          onChange={handleChange}
        />{" "}
        <input
          className="text-right border shadow-md p-2  rounded-md"
          type="Number"
          name="Day"
          placeholder="יום"
          onChange={handleChange}
        />
        <input
          className="text-right border shadow-md p-2  rounded-md"
          type="number"
          name="Hour"
          placeholder="שעה "
          onChange={handleChange}
        />
        <input
          className="text-right border shadow-md p-2  rounded-md"
          type="number"
          name="Minute"
          placeholder="דקות "
          onChange={handleChange}
        />
        <input
          className="text-right border shadow-md p-2  rounded-md"
          name="Description"
          type="text"
          placeholder=" תיאור קצר על החתונה"
          onChange={handleChange}
        />
        <input
          className="text-right border shadow-md p-2  rounded-md"
          type="url"
          name="img"
          placeholder=" תמונת רקע"
          onChange={handleChange}
        />
        <button type="submit" className="border p-2 rounded-lg bg-green-300">
          אישור
        </button>
      </div>
    </form>
  );
};

export default Page;
