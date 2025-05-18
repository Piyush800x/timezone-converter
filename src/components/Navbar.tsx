"use client";
import { Clock, Search } from "lucide-react";
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

interface NavbarProps {
  onCitySelect: (cityId: string) => void;
  onThemeChange: (mode: ThemeMode, variant: ThemeVariant) => void;
  currentTheme: { mode: ThemeMode; variant: ThemeVariant };
}

export default function Navbar({
  onCitySelect,
  onThemeChange,
  currentTheme,
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const selectedTheme =
    themes[currentTheme.mode][
      currentTheme.variant as keyof (typeof themes)[typeof currentTheme.mode]
    ];

  const searchResults = timezones.filter((city) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      city.city.toLowerCase().includes(searchLower) ||
      city.country.toLowerCase().includes(searchLower)
    );
  });

  return (
    <header
      className={cn(
        "flex items-center justify-between p-4 backdrop-blur-sm background-color 0.3s, color 0.3s",
        selectedTheme.nav,
        selectedTheme.navText
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
        <span className="font-bold text-lg">TimeZoneFlow</span>
      </div>

      <div className="relative max-w-xs w-full mx-4 border-2 rounded-xl">
        <Search
          className={cn(
            "absolute left-2 top-2.5 h-4 w-4",
            currentTheme.mode === "dark" ? "text-gray-400" : "text-gray-500"
          )}
        />
        <Input
          placeholder="Search"
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
          <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto z-50">
            {searchResults.length > 0 ? (
              searchResults.map((city) => (
                <div
                  key={city.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onCitySelect(city.id);
                    setSearchQuery("");
                    setShowResults(false);
                  }}
                >
                  <div className="font-medium">{city.city}</div>
                  <div className="text-sm text-gray-500">{city.country}</div>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No cities found</div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-2">
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
      </div>
    </header>
  );
}
