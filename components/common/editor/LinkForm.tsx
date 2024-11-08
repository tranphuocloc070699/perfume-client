import React, { KeyboardEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Unlink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onSubmit: (value: string) => void,
  onUnlink?: () => void,
  editMode?: boolean,
  initialValue?: string
}

const LinkForm = ({ onSubmit, editMode, onUnlink, initialValue }: Props) => {


  const [input, setInput] = useState(initialValue || "");
  const { toast } = useToast();

  function validation() {
    if (input.trim() === "") {
      toast({ description: "Link is required" });
      return false;
    }
    return true;
  }


  function handleConfirm() {
    if (!validation()) return;

    onSubmit(input);
  }

  function handleUnlink() {
    onUnlink && onUnlink();
  }

  function handleKeyDown({ key }: KeyboardEvent<HTMLInputElement>) {
    if (key === "Enter") {
      handleConfirm();
    }
  }

  useEffect(() => {
    if (initialValue) setInput(initialValue);
  }, [initialValue]);

  return (
    <div className={"flex items-center gap-4"} component-name="LinkForm">
      <Input value={input} onChange={e => setInput(e.target.value)} placeholder={"Nhập link..."}
             onKeyDown={handleKeyDown} />
      <Button onClick={handleConfirm} className={"bg-green-600 w-10 h-10 flex items-center justify-center"}>
        <Check className={"text-gray-100"} size={28} />
      </Button>
      {
        editMode && <Button onClick={handleUnlink} className={"bg-red-600 w-10 h-10 flex items-center justify-center"}>
          <Unlink className={"text-gray-100"} size={28} />
        </Button>
      }
    </div>
  );
};

export default LinkForm;