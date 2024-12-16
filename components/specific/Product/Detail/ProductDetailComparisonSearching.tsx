"use client";

import ProductCompareSearchingInput from "@/components/common/product-compare-searching-input";
import React, { useState } from "react";

const ProductDetailComparisonSearching = () => {
  const [searchValue, setSearchValue] = useState("");

  function handleSearchValueChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(evt.target.value);
  }

  return (
    <div className="mb-8">
      <ProductCompareSearchingInput
        value={searchValue}
        onChange={handleSearchValueChange}
        name="search-input"
        placeholder="Tìm kiếm sản phẩm..."
      />
    </div>
  );
};

export default ProductDetailComparisonSearching;
