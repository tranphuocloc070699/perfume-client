"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/user.store";

import { ProductNoteDto } from "@/types/product-note/product-note.model";
import ProductNoteService from "@/services/modules/product-note.service";
import { dummyProductNoteDto } from "@/types/product-note/product-note.data";

import { Label } from "@/components/ui/label";
import UpsaveThumbnail from "@/components/specific/Admin/Product/upsave-thumbnail";
import MediaService from "@/services/modules/media.service";
import { UpsaveProductDto } from "@/types/admin/admin.interface";

function dummyResolvePromise(dto: IResolvePromise) {

}

interface IResolvePromise {
  key: keyof UpsaveProductDto;
  data: ProductNoteDto;
}

const UpsaveNoteModal = () => {
  const { toast } = useToast();
  const { accessToken } = useUserStore();
  const [resolvePromise, setResolvePromise] = useState<((dto: IResolvePromise) => void)>(dummyResolvePromise);
  const [isOpen, setIsOpen] = useState(false);
  const [dto, setDto] = useState<ProductNoteDto>(dummyProductNoteDto);
  const [loading, setLoading] = useState(false);
  const [thumbnailUpload, setThumbnailUpload] = useState<File | null>(null);
  const [key, setKey] = useState<keyof UpsaveProductDto>("name");

  function updateDto(key: keyof ProductNoteDto, value: any) {
    setDto({ ...dto, [key]: value });
  }


  const mediaService = useMemo(() => {
    return new MediaService(accessToken);
  }, [accessToken]);

  async function uploadImage(file: File) {
    if (!file) return;
    const response = await mediaService.uploadImage(file);
    if (response.status == 200 && response.data) {
      return response.data;
    }
  }


  function openModal(id: keyof UpsaveProductDto) {
    setIsOpen(true);
    setKey(id);
    return new Promise<IResolvePromise>((resolve) => {
      setResolvePromise(() => resolve);
    });
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function onSubmit() {
    setLoading(true);
    const req = { ...dto };
    if (thumbnailUpload) {
      const path = await uploadImage(thumbnailUpload);
      req.thumbnail = path || "";
    }
    const noteService = new ProductNoteService(accessToken);
    const response = await noteService.createNote(req);

    if (response.status == 200) {
      toast({ description: response.message });
      resolvePromise({
        data: response.data,
        key
      });
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
                  <Label>Slug</Label>
                  <Input
                    value={dto.slug}
                    onChange={e => {
                      updateDto("slug", e.target.value);
                    }}
                    placeholder="Bỏ trống để tự generate slug"
                  />
                </span>

                <UpsaveThumbnail className={"space-y-4 col-span-4"} thumbnail={dto.thumbnail} preview={thumbnailUpload}
                                 setPreview={setThumbnailUpload} />

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
