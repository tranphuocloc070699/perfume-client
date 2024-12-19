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

function dummyResolvePromise(dto: YearDto) {

}

const CreateYearModal = () => {
  const { toast } = useToast();
  const { accessToken } = useUserStore();
  const [resolvePromise, setResolvePromise] = useState<((value: YearDto) => void)>(dummyResolvePromise);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<number>();
  const [loading, setLoading] = useState(false);

  function openModal() {
    setIsOpen(true);
    return new Promise<YearDto>((resolve) => {
      setResolvePromise(() => resolve);
    });
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function addValue() {
    if (!value) {
      toast({ variant: "destructive", title: "Value is required" });
      return;
    }
    setLoading(true);
    const yearService = new YearService(accessToken);
    const response = await yearService.createYear({ value });
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
                Tạo năm mới
              </DialogTitle>
              <div className="flex items-center gap-4 mb-6">
                <Input
                  value={value}
                  type="number"
                  placeholder="Nhập năm sản xuất"
                  name={"year"}
                  onChange={(e) => setValue(Number(e.target.value))}
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

export default CreateYearModal;
