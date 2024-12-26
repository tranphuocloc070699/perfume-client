import React from "react";
import TiptapEditor, { ICommonTipTapProps } from "@/components/common/editor/tiptap-editor";
import { Controller } from "react-hook-form";


interface TipTapEditorWithValidationProps extends ICommonTipTapProps {
  control: any;
  name: string;
}

const TiptapEditorWithValidation = ({ control, name, ...props }: TipTapEditorWithValidationProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TiptapEditor
          {...props}
          required={true}
          onChange={field.onChange}
          error={fieldState.error?.message}

        />
      )}
    />
  );
};

export default TiptapEditorWithValidation;