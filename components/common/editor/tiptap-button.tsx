import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import PopoverLinking from "@/components/common/editor/popover-linking";

interface Props {
  className?: string,
  onClick: () => void,
  active?: boolean,
  children?: React.ReactNode,
  showPopover?: boolean,
  onLinkButtonSubmit: (link: string) => void
}

const TiptapButton = ({
                        className,
                        onClick,
                        active,
                        children,
                        showPopover,
                        onLinkButtonSubmit
                      }: Props) => {

  const content = <button onClick={onClick} component-name="TiptapButton"
                          className={twMerge("p-2 rounded bg-gray-100 text-gray-900 text-xs transition-all select-none", active && "bg-gray-900 text-gray-100")}>
    {children}
  </button>;

  return (
    <>
      {showPopover ? <PopoverLinking onConfirm={onLinkButtonSubmit}>
        {content}
      </PopoverLinking> : content}
    </>
  );
};

export default TiptapButton;