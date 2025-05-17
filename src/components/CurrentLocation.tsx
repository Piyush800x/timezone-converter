import { timezones } from "@/data/mockData";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface CurrentLocationProps {
  selectedCity: string;
}

export default function CurrentLocation({
  selectedCity,
}: CurrentLocationProps) {
  const currentCity =
    timezones.find((tz) => tz.id === selectedCity) || timezones[2];
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h2 className="text-4xl font-bold">{currentCity.city},</h2>
        <h3 className="text-4xl font-bold">{currentCity.country}</h3>
      </div>

      <div className="flex flex-col items-end">
        <p className="text-gray-600 text-right max-w-xs">
          Life moves fast. Stay on time and enjoy every moment!
        </p>
        <Button
          variant="outline"
          className="mt-4 rounded-full"
          onClick={() => {}}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another City
        </Button>
      </div>
    </div>
  );
}
