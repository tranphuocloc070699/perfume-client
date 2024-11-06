import React from "react";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";

interface IUpsaveInputProps {
  className?: string;
  label: string;
  placeholder: string;
  name: string;
}

const UpsaveInput = ({ className, label, placeholder, name }: IUpsaveInputProps) => {
  return (
    <div component-name="UpsaveInput" className={className}>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span
          className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer opacity-0">
                      <Icon
                        icon={"lucide:plus"}
                        className=" text-white h-4 w-4"
                      />
                    </span>
      </div>
      <Input placeholder={placeholder} name={name} />
    </div>
  );
};

export default UpsaveInput;