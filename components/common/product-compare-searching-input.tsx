import React from "react";
import { Input } from "@/components/ui/input";

interface IAppInputProps {
  type?: string;
  value: string;
  name: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductCompareSearchingInput = (props: IAppInputProps) => {
  return (
    <>
      <div className="input_wrapp">
        <Input
          type={props.type || "text"}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
        />
      </div>
    </>
  );
};

export default ProductCompareSearchingInput;
