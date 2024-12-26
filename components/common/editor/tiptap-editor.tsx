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
import { useController } from "react-hook-form";
import Typography from "@/components/ui/typography";

export type ICommonTipTapProps = {
  className?: string,
  content: string,
  onChange?: (content: string) => void,
  label?: string,
  editMode: boolean,
  error?: string;
  required?: boolean;
}

const TiptapEditor = ({ className, content, onChange, label, editMode, error, required }: ICommonTipTapProps) => {
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
        Placeholder.configure({
          placeholder: "Write something...",
          emptyEditorClass: "is-editor-empty"
        }),
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
          class: `min-h-[280px] prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none border border-gray-300 border-t-0 rounded-b p-4 w-full max-w-full ${error?.length > 0 && "border border-red-500 rounded-b-xl"}`,
          style: `
            font-family: '', sans-serif;
            font-size: 16px;
          `
        }
      },
      content,
      onUpdate({ editor }) {
        onChange && onChange(editor.getHTML());
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
      {label && <Typography.H4 className={"mb-4 text-base font-medium"}>{label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Typography.H4>}
      <TiptapToolbar editor={editor} isErrored={error?.length > 0} />
      <EditorContent
        editor={editor} />
      <Typography.H4
        className={twMerge(
          `text-sm h-6 transform  text-red-500 transition-all duration-300 ease-in-out mt-2`,
          error?.length > 0
            ? "translate-y-0 opacity-100"
            : "-translate-y-5 opacity-0"
        )}
      >
        {error}
      </Typography.H4>
      {mediaUploaderModal.content}
    </div>
  );
};

export default TiptapEditor;