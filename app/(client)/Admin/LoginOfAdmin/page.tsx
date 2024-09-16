"use client";
import Louding from "@/pages/components/Louding";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

const Page = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [token, setToken] = useState();
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const route = useRouter();

  const sendCode = async () => {
    setLoading(true);
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
          setLoading(false);
          setToken(results.data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } catch (error) {
      setMessage("שגיאה באיימיל");
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setLoading(true);
    try {
      await axios
        .post(`/api/ValidationCode`, { token, code })
        .then((results) => {
          if (results.data.status === 401) {
            setMessage("קוד לא תקין , נסה שנית");
          } else {
            const accessToken = results.data;
            console.log(accessToken);
            localStorage.setItem("accessToken", accessToken);
            route.push("/Admin/AllGuests");
            setMessage("התחברת בהצלחה למשך שעה אחת");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      setMessage("קוד לא תקין או עבר זמן ההתחברות");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded text-right shadow-md w-96">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-6">הכנס איימיל</h2>
            <input
              type="email"
              checked
              className="border p-2 mb-4 w-full text-right"
              placeholder="abcde@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={sendCode}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              {!loading ? (<>התחבר</>) : (<ClipLoader
              color={"blue"}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />)}
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
              {!loading ? <>אמת קוד</> : <ClipLoader
              color={"blue"}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />}
            </button>
          </>
        )}
        {message && <p className="text-red-500 mt-4 text-right">{message}</p>}
      </div>
    </div>
  );
};

export default Page;
