"use client";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useState, useEffect } from "react";
import { timezones } from "@/data/mockData";

export default function MainClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState("london");
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("24h");

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Get current city data
  const currentCity =
    timezones.find((tz) => tz.id === selectedCity) || timezones[2];

  // Format the current time for display
  const formatCurrentTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: timeFormat === "12h",
      timeZone: currentCity.value,
    };

    const timeString = currentTime.toLocaleTimeString("en-US", options);
    return timeString.replace(/:/g, ":");
  };

  // Get current date for the selected city
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: currentCity.value,
    };
    return currentTime.toLocaleDateString("en-US", options);
  };

  return (
    <div className="text-center mb-8">
      <h1 className="text-[384px] font-normal tracking-tighter leading-none">
        {formatCurrentTime()}
      </h1>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">Current</div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-black text-2xl">{getCurrentDate()}</span>
        </div>

        <Tabs
          defaultValue={timeFormat}
          onValueChange={(v) => setTimeFormat(v as "12h" | "24h")}
        >
          <TabsList className="bg-gray-200">
            <TabsTrigger value="12h" className="data-[state=active]:bg-white">
              12h
            </TabsTrigger>
            <TabsTrigger
              value="24h"
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              24h
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
