"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import axios from "axios";
import Louding from "@/pages/components/Louding";
import { ClipLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

const fetchPageDetails = async () => {
  const response = await axios.get(`/api/DitelsOfThePage`);
  if (response?.data?.data) {
    return response.data.data;
  }
  throw new Error("Data not found in response");
};

const HomeFile = () => {
  const [loudingOfButton, setLoudingOfButton] = useState(false);
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["pageDetails"],
    queryFn: fetchPageDetails,
  });

  if (isLoading)
    return (
      <div data-testid="loader">
        <Louding />
      </div>
    );

  if (error) return <p>Error fetching page details: {error.message}</p>;
  return (
    <div className="HomeFile text-white h-[100vh] flex flex-col justify-around items-center">
      <header className="h-[20%] flex flex-col items-center justify-evenly">
        <h1 className="font-Regular_Text text-2xl">{data?.Title}</h1>
        <h2 className="text-2xl md:text-4xl font-Bold_Text text-center">
          {data?.BrideName} & {data?.GroomName}
        </h2>
      </header>

      <main className="bg-slate-100/20 h-[60%] w-[90%] md:w-96 rounded-md p-4 flex flex-col justify-evenly items-center space-y-4">
        <p className="text-3xl font-Bold_Text text-slate-950">
          {data?.Day}/{data?.Month}/{data?.Year}
        </p>
        <div className="flex flex-col justify-around items-end space-y-2">
          <p className="flex font-Regular_Text text-xl">
            {data?.Location} <CiLocationOn size={30} />
          </p>
          <p className="flex font-Regular_Text text-xl">
            {data?.Hour}:{data?.Minute} <IoMdTime size={27} />
          </p>
        </div>
        <p className="text-center font-Light_Text text-lg" datatype="הזמנה">
          {data?.Description}
        </p>
      </main>

      <footer className="h-[20%] flex items-start mt-4">
        <button
          id="rsvp-button"
          className="bg-slate-50/70 font-Bold_Text text-lg text-black hover:bg-slate-100 p-3 rounded-md"
          onClick={() => {
            setLoudingOfButton(true);
            router.push("RSVPForm");
          }}
        >
          {loudingOfButton ? (
            <div>
              <ClipLoader
                color={"blue"}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <p data-testid="rsvp-button">לאישור ההגעה</p>
          )}
        </button>
      </footer>
    </div>
  );
};

export default HomeFile;
