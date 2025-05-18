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
  const [selectedCity, setSelectedCity] = useState("london");

  const [theme, setTheme] = useState<{
    mode: ThemeMode;
    variant: ThemeVariant;
  }>({
    mode: "light",
    variant: "default",
  });
  const [showWallpaper, setShowWallpaper] = useState(true);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load saved city from localStorage after component mounts (client-side only)
  useEffect(() => {
    const savedCities = localStorage.getItem("savedCities");
    if (savedCities) {
      const cities = JSON.parse(savedCities);
      setSelectedCity(
        cities.length > 0 ? cities[cities.length - 1].id : "london"
      );
    }
  }, []);

  const handleThemeChange = (mode: ThemeMode, variant: ThemeVariant) => {
    setTheme({ mode, variant });
    const selectedTheme = (
      themes[mode] as Record<
        ThemeVariant,
        { name: string; background: string; text: string; wallpaper: string }
      >
    )[variant];

    const fontClasses = Array.from(document.body.classList).filter(
      (cls) =>
        cls.includes("bricolage") ||
        cls.includes("space") ||
        cls.includes("antialiased")
    );

    document.body.className = `${fontClasses.join(" ")} ${
      selectedTheme.background
    } ${selectedTheme.text}`;

    // Only set wallpaper if showWallpaper is true
    if (showWallpaper) {
      document.body.style.backgroundImage = `url(${selectedTheme.wallpaper})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    } else {
      document.body.style.backgroundImage = "none";
    }
    document.body.style.transition = "all 0.3s ease";
  };

  const toggleWallpaper = () => {
    setShowWallpaper((prev) => !prev);
    // Re-apply theme to update wallpaper
    handleThemeChange(theme.mode, theme.variant);
  };

  return (
    <div className="mx-8">
      <Navbar
        onCitySelect={setSelectedCity}
        onThemeChange={handleThemeChange}
        onWallpaperToggle={toggleWallpaper}
        showWallpaper={showWallpaper}
        currentTheme={theme}
      />
      <main>
        <MainClock
          currentTime={currentTime}
          selectedCity={selectedCity}
          currentTheme={theme}
          selectedTheme={{
            ...theme,
            ...((themes[theme.mode] as Record<ThemeVariant, any>)[
              theme.variant
            ] || {}),
          }}
          showWallpaper={showWallpaper} // Add this prop
        />
        <CurrentLocation
          selectedCity={selectedCity}
          currentTheme={theme}
          showWallpaper={showWallpaper}
        />
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
