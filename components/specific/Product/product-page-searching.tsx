"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useProductPageSearchingData } from "@/hooks/fetch-data/nuoc-hoa-page/useProductPageSearchingData";
import { useParamsUtil } from "@/hooks/use-params";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, memo, useMemo } from "react";

export const sortByList = [
  {
    label: "Giá VN: cao đến thấp",
    value: 1,
    query: {
      sortBy: "price_VIETNAM_MARKET",
      sortDir: "desc"
    }
  },
  {
    label: "Giá VN: thấp đến cao",
    value: 2,
    query: {
      sortBy: "price_VIETNAM_MARKET",
      sortDir: "asc"
    }
  },
  {
    label: "Giá hãng: cao đến thấp",
    value: 3,
    query: {
      sortBy: "price_LISTED",
      sortDir: "desc"
    }
  },
  {
    label: "Giá hãng: thấp đến cao",
    value: 4,
    query: {
      sortBy: "price_LISTED",
      sortDir: "asc"
    }
  },
  {
    label: "Mới ra mắt",
    value: 5,
    query: {
      sortBy: "dateReleased",
      sortDir: "desc"
    }
  },
  {
    label: "Ra mắt lâu đời",
    value: 6,
    query: {
      sortBy: "dateReleased",
      sortDir: "asc"
    }
  }
];

const ProductPageSearching = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { getParams, updateParams } = useParamsUtil({
    searchParams,
    pathname,
    router
  });

  /* Fetching select data */
  const { options } = useProductPageSearchingData();

  /* Assign input,select value based on params */
  const defaultValue = useMemo(() => {
    return getParams(searchParams);
  }, [searchParams, pathname]);

  const handleResetSearchParams = () => {
    router.push("/nuoc-hoa");
    router.refresh();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
      updateParams({
        key: "productName",
        value: event.target.value,
        resetPage: true
      });
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-4">
      <Input
        onKeyDown={handleInputKeyDown}
        placeholder="Tên sản phẩm"
        className="md:w-[33%] w-full"
        defaultValue={defaultValue?.productName}
      />

      <Select
        value={defaultValue?.brandId ? `${defaultValue.brandId}` : ""}
        onValueChange={(value) => {
          updateParams({ key: "brandId", value, resetPage: true });
        }}
      >
        <SelectTrigger className="md:w-[15%] w-full">
          <SelectValue placeholder="Thương hiệu" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Thương hiệu</SelectLabel>
            {options.brand.map((item) => (
              <SelectItem key={item.id} value={`${item.id}`}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={defaultValue?.countryId ? `${defaultValue.countryId}` : ""}
        onValueChange={(value) =>
          updateParams({ key: "countryId", value, resetPage: true })
        }
      >
        <SelectTrigger className="md:w-[15%] w-full">
          <SelectValue placeholder="Quốc gia" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Quốc gia</SelectLabel>
            {options.country.map((item) => (
              <SelectItem key={item.id} value={`${item?.id}`}>
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

      <Select
        value={defaultValue?.sortByType ? `${defaultValue.sortByType}` : ""}
        onValueChange={(value) =>
          updateParams({ key: "sortByType", value, resetPage: true })
        }
      >
        <SelectTrigger className="md:w-[15%] w-full">
          <SelectValue placeholder="Sắp xếp" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sắp xếp theo</SelectLabel>
            {sortByList.map((item) => (
              <SelectItem key={item.value} value={item.value.toString()}>
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
