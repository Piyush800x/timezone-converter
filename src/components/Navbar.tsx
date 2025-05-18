"use client";
import { Clock, Plus, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { timezones } from "@/data/mockData";
import { useState } from "react";
import { ThemeMode, ThemeVariant, themes } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Image, ImageOff } from "lucide-react"; // Add this import
import { toast } from "sonner";
import { type ThemeProperties } from "@/app/page"; // Import the interface

interface NavbarProps {
  onCitySelect: (cityId: string) => void;
  onThemeChange: (mode: ThemeMode, variant: ThemeVariant) => void;
  onWallpaperToggle: () => void;
  showWallpaper: boolean;
  currentTheme: { mode: ThemeMode; variant: ThemeVariant };
}

// Add this interface at the top of the file with other interfaces
interface SavedCity {
  id: string;
  city: string;
  country: string;
  value: string;
  utcOffset: string;
}

export default function Navbar({
  onCitySelect,
  onThemeChange,
  onWallpaperToggle,
  showWallpaper,
  currentTheme,
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleCitySelect = (cityId: string) => {
    onCitySelect(cityId);
    setSearchQuery("");
    setShowResults(false);

    const selectedCity = timezones.find((city) => city.id === cityId);
    if (selectedCity) {
      const savedCities = JSON.parse(
        localStorage.getItem("savedCities") || "[]"
      ) as SavedCity[];

      // Remove if already exists
      const filteredCities = savedCities.filter(
        (city: SavedCity) => city.id !== cityId
      );

      // Add to the end and keep only last 4
      const updatedCities = [...filteredCities.slice(-3), selectedCity];
      localStorage.setItem("savedCities", JSON.stringify(updatedCities));

      // Dispatch storage event to trigger update in CityTimeCard
      window.dispatchEvent(new Event("storage"));
    }
  };

  // Get theme properties
  const selectedTheme = (
    themes[currentTheme.mode] as Record<ThemeVariant, ThemeProperties>
  )[currentTheme.variant];

  const searchResults = timezones.filter((city) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      city.city.toLowerCase().includes(searchLower) ||
      city.country.toLowerCase().includes(searchLower)
    );
  });

  const handleWallpaperToggle = () => {
    if (currentTheme.variant !== "default" || currentTheme.mode !== "light") {
      toast.error("Wallpaper can only be toggled in Light Default theme");
      return;
    }
    onWallpaperToggle();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-center justify-between p-4 transition-all duration-300 ease-in-out",
        showWallpaper ? "bg-transparent" : selectedTheme.nav,
        // Text color logic
        showWallpaper && currentTheme.variant !== "default"
          ? "text-white"
          : selectedTheme.navText
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "rounded-full p-2",
            selectedTheme.accent,
            selectedTheme.accentText
          )}
        >
          <Clock className="h-5 w-5" />
        </div>
        <span
          className={cn(
            "font-bold text-lg",
            showWallpaper && currentTheme.variant !== "default"
              ? "text-white"
              : selectedTheme.navText
          )}
        >
          TimeZonesNow
        </span>
      </div>

      <div className="relative max-w-xs w-full mx-4 mr-32 border-2 rounded-xl">
        <Search
          className={cn(
            "absolute left-2 top-2.5 h-4 w-4",
            currentTheme.mode === "dark" ? "text-gray-400" : "text-gray-500"
          )}
        />
        <Input
          placeholder="Search your timezone"
          className={cn(
            "pl-8 border-0",
            currentTheme.mode === "dark"
              ? "bg-gray-800/50 text-gray-100 placeholder:text-gray-400"
              : "bg-gray-100/50 text-gray-900 placeholder:text-gray-500"
          )}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
        />

        {/* Search Results Dropdown */}
        {showResults && searchQuery && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto z-50"
          >
            {searchResults.length > 0 ? (
              searchResults.map((city) => (
                <div
                  key={city.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex flex-row justify-between"
                  onClick={() => handleCitySelect(city.id)}
                >
                  <div>
                    <div className="font-medium">{city.city}</div>
                    <div className="text-sm text-gray-500">{city.country}</div>
                  </div>
                  <div className="items-center mt-2">
                    <Plus className="w-5 h-5" />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No cities found</div>
            )}
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {currentTheme.mode === "light" ? <Sun /> : <Moon />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="p-2">
              <h3 className="font-medium mb-2">Light Themes</h3>
              {Object.entries(themes.light).map(([key, theme]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => onThemeChange("light", key as ThemeVariant)}
                >
                  {theme.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <h3 className="font-medium mb-2">Dark Themes</h3>
              {Object.entries(themes.dark).map(([key, theme]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => onThemeChange("dark", key as ThemeVariant)}
                >
                  {theme.name}
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div
          onClick={handleWallpaperToggle}
          className={cn(
            "p-2 rounded-lg transition-colors duration-300",
            "hover:bg-opacity-20",
            (currentTheme.variant !== "default" ||
              currentTheme.mode !== "light") &&
              "opacity-50 cursor-not-allowed"
          )}
          title={
            currentTheme.variant !== "default" || currentTheme.mode !== "light"
              ? "Only available in Light Default theme"
              : showWallpaper
              ? "Disable wallpaper"
              : "Enable wallpaper"
          }
        >
          {showWallpaper ? (
            <Button
              variant="ghost"
              disabled={
                currentTheme.variant !== "default" ||
                currentTheme.mode !== "light"
              }
            >
              <Image className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              disabled={
                currentTheme.variant !== "default" ||
                currentTheme.mode !== "light"
              }
            >
              <ImageOff className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
