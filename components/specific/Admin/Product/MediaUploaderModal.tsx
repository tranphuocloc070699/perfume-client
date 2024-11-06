import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaService from "@/services/modules/media.service";
import { MediaDto } from "@/types/media/media.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/user.store";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { BrandDto } from "@/types/brand/brand.model";

function dummyResolvePromise(data: string[]) {

}

const MediaUploaderModal = () => {
  const { accessToken } = useUserStore();
  const { toast } = useToast();

  const [resolvePromise, setResolvePromise] = useState<(data: string[]) => void>(dummyResolvePromise);
  const [isOpen, setIsOpen] = useState(false);
  const [galleries, setGalleries] = useState<MediaDto[]>([]);
  const [imagesSelected, setImagesSelected] = useState<MediaDto[]>([]);

  const mediaService = useMemo(() => {
    return new MediaService(accessToken);
  }, [accessToken]);

  async function fetchGalleries() {
    const mediaService = new MediaService();
    const response = await mediaService.getAllMedia();
    if (response.data.length > 0) {
      setGalleries(response.data);
    }
  }

  function openModal() {
    setIsOpen(true);

    return new Promise<string[]>((resolve) => {
      setResolvePromise(() => resolve);
    });
  }

  function closeModal() {
    setIsOpen(false);
  }

  function toggleImagesSelected(item: MediaDto) {
    const imagesSelectedHolder = [...imagesSelected];
    const index = imagesSelectedHolder.findIndex(selected => selected.id === item.id);
    if (index !== -1) {
      imagesSelectedHolder.splice(index, 1);
    } else {
      imagesSelectedHolder.push(item);
    }
    setImagesSelected(imagesSelectedHolder);
  }


  const checkIsSelected = useCallback((item: MediaDto) => {
    const index = imagesSelected.findIndex(selected => selected.id === item.id);
    if (index !== -1) {
      return true;
    }
    return false;
  }, [imagesSelected]);

  useEffect(() => {
    fetchGalleries();
  }, []);

  async function uploadFilesFromLocal(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    try {
      const uploadPromises = Array.from(files).map(file => mediaService.uploadImage(file));
      const responses = await Promise.all(uploadPromises);
      console.log("All files uploaded:", responses);
      if (responses.length > 0 && responses[0].status === 200) {
        await fetchGalleries();
        toast({ description: responses[0].message });
      } else {
        toast({ description: "Có lỗi xảy ra trong quá trình upload" });
      }


    } catch (error) {
      console.error("Error uploading files:", error);
    }
  }

  function addImageToProduct() {
    const imagesPath = imagesSelected.map(item => item.path);

    resolvePromise(imagesPath);
  }

  return {
    content: <div component-name="MediaUploaderModal">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="min-w-[50%] h-[90%]">
          <DialogHeader>
            <DialogTitle className="mb-4 font-bold text-base">
              Upload hình ảnh
            </DialogTitle>
            <Tabs defaultValue="account" className="w-full">
              <TabsList>
                <TabsTrigger value="local">Upload file</TabsTrigger>
                <TabsTrigger value="gallery">Thư viện</TabsTrigger>
              </TabsList>
              <TabsContent value="local">
                <Input type={"file"} multiple onChange={e => {
                  uploadFilesFromLocal(e);
                }} />
              </TabsContent>
              <TabsContent value="gallery">
                <p className={"mt-4 text-sm font-medium text-gray-900"}>Đã chọn {imagesSelected.length} hình</p>
                <div
                  className={"grid grid-cols-12 gap-6 mt-1 p-4 border border-gray-300 rounded-lg w-full max-h-[400px] overflow-y-auto"}>
                  {galleries.map(item => <div onClick={() => toggleImagesSelected(item)} key={item.id}
                                              className={"transition-all col-span-3 relative cursor-pointer select-none"}>
                    <img className={"rounded-lg w-full object-cover h-20"}
                         src={`http://localhost:8090/upload${item.path}`}
                         alt={item.path} />
                    <div
                      className={`flex items-center justify-center rounded-lg transition-all absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-black/30 ${checkIsSelected(item) ? "opacity-1" : "opacity-0"}`}>
                      <Icon icon={"lucide:check"} className={"h-7 w-7 text-white bg-green-700 rounded-full p-2"} />
                    </div>
                  </div>)}
                </div>
                <div className={"text-end mt-4"}>
                  <Button onClick={addImageToProduct}>Thêm hình ảnh</Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>,
    openModal,
    closeModal
  };
};

export default MediaUploaderModal;