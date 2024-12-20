import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import Input from "@/components/ui/input";


interface IUpsaveInputProps {
  className?: string;
  label: string;
  placeholder: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  type: "currency" | "text";
}

const formatPrice = (value: string) => {
  const numericValue = `${value}`.replace(/\D/g, "");

  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const UpsaveInput = ({ className, label, placeholder, name, value, onChange, type }: IUpsaveInputProps) => {

  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    setDisplayValue(formatPrice(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (type === "currency") {
      const rawValue = inputValue.replace(/\D/g, "");
      setDisplayValue(formatPrice(rawValue));
      onChange(rawValue);
    } else {
      onChange(inputValue);
    }

  };

  return (
    <div component-name="UpsaveInput" className={className}>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer opacity-0">
          <Icon icon={"lucide:plus"} className="text-white h-4 w-4" />
        </span>
      </div>
      {
        type === "currency" && <Input
          placeholder={placeholder}
          name={name}
          value={displayValue} // Display the formatted value
          onChange={handleChange} // Handle changes to keep state unformatted
        />

      }
      {
        type === "text" && <Input
          placeholder={placeholder}
          name={name}
          value={value} // Display the formatted value
          onChange={handleChange} // Handle changes to keep state unformatted
        />
      }

    </div>
  );
};

export default UpsaveInput;