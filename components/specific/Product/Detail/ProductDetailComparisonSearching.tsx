"use client";

import AppInput from "@/components/common/AppInput";
import React, { useState } from "react";

const ProductDetailComparisonSearching = () => {
  const [searchValue, setSearchValue] = useState("");

  function handleSearchValueChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(evt.target.value);
  }
  return (
    <div>
      <AppInput
        value={searchValue}
        onChange={handleSearchValueChange}
        name="search-input"
        placeholder="Nhập tên sản phẩm cần so sánh..."
      />
    </div>
  );
};

export default ProductDetailComparisonSearching;
