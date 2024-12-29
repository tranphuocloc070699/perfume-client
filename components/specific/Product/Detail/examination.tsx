import React from "react";
import { twMerge } from "tailwind-merge";
import Typography from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
  title: string;
  description: string;
}
const Examination = ({ className, title, description }: Props) => {
  return (
    <div className={twMerge(`rounded p-4 border border-gray-300 ${className}`)} component-name="Examination">
      <Typography.H4 className={"text-lg"}>{title}</Typography.H4>
      <Typography.Paragraph
        className={"font-sans text-base font-light mt-4 text-gray-700"}>{description}</Typography.Paragraph>

      <div className={"mt-6 pt-4 flex items-center justify-end md:justify-between border-t border-gray-300"}>
        <Button variant={"ghost"} className={"hidden md:block"} size={"sm"}>Tôi không muốn trả lời</Button>
        <div>
          <Button variant={"outline"} size={"sm"} className={"mr-4"}>Chưa có dịp</Button>
          <Button size={"sm"} className={"self-end bg-red-700"}>Có, tôi đã thử rồi</Button>
        </div>
      </div>
    </div>
  );
};

export default Examination;