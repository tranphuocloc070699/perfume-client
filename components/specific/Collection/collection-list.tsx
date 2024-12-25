"use client";

import React, { useEffect, useMemo, useState } from "react";
import CollectionItem from "@/components/specific/Collection/collection-item";
import IconGalleryModal from "@/components/specific/Collection/icon-gallery-modal";
import ProductGalleryModal from "@/components/specific/Collection/product-gallery-modal";
import { ProductDto } from "@/types/product/product.model";
import { CollectionDto, UpsaveCollection } from "@/types/collection/collection.model";
import CollectionService from "@/services/modules/collection.service";
import { Button } from "@/components/ui/button";
import { dummyCollectionDto } from "@/types/collection/collection.data";
import { dummyProductDto } from "@/types/product/product.data";
import { useToast } from "@/hooks/use-toast";
import collectionService from "@/services/modules/collection.service";


const CollectionList = () => {
  const [collections, setCollections] = useState<CollectionDto[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchCollections();
  }, []);

  const collectionService = useMemo(() => {
    return new CollectionService();
  }, []);


  async function fetchCollections() {
    try {


      const response = await collectionService.getAll();
      if (response.body.data) {
        setCollections(response.body.data);
      }
      console.log({ response });
    } catch (e) {
      console.log({ fetchCollectionError: e });
    }
  }

  function handleCreateCollection() {
    setCollections(prevState => [...prevState, dummyCollectionDto]);
  }

  async function handleSaveCollection(index: number) {
    const collection = collections[index];

    if (collection.icon.length === 0) {
      toast({ description: "Icon is required", variant: "destructive" });
      return;
    }

    if (collection.title.trim().length < 3) {
      toast({ description: "Title must have more than 3 character", variant: "destructive" });
      return;
    }

    if (collection.collectionProducts.length < 4) {
      toast({ description: "Collection products must have at least 4 item", variant: "destructive" });
      return;
    }
    let validateCollectionProductItem = true;

    collection.collectionProducts.forEach((item, index) => {
      if (!item.product.id) {
        toast({ description: `Collection product cannot be empty [index:${index}]`, variant: "destructive" });
        validateCollectionProductItem = false;
        return;
      }
    });

    if (!validateCollectionProductItem) return;


    const upsaveCollection: UpsaveCollection = {
      title: collection.title,
      icon: collection.icon,
      collectionProducts: collection.collectionProducts.map(item => ({
        index: item.index,
        productId: Number(item.product.id)
      }))
    };

    try {

      let response;
      if (collection?.id) {
        response = await collectionService.update(collection.id, upsaveCollection);
      } else {
        response = await collectionService.create(upsaveCollection);
      }

      if (response?.body?.status === 200) {
        toast({ description: collection?.id ? "Chỉnh sửa Collection thành công" : "Tạo collection thành công" });
        fetchCollections();
      }
    } catch (e) {
      console.log({ createCollectionError: e });
    }


  }

  function handleRemoveCollection(index: number) {
    setCollections((prevState) => prevState.filter((_, i) => i !== index));
  }

  function openIconGalleryModal(index: number) {
    iconGalleryModal.openModal({ onClick: (key => onUpdateIcon(index, key)) });
  }

  function openProductGalleryModal(collectionIndex: number, collectionProductIndex: number) {
    productGalleryModal.openModal({
      onClick: (product: ProductDto) => onUpdateCollectionProduct(collectionIndex, collectionProductIndex, product)
    });
  }

  function onCreateCollectionProduct(collectionIndex: number) {
    setCollections((prevCollections) => {
      const updatedCollections = [...prevCollections];
      const collection = updatedCollections[collectionIndex];

      collection.collectionProducts = [...collection.collectionProducts, {
        index: collection.collectionProducts.length,
        product: dummyProductDto
      }];
      updatedCollections[collectionIndex] = collection;
      return updatedCollections;
    });
  }

  function onUpdateCollectionProduct(collectionIndex: number, collectionProductIndex: number, product: ProductDto) {
    setCollections((prevCollections) => {
      const updatedCollections = [...prevCollections];
      const collection = { ...updatedCollections[collectionIndex] };
      const updatedCollectionProducts = [...collection.collectionProducts];
      const productAlreadyExists = updatedCollectionProducts.findIndex(item => item.product.id === product.id) !== -1;
      if (productAlreadyExists) {
        toast({ description: "Product already exist", variant: "destructive" });
        return prevCollections;
      }
  
      updatedCollectionProducts[collectionProductIndex] = {
        ...updatedCollectionProducts[collectionProductIndex],
        product
      };
      collection.collectionProducts = updatedCollectionProducts;
      updatedCollections[collectionIndex] = collection;
      return updatedCollections;
    });
    productGalleryModal.closeModal();
  }

  function onRemoveProductCollection(collectionIndex: number, collectionProductIndex: number, event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    const collection = collections[collectionIndex];

    if (collection.collectionProducts.length <= 4) return;
    setCollections((prevCollections) => {
      const updatedCollections = [...prevCollections];
      const collection = { ...updatedCollections[collectionIndex] };
      collection.collectionProducts = collection.collectionProducts.filter(
        (_, index) => index !== collectionProductIndex
      );
      updatedCollections[collectionIndex] = collection;
      return updatedCollections;
    });

  }

  function onUpdateTitle(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    const updatedItems = [...collections];

    updatedItems[index] = {
      ...updatedItems[index],
      title: event.target.value
    };
    setCollections(updatedItems);
  }

  function onUpdateIcon(index: number, key: string) {
    const updatedItems = [...collections];

    updatedItems[index] = {
      ...updatedItems[index],
      icon: key
    };
    setCollections(updatedItems);
    iconGalleryModal.closeModal();
  }


  const iconGalleryModal = IconGalleryModal();
  const productGalleryModal = ProductGalleryModal();
  return (
    <>
      {iconGalleryModal.content}
      {productGalleryModal.content}

      <div component-name="CollectionPage" className={"border border-gray-300 rounded-lg p-4 shadow-md"}>
        <div className={"flex items-center gap-6 pb-4 w-full border-b border-gray-300"}>
          <h4 className="text-xl font-semibold text-nowrap  ">Quản lý Collection</h4>
          <Button icon={"plus"} size={"sm"} onClick={handleCreateCollection}>Thêm mới</Button>
        </div>
        <div component-name="CollectionList" className={"flex flex-col gap-20 mt-6"}>
          {collections.map((collection, index) => (
            <CollectionItem index={index} onRemoveCollection={handleRemoveCollection}
                            onSaveCollection={() => handleSaveCollection(index)} collection={collection} key={index}
                            onRemoveProductCollection={(productCollectionIndex, event) => onRemoveProductCollection(index, productCollectionIndex, event)}
                            onCreateCollectionProduct={() => onCreateCollectionProduct(index)}
                            openIconGalleryModal={() => openIconGalleryModal(index)}
                            onUpdateTitle={(event) => onUpdateTitle(index, event)}

                            openProductGalleryModal={(collectionProductIndex) => openProductGalleryModal(index, collectionProductIndex)} />))}
        </div>
      </div>


    </>
  );
};

export default CollectionList;