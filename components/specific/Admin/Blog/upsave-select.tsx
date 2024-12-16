import React, { useCallback, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { YearDto } from "@/types/year/year.model";
import { BrandDto } from "@/types/brand/brand.model";
import { CountryDto } from "@/types/country/country.model";

interface SelectOptionProps {
  label: string;
  value: string;
}

interface IUpsaveSelectProps {
  className?: string;
  label: string;
  options: SelectOptionProps[];
  value: string;
  onChange: (value: string) => void;
}

const UpsaveSelect = ({ label, value, onChange, className, options }: IUpsaveSelectProps) => {

  return (
    <div component-name="UpsaveSelect" className={className}>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span
          className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer opacity-0"
        >
                      <Icon
                        icon={"lucide:plus"}
                        className=" text-white h-4 w-4"
                      />
                    </span>
      </div>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Chọn ${label}...`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((item) => (
              <SelectItem value={String(item.value)} key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UpsaveSelect;