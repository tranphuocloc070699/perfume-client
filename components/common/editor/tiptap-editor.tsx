"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import TiptapToolbar from "@/components/common/editor/tiptap-toolbar";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import MediaUploaderModal from "@/components/specific/Admin/Product/media-uploader-modal";
import { twMerge } from "tailwind-merge";

interface ICommonTipTapProps {
  className?: string,
  content: string,
  onChange: (content: string) => void,
  label?: string,
  editMode: boolean
}

const TiptapEditor = ({ className, content, onChange, label, editMode }: ICommonTipTapProps) => {
  const [alreadyInsertContent, setAlreadyInsertContent] = useState(false);

  const editor = useEditor(
    {
      immediatelyRender: false,
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
          class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none border border-gray-300 border-t-0 rounded-b-lg p-4 w-full max-w-full",
          style: `
            font-family: 'Roboto', sans-serif;
            font-size: 16px;
          `
        }
      },
      content,
      onUpdate({ editor }) {
        onChange(editor.getHTML());
      }
    }
  );


  useEffect(() => {

    if (content && !alreadyInsertContent && editMode) {
      editor?.commands.insertContent(content);
      setAlreadyInsertContent(true);
    }
  }, [content, editMode]);


  const mediaUploaderModal = MediaUploaderModal();

  return (
    <div component-name={"TiptapEditor"} className={twMerge(`${className}`)}>
      {label && <h4 className={"mb-4 text-base font-medium"}>{label}</h4>}
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
      {mediaUploaderModal.content}
    </div>
  );
};

export default TiptapEditor;