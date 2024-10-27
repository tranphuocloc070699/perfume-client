"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { validYears } from "@/types/admin/admin.data";
import { Icon } from "@iconify/react/dist/iconify.js";
import YearService from "@/services/modules/year.service";
import { useUserStore } from "@/store/user.store";
import { YearDto } from "@/types/year/year.model";
import { BrandDto } from "@/types/brand/brand.model";
import { Label } from "@/components/ui/label";
import NextImg from "next/image";
import { dummyBrandDto } from "@/types/brand/brand.data";
interface ICreateBrandModalProps {
  onSubmit: (brand: BrandDto) => void;
}

const CreateBrandModal = ({ onSubmit }: ICreateBrandModalProps) => {
  const { toast } = useToast();
  const { accessToken } = useUserStore();
  const [dto, setDto] = useState<BrandDto>(dummyBrandDto);
  const [imageUploader, setImageUploader] = useState<File | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return {
    content: (
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="min-w-[50%] h-[90%]">
            <DialogHeader>
              <DialogTitle className="mb-4 font-bold text-base">
                Tạo thương hiệu mới
              </DialogTitle>
              <div className="grid grid-cols-12 gap-8">
                <span className="col-span-4">
                  <Label>Tên thương hiệu</Label>
                  <Input
                    placeholder="Nhập tên thương hiệu"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                      }
                    }}
                  />
                </span>
                <span className="col-span-4">
                  <Label>Link trang chủ</Label>
                  <Input
                    placeholder="Link trang chủ"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                      }
                    }}
                  />
                </span>
                <span className="col-span-4">
                  <Label>Ảnh thương hiệu</Label>
                  <span className="flex items-start justify-between">
                    <NextImg
                      src={"/assets/images/default-image.png"}
                      alt="logo"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                    <Button className="bg-gray-300 text-gray-900">
                      Upload Ảnh
                    </Button>
                  </span>
                </span>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    ),
    close: closeModal,
    open: openModal,
  };
};

export default CreateBrandModal;
