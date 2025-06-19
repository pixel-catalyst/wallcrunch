"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, X } from "lucide-react";
import { useState } from "react";


export default function WallCrunch() {
  const [brightWallpaper, setBrightWallpaper] = useState<File | null>(null);
  const [darkWallpaper, setDarkWallpaper] = useState<File | null>(null);

  const handlePickWallpaper = (type: "bright" | "dark") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input.onchange = (e: any) => {
      const file = e.target.files?.[0] || null;
      if (type === "bright") setBrightWallpaper(file);
      else setDarkWallpaper(file);
    };
    input.click();
  };

  const handleClear = () => {
    setBrightWallpaper(null);
    setDarkWallpaper(null);
  };

  // Placeholder for save functionality
  const handleSave = () => {
    // Will be implemented with electronAPI
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-stone-900 dark:to-stone-800 flex flex-col items-center justify-center p-8 relative">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
        aria-label="Close"
        onClick={() => { }}
      >
        <X className="w-5 h-5 text-red-500" />
      </button>
      {/* Settings Button */}
      <button
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition"
        aria-label="Settings"
        onClick={() => { }}
      >
        <Settings className="w-5 h-5" />
      </button>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r ">
            WallCrunch
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handlePickWallpaper("bright")}
            >
              {brightWallpaper ? (
                <span>
                  Bright Wallpaper: <span className="font-medium">{brightWallpaper.name}</span>
                </span>
              ) : (
                "Pick Bright Wallpaper"
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handlePickWallpaper("dark")}
            >
              {darkWallpaper ? (
                <span>
                  Dark Wallpaper: <span className="font-medium">{darkWallpaper.name}</span>
                </span>
              ) : (
                "Pick Dark Wallpaper"
              )}
            </Button>
          </div>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={handleClear}
              disabled={!brightWallpaper && !darkWallpaper}
            >
              Clear
            </Button>
            <Button
              className="flex-1"
              onClick={handleSave}
              disabled={!brightWallpaper || !darkWallpaper}
            >
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

