"use client";

import React, { useEffect, useMemo, useState } from "react";
import { dummyUpsaveProductDto } from "@/types/admin/admin.data";
import CreateYearModal from "./create-year-modal";
import { useToast } from "@/hooks/use-toast";
import { useAdminDashboardPageData } from "@/hooks/fetch-data/admin-dashboard-page";
import { UpsaveProductDto } from "@/types/admin/admin.interface";
import { YearDto } from "@/types/year/year.model";
import CreateBrandModal from "./create-brand-modal";
import { BrandDto } from "@/types/brand/brand.model";
import CreateCountryModal from "@/components/specific/Admin/Product/create-country-modal";
import { CountryDto } from "@/types/country/country.model";
import UpsaveInput from "@/components/specific/Admin/Product/upsave-input";
import UpsaveProductSelect from "@/components/specific/Admin/Product/upsave-product-select";
import MediaList from "@/components/specific/Admin/Product/media-list";
import UpsaveNoteModal from "@/components/specific/Admin/Product/upsave-note-modal";
import UpsaveNotesSelect from "@/components/specific/Admin/Product/upsave-notes-select";
import UpsaveThumbnail from "@/components/specific/Admin/Product/upsave-thumbnail";
import TiptapEditor from "@/components/common/editor/tiptap-editor";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user.store";
import MediaService from "@/services/modules/media.service";
import ProductService from "@/services/modules/product.service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { convertToSlug } from "@/lib/utils";
import { ProductNoteDto } from "@/types/product-note/product-note.model";
import { ProductDto } from "@/types/product/product.model";
import { dummyProductDto } from "@/types/product/product.data";
import { ImageDir } from "@/types/common";
import UpsaveColor from "@/components/specific/Admin/Product/upsave-color";


const UpsaveProductContainer = () => {


  const [upsaveProduct, setUpsaveProduct] = useState<ProductDto>(
    dummyProductDto
  );
  const [thumbnailUpload, setThumbnailUpload] = useState<File | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      fetchProductOnUpdateMode(id);
      setEditMode(true);
    } else {
      setUpsaveProduct(dummyProductDto);
    }
  }, [searchParams]);

  async function fetchProductOnUpdateMode(id: string) {
    try {
      const response = await productService.getProductById(Number(id));
      if (response.body.status === 200) {
        setUpsaveProduct(response.body.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const {
    years,
    addYear,
    brands,
    addBrand,
    countries,
    addCountry,
    notes,
    addNote,
    colors,
    addColor
  } = useAdminDashboardPageData();
  const { accessToken } = useUserStore();

  const mediaService = useMemo(() => {
    return new MediaService(accessToken);
  }, [accessToken]);

  const productService = useMemo(() => {
    return new ProductService(accessToken);
  }, [accessToken]);

  const priceInVND = useMemo(() => {

    const index = upsaveProduct.prices.findIndex(item => item.priceType === "VND");
    return upsaveProduct.prices[index];
  }, [upsaveProduct]);

  const priceInUSD = useMemo(() => {


    const index = upsaveProduct.prices.findIndex(item => item.priceType === "USD");
    return upsaveProduct.prices[index];
  }, [upsaveProduct]);

  const handleYearModalSubmit = (year: YearDto) => {
    updateUpsaveProductValue("dateReleased", year);
    addYear(year);
  };
  const handleBrandModalSubmit = (brand: BrandDto) => {
    updateUpsaveProductValue("brand", brand);
    addBrand(brand);
  };

  function handleCountryModalSubmit(country: CountryDto) {
    updateUpsaveProductValue("country", country);
    addCountry(country);
  }

  const createYearModal = CreateYearModal();
  const createBrandModal = CreateBrandModal();
  const createCountryModal = CreateCountryModal();
  const upsaveNoteModal = UpsaveNoteModal();

  function updateUpsaveProductValue(key: keyof UpsaveProductDto, value: any) {
    setUpsaveProduct({ ...upsaveProduct, [key]: value });
  }


  function onPriceChange(type: "VND" | "USD", value: string) {
    const prices = [...upsaveProduct.prices];
    const index = upsaveProduct.prices.findIndex(item => item.priceType === type);
    const price = prices[index];
    console.log({ price, index, prices });
    price.value = value;
    prices[index] = price;
    updateUpsaveProductValue("prices", prices);

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

  function openNoteModal(id: keyof UpsaveProductDto) {
    upsaveNoteModal.open(id).then(({ data, key }) => {
      const newData = [data, ...upsaveProduct[key] as Array<ProductNoteDto>];
      updateUpsaveProductValue(key, newData);
      addNote(data);
      upsaveNoteModal.close();
    });
  }


  function validation() {

  }

  async function uploadImage(file: File) {
    if (!file) return;
    const { body } = await mediaService.uploadImage(ImageDir.product, file);
    if (body.status == 200 && body.data) {
      return body.data;
    }
  }

  async function onSubmit() {
    const req = { ...upsaveProduct };
    //
    // console.log({ req });
    //
    // return;

    if (thumbnailUpload) {
      const path = await uploadImage(thumbnailUpload);
      req.thumbnail = path || "";
    }

    if (req.slug.trim().length === 0) {
      req.slug = convertToSlug(req.name);
    }
    try {
      let response;
      if (editMode) {
        response = await productService.updateProduct(req);
      } else {
        response = await productService.createProduct(req);
      }
      console.log({ response });
      if (response?.body?.status === 200 && response?.body.data) {
        toast({ description: response?.body?.message });
        router.push("/admin/nuoc-hoa");
      }
    } catch (e) {
      console.log("create product error", e);
    }

  }

  return (<div className="grid grid-cols-12 gap-8">
    <UpsaveThumbnail className={"space-y-4 col-span-4"} thumbnail={upsaveProduct.thumbnail} preview={thumbnailUpload}
                     setPreview={setThumbnailUpload} />
    <UpsaveInput type={"text"} label={"Tên sản phẩm"} placeholder={"Nhập tên sản phẩm"} name={"name"}
                 className={"col-span-4 flex flex-col gap-2"} value={upsaveProduct.name}
                 onChange={(value) => updateUpsaveProductValue("name", value)} />
    <UpsaveInput type={"text"} label={"Slug"} placeholder={"Bỏ trống để tự generate slug"} name={"slug"}
                 className={"col-span-4 flex flex-col gap-2"} value={upsaveProduct.slug}
                 onChange={(value) => updateUpsaveProductValue("slug", value)} />

    <UpsaveInput type={"currency"} label={"Giá VN (VND)"} placeholder={"Nhập giá..."}
                 className={"col-span-4 flex flex-col gap-2"} value={priceInVND?.value}
                 onChange={(value) => onPriceChange("VND", value)} />
    <UpsaveInput type={"currency"} label={"Giá Hãng (USD)"} placeholder={"Nhập giá..."}
                 className={"col-span-4 flex flex-col gap-2"} value={priceInUSD?.value}
                 onChange={(value) => onPriceChange("USD", value)} />
    <UpsaveProductSelect className={"col-span-4 flex flex-col gap-2"} label={"Năm sản xuất"} data={years}
                         openModal={openYearModal}
                         value={upsaveProduct.dateReleased.id ? `${upsaveProduct.dateReleased.id}` : ""}
                         onValueChange={onDateReleasedChange} type={"Year"} />
    <UpsaveProductSelect className={"col-span-4 flex flex-col gap-2"} label={"Thương hiệu"} data={brands}
                         openModal={openBrandModal}
                         value={upsaveProduct.brand.id ? `${upsaveProduct.brand.id}` : ""}
                         onValueChange={onBrandChange} type={"Brand"} />
    <UpsaveProductSelect className={"col-span-4 flex flex-col gap-2"} label={"Quốc gia"} data={countries}
                         openModal={openCountryModal}
                         value={upsaveProduct.country.id ? `${upsaveProduct.country.id}` : ""}
                         onValueChange={onCountryChange} type={"Country"} />

    <UpsaveColor className={"col-span-4 flex flex-col gap-2"} options={colors}
                 values={upsaveProduct.colors}
                 addColor={addColor}
                 onValuesChange={updateUpsaveProductValue}
    />


    <UpsaveNotesSelect className={"col-span-4"} label={"Top Notes"} options={notes} openModal={openNoteModal}
                       updateUpsaveProductValue={updateUpsaveProductValue}
                       values={upsaveProduct.topNotes}
                       id={"topNotes"}
                       placeholder={"Chọn Top Notes"}
    />
    <UpsaveNotesSelect className={"col-span-4"} label={"Middle Notes"} options={notes} openModal={openNoteModal}
                       updateUpsaveProductValue={updateUpsaveProductValue}
                       values={upsaveProduct.middleNotes}
                       id={"middleNotes"}
                       placeholder={"Chọn Middle Notes"}
    />
    <UpsaveNotesSelect className={"col-span-4"} label={"Base Notes"} options={notes} openModal={openNoteModal}
                       updateUpsaveProductValue={updateUpsaveProductValue}
                       values={upsaveProduct.baseNotes}
                       id={"baseNotes"}
                       placeholder={"Chọn Base Notes"}
    />
    <MediaList className={"col-span-6 flex flex-col gap-2 w-full"}
               data={upsaveProduct.galleries} updateUpsaveProductValue={updateUpsaveProductValue}
               id={"galleries"} label={"Galleries"} />

    <TiptapEditor label={"Câu chuyện"} className={"col-span-12 "} content={upsaveProduct.description}
                  onChange={(content) => updateUpsaveProductValue("description", content)} editMode={editMode} />
    <TiptapEditor label={"Phong thủy"} className={"col-span-12 "} content={upsaveProduct.fengShui}
                  onChange={(content) => updateUpsaveProductValue("fengShui", content)} editMode={editMode} />
    <div className={"flex item-center justify-end  col-span-12"}>
      <Button onClick={onSubmit}>{editMode ? "Cập nhật sản phẩm" : "Tạo sản phẩm"}</Button>
    </div>
    {createYearModal.content}
    {createBrandModal.content}
    {createCountryModal.content}
    {upsaveNoteModal.content}
  </div>);
};

export default UpsaveProductContainer;
