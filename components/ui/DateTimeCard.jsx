"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

export default function DateTimeCard() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(()=>{
    const timer=setInterval(()=>{
      setCurrentDateTime(new Date());
    },1000);
    return ()=>clearInterval(timer);
  },[]);
  const date = currentDateTime.toLocaleDateString("en-IN",{
    day:"numeric",
    month:"short",
    year:"numeric"
  });
  const day = currentDateTime.toLocaleDateString("en-IN",{
    weekday:"long"
  });
  const time = currentDateTime.toLocaleTimeString("en-IN",{
    hour:"2-digit",
    minute:"2-digit",
  });
  return(
    <div className="date-time-card card">
        <div className="date-card">
            <Image
                src="/icons/logo.png"
                alt=""
                width={32}
                height={32}
            />
            <div>
                <div className="date">{date}</div>
                <div className="day">{day}</div>
            </div>
        </div>
        <div className="time-card">
            <Image
                src="/icons/logo.png"
                alt=""
                width={32}
                height={32}
            />
            <div>
                <div className="time">{time}</div>
            </div>
        </div>
      
    </div>
  )
}