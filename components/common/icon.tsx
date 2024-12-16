import React from "react";
import { Icon } from "@iconify/react";
import { CloudUpload, Plus, Check, Trash2, X, Unlink, Heart, CircleX, TextSearch } from "lucide-react";

// Define icons with `as const` to make keys readonly
const icons = {
  plus: <Plus />,
  cloudUpload: <CloudUpload />,
  check: <Check />,
  trash: <Trash2 />,
  xMark: <X />,
  circleX: <CircleX />,
  unLink: <Unlink />,
  emptyHeart: <Heart />,
  emptyData: <TextSearch />
} as const;

interface Props {
  name: keyof typeof icons; // TypeScript will now infer the exact keys
  className?: string;
  size?: number;
}

const Icon = ({ name, className, size }: Props) => {
  const icon = icons[name];
  return typeof icon === "string" ? (
    <Icon icon={icon} className={className} />
  ) : (
    React.cloneElement(icon as React.ReactElement, { className, size })
  );
};

export default Icon;
