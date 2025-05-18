"use client";
import CurrentLocation from "@/components/CurrentLocation";
import MainClock from "@/components/MainClock";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import CityTimeCard from "@/components/CityTimeCard";
import { themes, ThemeMode, ThemeVariant } from "@/data/mockData";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState(() => {
    // Try to load last selected city from localStorage
    const savedCities = localStorage.getItem("savedCities");
    if (savedCities) {
      const cities = JSON.parse(savedCities);
      return cities.length > 0 ? cities[cities.length - 1].id : "london";
    }
    return "london";
  });
  const [theme, setTheme] = useState<{
    mode: ThemeMode;
    variant: ThemeVariant;
  }>({
    mode: "light",
    variant: "default",
  });

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleThemeChange = (mode: ThemeMode, variant: ThemeVariant) => {
    setTheme({ mode, variant });
    // Apply theme classes and wallpaper
    const selectedTheme = (
      themes[mode] as Record<
        ThemeVariant,
        { name: string; background: string; text: string; wallpaper: string }
      >
    )[variant];

    // Preserve the font classes while updating theme
    const fontClasses = Array.from(document.body.classList).filter(
      (cls) =>
        cls.includes("bricolage") ||
        cls.includes("space") ||
        cls.includes("antialiased")
    );

    document.body.className = `${fontClasses.join(" ")} ${
      selectedTheme.background
    } ${selectedTheme.text}`;
    document.body.style.backgroundImage = `url(${selectedTheme.wallpaper})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "background-color 0.3s, color 0.3s";
  };

  return (
    <div className="mx-8">
      <Navbar
        onCitySelect={setSelectedCity}
        onThemeChange={handleThemeChange}
        currentTheme={theme}
      />
      <main>
        <MainClock
          currentTheme={theme}
          currentTime={currentTime}
          selectedCity={selectedCity}
          selectedTheme={{
            ...theme,
            ...((themes[theme.mode] as Record<ThemeVariant, any>)[
              theme.variant
            ] || {}),
          }}
        />
        <CurrentLocation selectedCity={selectedCity} />
        <CityTimeCard
          currentTime={currentTime}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          currentTheme={theme}
        />
      </main>
    </div>
  );
}
