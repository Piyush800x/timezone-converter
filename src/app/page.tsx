"use client";
import CurrentLocation from "@/components/CurrentLocation";
import MainClock from "@/components/MainClock";
import Navbar from "@/components/Navbar";
import { useState, useEffect, useCallback } from "react";
import CityTimeCard from "@/components/CityTimeCard";
import { themes, ThemeMode, ThemeVariant } from "@/data/mockData";

export interface ThemeProperties {
  name: string;
  background: string;
  text: string;
  accent: string;
  accentText: string;
  nav: string;
  navText: string;
  tabBg: string;
  tabBorder: string;
  tabActive: string;
  tabActiveText: string;
  tabText: string;
  currentLocationText: string;
  wallpaper: string;
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState("london");

  // Initialize theme state from localStorage or default
  const [theme, setTheme] = useState<{
    mode: ThemeMode;
    variant: ThemeVariant;
  }>(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("selectedTheme");
      if (savedTheme) {
        return JSON.parse(savedTheme);
      }
    }
    return {
      mode: "light",
      variant: "default",
    };
  });

  const [showWallpaper, setShowWallpaper] = useState(() => {
    if (typeof window !== "undefined") {
      const savedWallpaper = localStorage.getItem("showWallpaper");
      return savedWallpaper ? JSON.parse(savedWallpaper) : true;
    }
    return true;
  });

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

  // Move handleThemeChange outside of useEffect for proper dependency handling
  const handleThemeChange = useCallback(
    (mode: ThemeMode, variant: ThemeVariant) => {
      const newTheme = { mode, variant };
      setTheme(newTheme);
      localStorage.setItem("selectedTheme", JSON.stringify(newTheme));

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
    },
    [showWallpaper] // Add showWallpaper as dependency
  );

  // Handle wallpaper toggle
  const toggleWallpaper = () => {
    setShowWallpaper((prev: boolean) => {
      const newValue = !prev;
      localStorage.setItem("showWallpaper", JSON.stringify(newValue));
      return newValue;
    });
    handleThemeChange(theme.mode, theme.variant);
  };

  // Load theme on mount with proper dependency
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("selectedTheme");
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        handleThemeChange(parsedTheme.mode, parsedTheme.variant);
      }
    }
  }, [handleThemeChange]); // Add handleThemeChange as dependency

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
            ...((themes[theme.mode] as Record<ThemeVariant, ThemeProperties>)[
              theme.variant
            ] || {}),
          }}
          showWallpaper={showWallpaper}
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
