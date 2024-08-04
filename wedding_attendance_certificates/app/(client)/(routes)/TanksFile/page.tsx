'use client'
import React, { useEffect, useState } from "react";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const page = () => {
    const [isConfettiVisible, setConfettiVisible] = useState(false);
    const { width, height } = useWindowSize();
    useEffect(() => {
        // Trigger confetti for 5 seconds
        setConfettiVisible(true);
        const timer = setTimeout(() => setConfettiVisible(false), 5000);
    
        return () => clearTimeout(timer);
      }, []);
  return (
    <div className="HomeFile  h-[100vh] flex flex-col justify-around items-center">
      <div className=" bg-slate-200/35 h-96 w-[80%]  flex flex-col justify-around items-center text-center rounded-md font-Regular_Text text-white text-2xl">
        תודה רבה 
        <br/>
        מחכים לראותכם
      </div>
      {isConfettiVisible && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300} // Adjust the number of confetti pieces
        />
      )}
    </div>
  );
};

export default page;
