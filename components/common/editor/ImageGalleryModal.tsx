import React, { useEffect } from "react";
import { CloudUpload, X } from "lucide-react";
import { FileUploader } from "react-drag-drop-files";
import ImageGalleryItem from "@/components/common/editor/ImageGalleryItem";
import { MediaDto } from "@/types/media/media.model";
import MediaService from "@/services/modules/media.service";


const ImageGalleryModal = () => {

  const [isOpen, setIsOpen] = React.useState(false);
  const [fetchImagesLoading, setFetchImagesLoading] = React.useState(false);
  const [galleries, setGalleries] = React.useState<MediaDto[]>([]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onFileUploaderChange(file: File | null) {
    if (file) {
      console.log("file", file);
    }
  }

  async function fetchGalleries() {
    const mediaService = new MediaService();
    const response = await mediaService.getAllMedia();
    if (response.data.length > 0) {
      setGalleries(response.data);
    }
  }


  function handleImageGalleryItemDelete() {

  }

  function handleImageGalleryItemSelect() {
  }

  useEffect(() => {
    fetchGalleries();
  }, []);

  return {
    content: isOpen ? (
      <div tabIndex={-1} onKeyDown={({ key }) => {
        if (key === "Escape") closeModal();
      }} component-name="ImageGalleryModal"
           className={"fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center"}>
        <div className={"relative md:w-[760px] w-[80%] h-[80%] bg-white rounded-md p-4 pb-10 overflow-y-auto"}>
          <div className={"absolute right-2 top-2 z-50"}>
            <button onClick={closeModal} className={"p-2 rounded-lg transition-all hover:bg-gray-300"}>
              <X size={20} />
            </button>
          </div>
          <FileUploader handleChange={onFileUploaderChange} name={"file"} types={["png", "jpg", "jpeg", "webp"]}>

            <div className="flex items-center justify-center w-full mt-12">
              <label htmlFor="dropzone-file"
                     className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <CloudUpload size={40} className={"text-gray-500"} />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
                    drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Image File</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </FileUploader>
          <p className={"text-xl text-gray-500 text-center mt-4"}>

          </p>

          <div className={"grid gap-4 grid-cols-12 mt-8"}>
            <ImageGalleryItem className={"md:col-span-3 col-span-6"}
                              src={"https://bizweb.dktcdn.net/thumb/medium/100/358/756/products/neroli-portofino-50ml.jpg?v=1601210049230"}
                              onDeleteClick={handleImageGalleryItemDelete}
                              onSelectClick={handleImageGalleryItemSelect} />
            <ImageGalleryItem className={"md:col-span-3 col-span-6"}
                              src={"https://bizweb.dktcdn.net/thumb/medium/100/358/756/products/neroli-portofino-50ml.jpg?v=1601210049230"}
                              onDeleteClick={handleImageGalleryItemDelete}
                              onSelectClick={handleImageGalleryItemSelect} />
          </div>
        </div>


      </div>
    ) : null,
    openModal,
    closeModal
  };
};

export default ImageGalleryModal;