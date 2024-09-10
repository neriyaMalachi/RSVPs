"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Louding from "../components/Louding";


const SecureAdminFils = ({ children }: { children: React.ReactNode }) => {
  const route = useRouter();
  const [isSuccessfull, setIsSuccessfull] = useState<Boolean>(false);

  useEffect(() => {
    
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
      
    if (token) {
      setIsSuccessfull(true);
    } else {
      setIsSuccessfull(false);
      route.push("/Admin/LoginOfAdmin")

    }
  }, [route]);

  if (!isSuccessfull) {
    return (
   <Louding/>
    );
  }
  return <main>{children}</main>;
};

export default SecureAdminFils;
