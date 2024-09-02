"use client";
import { useStore } from "@/context/store";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Futer = () => {
  const [AllGuests, setAllGuests] = useState<any[]>([]);
  const [countGroom, setCountGroom] = useState(1);
  const { refresh }: any = useStore();
  var countOfAFrendtsSide = 0;
  var countOfAGroomSide = 0;
  var countOfABrideSide = 0;

  const sumGroom = () => {
    for (let i = 0; i < AllGuests.length; i++) {
      if (AllGuests[i].side === "חברים")
        countOfAFrendtsSide += AllGuests[i].guests;
      else if (AllGuests[i].side === "צד כלה")
        countOfAGroomSide += AllGuests[i].guests;
      else if (AllGuests[i].side === "צד חתן")
        countOfABrideSide += AllGuests[i].guests;
    }
  };
  const getAllGuests = async () => {
    await axios
      .get("/api/guests")
      .then(function (results) {
        setAllGuests(results.data.guests);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllGuests();
  }, [refresh]);
  sumGroom();

  return (
    <div className="flex justify-around h-full items-center space-x-4">
    <div className="flex flex-col items-center font-Bold_Text text-sm md:text-lg p-4 w-24 md:w-32">
      <p className="text-gray-600">חברים</p>
      <p className="text-black text-2xl md:text-3xl">{countOfAFrendtsSide}</p>
    </div>
  
    <div className="flex flex-col items-center font-Bold_Text text-sm md:text-lg p-4 w-24 md:w-32">
      <p className="text-gray-600">צד כלה</p>
      <p className="text-black text-2xl md:text-3xl">{countOfAGroomSide}</p>
    </div>
  
    <div className="flex flex-col items-center font-Bold_Text text-sm md:text-lg p-4 w-24 md:w-32">
      <p className="text-gray-600">צד חתן</p>
      <p className="text-black text-2xl md:text-3xl">{countOfABrideSide}</p>
    </div>
  
    <div className="flex flex-col items-center font-Bold_Text text-sm md:text-lg p-4 w-24 md:w-32">
      <p className="text-gray-600">סך הכל</p>
      <p className="text-black text-2xl md:text-3xl">
        {countOfABrideSide + countOfAGroomSide + countOfAFrendtsSide}
      </p>
    </div>
  </div>
  
  );
};

export default Futer;
