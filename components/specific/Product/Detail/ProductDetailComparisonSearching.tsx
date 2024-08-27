"use client";

import AppInput from "@/components/common/AppInput";
import React, { useState } from "react";

const ProductDetailComparisonSearching = () => {
  const [searchValue, setSearchValue] = useState("");

  function handleSearchValueChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(evt.target.value);
  }
  return (
    <div className="mb-8">
      <AppInput
        value={searchValue}
        onChange={handleSearchValueChange}
        name="search-input"
        placeholder="Tìm kiếm sản phẩm..."
      />
    </div>
  );
};

export default ProductDetailComparisonSearching;
