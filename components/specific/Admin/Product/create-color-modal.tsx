"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { validYears } from "@/types/admin/admin.data";
import { Icon } from "@iconify/react/dist/iconify.js";
import YearService from "@/services/modules/year.service";
import { useUserStore } from "@/store/user.store";
import { YearDto } from "@/types/year/year.model";
import { ResponseDto } from "@/types/response";
import ColorService from "@/services/modules/color.service";
import { ColorDto } from "@/types/color/color.model";
import { dummyColor } from "@/types/color/color.data";
import useCustomState from "@/hooks/use-custom-state";

function dummyResolvePromise(dto: ColorDto) {

}

const CreateColorModal = () => {
  const { toast } = useToast();
  const { accessToken } = useUserStore();
  const [resolvePromise, setResolvePromise] = useState<((value: ColorDto) => void)>(dummyResolvePromise);
  const [isOpen, setIsOpen] = useState(false);
  const [fields, updateFields] = useCustomState<ColorDto>(dummyColor);
  const [loading, setLoading] = useState(false);

  function openModal() {
    setIsOpen(true);
    return new Promise<ColorDto>((resolve) => {
      setResolvePromise(() => resolve);
    });
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function addValue() {
    if (!fields.name || !fields.hexCode || !/^#[0-9A-F]{6}$/i.test(fields.hexCode)) {
      toast({ variant: "destructive", title: "Validation fail" });
      return;
    }
    setLoading(true);
    const colorService = new ColorService(accessToken);
    const response = await colorService.createColor(fields);
    if (response.body.status == 200) {
      toast({ description: response.body.message });
      resolvePromise(response.body.data);
      closeModal();
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
                Tạo màu
              </DialogTitle>

              {/* Color Preview */}
              <div
                className="w-full h-20 rounded border "
                style={{
                  backgroundColor: /^#[0-9A-F]{6}$/i.test(fields.hexCode)
                    ? fields.hexCode
                    : "#ffffff",
                  borderColor: /^#[0-9A-F]{6}$/i.test(fields.hexCode)
                    ? fields.hexCode
                    : "#e5e7eb"
                }}
              >

                {!/^#[0-9A-F]{6}$/i.test(fields.hexCode) && (
                  <div className="text-xs text-gray-500 flex items-center justify-center h-full">
                    Nhập mã màu hợp lệ
                  </div>
                )}
              </div>

              {/* Input Fields */}
              <div className="flex items-center gap-4 ">
                <Input
                  value={fields.name}
                  type=""
                  placeholder="Nhập tên màu"
                  name={"color"}
                  onChange={(e) => updateFields({ name: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      addValue();
                    }
                  }}
                />
                <Input
                  value={fields.hexCode}
                  type=""
                  placeholder="Nhập mã màu (VD: #FF5733)"
                  name={"color"}
                  onChange={(e) => updateFields({ hexCode: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      addValue();
                    }
                  }}
                />

                <Button
                  disabled={loading}
                  className="disabled:opacity-50"
                  type="button"
                  variant="secondary"
                  onClick={addValue}
                >
                  Tạo
                </Button>
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

export default CreateColorModal;
