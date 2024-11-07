"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import React from "react";
import CommonTipTapToolbar from "@/components/common/CommonTipTapToolbar";

interface ICommonTipTapProps {
  className?: string;
}

const CommonTipTap = ({ className }: ICommonTipTapProps) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false
      })
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none border border-gray-300 shadow-lg rounded-lg p-4"
      }
    },
    content: "<p>Hello World! 🌎️</p>"
  });

  return (
    <div component-name={"CommonTipTap"} className={className}>
      <CommonTipTapToolbar />
      <EditorContent editor={editor} />
    </div>
  );
};

export default CommonTipTap;