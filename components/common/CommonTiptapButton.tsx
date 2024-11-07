import React from "react";
import { clsx } from "clsx";

interface Props {
  className?: string;
  onClick: () => void;
  active: boolean;
  children?: React.ReactNode;
}

const CommonTiptapButton = ({ className, onClick, active, children }: Props) => {
  return (
    <button onClick={onClick} component-name="CommonTiptapButton"
            className={clsx("p-2 rounded bg-gray-100 text-gray-900 text-xs transition-all", active && "bg-gray-900 text-gray-100")}>
      {children}
    </button>
  );
};

export default CommonTiptapButton;