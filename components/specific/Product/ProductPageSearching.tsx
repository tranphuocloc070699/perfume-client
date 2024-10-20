"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getParams } from "@/lib/url";
import BrandService from "@/services/modules/brand.service";
import CountryService from "@/services/modules/country.service";
import YearService from "@/services/modules/year.service";
import { BrandDto } from "@/types/brand/brand.model";
import { CountryDto } from "@/types/country/country.model";
import { GetAllProductRequest } from "@/types/product/product.model";
import { YearDto } from "@/types/year/year.model";
import { useRouter, useSearchParams } from "next/navigation";
import React, { KeyboardEvent, memo, useEffect, useState } from "react";

interface ProductPageSearchingProps {
  onSearch: (request: GetAllProductRequest) => void;
}
interface ProductPageSearchingInnerProps {
  country: CountryDto[];
  brand: BrandDto[];
  year: YearDto[];
}

const sortByList = [
  {
    label: "Giá thấp đến cao",
    value: 1,
    query: {
      sortBy: "price",
      sortDir: "ASC",
    },
  },
  {
    label: "Giá cao đến thấp",
    value: 2,
    query: {
      sortBy: "price",
      sortDir: "DESC",
    },
  },
  {
    label: "Mới ra mắt",
    value: 3,
    query: {
      sortBy: "dateReleased",
      sortDir: "DESC",
    },
  },
  {
    label: "Lâu đời",
    value: 4,
    query: {
      sortBy: "dateReleased",
      sortDir: "ASC",
    },
  },
];

const ProductPageSearching = (props: ProductPageSearchingProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [request, setRequest] = useState<GetAllProductRequest>({
    productName: "",
    brandId: undefined,
    countryId: undefined,
    notesIds: [],
    sortBy: 3,
  });

  const [options, setOptions] = useState<ProductPageSearchingInnerProps>({
    country: [],
    brand: [],
    year: [],
  });

  const fetchData = async () => {
    const countryService = new CountryService();
    const brandService = new BrandService();
    const yearService = new YearService();

    const countryResponse = await countryService.getAllCountry();
    const brandResponse = await brandService.getAllBrand();
    const yearResponse = await yearService.getAllYear();

    setOptions({
      country: countryResponse.data,
      brand: brandResponse.data,
      year: yearResponse.data,
    });
  };

  const getDataFromUrl = () => {
    const params = getParams(searchParams);
    setRequest(params);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getDataFromUrl();
  }, [searchParams]);

  useEffect(() => {
    props.onSearch(request);
  }, [request.brandId, request.countryId, request.notesIds, request.sortBy]);

  const updateValue = (
    key: keyof GetAllProductRequest,
    value: string | number
  ) => {
    setRequest({
      ...request,
      [key]: value,
    });
  };

  const handleResetSearchParams = () => {
    router.push("/nuoc-hoa");
    router.refresh();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.onSearch({ ...request, page: 1 });
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-4">
      <Input
        onKeyDown={handleInputKeyDown}
        placeholder="Tên sản phẩm"
        className="md:w-[33%] w-full"
        value={request.productName}
        onChange={(e) => updateValue("productName", e.target.value)}
      />

      <Select
        value={request?.brandId ? `${request.brandId}` : ""}
        onValueChange={(value) =>
          setRequest({ ...request, brandId: Number(value), page: 1 })
        }
      >
        <SelectTrigger className="md:w-[15%] w-full">
          <SelectValue placeholder="Thương hiệu" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Thương hiệu</SelectLabel>
            {options.brand.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={request?.countryId ? `${request.countryId}` : ""}
        onValueChange={(value) =>
          setRequest({ ...request, countryId: Number(value), page: 1 })
        }
      >
        <SelectTrigger className="md:w-[15%] w-full">
          <SelectValue placeholder="Quốc gia" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Quốc gia</SelectLabel>
            {options.country.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* <Select  onValueChange={(value) => updateValue('brandId',Number(value))}>
        <SelectTrigger className="md:w-[14%] w-full">
          <SelectValue placeholder="Năm" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Năm</SelectLabel>
            {options.year.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select> */}

      <Select>
        <SelectTrigger className="md:w-[15%] w-full">
          <SelectValue placeholder="Sắp xếp" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sắp xếp theo</SelectLabel>
            {sortByList.map((item) => (
              <SelectItem
                key={item.value.toString()}
                value={item.value.toString()}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={handleResetSearchParams}>Xóa toàn bộ</Button>
    </div>
  );
};

export default memo(ProductPageSearching);
