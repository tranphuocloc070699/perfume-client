import ProductPageList from "@/components/specific/Product/ProductPageList";
import ProductPageSearching from "@/components/specific/Product/ProductPageSearching";
import ProductService from "@/services/modules/product.service";
import React from "react";

const page = async () => {
  const productService = new ProductService();
  const { data } = await productService.getAllProduct();

  return (
    <div className="p-4">
      <h2 className="font-medium text-xl">Tìm kiếm toàn bộ nước hoa</h2>
      <div className="mt-2">
        <ProductPageSearching />
      </div>
      <div className="mt-10">
        <ProductPageList data={data.content} />
      </div>
    </div>
  );
};

export default page;
