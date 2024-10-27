import AppTitle from "@/components/common/AppTitle";
import BrandList from "@/components/specific/Brand/BrandList";
import BrandService from "@/services/modules/brand.service";
import React from "react";

const page = async () => {
  const brandService = new BrandService();
  const { data } = await brandService.getAllBrand();
  return (
    <div>
      <AppTitle
        loading={false}
        title="Tất cả thương hiệu"
        icon="material-symbols-light:award-star-outline"
      >
        <BrandList data={data} />
        <div></div>
      </AppTitle>
    </div>
  );
};

export default page;
