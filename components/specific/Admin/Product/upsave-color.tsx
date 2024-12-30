import React, { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ColorDto } from "@/types/color/color.model";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import CreateColorModal from "./create-color-modal";
import { MultiSelect } from "@/components/common/multi-select";
import { UpsaveProductDto } from "@/types/admin/admin.interface";

type Props = {

  options: ColorDto[]
  values: ColorDto[];
  onValuesChange: (key: keyof UpsaveProductDto, value: any) => void;
  className?: string;
  addColor: (color: ColorDto) => void;
}
const UpsaveColor = ({ options, className, values, onValuesChange, addColor }: Props) => {

  const [valuesProcessor, setValuesProcessor] = useState<string[]>([]);

  useEffect(() => {
    const newValues = values?.map(val => `${val?.id}`);
    setValuesProcessor(newValues);
  }, [values]);

  const optionsProcessor = useMemo(() => {
    return options.map((item) => ({ value: `${item.id}`, label: item.name }));
  }, [options]);

  function onColorChange(values: string[]) {
    const colorsSelected = options.filter(color => values.includes(color.id?.toString() ?? ""));
    onValuesChange("colors", colorsSelected);
  }

  function openCreateColorModal() {
    open().then((color) => {
      addColor(color);
    });
  }


  const { open, close, content } = CreateColorModal();
  return (
    <div component-name="UpsaveProductSelect" className={twMerge(`${className}`)}>
      {content}
      <div className="flex items-center justify-between">
        <Label>Color</Label>
        <span
          className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer"
          onClick={openCreateColorModal}
        >
                      <Icon
                        icon={"lucide:plus"}
                        className=" text-white h-4 w-4"
                      />
                    </span>
      </div>
      <MultiSelect
        options={optionsProcessor}
        placeholder={"Chọn màu sắc"}
        defaultValue={valuesProcessor}
        onValueChange={onColorChange}
        variant="inverted"
        animation={2}
        maxCount={3}
        className={"w-full mt-2"}
      />
    </div>
  );
};

export default UpsaveColor;