"use client";
import { timezones } from "@/data/mockData";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeMode, ThemeVariant, themes } from "@/data/mockData";

interface CityTimeCardProps {
  currentTime: Date;
  selectedCity: string;
  setSelectedCity: (cityId: string) => void;
  currentTheme: { mode: ThemeMode; variant: ThemeVariant };
}

export default function CityTimeCard({
  currentTime,
  selectedCity,
  setSelectedCity,
  currentTheme,
}: CityTimeCardProps) {
  const [cities, setCities] = useState(timezones.slice(0, 4));
  const selectedTheme = themes[currentTheme.mode][
    currentTheme.variant as keyof (typeof themes)[typeof currentTheme.mode]
  ] as {
    accent?: string;
    accentText?: string;
    background: string;
    text: string;
  };

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
              "p-4 rounded-lg cursor-pointer transition-colors shadow-2xl",
              isSelected
                ? "accent" in selectedTheme && "accentText" in selectedTheme
                  ? `${selectedTheme.accent} ${selectedTheme.accentText}`
                  : `${selectedTheme.background} ${selectedTheme.text}`
                : `${selectedTheme.background} ${selectedTheme.text} hover:opacity-80`
            )}
          >
            <div className="flex justify-between items-center mb-2">
              <span>{city.city}</span>
              <span
                className={cn(
                  "text-xs",
                  isSelected ? "opacity-80" : "opacity-60"
                )}
              >
                {city.utcOffset}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">{timeString}</span>
              <span className="flex items-center text-xs">
                {dayOrNight === "Day" ? (
                  <span className="mr-1">☀</span>
                ) : (
                  <span className="mr-1">🌙</span>
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
