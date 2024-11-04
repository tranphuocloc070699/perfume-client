"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/user.store";
import { BrandDto } from "@/types/brand/brand.model";
import { Label } from "@/components/ui/label";
import NextImg from "next/image";
import { dummyBrandDto } from "@/types/brand/brand.data";
import UserService from "@/services/modules/user.service";
import BrandService from "@/services/modules/brand.service";
import { CountryDto } from "@/types/country/country.model";
import CountryService from "@/services/modules/country.service";
import { dummyCountryDto } from "@/types/country/country.data";

function dummyResolvePromise(dto: CountryDto) {

}

const CreateCountryModal = () => {
  const { toast } = useToast();
  const { accessToken } = useUserStore();
  const [dto, setDto] = useState<CountryDto>(dummyCountryDto);
  const [imageUploader, setImageUploader] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<(dto: CountryDto) => void>(dummyResolvePromise);

  const userService = useMemo(() => {
    return new UserService(accessToken);
  }, [accessToken]);

  const countryService = useMemo(() => {
    return new CountryService(accessToken);
  }, [accessToken]);

  const imageProcessor = useMemo(() => {
    if (imageUploader) {
      return URL.createObjectURL(imageUploader);
    }
    return "/assets/images/default-image.png";
  }, [imageUploader]);

  function openModal(newData?: CountryDto) {
    setIsOpen(true);
    if (newData && newData?.id > 0) {
      setDto(newData);
    }

    return new Promise<CountryDto>((resolve) => {
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
    const response = await userService.uploadImage(imageUploader);
    if (response.status == 200 && response.data) {
      setDto({ ...dto, thumbnail: response.data });
    }
  }

  async function createCountry() {
    try {
      if (imageUploader) await uploadImage();
      const response = await countryService.createCountry(dto);
      if (response.status == 200 && response.data) {
        resolvePromise(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }


  return {
    content: (
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="min-w-[50%] h-[90%]">
            <DialogHeader>
              <DialogTitle className="mb-4 font-bold text-base">
                Thêm quốc gia
              </DialogTitle>
              <div className="grid grid-cols-12 gap-8 ">
                <span className="col-span-4">
                  <Label>Tên quốc gia</Label>
                  <Input
                    value={dto.name}
                    name={"name"}
                    onChange={e => {
                      setDto({ ...dto, [e.target.name]: e.target.value });
                    }}
                    placeholder="Nhập tên quốc gia"
                  />
                </span>
                <span className="col-span-4">
                  <Label>Mã quốc gia</Label>
                  <Input
                    value={dto.code}
                    name={"code"}
                    onChange={e => {
                      setDto({ ...dto, [e.target.name]: e.target.value });
                    }}
                    placeholder="Nhập mã quốc gia"
                  />
                </span>
                <span className="col-span-4">
                  <Label>Ảnh quốc gia</Label>
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
                <div className={"col-span-12 mt-4 flex justify-end gap-4"}>
                  <Button className={"text-grap-900 bg-gray-100"}>Trở về</Button>
                  <Button onClick={createCountry}>Tạo quốc gia</Button>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    ),
    close: closeModal,
    open: openModal
  };
};

export default CreateCountryModal;
