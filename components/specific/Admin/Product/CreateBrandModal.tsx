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
import CreateCountryModal from "@/components/specific/Admin/Product/CreateCountryModal";
import { CountryDto } from "@/types/country/country.model";


function dummyResolvePromise(dto: BrandDto) {

}

const CreateBrandModal = () => {
  const { toast } = useToast();
  const { accessToken } = useUserStore();
  const [dto, setDto] = useState<BrandDto>(dummyBrandDto);
  const [imageUploader, setImageUploader] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<(dto: BrandDto) => void>(dummyResolvePromise);

  const userService = useMemo(() => {
    return new UserService(accessToken);
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

  function openModal(newData?: BrandDto) {
    setIsOpen(true);
    if (newData && newData?.id > 0) {
      setDto(newData);
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
    const response = await userService.uploadImage(imageUploader);
    if (response.status == 200 && response.data) {
      setDto({ ...dto, thumbnail: response.data });
    }
  }

  async function createBrand() {
    try {
      if (imageUploader) await uploadImage();
      const response = await brandService.createBrand(dto);
      console.log({ response });
      if (response.status == 200 && response.data) {
        resolvePromise(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleCreateCountryModalSubmit(countryDto: CountryDto) {

  }

  function openCountryModal() {
    createCountryModal.open().then(data => {
      handleCreateCountryModalSubmit(data);
    });
  }

  const createCountryModal = CreateCountryModal();


  return {
    content: (
      <>
        {createCountryModal.content}
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
                <span className="col-span-12">
                  <Label>Mô tả</Label>
                  <Input

                    placeholder="Nhập mô tả"
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
      </>
    ),
    close: closeModal,
    open: openModal
  };
};

export default CreateBrandModal;
