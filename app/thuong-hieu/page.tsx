import AppTitle from "@/components/common/AppTitle";
import BrandList from "@/components/specific/Brand/BrandList";
import React from "react";

const page = () => {
  return (
    <div>
      <AppTitle
        loading={false}
        title="Tất cả thương hiệu"
        icon="material-symbols-light:award-star-outline"
      >
        <BrandList data={[]} />
        <div></div>
      </AppTitle>
    </div>
  );
};

export default page;
