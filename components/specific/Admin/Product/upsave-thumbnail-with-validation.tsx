import React from "react";
import UpsaveThumbnail, { UpsaveThumbnailProps } from "@/components/specific/Admin/Product/upsave-thumbnail";
import { useController } from "react-hook-form";

interface UpsaveThumbnailWithValidationProps extends UpsaveThumbnailProps {
  control: any;
  name: string;
}

const UpsaveThumbnailWithValidation = ({ name, control, ...props }: UpsaveThumbnailWithValidationProps) => {

  const { field, fieldState } = useController({
    name,
    control
  });
  return (

    <UpsaveThumbnail  {...props} onChange={field.onChange} error={fieldState?.error?.message} />
  );
};

export default UpsaveThumbnailWithValidation;