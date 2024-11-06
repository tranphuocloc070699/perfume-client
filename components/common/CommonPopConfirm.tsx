import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ICommonPopConfirmProps {
  onConfirm: () => void;
  onCancel?: () => void;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
}


const CommonPopConfirm = ({
                            onConfirm,
                            onCancel,
                            message = "Are you sure?",
                            confirmText = "Yes",
                            cancelText = "No",
                            children
                          }: ICommonPopConfirmProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    console.log("handle confirm");
    onConfirm();
    setOpen(false);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    setOpen(false);
  };

  return (
    <Popover component-name={"CommonPopConfirm"} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="p-4 space-y-4 w-56 bg-white rounded-md shadow-md border">
        <p className="text-sm text-gray-800">{message}</p>
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" onClick={handleCancel} className={"transition-all cursor-pointer hover:shadow-lg"}>
            {cancelText}
          </Button>
          <Button variant="destructive" onClick={handleConfirm}
                  className={"transition-all cursor-pointer hover:shadow-lg"}>
            {confirmText}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CommonPopConfirm;