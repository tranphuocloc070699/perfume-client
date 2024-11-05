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
    const index = brands.findIndex((brand) => brand.id === Number(id));
    if (index === -1) {
      return;
    }
    updateUpsaveProductValue("brand", brands[index]);
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
    createBrandModal.open().then(data => {
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
          <DialogContent className="min-w-[60%] h-[90%]">
            <DialogHeader>
              <DialogTitle className="mb-4 font-bold text-base">
                Tạo sản phẩm mới
              </DialogTitle>
              <form className="grid grid-cols-3 gap-8">
                <div className="col-span-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Tên sản phẩm</Label>
                    <span
                      className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer opacity-0">
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
                  <Select
                    value={upsaveProduct.dateReleased.id.toString()}
                    onValueChange={(value) => onDateReleasedChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn năm sản xuất" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Năm sản xuất</SelectLabel>

                        {years.map((year) => (
                          <SelectItem value={String(year.id)} key={year.id}>
                            {year.value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Thương hiệu</Label>
                    <span
                      className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer"
                      onClick={openBrandModal}
                    >
                      <Icon
                        icon={"lucide:plus"}
                        className=" text-white h-4 w-4"
                      />
                    </span>
                  </div>
                  <Select
                    value={upsaveProduct.brand.id.toString()}
                    onValueChange={(id) => onBrandChange(id)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thương hiệu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Thương hiệu</SelectLabel>

                        {brands.map((brand) => (
                          <SelectItem value={String(brand.id)} key={brand.id}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Quốc gia</Label>
                    <span
                      className="p-2 w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer"
                      onClick={openCountryModal}
                    >
                      <Icon
                        icon={"lucide:plus"}
                        className=" text-white h-4 w-4"
                      />
                    </span>
                  </div>
                  <Select
                    value={upsaveProduct.country.id.toString()}
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
