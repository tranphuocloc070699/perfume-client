import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";

export const useModal = (modalComponent: React.ReactElement) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Render the modal component into a portal when isOpen is true
      const modalRoot = document.getElementById("modal-root");
      if (modalRoot) {
        ReactDOM.render(
          React.cloneElement(modalComponent, {
            onClose: closeModal,
            onOpen: openModal,
          }),
          modalRoot
        );
      }
    } else {
      // Clean up the modal from the portal when isOpen is false
      const modalRoot = document.getElementById("modal-root");
      if (modalRoot) {
        ReactDOM.unmountComponentAtNode(modalRoot);
      }
    }
  }, [isOpen, modalComponent, closeModal]);

  return {
    openModal,
    closeModal,
  };
};
