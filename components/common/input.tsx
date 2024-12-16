import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ICommonInputProps {
  placeholder: string;
  type?: string;
  name?: string;
  label?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: ICommonInputProps) => {
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
        value={props.value}
        onChange={(e) => {
          if (props.onChange) props.onChange(e);
        }}
      />
    </div>
  );
};

export default Input;
