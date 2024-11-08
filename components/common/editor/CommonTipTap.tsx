"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import TipTapToolbar from "@/components/common/editor/TipTapToolbar";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import MediaUploaderModal from "@/components/specific/Admin/Product/MediaUploaderModal";
import { twMerge } from "tailwind-merge";

interface ICommonTipTapProps {
  className?: string;
}

const CommonTipTap = ({ className }: ICommonTipTapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: "rounded-lg shadow-sm w-full h-auto object-cover"
        }
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      Placeholder.configure({ placeholder: "Write something..." }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: "_blank",
          class: "text-gray-900 font-medium cursor-pointer "
        }
      })
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none border border-gray-300 border-t-0 rounded-b-lg p-4 w-full max-w-full"
      }
    },
    immediatelyRender: false,
    content: ""
  });

  const mediaUploaderModal = MediaUploaderModal();
  return (
    <div component-name={"CommonTipTap"} className={twMerge(`${className}`)}>
      <TipTapToolbar editor={editor}
      />
      <EditorContent editor={editor} />
      {mediaUploaderModal.content}
    </div>

  );
};

export default CommonTipTap;