"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/user.store";

import { ProductNoteDto } from "@/types/product-note/product-note.model";
import ProductNoteService from "@/services/modules/product-note.service";
import { dummyProductNoteDto } from "@/types/product-note/product-note.data";

import { Label } from "@/components/ui/label";

function dummyResolvePromise(dto: ProductNoteDto) {

}

const UpsaveNoteModal = () => {
  const { toast } = useToast();
  const { accessToken } = useUserStore();
  const [resolvePromise, setResolvePromise] = useState<((value: ProductNoteDto) => void)>(dummyResolvePromise);
  const [isOpen, setIsOpen] = useState(false);
  const [dto, setDto] = useState<ProductNoteDto>(dummyProductNoteDto);
  const [loading, setLoading] = useState(false);

  function updateDto(key: keyof ProductNoteDto, value: any) {
    setDto({ ...dto, [key]: value });
  }


  function openModal() {
    setIsOpen(true);
    return new Promise<ProductNoteDto>((resolve) => {
      setResolvePromise(() => resolve);
    });
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function onSubmit() {
    // if (!dto.) {
    //   toast({ variant: "destructive", title: "Value is required" });
    //   return;
    // }
    setLoading(true);
    const noteService = new ProductNoteService(accessToken);
    const response = await noteService.createNote(dto);
    console.log({ response });
    if (response.status == 200) {

      // toast({ description: response.message });
      // resolvePromise(response.data);
      // closeModal();
    }
    setLoading(false);
  }

  return {
    content: (
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="min-w-[50%] h-[90%]">
            <DialogHeader>
              <DialogTitle className="mb-4 font-bold text-base">
                Tạo nốt hương mới
              </DialogTitle>
              <div className="grid grid-cols-12 gap-8">
                 <span className="col-span-4">
                  <Label>Tên nốt hương</Label>
                  <Input
                    value={dto.name}
                    onChange={e => {
                      updateDto("name", e.target.value);
                    }}
                    placeholder="Nhập tên nốt hương..."
                  />
                </span>
                <span className="col-span-4">
                  <Label>Tên tiếng anh</Label>
                  <Input
                    value={dto.enName}
                    onChange={e => {
                      updateDto("enName", e.target.value);
                    }}
                    placeholder="Nhập tên tiếng anh..."
                  />
                </span>
                <span className="col-span-4">
                  <Label>Tên tiếng anh</Label>
                  <Input
                    value={dto.slug}
                    onChange={e => {
                      updateDto("slug", e.target.value);
                    }}
                    placeholder="Bỏ trống để tự generate slug"
                  />
                </span>

                <div className={"flex justify-end col-span-12"}>
                  <Button
                    disabled={loading}
                    className="disabled:opacity-50"
                    type="button"
                    variant="secondary"
                    onClick={onSubmit}
                  >
                    Tạo
                  </Button>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    ),
    close: closeModal,
    open: openModal
  };
};

export default UpsaveNoteModal;
