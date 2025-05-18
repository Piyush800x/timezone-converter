"use client";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useState, useEffect } from "react";
import { timezones } from "@/data/mockData";
import { Space_Mono } from "next/font/google";
import { ThemeMode, ThemeVariant } from "@/data/mockData";
import { cn } from "@/lib/utils";

const space_mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

interface MainClockProps {
  currentTime: Date;
  selectedCity: string;
  currentTheme: { mode: ThemeMode; variant: ThemeVariant };
  selectedTheme: {
    mode: ThemeMode;
    variant: ThemeVariant;
    tabBg: string;
    tabBorder: string;
    tabActive: string;
    tabActiveText: string;
    tabText: string;
  };
}

export default function MainClock({
  currentTime,
  selectedCity,
  currentTheme,
  selectedTheme,
}: MainClockProps) {
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("24h");

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
    if (timeFormat === "12h") {
      const [time, period] = timeString.split(" ");
      return (
        <div className="flex items-start justify-center w-full">
          <span className="text-[18vw]">{time.replace(/:/g, ":")}</span>
          <span className="text-[5vw] mt-[2vw] ml-[2vw] tracking-wide">
            {period}
          </span>
        </div>
      );
    }
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
    <div className="text-center mb-8 w-full overflow-hidden">
      <h1
        className={cn(
          space_mono.className,
          "text-[20vw] font-normal tracking-tighter leading-none",
          currentTheme.mode === "dark" ? "text-white" : "text-black"
        )}
      >
        {formatCurrentTime()}
      </h1>

      <div className="flex justify-between items-center mt-4">
        <div
          className={cn(
            "text-sm",
            currentTheme.mode === "dark" ? "text-gray-400" : "text-gray-500"
          )}
        >
          Current
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span
            className={cn(
              "text-2xl",
              currentTheme.mode === "dark" ? "text-white" : "text-black"
            )}
          >
            {getCurrentDate()}
          </span>
        </div>

        <Tabs
          defaultValue={timeFormat}
          onValueChange={(v) => setTimeFormat(v as "12h" | "24h")}
        >
          <TabsList
            className={cn(
              "border rounded-lg overflow-hidden",
              selectedTheme.tabBg,
              selectedTheme.tabBorder
            )}
          >
            <TabsTrigger
              value="12h"
              className={`transition-colors duration-200 px-4 py-2 data-[state=active]:${selectedTheme.tabActive} data-[state=active]:${selectedTheme.tabActiveText} ${selectedTheme.tabText}`}
            >
              12h
            </TabsTrigger>
            <TabsTrigger
              value="24h"
              className={`transition-colors duration-200 px-4 py-2 data-[state=active]:${selectedTheme.tabActive} data-[state=active]:${selectedTheme.tabActiveText} ${selectedTheme.tabText}`}
            >
              24h
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
