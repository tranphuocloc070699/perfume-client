import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NextImg from "next/image";
import { Product } from "@/types/product/product.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import CountingIcon from "@/components/common/CountingIcon";
import TextIcon from "@/components/common/TextIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const ProductCardItem = ({ data }: { data: Product }) => {
  function onIconClick(id: number) {
    console.log("on click trigger with id: " + id);
  }
  return (
    <div className="w-full relative flex flex-col bg-gradient-to-b from-gray-200 to-gray-50 rounded-xl ">
      <section className="flex items-start justify-between mb-4 px-4 py-4 rounded-2xl ">
        <h4 className="text-base  leading-5  text-gray-700 font-semibold mr-2 hover:underline">
          <Link href={`/nuoc-hoa/${data.id}`}>{data.title}</Link>
        </h4>

        <div className="col-span-1 px-2 py-1 border border-gray-200 rounded-full flex items-center hover:shadow-md transition-all cursor-pointer bg-white">
          <CountingIcon
            data={{
              icon: "ph:heart-light",
              counting: 1,
              onClick: onIconClick,
            }}
          />
        </div>
      </section>
      <NextImg
        src={data.thumnail}
        alt={data.title}
        quality={100}
        width={200}
        height={200}
        className="h-28 w-28 self-center object-cover  mb-4 rounded-xl  cursor-pointer [&:hover+.detail]:h-full [&:hover+.detail]:opacity-100"
      />
      <div className="detail bg-white rounded-xl p-4 absolute w-full bottom-0 border border-gray-200 transition-all duration-300  h-0 opacity-0 hover:h-full hover:opacity-100">
        <div className="space-y-2 mb-6">
          <TextIcon
            data={{
              icon: "ph:shirt-folded-thin",
              text: "Năng động, trẻ trung",
            }}
          />
          <TextIcon
            data={{
              icon: "arcticons:broken-age",
              text: "25 - 30 tuổi",
            }}
          />
          <TextIcon
            data={{
              icon: "arcticons:timetree",
              text: "Vani, Đậu tonka, Gỗ trầm hương, Hoa cam",
            }}
          />
        </div>
        <div className="mb-6 grid grid-cols-2 gap-2">
          {data.stylesThumbnail.map((item) => (
            <NextImg
              key={item}
              src={item}
              alt={item}
              quality={70}
              width={64}
              height={64}
              className="w-full h-20 object-cover col-span-1 "
            />
          ))}
        </div>

        <Button className="w-full">
          Xem chi tiết
          <Icon icon="ei:arrow-right" className="ml-2 h-7 w-7 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default ProductCardItem;
