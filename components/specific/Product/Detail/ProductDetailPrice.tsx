import React from "react";
import { IProductDetailInfo } from "@/types/product/product.interface";
import Link from "next/link";
const ProductDetailPrice = () => {
  const initData: IProductDetailInfo[] = [
    {
      label: "Giá hãng fullsize",
      value: {
        title: "2017",
        href: "/nuoc-hoa/2017",
      },
    },
    {
      label: "",
      value: {
        title: "Uzumaki Naruto",
        href: "/nuoc-hoa/tac-gia/uzimaki-naruto",
      },
    },
    {
      label: "Thương hiệu",
      value: {
        title: "Dior",
        href: "/nuoc-hoa/thuong-hieu/dior",
      },
    },

    {
      label: "Quốc gia",
      value: {
        title: "Italia",
        href: "/nuoc-hoa/quoc-gia/italia",
      },
    },
  ];
  return (
    <div className="rounded-md border border-slate-200 relative p-4">
      <span className="border border-slate-200 bg-gray-50 px-2 py-1 font-medium text-lg rounded-xl absolute top-[-14%] left-4">
        Giá thị trường
      </span>

      <div className="mt-4">
        {initData.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-base">
            <h4 className="font-normal">{item.label}:</h4>
            {item?.value?.href ? (
              <Link href={item.value.href} className="font-medium  underline">
                {item.value.title}
              </Link>
            ) : (
              <span className="font-medium">{item.value.title}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPrice;
