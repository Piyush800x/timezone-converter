"use client";
import { timezones } from "@/data/mockData";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CityTimeCardProps {
  currentTime: Date;
  selectedCity: string;
  setSelectedCity: (cityId: string) => void;
}

export default function CityTimeCard({
  currentTime,
  selectedCity,
  setSelectedCity,
}: CityTimeCardProps) {
  const [cities, setCities] = useState(timezones.slice(0, 4));

  // Get current city data
  const currentCity =
    timezones.find((tz) => tz.id === selectedCity) || timezones[2];

  // Determine if it's day or night in a timezone
  const getDayOrNight = (timezone: string) => {
    const hour = new Date().toLocaleString("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: timezone,
    });
    return Number.parseInt(hour) >= 6 && Number.parseInt(hour) < 18
      ? "Day"
      : "Night";
  };

  // Get time for a specific timezone
  const getTimeForZone = (timezone: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timezone,
    };
    return currentTime.toLocaleTimeString("en-US", options);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cities.map((city) => {
        const isSelected = city.id === selectedCity;
        const timeString = getTimeForZone(city.value);
        const dayOrNight = getDayOrNight(city.value);

        return (
          <div
            key={city.id}
            onClick={() => setSelectedCity(city.id)}
            className={cn(
              "p-4 rounded-lg cursor-pointer transition-colors",
              isSelected ? "bg-black text-white" : "bg-white hover:bg-gray-50"
            )}
          >
            <div className="flex justify-between items-center mb-2">
              <span>{city.city}</span>
              <span className="text-xs opacity-70">{city.utcOffset}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">{timeString}</span>
              <span className="flex items-center text-xs">
                {dayOrNight === "Day" ? (
                  <span className="text-yellow-500 mr-1">☀</span>
                ) : (
                  <span className="text-yellow-300 mr-1">🌙</span>
                )}
                {dayOrNight}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
