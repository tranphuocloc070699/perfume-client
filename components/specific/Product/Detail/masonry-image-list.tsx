import React from "react";
import Typography from "@/components/ui/typography";


type ImageItem = {
  id: number;
  src: string;
  alt: string;
}

type Props = {
  images: string[];
  productName: string;
}

const MasonryImageList = ({ images, productName }: Props) => {
  return (

    <div className={" pt-6 border-t border-gray-300 "}>
      <Typography.H4>Hình ảnh về {productName}</Typography.H4>
      <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 pt-4">
        {images.map((src) => (
          <div key={src} className="mb-4 break-inside-avoid">
            <img
              src={src}
              alt={"Gallery"}
              className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryImageList;
