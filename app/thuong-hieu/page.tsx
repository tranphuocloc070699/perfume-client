import AppTitle from "@/components/common/app-title";
import BrandList from "@/components/specific/Brand/brand-list";
import BrandService from "@/services/modules/brand.service";
import React from "react";

const page = async () => {
  const brandService = new BrandService();
  const { body: { data } } = await brandService.getAllBrand();
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
