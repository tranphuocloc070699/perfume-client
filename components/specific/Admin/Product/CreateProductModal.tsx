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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CommonInput from "@/components/common/CommonInput";
import { validYears } from "@/types/admin/admin.data";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import CreateYearModal from "./CreateYearModal";
import { Input } from "@/components/ui/input";
const CreateProductModal = () => {
  const createYearModal = CreateYearModal();

  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openYearModal() {
    createYearModal.open();
  }
  return {
    content: (
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="min-w-[60%] h-[90%]">
            <DialogHeader>
              <DialogTitle className="mb-4 font-bold text-base">
                Tạo sản phẩm mới
              </DialogTitle>
              <form className="grid grid-cols-3 gap-8">
                <div className="col-span-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Tên sản phẩm</Label>
                    <span className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer opacity-0">
                      <Icon
                        icon={"lucide:plus"}
                        className=" text-white h-4 w-4"
                      />
                    </span>
                  </div>
                  <Input placeholder="Nhập tên sản phẩm..." />
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Năm sản xuất</Label>
                    <span
                      className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer"
                      onClick={openYearModal}
                    >
                      <Icon
                        icon={"lucide:plus"}
                        className=" text-white h-4 w-4"
                      />
                    </span>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn năm sản xuất" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Năm sản xuất</SelectLabel>

                        {validYears.map((year) => (
                          <SelectItem value={String(year)} key={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Tác giả</Label>
                    <span
                      className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer"
                      onClick={openYearModal}
                    >
                      <Icon
                        icon={"lucide:plus"}
                        className=" text-white h-4 w-4"
                      />
                    </span>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tác giả" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tác giả</SelectLabel>

                        {validYears.map((year) => (
                          <SelectItem value={String(year)} key={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {createYearModal.content}
      </>
    ),
    close: closeModal,
    open: openModal,
  };
};

export default CreateProductModal;
