"use client";

import React, { useEffect, useMemo, useState } from "react";

import { useToast } from "@/hooks/use-toast";
import UpsaveInput from "@/components/specific/Admin/Product/upsave-input";
import UpsaveThumbnail from "@/components/specific/Admin/Product/upsave-thumbnail";
import TiptapEditor from "@/components/common/editor/tiptap-editor";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user.store";
import MediaService from "@/services/modules/media.service";
import PostService from "@/services/modules/post.service";
import { useRouter, useSearchParams } from "next/navigation";
import { convertToSlug } from "@/lib/utils";
import { PostDto } from "@/types/post/post.model";
import { dummyPostDto, postTypeList } from "@/types/post/post.data";
import UpsaveSelect from "@/components/specific/Admin/Blog/upsave-select";
import { Checkbox } from "@/components/ui/checkbox";


const UpsaveBlogContainer = () => {


  const [dto, setDto] = useState<PostDto>(
    dummyPostDto
  );
  const [thumbnailUpload, setThumbnailUpload] = useState<File | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      fetchPostOnUpdateMode(id);
      setEditMode(true);
    }
  }, [searchParams]);

  async function fetchPostOnUpdateMode(id: string) {
    try {
      const { body } = await postService.getPostById(Number(id));
      if (body.status === 200) {
        setDto(body.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const { accessToken } = useUserStore();

  const mediaService = useMemo(() => {
    return new MediaService(accessToken);
  }, [accessToken]);

  const postService = useMemo(() => {
    return new PostService(accessToken);
  }, [accessToken]);

  function updateDto(key: keyof PostDto, value: any) {
    setDto({ ...dto, [key]: value });
  }


  function validation() {

  }

  async function uploadImage(file: File) {
    if (!file) return;
    const { body } = await mediaService.uploadImage(file);
    if (body.status == 200 && body.data) {
      return body.data;
    }
  }

  async function onSubmit() {
    const req = { ...dto };

    if (thumbnailUpload) {
      const path = await uploadImage(thumbnailUpload);
      req.thumbnail = path || "";
    }

    if (req.slug.trim().length === 0) {
      req.slug = convertToSlug(req.title);
    }
    try {
      let response;
      if (editMode) {
        response = await postService.updatePost(req);
      } else {
        response = await postService.createPost(req);
      }
      if (response.status === 200 && response.data) {
        toast({ description: response.message });
        router.push("/admin/blog");
      }
    } catch (e) {
      console.log("create post error", e);
    }


  }

  return (<div className="grid grid-cols-12 gap-8">
    <UpsaveThumbnail className={"space-y-4 col-span-4"} thumbnail={dto.thumbnail} preview={thumbnailUpload}
                     setPreview={setThumbnailUpload} />
    <UpsaveInput type={"text"} label={"Title"} placeholder={"Nhập title"}
                 className={"col-span-4 flex flex-col gap-2"} value={dto.title}
                 onChange={(value) => updateDto("title", value)} />
    <UpsaveInput type={"text"} label={"Slug"} placeholder={"Bỏ trống để tự generate slug"} name={"slug"}
                 className={"col-span-4 flex flex-col gap-2"} value={dto.slug}
                 onChange={(value) => updateDto("slug", value)} />

    <UpsaveInput type={"text"} label={"Excerpt"} placeholder={"Nhập excerpt..."}
                 className={"col-span-4 flex flex-col gap-2"} value={dto.excerpt}
                 onChange={(value) => updateDto("excerpt", value)} />
    <UpsaveSelect className={"col-span-4 flex flex-col gap-2"} label={"Loại"} options={postTypeList}
                  value={dto.type ? `${dto.type}` : ""}
                  onChange={(value) => updateDto("type", value)} />
    <div className={"col-span-4"}>
      <Checkbox checked={dto.isPinned} onCheckedChange={checked => {
        updateDto("isPinned", checked);
      }} />
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Đưa lên trang chủ
      </label>
    </div>
    <TiptapEditor label={"Content"} className={"col-span-12 mt-4"} content={dto.content}
                  editMode={editMode}
                  onChange={(content) => updateDto("content", content)} />
    <div className={"flex item-center justify-end mt-4 col-span-12"}>
      <Button onClick={onSubmit}>{editMode ? "Cập nhật post" : "Tạo post"}</Button>
    </div>

  </div>);
};

export default UpsaveBlogContainer;
