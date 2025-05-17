import { Clock, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Navbar() {
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
        <Input placeholder="Search" className="pl-8 bg-gray-100 border-0" />
      </div>

      <div className="flex gap-2">Theme</div>
    </header>
  );
}
