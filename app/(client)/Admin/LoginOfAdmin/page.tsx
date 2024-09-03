"use client";
import axios from "axios";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter Code
  const [message, setMessage] = useState("");

  const sendCode = async () => {
    try {
      await axios.get("/api/ValidationEmail", { data: { email } });
      setStep(2);
      setMessage("Verification code sent to your email.");
    } catch (error) {
      setMessage("Error sending code.");
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify-code", {
        email,
        code,
      });
      const { token } = response.data;
      localStorage.setItem("OurSiteJWT", token);
      setMessage(
        "Logged in successfully! You have admin access for 30 minutes."
      );
      // Redirect or perform any admin action
    } catch (error) {
      setMessage("Invalid code. Please try again.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <input
              type="email"
              className="border p-2 mb-4 w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={sendCode}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Send Code
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">Enter Verification Code</h2>
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
              Verify Code
            </button>
          </>
        )}
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Page;
