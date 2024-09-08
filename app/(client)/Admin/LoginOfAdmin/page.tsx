"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [token, setToken] = useState();
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const route = useRouter();

  const sendCode = async () => {
    try {
      await axios
        .post(`/api/ValidationEmail`, { email })
        .then((results) => {
          if (results.data.status === 405) {
            setMessage("האיימיל לא נכון נסה שנית");
          } else {
            setStep(2);
            setMessage("נשלח אליך קוד לאימייל");
          }
          setToken(results.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      setMessage("שגיאה באיימיל");
    }
  };

  const verifyCode = async () => {
    try {
      await axios
        .post(`/api/ValidationCode`, { token, code })
        .then((results) => {
          console.log(results.data.status);
          if (results.data.status === 401) {
            setMessage("קוד לא תקין , נסה שנית");
          } else {
            const accessToken = results.data;
            console.log(accessToken);
            localStorage.setItem("accessToken", accessToken);
            route.push("/Admin/AllGuests");
            setMessage("התחברת בהצלחה למשך שעה אחת");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      setMessage("קוד לא תקין או עבר זמן ההתחברות");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded text-right shadow-md w-96">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-6">הכנס איימיל</h2>
            <input
              type="email"
              className="border p-2 mb-4 w-full text-right"
              placeholder="abcde@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={sendCode}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              התחבר
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">קוד אימות</h2>
            <input
              type="text"
              className="border p-2 mb-4 w-full"
              placeholder="Enter the code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={verifyCode}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              אמת קוד
            </button>
          </>
        )}
        {message && <p className="text-red-500 mt-4 text-right">{message}</p>}
      </div>
    </div>
  );
};

export default Page;
