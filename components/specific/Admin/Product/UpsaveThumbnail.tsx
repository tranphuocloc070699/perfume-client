import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NextImg from "next/image";

interface IUpsaveThumbnailProps {
  className?: string,
  thumbnail: string,
  preview: File | null,
  setPreview: (value: File | null) => void
}

const UpsaveThumbnail = ({ className, thumbnail, preview, setPreview }: IUpsaveThumbnailProps) => {


  const thumbnailProcessor = useMemo(() => {
    console.log({ thumbnail });
    if (preview) {
      return URL.createObjectURL(preview);
    }
    if (thumbnail) {
      return thumbnail.startsWith("https://") ? thumbnail : `http://localhost:8090/upload/${thumbnail}`;
    }

    return "/assets/images/default-image.png";
  }, [thumbnail, preview]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPreview(event.target.files[0]);
    }
  };


  return (
    <div component-name="UpsaveThumbnail" className={className}>
      <Label htmlFor="thumbnail" className="text-sm font-medium">
        Thumbnail
      </Label>
      <div className="mt-4 flex items-center gap-8">
        <NextImg width={200} height={200} src={thumbnailProcessor} alt="Thumbnail Preview"
                 className="w-32 h-32 object-cover rounded-md" />
        <div className={"relative"}>
          <Input type={"file"} onChange={handleFileChange}
                 className={"absolute top-0 left-0 right-0 bottom-0 opacity-0"} />
          <Button>Upload ảnh</Button>
        </div>
      </div>

    </div>
  );
};

export default UpsaveThumbnail;
