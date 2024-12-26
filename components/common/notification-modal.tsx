import React, { useState } from "react";
import useCustomState from "@/hooks/use-custom-state";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";


interface Props {
  title?: string;
  description?: string;
  type: "Success";
  onSubmit?: () => void;
  onCancel?: () => void;
}

const dummyProps: Props = { title: "", description: "", type: "Success" };


const NotificationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, updateValue] = useCustomState<Props>(dummyProps);

  function openModal(data: Props) {
    setIsOpen(true);
    updateValue(data);


  }

  function closeModal() {
    setIsOpen(false);
    updateValue(dummyProps);
  }

  return {
    content: (
      <div component-name="NotificationModal">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent onInteractOutside={(e) => {
            e.preventDefault();
          }}>
            <DialogHeader>
              <DialogTitle className="mb-4 font-bold text-base">
                Thông báo
              </DialogTitle>
              <div className={"flex flex-col items-center justify-center "}>
                <Icon name={"check"}
                      className={"text-2xl text-white bg-green-700 rounded-full w-14 h-14 border-8  border-green-50 p-2"} />
                <h3 className={"text-xl font-semibold mt-4"}>{value?.title}</h3>
                <h4 className={"text-base font-normal text-gray-500 mt-2"}>{value?.description}</h4>
              </div>


            </DialogHeader>
            <div className={"mt-6 flex items-center gap-8"}>
              <Button onClick={value?.onCancel} className={"bg-gray-100 text-gray-900 flex-1"}>Quay lại</Button>
              <Button onClick={value?.onSubmit} className={"flex-1 bg-green-700"}>Xác nhận</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    ),
    openModal,
    closeModal
  };
};

export default NotificationModal;