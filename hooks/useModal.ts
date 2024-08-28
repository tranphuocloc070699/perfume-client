import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import ProductDetailComparison from "@/components/specific/Product/Detail/ProductDetailComparison";
import { useModalStore } from "@/store/modal.store";
export const useModal = (modalComponent: React.ReactElement) => {
  const { modal, setModal } = useModalStore();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => {
    // setIsOpen(true);
    // const modalContainer = document.getElementById("modal-container");
    // if (!modalContainer) return;
    // const body = ReactDOM.createRoot(modalContainer);
    // const component = React.cloneElement(modalComponent, {
    //   open: isOpen,
    //   onClose: closeModal,
    // });

    // body.render(component);
    setIsOpen(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const component = React.cloneElement(modalComponent, {
      open: isOpen,
      onClose: closeModal,
    });

    setModal(component);

    return () => {
      //  setModal(null);
    };
  }, []);

  return {
    openModal,
    closeModal,
  };
};
