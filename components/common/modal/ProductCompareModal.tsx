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

const ProductCompareModal = ({
  text,
  open,
  onClose,
}: IProductCompareModalProps) => {
  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <p onClick={onClose}>{text}</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCompareModal;
