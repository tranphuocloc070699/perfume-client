import React, { memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import NextImg from "next/image";
import { ProductDto } from "@/types/product/product.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import CountingIcon from "@/components/common/counting-icon";
import TextIcon from "@/components/common/text-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Typography from "@/components/ui/typography";

interface IProps {
  data: ProductDto;
  showIcon?: boolean;
}

const ProductCardItem = ({ data, showIcon }: IProps) => {
  function onIconClick(id: number) {
    console.log("on click trigger with id: " + id);
  }

  return (
    <Link href={`/nuoc-hoa/${data.slug}-${data.id}`} component-name="ProductCardItem"
          className={"h-[230px] block relative"}>
      <div
        className={"absolute bottom-0 rounded-l-xl rounded-r-sm  w-full  h-[220px]  overflow-hidden flex transition-all duration-500 hover:translate-y-[-10px]"}>
        <div className={"h-full min-w-3 w-3 rounded-l-md bg-gradient-to-r from-[#2e2e2e] via-[#3e3e3e] to-[#2e2e2e]"}>
        </div>
        <div
          className={"px-4 py-6 h-full flex flex-col items-center w-full rounded-r-sm bg-gradient-to-br from-gray-100 to-gray-200 pb-3 pr-3 "}>
          <NextImg
            src={
              data.thumbnail ||
              "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
            }
            alt={data.name}
            quality={100}
            width={200}
            height={200}
            className="h-24 w-24 self-center object-cover  rounded-xl  cursor-pointer"
          />

          <Typography.H4
            className={"mt-4 text-sm text-center text-gray-900 h-10 line-clamp-2"}>{data.name}</Typography.H4>

          <div className={"mt-2 flex-1 w-full gap-4  flex items-center justify-end"}>
            <CountingIcon icon={"emptyHeart"} counting={10} />
            <CountingIcon icon={"messageCircle"} />
          </div>

        </div>
      </div>
    </Link>
  );
};

export default memo(ProductCardItem);



