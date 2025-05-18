"use client";
import { Clock, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { timezones } from "@/data/mockData";
import { useState } from "react";

interface NavbarProps {
  onCitySelect: (cityId: string) => void;
}

export default function Navbar({ onCitySelect }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchResults = timezones.filter((city) =>
    city.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center gap-2">
        <div className="bg-black rounded-full p-2">
          <Clock className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-lg">TimeZoneFlow</span>
      </div>

      <div className="relative max-w-xs w-full mx-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search"
          className="pl-8 bg-gray-100 border-0"
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

      <div className="flex gap-2">Theme</div>
    </header>
  );
}
