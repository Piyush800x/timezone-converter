import { timezones } from "@/data/mockData";
import { themes, ThemeMode, ThemeVariant } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface CurrentLocationProps {
  selectedCity: string;
  currentTheme: { mode: ThemeMode; variant: ThemeVariant };
  showWallpaper: boolean;
}

export default function CurrentLocation({
  selectedCity,
  currentTheme,
  showWallpaper,
}: CurrentLocationProps) {
  const selectedTheme =
    themes[currentTheme.mode][
      currentTheme.variant as keyof (typeof themes)[typeof currentTheme.mode]
    ];
  const currentCity =
    timezones.find((tz) => tz.id === selectedCity) || timezones[2];

  return (
    <div
      className={cn(
        "flex justify-between items-start mb-8",
        showWallpaper &&
          currentTheme.mode === "light" &&
          currentTheme.variant !== "default"
          ? selectedTheme.currentLocationText // Use white text when wallpaper is on (except light default)
          : currentTheme.mode === "light"
          ? "text-gray-900" // Default dark text for light mode
          : "text-white" // White text for dark mode
      )}
    >
      <div>
        <h2 className="text-4xl font-bold">{currentCity.city},</h2>
        <h3 className="text-4xl font-bold">{currentCity.country}</h3>
      </div>
    </div>
  );
}
