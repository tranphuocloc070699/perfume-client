import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import Typography from "@/components/ui/typography";
import Icon from "@/components/ui/icon";
import lodashDebounce from "lodash/debounce";
import { icons } from "./icon";
import { ControllerFieldState, ControllerRenderProps, FieldValues, Controller } from "react-hook-form";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { Textarea } from "@/components/ui/textarea";

export interface LabelProps {
  title?: string;
  className?: string;
  required?: boolean;
}

export interface IconProps {
  name: keyof typeof icons | string;
  size?: number;
  className?: string;
  reverse?: boolean;
}

export interface InputFieldProps {
  className?: string;
}

type ControlledProps = {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: never; // Prevent `validation` when `value` or `onChange` is used
};

type UncontrolledProps = {
  value?: never;
  onChange?: never;
  validation: {
    control: any;
  };
};


export interface ValidationProps {
  control?: any;
}

export interface DebounceProps {
  duration?: number;
  callback?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type InputProps = {
  name: string;
  label?: LabelProps;
  icon?: IconProps;
  input?: InputFieldProps;
  defaultValue?: string | number;
  placeholder?: string;
  type?: string;
  textarea?: boolean; // New prop to toggle textarea
  debounce?: DebounceProps;
  groupClassName?: string;
  wrapperClassName?: string;
  variant?: "solid";
  fieldState?: ControllerFieldState;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  field?: ControllerRenderProps<FieldValues, string>;
} & (ControlledProps | UncontrolledProps);

export interface IDefaultClassName {
  inputGroup: string;
  label: string;
  input: string;
  icon: string;
  inputFieldWrapper: string;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      input,
      icon,
      type,
      variant,
      debounce,
      groupClassName,
      wrapperClassName,
      fieldState,
      field,
      placeholder,
      value,
      onChange,
      defaultValue,
      onKeyDown
    },
    ref
  ) => {


    const [showPassword, setShowPassword] = useState(false);
    const classNameProcessor = useMemo(() => {
      const baseClassName: IDefaultClassName = {
        inputGroup: `w-full`,
        inputFieldWrapper: `h-full max-h-9 border border-input shadow-sm flex items-center rounded-lg px-4 py-2 gap-2 ${label?.title && "mt-1"}`,
        label: "",
        input: `outline-none flex  w-full rounded-md  bg-transparent  py-1 text-sm  transition-colors file:border-0  file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground `,
        icon: ""
      };

      if (variant && variant === "solid") {
        baseClassName.inputFieldWrapper += ` bg-gray-100 border-none rounded`;
        baseClassName.input += ` bg-gray-100 `;
      }


      baseClassName.inputGroup += ` ${groupClassName}`;
      baseClassName.inputFieldWrapper += ` ${wrapperClassName} ${fieldState?.error?.message && "border-red-500"}`;
      baseClassName.label += ` ${label?.className}`;
      baseClassName.input += ` ${input?.className}`;
      baseClassName.icon += ` ${icon?.className}`;

      return baseClassName;
    }, [
      variant,
      icon,
      type,
      wrapperClassName,
      groupClassName,
      label?.className,
      fieldState?.error?.message
    ]);

    const typeProcessor = useMemo(() => {
      if (type && type === "password") {
        return showPassword ? "text" : "password";
      }
      if (type && type === "number") {
        return "text";
      }
      return type || "text";
    }, [type, showPassword]);

    const numberValidation = (value: string): boolean => /^-?\d*$/.test(value);

    const debouncedSearch = React.useRef(
      lodashDebounce(async (e) => {
        if (debounce && debounce?.callback) debounce.callback(e);
      }, debounce?.duration || 300)
    ).current;

    const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type && type === "number" && !numberValidation(e.target.value)) return;
      if (onChange) {
        onChange(e);
      }
      if (debounce) debouncedSearch(e);
    };

    return (
      <div className={twMerge(classNameProcessor.inputGroup)}>
        {label?.title && (
          <Typography.Label className={twMerge(classNameProcessor.label)}>
            {label.title}
            {label?.required && <span className="text-red-500 ml-1">*</span>}
          </Typography.Label>
        )}
        <span className={twMerge(classNameProcessor.inputFieldWrapper)}>
          {
            (icon?.name && !icon?.reverse) && (<Icon size={icon?.size || 18} name={icon.name} />)
          }
          <input
            placeholder={placeholder}
            type={typeProcessor}
            className={twMerge(classNameProcessor.input)}
            defaultValue={defaultValue}
            onKeyDown={onKeyDown}
            {...(field
              ? { ...field }
              : { value, onChange: handleInputFieldChange, ref })}
          />
          {type && type === "password" && (
            <Icon
              onClick={() => setShowPassword((prev) => !prev)}
              name={showPassword ? "eyeOff" : "eye"}
              className={twMerge(`h-5 w-5 cursor-pointer ${icon?.className}`)}
            />
          )}
          {
            (icon?.name && icon?.reverse) && (<Icon size={icon?.size || 18} name={icon.name} />)
          }
        </span>

        {field && (
          <Typography.H4
            className={twMerge(
              `mt-1 h-6 transform text-sm text-red-500 transition-all duration-300 ease-in-out`,
              fieldState?.error?.message
                ? "translate-y-0 opacity-100"
                : "-translate-y-5 opacity-0"
            )}
          >
            {fieldState?.error?.message}
          </Typography.H4>
        )}
      </div>
    );
  }
);

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <>
      {props?.validation?.control ? (
        <Controller
          name={props?.name}
          control={props?.validation?.control}
          render={({ field, fieldState }) => (
            <InputField {...props} fieldState={fieldState} field={field} />
          )}
        />
      ) : (
        <InputField {...props} ref={ref} />
      )}
    </>
  );
});


Input.displayName = "Input";
export default Input;

