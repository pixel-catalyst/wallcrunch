import { useTranslation } from "react-i18next";
import Footer from "@/components/template/Footer";
import { useState } from "react";
import React from "react";

export default function HomePage() {
  const { t } = useTranslation();
  const [selectedWallpaper1, setSelectedWallpaper1] = useState<string | null>(null);
  const [selectedWallpaper2, setSelectedWallpaper2] = useState<string | null>(null);

  const handleWallpaperChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const filePath = URL.createObjectURL(file);
      setSelectedWallpaper1(filePath);
    }
  };

  const handleWallpaperChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const filePath = URL.createObjectURL(file);
      setSelectedWallpaper2(filePath);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">


        <div className="flex w-full justify-center space-x-4">
          <div className="rounded-lg overflow-hidden shadow-md w-1/2">
            <label
              htmlFor="wallpaper-upload-1"
              className="relative flex items-center justify-center h-48 w-full bg-muted hover:bg-secondary cursor-pointer"
            >
              {selectedWallpaper1 ? (
                <img src={selectedWallpaper1} alt="Wallpaper 1" className="object-cover w-full h-full" />
              ) : (
                <span>{t("chooseWallpaper")} 1</span>
              )}
              <input
                type="file"
                id="wallpaper-upload-1"
                className="hidden"
                onChange={handleWallpaperChange1}
              />
            </label>
          </div>

          <div className="rounded-lg overflow-hidden shadow-md w-1/2">
            <label
              htmlFor="wallpaper-upload-2"
              className="relative flex items-center justify-center h-48 w-full bg-muted hover:bg-secondary cursor-pointer"
            >
              {selectedWallpaper2 ? (
                <img src={selectedWallpaper2} alt="Wallpaper 2" className="object-cover w-full h-full" />
              ) : (
                <span>{t("chooseWallpaper")} 2</span>
              )}
              <input
                type="file"
                id="wallpaper-upload-2"
                className="hidden"
                onChange={handleWallpaperChange2}
              />
            </label>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
