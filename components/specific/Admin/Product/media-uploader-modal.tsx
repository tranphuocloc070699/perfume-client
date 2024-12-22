import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaService from "@/services/modules/media.service";
import { MediaDto } from "@/types/media/media.model";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useUserStore } from "@/store/user.store";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import { ImageDir } from "@/types/common";

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
    const { body } = await mediaService.getAllMedia();
    if (body.data.length > 0) {
      setGalleries(body.data);
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
      const uploadPromises = Array.from(files).map(file => mediaService.uploadImage(ImageDir.gallery, file));
      const responses = await Promise.all(uploadPromises);
      console.log("All files uploaded:", responses);
      if (responses.length > 0 && responses[0].body.status === 200) {
        await fetchGalleries();
        toast({ description: responses[0].body.message });
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
            <Tabs defaultValue="gallery" className="w-full">
              <TabsList>
                <TabsTrigger value="local">Upload file</TabsTrigger>
                <TabsTrigger value="gallery">Thư viện</TabsTrigger>
              </TabsList>
              <TabsContent value="local">

                <div className="flex items-center justify-center w-full mt-12">
                  <label htmlFor="dropzone-file"
                         className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CloudUpload size={32} className={"text-gray-500"} />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
                        drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Chỉ cho phép <b>hình ảnh</b></p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" multiple onChange={uploadFilesFromLocal} />
                  </label>
                </div>
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