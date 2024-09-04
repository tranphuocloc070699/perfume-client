"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IProductCompareModalProps {
  text: string;
  open?: boolean;
  onClose?: () => void;
}

const ProductCompareModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function onChange() {
    console.log("trigger...");
  }

  return {
    content: (
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>Description</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    ),
    close: closeModal,
    open: openModal,
  };
};

export default ProductCompareModal;
