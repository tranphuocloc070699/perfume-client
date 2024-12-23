"use client";

import React, { useState } from "react";
import CollectionItem from "@/components/specific/Collection/collection-item";
import IconGalleryModal from "@/components/specific/Collection/icon-gallery-modal";
import ProductGalleryModal from "@/components/specific/Collection/product-gallery-modal";

const CollectionList = () => {


  const [dummyItems, setDummyItems] = useState([{
    icon: "",
    title: ""
  }]);


  function openIconGalleryModal(index: number) {
    iconGalleryModal.openModal({ onClick: (key => onUpdateIcon(index, key)) });
  }

  function openProductGalleryModal(index: number) {
    console.log({ index });
    productGalleryModal.openModal({});
  }

  function onUpdateIcon(index: number, key: string) {
    const updatedItems = [...dummyItems];

    updatedItems[index] = {
      ...updatedItems[index],
      icon: key
    };
    setDummyItems(updatedItems);
    iconGalleryModal.closeModal();
  }


  const iconGalleryModal = IconGalleryModal();
  const productGalleryModal = ProductGalleryModal();
  return (
    <>
      {iconGalleryModal.content}
      {productGalleryModal.content}

      <div component-name="CollectionList" className={"flex flex-col gap-20"}>

        {dummyItems.map((item, index) => (
          <CollectionItem title={item.title} icon={item.icon} key={index}
                          openIconGalleryModal={() => openIconGalleryModal(index)}
                          openProductGalleryModal={openProductGalleryModal} />))}
      </div>
    </>
  );
};

export default CollectionList;