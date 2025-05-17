"use client";
import CurrentLocation from "@/components/CurrentLocation";
import MainClock from "@/components/MainClock";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import CityTimeCard from "@/components/CityTimeCard";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState("london");

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-8">
      <Navbar />
      <main>
        <MainClock currentTime={currentTime} selectedCity={selectedCity} />
        <CurrentLocation selectedCity={selectedCity} />
        <CityTimeCard
          currentTime={currentTime}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </main>
    </div>
  );
}
