import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaService from "@/services/modules/media.service";
import { MediaDto } from "@/types/media/media.model";

const MediaUploaderModal = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [galleries, setGalleries] = useState<MediaDto[]>([]);

  async function fetchGalleries() {
    const mediaService = new MediaService();
    const response = await mediaService.getAllMedia();
    if (response.data.length > 0) {
      setGalleries(response.data);
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetchGalleries();
  }, []);

  return {
    content: <div component-name="MediaUploaderModal">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="min-w-[50%] h-[90%]">
          <DialogHeader>
            <DialogTitle className="mb-4 font-bold text-base">
              Upload hình ảnh
            </DialogTitle>
            <Tabs defaultValue="account" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="local">Upload file</TabsTrigger>
                <TabsTrigger value="gallery">Thư viện</TabsTrigger>
              </TabsList>
              <TabsContent value="local">Make changes to your account here.</TabsContent>
              <TabsContent value="gallery">
                {galleries.map(item => <img src={item.path} alt={"Gallery Item"} />)}
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