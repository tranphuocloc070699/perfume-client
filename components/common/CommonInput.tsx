import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface ICommonInputProps {
  placeholder: string;
  type?: string;
  name?: string;
  label?: string;
  className?: string;
}

const CommonInput = (props: ICommonInputProps) => {
  return (
    <div>
      {props.label && (
        <Label
          htmlFor={props.name}
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          {props.label}
        </Label>
      )}
      <Input
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        type={props.type}
        className={props.className}
      />
    </div>
  );
};

export default CommonInput;
