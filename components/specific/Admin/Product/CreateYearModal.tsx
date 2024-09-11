"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CommonInput from "@/components/common/CommonInput";
import { validYears } from "@/types/admin/admin.data";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
const CreateYearModal = () => {
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [pendingValue, setPendingValue] = useState("");
  const [yearsData, setYearsData] = useState<Array<number>>([]);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function addValue() {
    if (!pendingValue) {
    }

    const yearToAdd = Number(pendingValue);
    /* Validate */
    if (!validYears.includes(yearToAdd)) {
    }
    if (yearsData.includes(yearToAdd)) return;

    setYearsData([...yearsData, yearToAdd]);
    /* Reset pending value */
    setPendingValue("");
  }

  function removeValue(year: number) {
    setYearsData(yearsData.filter((item) => item !== year));
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
                  id="pending-value"
                  value={pendingValue}
                  type="number"
                  placeholder="Nhập năm sản xuất"
                  onChange={(e) => setPendingValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      addValue();
                    }
                  }}
                />
                <Button type="button" variant="secondary" onClick={addValue}>
                  Thêm
                </Button>
              </div>
              <h4 className="mt-10">Danh sách hiện tại</h4>
              <div className="border rounded-md min-h-[2.5rem] overflow-y-auto p-2 flex gap-2 flex-wrap items-center">
                {yearsData.map((item, idx) => (
                  <Badge key={idx} variant="secondary">
                    {item}
                    <button
                      type="button"
                      className="w-3 ml-2"
                      onClick={() => removeValue(item)}
                    >
                      <Icon
                        icon={"material-symbols-light:close"}
                        className="w-3 h-3"
                      />
                    </button>
                  </Badge>
                ))}
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    ),
    close: closeModal,
    open: openModal,
  };
};

export default CreateYearModal;
