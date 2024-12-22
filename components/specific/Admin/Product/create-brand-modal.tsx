"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/user.store";
import { BrandDto } from "@/types/brand/brand.model";
import { Label } from "@/components/ui/label";
import NextImg from "next/image";
import { dummyBrandDto } from "@/types/brand/brand.data";
import UserService from "@/services/modules/user.service";
import BrandService from "@/services/modules/brand.service";
import CreateCountryModal from "@/components/specific/Admin/Product/create-country-modal";
import { CountryDto } from "@/types/country/country.model";
import MediaService from "@/services/modules/media.service";
import { Icon } from "@iconify/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ImageDir } from "@/types/common";


function dummyResolvePromise(dto: BrandDto) {

}

const CreateBrandModal = () => {
  const { toast } = useToast();
  const { accessToken } = useUserStore();
  const [dto, setDto] = useState<BrandDto>(dummyBrandDto);
  const [imageUploader, setImageUploader] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState<CountryDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<(dto: BrandDto) => void>(dummyResolvePromise);

  const mediaService = useMemo(() => {
    return new MediaService(accessToken);
  }, [accessToken]);

  const brandService = useMemo(() => {
    return new BrandService(accessToken);
  }, [accessToken]);

  const imageProcessor = useMemo(() => {
    if (imageUploader) {
      return URL.createObjectURL(imageUploader);
    }
    return "/assets/images/default-image.png";
  }, [imageUploader]);

  function openModal(newData?: BrandDto, newCountries?: CountryDto[]) {
    setIsOpen(true);
    if (newData && newData.id && newData.id > 0) {
      setDto(newData);
    }
    if (newCountries) {
      setCountries(newCountries);
    }

    return new Promise<BrandDto>((resolve) => {
      setResolvePromise(() => resolve);
    });
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setImageUploader(event.target.files[0]);
    }
  }

  async function uploadImage() {
    if (!imageUploader) return;
    const { body } = await mediaService.uploadImage(ImageDir.brand, imageUploader);
    if (body.status == 200 && body.data) {
      setDto({ ...dto, thumbnail: body.data });
      toast({ description: body.message });
    }
  }

  async function createBrand() {
    try {
      if (imageUploader) await uploadImage();
      const { body } = await brandService.createBrand(dto);
      if (body.status == 200 && body.data) {
        toast({ description: body.message });
        resolvePromise(body.data);
        closeModal();
      }
    } catch (error) {
      console.error(error);
    }
  }


  function onCountryChange(id: string) {
    const index = countries.findIndex((country) => country.id === Number(id));
    if (index === -1) {
      return;
    }
    setDto({ ...dto, country: countries[index] });
  }

  return {
    content: (

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="min-w-[50%] h-[90%]">
          <DialogHeader>
            <DialogTitle className="mb-4 font-bold text-base">
              Tạo thương hiệu mới
            </DialogTitle>
            <div className="grid grid-cols-12 gap-8 ">
                <span className="col-span-4">
                  <Label>Tên thương hiệu</Label>
                  <Input
                    value={dto.name}
                    name={"name"}
                    onChange={e => {
                      setDto({ ...dto, [e.target.name]: e.target.value });
                    }}
                    placeholder="Nhập tên thương hiệu"
                  />
                </span>
              <span className="col-span-4">
                  <Label>Link trang chủ</Label>
                  <Input
                    value={dto.homepageLink}
                    name={"homepageLink"}
                    onChange={e => {
                      setDto({ ...dto, [e.target.name]: e.target.value });
                    }}
                    placeholder="Link trang chủ"
                  />
                </span>
              <span className="col-span-4">
                  <Label>Ảnh thương hiệu</Label>
                  <span className="flex items-start justify-between">
                    <NextImg
                      src={imageProcessor}
                      alt="logo"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                    <Button className="bg-gray-300 text-gray-900 relative">
                      Upload Ảnh
                          <input className={"absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer"}
                                 type={"file"}
                                 onChange={onFileInputChange} />
                    </Button>
                  </span>
                </span>
              <div className="col-span-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label>Quốc gia</Label>

                </div>
                <Select
                  value={dto.country.id ? `${dto.country.id}` : ""}
                  onValueChange={(id) => onCountryChange(id)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn quốc gia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Quốc gia</SelectLabel>

                      {countries.map((country) => (
                        <SelectItem value={String(country.id)} key={country.id}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <span className="col-span-12">
                  <Label>Mô tả</Label>
                  <Input
                    name={"description"}
                    placeholder="Nhập mô tả"
                    value={""}
                    onChange={(e) => {
                    }}
                  />
                </span>
              <div className={"col-span-12 mt-4 flex justify-end gap-4"}>
                <Button className={"text-grap-900 bg-gray-100"}>Trở về</Button>
                <Button onClick={createBrand}>Tạo thương hiệu</Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    ),
    close: closeModal,
    open: openModal
  };
};

export default CreateBrandModal;
