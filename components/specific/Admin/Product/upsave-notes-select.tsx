import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { MultiSelect } from "@/components/common/multi-select";
import { ProductNoteDto } from "@/types/product-note/product-note.model";
import { UpsaveProductDto } from "@/types/admin/admin.interface";

interface IUpsaveMultiSelectProps {
  className?: string,
  label: string,
  openModal: (id: keyof UpsaveProductDto) => void,
  options: ProductNoteDto[],
  updateUpsaveProductValue: (key: keyof UpsaveProductDto, value: any) => void
  id: keyof UpsaveProductDto,
  values: ProductNoteDto[],
  placeholder?: string
}

const UpsaveNotesSelect = ({
                             className,
                             label,
                             openModal,
                             options,
                             updateUpsaveProductValue,
                             id,
                             values,
                             placeholder
                           }: IUpsaveMultiSelectProps) => {


  const [valuesProcessor, setValuesProcessor] = useState<string[]>([]);

  const dataOptionsProcessor = useMemo(() => {
    return options.map((item) => ({ value: `${item.id}`, label: item.name }));
  }, [options]);

  useEffect(() => {
    const newValues = values?.map(val => `${val?.id}`);
    setValuesProcessor(newValues);
  }, [values]);

  // const valuesProcessor = useMemo(() => {
  //   console.log({ values });
  //   return values?.map(value => `${value?.id}`);
  // }, [values]);

  function onNoteSelectChange(values: string[]) {
    const notesSelected = options.filter(note => values.includes(note.id?.toString() ?? ""));
    updateUpsaveProductValue(id, notesSelected);
  }

  // const onNoteSelectChange = useCallback((values: string[]) => {
  //
  //   const notesSelected = options.filter(note => values.includes(note.id?.toString() ?? ""));
  //   console.log({ values, id, notesSelected, options });
  //   updateUpsaveProductValue(id, notesSelected);
  // }, [values, options]);


  return (
    <div component-name="UpsaveNotesSelect" className={className}>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span
          onClick={() => openModal(id)}
          className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer"
        >
                      <Icon
                        icon={"lucide:plus"}
                        className=" text-white h-4 w-4"
                      />
                    </span>
      </div>
      <MultiSelect
        options={dataOptionsProcessor}
        placeholder={placeholder || "Select"}
        defaultValue={valuesProcessor}
        onValueChange={onNoteSelectChange}
        variant="inverted"
        animation={2}
        maxCount={3}
        className={"w-full mt-2"}
      />
    </div>
  );
};

export default UpsaveNotesSelect;