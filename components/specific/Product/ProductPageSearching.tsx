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
import React from "react";

const ProductPageSearching = () => {
  return (
    <div className="flex items-center flex-wrap gap-4">
      <Input placeholder="Tên sản phẩm" className="md:w-[33%] w-full" />

      <Select>
        <SelectTrigger className="md:w-[15%] w-full">
          <SelectValue placeholder="Chọn thương hiệu" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Thương hiệu</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="md:w-[15%] w-full">
          <SelectValue placeholder="Chọn quốc gia" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Quốc gia</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="md:w-[10%] w-full">
          <SelectValue placeholder="Chọn năm sản xuất" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Năm sản xuất</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="md:w-[15%] w-full">
          <SelectValue placeholder="Sắp xếp" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sắp xếp theo</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductPageSearching;
