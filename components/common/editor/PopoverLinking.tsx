import React, { KeyboardEvent, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LinkForm from "@/components/common/editor/LinkForm";

interface Props {
  children: React.ReactNode;
  onConfirm: (input: string) => void;
}

const PopoverLinking = ({ children, onConfirm }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div component-name="PopoverLinking">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {children}
        </PopoverTrigger>
        <PopoverContent side={"top"}>
          <LinkForm onSubmit={onConfirm} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopoverLinking;