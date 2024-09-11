import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface ICommonInputProps {
  placeholder: string;
  type?: string;
  name?: string;
  label?: string;
}

const CommonInput = (props: ICommonInputProps) => {
  return (
    <span>
      {props.label ?? (
        <Label htmlFor={props.name} className="font-medium">
          {props.label}
        </Label>
      )}
      <Input
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        type={props.type}
      />
    </span>
  );
};

export default CommonInput;
