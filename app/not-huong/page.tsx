import AppTitle from "@/components/common/AppTitle";
import ProductNoteList from "@/components/specific/ProductNote/ProductNoteList";
import React from "react";

const NotePage = () => {
  return (
    <div>
      <section className="mt-6">
        <AppTitle
          loading={false}
          title="Thông dụng"
          icon="material-symbols-light:award-star-outline"
        >
          <ProductNoteList data={[]} />
          <div></div>
        </AppTitle>
      </section>
    </div>
  );
};

export default NotePage;
