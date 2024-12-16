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

interface IUpsaveSelectProps {
  className?: string;
  label: string;
  data: YearDto[] | BrandDto[] | CountryDto[];
  openModal: () => void;
  value: string;
  onValueChange: (value: string) => void;
  type: "Brand" | "Country" | "Year" | "ProductNote";

}

const UpsaveProductSelect = ({ label, data, openModal, value, onValueChange, type, className }: IUpsaveSelectProps) => {

  const getLabel = useCallback((item: YearDto | BrandDto | CountryDto) => {
    if (type === "Brand" && "name" in item) {
      return item.name;
    }
    if (type === "Year" && "value" in item) {
      return item.value;
    }
    if (type === "Country" && "name" in item) {
      return item.name;
    }

    return "";
  }, [data]);

  return (
    <div component-name="UpsaveProductSelect" className={className}>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span
          className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer"
          onClick={openModal}
        >
                      <Icon
                        icon={"lucide:plus"}
                        className=" text-white h-4 w-4"
                      />
                    </span>
      </div>
      <Select
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Chọn ${label}...`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {data.map((item) => (
              <SelectItem value={String(item.id)} key={item.id}>
                {getLabel(item)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UpsaveProductSelect;