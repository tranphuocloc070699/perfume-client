import { FieldError, UseFormRegister } from "react-hook-form";

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export const ImageDir = {
  brand: "Brand",
  country: "Country",
  post: "Post",
  notes: "Notes",
  product: "Product",
  gallery: "Gallery",
  outfit: "Outfit"
};
