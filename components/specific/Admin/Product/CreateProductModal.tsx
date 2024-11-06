"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import CommonInput from "@/components/common/CommonInput";
import { dummyUpsaveProductDto, validYears } from "@/types/admin/admin.data";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import CreateYearModal from "./CreateYearModal";
import { Input } from "@/components/ui/input";
import YearService from "@/services/modules/year.service";
import { useToast } from "@/hooks/use-toast";
import { useAdminDashboardPageData } from "@/hooks/fetch-data/admin-dashboard-page";
import { UpsaveProductDto } from "@/types/admin/admin.interface";
import { YearDto } from "@/types/year/year.model";
import CreateBrandModal from "./CreateBrandModal";
import { BrandDto } from "@/types/brand/brand.model";
import CreateCountryModal from "@/components/specific/Admin/Product/CreateCountryModal";
import { CountryDto } from "@/types/country/country.model";

import UpsaveInput from "@/components/specific/Admin/Product/UpsaveInput";
import UpsaveSelect from "@/components/specific/Admin/Product/UpsaveSelect";
import MediaList from "@/components/specific/Admin/Product/MediaList";

const CreateProductModal = () => {
  const [upsaveProduct, setUpsaveProduct] = useState<UpsaveProductDto>(
    dummyUpsaveProductDto
  );

  const { toast } = useToast();
  const { years, addYear, brands, addBrand, countries, addCountry } = useAdminDashboardPageData();

  const [isOpen, setIsOpen] = useState(false);
  const handleYearModalSubmit = (year: YearDto) => {
    setUpsaveProduct({ ...upsaveProduct, dateReleased: year });
    addYear(year);
  };
  const handleBrandModalSubmit = (brand: BrandDto) => {
    setUpsaveProduct({ ...upsaveProduct, brand });
    addBrand(brand);
  };

  function handleCountryModalSubmit(country: CountryDto) {
    setUpsaveProduct({ ...upsaveProduct, country });
    addCountry(country);
  }

  const createYearModal = CreateYearModal();
  const createBrandModal = CreateBrandModal();
  const createCountryModal = CreateCountryModal();

  function updateUpsaveProductValue(key: keyof UpsaveProductDto, value: any) {
    setUpsaveProduct({ ...upsaveProduct, [key]: value });
  }

  function onDateReleasedChange(id: string) {
    const index = years.findIndex((year) => year.id === Number(id));
    if (index === -1) {
      return;
    }
    updateUpsaveProductValue("dateReleased", years[index]);
  }

  function onBrandChange(id: string) {
    const index = brands.findIndex((brand) => brand.id === Number(id));
    if (index === -1) {
      return;
    }
    updateUpsaveProductValue("brand", brands[index]);
  }

  function onCountryChange(id: string) {
    const index = countries.findIndex((country) => country.id === Number(id));
    if (index === -1) {
      return;
    }
    updateUpsaveProductValue("country", countries[index]);
  }

  function openModal() {
    console.log("open modal trigger...");
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openYearModal() {
    createYearModal.open().then((data) => {
      handleYearModalSubmit(data);
    });
  }

  function openBrandModal() {
    createBrandModal.open(undefined, countries).then(data => {
      handleBrandModalSubmit(data);

    });
  }


  function openCountryModal() {
    createCountryModal.open().then(data => {
      handleCountryModalSubmit(data);
    });
  }

  return {
    content: (
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="min-w-[60%] h-[90%] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="mb-4 font-bold text-base">
                Tạo sản phẩm mới
              </DialogTitle>
              <form className="grid grid-cols-12 gap-8">
                <UpsaveInput label={"Tên sản phẩm"} placeholder={"Nhập tên sản phẩm"} name={"name"}
                             className={"col-span-6 flex flex-col gap-2"} />
                <UpsaveInput label={"Slug"} placeholder={"Bỏ trống để tự generate slug"} name={"slug"}
                             className={"col-span-6 flex flex-col gap-2"} />
                <UpsaveSelect className={"col-span-6 flex flex-col gap-2"} label={"Năm sản xuất"} data={years}
                              openModal={openYearModal}
                              value={upsaveProduct.dateReleased.id ? `${upsaveProduct.dateReleased.id}` : ""}
                              onValueChange={onDateReleasedChange} type={"Year"} />
                <UpsaveSelect className={"col-span-6 flex flex-col gap-2"} label={"Thương hiệu"} data={brands}
                              openModal={openBrandModal}
                              value={upsaveProduct.brand.id ? `${upsaveProduct.brand.id}` : ""}
                              onValueChange={onBrandChange} type={"Brand"} />
                <UpsaveSelect className={"col-span-6 flex flex-col gap-2"} label={"Quốc gia"} data={countries}
                              openModal={openCountryModal}
                              value={upsaveProduct.country.id ? `${upsaveProduct.country.id}` : ""}
                              onValueChange={onCountryChange} type={"Country"} />
                <div className={"col-span-6"}>

                </div>

                <MediaList className={"col-span-6 flex flex-col gap-2 w-full"}
                           data={upsaveProduct.galleries} updateUpsaveProductValue={updateUpsaveProductValue}
                           id={"galleries"} label={"Galleries"} />
                <MediaList className={"col-span-6 flex flex-col gap-2 w-full"}
                           data={upsaveProduct.outfits} updateUpsaveProductValue={updateUpsaveProductValue}
                           id={"outfits"} label={"Outfits"} />
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {createYearModal.content}
        {createBrandModal.content}
        {createCountryModal.content}
      </>
    ),
    close: closeModal,
    open: openModal
  };
};

export default CreateProductModal;
