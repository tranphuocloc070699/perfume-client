import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import MediaService from "@/services/modules/media.service";
import BookService from "@/services/modules/book.service";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { BookDto, UpsaveBookDto, UpsaveBookValidation } from "@/types/book/book.model";
import UpsaveThumbnail from "@/components/specific/Admin/Product/upsave-thumbnail";
import UpsaveInput from "@/components/specific/Admin/Product/upsave-input";
import UpsaveSelect from "@/components/specific/Admin/Blog/upsave-select";
import { postTypeList } from "@/types/post/post.data";
import { Checkbox } from "@/components/ui/checkbox";
import TiptapEditor from "@/components/common/editor/tiptap-editor";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ISignUpLoginForm } from "@/types/user/user.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { dummyBookDto } from "@/types/book/book.data";
import TiptapEditorWithValidation from "@/components/common/editor/tiptap-editor-with-validation";
import UpsaveThumbnailWithValidation from "@/components/specific/Admin/Product/upsave-thumbnail-with-validation";
import { ImageDir } from "@/types/common";

const UpsaveBookContainer = () => {
  const { data } = useSession();

  const [dto, setDto] = useState<BookDto>(dummyBookDto);
  const [thumbnailUpload, setThumbnailUpload] = useState<File | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookService = useMemo(() => {
    return new BookService((data?.user as any)?.accessToken);
  }, [data]);

  const mediaService = useMemo(() => {
    return new MediaService((data?.user as any)?.accessToken);
  }, [data]);

  const schema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().min(10, "Description is required"),
    link: yup.string().required("Link is required"),
    thumbnailPreview: yup
      .mixed<File>()
      .nullable()
      .test("isRequired", "Thumbnail is required", function(value) {
        return !(!dto?.thumbnail && !value);

      })
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<UpsaveBookValidation>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: dto.name,
      link: dto.link,
      description: dto.description,
      thumbnailPreview: null
    }
  });


  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      fetchBookOnUpdateMode(id);
      setEditMode(true);
    }
  }, [searchParams]);


  async function fetchBookOnUpdateMode(id: string) {
    try {
      const { body } = await bookService.getById(Number(id));
      if (body.status === 200) {
        setDto(body.data);
        reset({
          name: body.data.name,
          link: body.data.link,
          description: body.data.description,
          thumbnailPreview: null
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function uploadImage(file: File) {
    if (!file) return;
    const { body } = await mediaService.uploadImage(ImageDir.book, file);
    if (body.status == 200 && body.data) {
      return body.data;
    }
  }

  async function onSubmit(formData: UpsaveBookValidation) {

    const { thumbnailPreview, ...rest } = formData;
    const requestData: UpsaveBookDto = rest as UpsaveBookDto;

    if (thumbnailUpload) {
      const path = await uploadImage(formData.thumbnailPreview);
      requestData.thumbnail = path || "";

      let response;
      const id = searchParams.get("id");
      if (editMode) {

        response = await bookService.update(Number(id), requestData);
      } else {
        response = await bookService.create(requestData);
      }

      if (response.body.status === 200) {
        toast({
          description: id ? "Updated book successfully" : "Created book successfully"
        });
        router.push("/admin/book");
      } else {
        toast({
          description: id ? "Updated book failed" : "Created book failed",
          variant: "destructive"
        });
      }
    }
  }

  return (<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-8">
    <UpsaveThumbnailWithValidation className={"space-y-4 col-span-4"} thumbnail={dto.thumbnail}
                                   preview={thumbnailUpload}
                                   setPreview={setThumbnailUpload} control={control} name={"thumbnailPreview"}
                                   required={true} />
    <Input name={"name"} placeholder={"Nhập tên sách"} groupClassName={"col-span-4"}
           label={{ title: "Tên sách", required: true }}
           validation={{
             control
           }} />

    <Input name={"link"} placeholder={"Nhập link"} groupClassName={"col-span-4"}
           label={{ title: "Link sách", required: true }}
           validation={{
             control
           }} />

    <TiptapEditorWithValidation label={"Mô tả"} className={"col-span-12 mt-4"}
                                content={dto.description}
                                name={"description"}
                                editMode={editMode}
                                control={control}
    />
    <div className={"flex item-center justify-end mt-4 col-span-12"}>
      <Button type={"submit"}>{editMode ? "Cập nhật sách" : "Tạo sách"}</Button>
    </div>

  </form>);
};

export default UpsaveBookContainer;