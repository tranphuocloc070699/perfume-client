import AppTitle from "@/components/common/AppTitle";
import ProductNoteList from "@/components/specific/ProductNote/ProductNoteList";
import React from "react";
import ProductNoteService from "@/services/modules/product-note.service";
const NotePage = async () => {
  const productNoteService = new ProductNoteService();
  const { data } = await productNoteService.getAllProductNote();

  return (
    <div>
      <section className="mt-6">
        <AppTitle
          loading={false}
          title="Thông dụng"
          icon="material-symbols-light:award-star-outline"
        >
          <ProductNoteList data={data} />
          <div></div>
        </AppTitle>
      </section>
    </div>
  );
};

export default NotePage;
