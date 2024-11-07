"use client";

import React, { useMemo, useState } from "react";
import { dummyUpsaveProductDto } from "@/types/admin/admin.data";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react/dist/iconify.js";
import CreateYearModal from "./CreateYearModal";
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
import { MultiSelect } from "@/components/common/CommonMultiSelect";
import UpsaveNoteModal from "@/components/specific/Admin/Product/UpsaveNoteModal";
import UpsaveMultiSelect from "@/components/specific/Admin/Product/UpsaveMultiSelect";
import UpsaveThumbnail from "@/components/specific/Admin/Product/UpsaveThumbnail";
import CommonTipTap from "@/components/common/CommonTipTap";


const UpsaveProductContainer = () => {
  const [upsaveProduct, setUpsaveProduct] = useState<UpsaveProductDto>(
    dummyUpsaveProductDto
  );
  const [thumbnailUpload, setThumbnailUpload] = useState<File | null>(null);
  const { toast } = useToast();
  const { years, addYear, brands, addBrand, countries, addCountry, notes, addNote } = useAdminDashboardPageData();
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
  const upsaveNoteModal = UpsaveNoteModal();

  function updateUpsaveProductValue(key: keyof UpsaveProductDto, value: any) {
    setUpsaveProduct({ ...upsaveProduct, [key]: value });
  }

  function onNoteSelectChange(values: string[]) {
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

  function openNoteModal() {
    upsaveNoteModal.open().then((data) => {
    });
  }

  return (<div className="grid grid-cols-12 gap-8">
    <UpsaveThumbnail className={"space-y-4 col-span-4"} thumbnail={upsaveProduct.thumbnail} preview={thumbnailUpload}
                     setPreview={setThumbnailUpload} />
    <UpsaveInput label={"Tên sản phẩm"} placeholder={"Nhập tên sản phẩm"} name={"name"}
                 className={"col-span-4 flex flex-col gap-2"} />
    <UpsaveInput label={"Slug"} placeholder={"Bỏ trống để tự generate slug"} name={"slug"}
                 className={"col-span-4 flex flex-col gap-2"} />
    <UpsaveSelect className={"col-span-4 flex flex-col gap-2"} label={"Năm sản xuất"} data={years}
                  openModal={openYearModal}
                  value={upsaveProduct.dateReleased.id ? `${upsaveProduct.dateReleased.id}` : ""}
                  onValueChange={onDateReleasedChange} type={"Year"} />
    <UpsaveSelect className={"col-span-4 flex flex-col gap-2"} label={"Thương hiệu"} data={brands}
                  openModal={openBrandModal}
                  value={upsaveProduct.brand.id ? `${upsaveProduct.brand.id}` : ""}
                  onValueChange={onBrandChange} type={"Brand"} />
    <UpsaveSelect className={"col-span-4 flex flex-col gap-2"} label={"Quốc gia"} data={countries}
                  openModal={openCountryModal}
                  value={upsaveProduct.country.id ? `${upsaveProduct.country.id}` : ""}
                  onValueChange={onCountryChange} type={"Country"} />

    <UpsaveMultiSelect className={"col-span-4"} label={"Top Notes"} options={notes} openModal={openNoteModal}
                       updateUpsaveProductValue={updateUpsaveProductValue}
                       values={upsaveProduct.topNotes}
                       id={"topNotes"}
    />
    <UpsaveMultiSelect className={"col-span-4"} label={"Middle Notes"} options={notes} openModal={openNoteModal}
                       updateUpsaveProductValue={updateUpsaveProductValue}
                       values={upsaveProduct.middleNotes}
                       id={"middleNotes"}
    />
    <UpsaveMultiSelect className={"col-span-4"} label={"Base Notes"} options={notes} openModal={openNoteModal}
                       updateUpsaveProductValue={updateUpsaveProductValue}
                       values={upsaveProduct.baseNotes}
                       id={"baseNotes"}
    />
    <MediaList className={"col-span-6 flex flex-col gap-2 w-full"}
               data={upsaveProduct.galleries} updateUpsaveProductValue={updateUpsaveProductValue}
               id={"galleries"} label={"Galleries"} />
    <MediaList className={"col-span-6 flex flex-col gap-2 w-full"}
               data={upsaveProduct.outfits} updateUpsaveProductValue={updateUpsaveProductValue}
               id={"outfits"} label={"Outfits"} />

    <CommonTipTap className={"col-span-12 mt-4"} />
    {createYearModal.content}
    {createBrandModal.content}
    {createCountryModal.content}
    {upsaveNoteModal.content}
  </div>);
};

export default UpsaveProductContainer;
