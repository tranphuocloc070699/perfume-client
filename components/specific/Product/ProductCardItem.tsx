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
import { IProduct } from "@/types/products/product.interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import CountingIcon from "@/components/common/CountingIcon";
import TextIcon from "@/components/common/TextIcon";
import { Button } from "@/components/ui/button";
const ProductCardItem = ({ data }: { data: IProduct }) => {
  function onIconClick(id: number) {
    console.log("on click trigger with id: " + id);
  }
  return (
    <div className="w-full relative flex flex-col">
      <NextImg
        src={data.thumnail}
        alt={data.title}
        quality={100}
        width={200}
        height={200}
        className="w-full h-full object-cover  mb-4 rounded-xl bg-gradient-to-b from-slate-100 to-slate-50 cursor-pointer [&:hover+.detail]:h-[90%] [&:hover+.detail]:opacity-100"
      />
      <div className="detail bg-white rounded-t-xl p-4 absolute w-full bottom-0 border border-slate-200 transition-all duration-300  h-0 opacity-0 hover:h-[90%] hover:opacity-100">
        <h4 className="text-lg  leading-6 font-semibold text-slate-700 mb-2">
          {data.title}
        </h4>
        <p className="font-normal text-sm leading-5 text-slate-500 mb-4">
          {data.description}
        </p>
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
              text: "25 - 30",
            }}
          />
          <TextIcon
            data={{
              icon: "arcticons:timetree",
              text: "Vani, Đậu tonka, Gỗ trầm hương, Hoa cam",
            }}
          />
        </div>

        <div className="flex justify-end">
          <Button>
            Xem chi tiết
            <Icon icon="ei:arrow-right" className="ml-2 h-7 w-7 text-white" />
          </Button>
        </div>
      </div>
      <section className="flex items-start justify-between mb-4">
        <h4 className="text-lg  leading-6 font-light text-slate-700 ">
          {data.title}
        </h4>
        <span className="text-slate-500 text-sm">20-03-1999</span>
      </section>
      <section className="grid grid-cols-4">
        <div className="col-span-1 px-3 py-1 border border-slate-200 rounded-[10px] flex items-center hover:shadow-md transition-all cursor-pointer">
          <CountingIcon
            data={{
              icon: "ph:heart-light",
              counting: 1,
              onClick: onIconClick,
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default ProductCardItem;
