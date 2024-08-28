"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";



const Futer = () => {
  const [AllGuests, setAllGuests] = useState([]);
  const [countGroom, setCountGroom] = useState<Number>(0);

  //   const sumGroom = () => {
  //     for (let i = 0; i < AllGuests.length; i++) {
  //       if (AllGuests[i] === "groom") {
  //         setCountGroom(countGroom++);
  //       }
  //     }
  //     setCountGroom(4);
  //     return 4;
  //   };
  const guestCounts = AllGuests.reduce((acc: any, guest: any) => {
    acc[guest.side] = (acc[guest.side] || 0) + 1;
    return acc;
  }, {});
  console.log(guestCounts.groom);

  useEffect(() => {
    axios
      .get("/api/guests")
      .then(function (results) {
        console.log(results.data.guests);
        setAllGuests(results.data.guests);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex justify-around items-center">
      <div className="">חברים</div>
      <div className="">צד כלה</div>
      <div className="">
        <p>צד חתן</p>
        {guestCounts.groom}
      </div>

      <div className="flex flex-col  bg-slate-400">
        <p>סך הכל</p>

        {AllGuests.length || ""}
      </div>
    </div>
  );
};

export default Futer;
