import React, { useMemo } from "react";
import { useController } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import NextImg from "next/image";
import { twMerge } from "tailwind-merge";
import Typography from "@/components/ui/typography";

export type UpsaveThumbnailProps = {
  className?: string;
  error?: string;
  thumbnail: string;
  preview: File | null;
  setPreview: (value: File | null) => void;
  required?: boolean;
  onChange?: (...event: any[]) => void
}

const UpsaveThumbnail = ({
                           className,
                           error,
                           thumbnail,
                           preview,
                           setPreview,
                           required,
                           onChange
                         }: UpsaveThumbnailProps) => {

  const thumbnailProcessor = useMemo(() => {
    if (preview) {
      return URL.createObjectURL(preview);
    }
    if (thumbnail) {
      return thumbnail.startsWith("https://") ? thumbnail : `http://localhost:8090/upload/${thumbnail}`;
    }
    return "/assets/images/cloud-upload-signal-svgrepo-com.svg";
  }, [thumbnail, preview]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (!file) return;
    setPreview(file);
    if (onChange) onChange(file);


  };

  return (
    <div
      component-name="UpsaveThumbnail"
      className={twMerge(
        `space-y-4 border border-gray-200 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-all ${error?.length > 0 ? "border-red-500" : ""}`,
        className
      )}
    >
      <Typography.Label>
        Thumbnail
        {required && <span className="text-red-500 ml-1">*</span>}
      </Typography.Label>
      <div className="mt-4 flex items-center gap-6 relative">
        <div
          className="relative w-full h-32 p-4 border border-gray-300 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center shadow-sm">
          <NextImg
            width={200}
            height={200}
            src={thumbnailProcessor}
            alt="Thumbnail Preview"
            className="object-contain w-full h-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
      {error?.length > 0 && (
        <Typography.H4
          className="text-red-500 text-sm ">{error}</Typography.H4>
      )}
    </div>
  );
};

export default UpsaveThumbnail;
