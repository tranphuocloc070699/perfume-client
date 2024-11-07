"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import React from "react";

interface ICommonTipTapProps {
  className?: string;
}

const CommonTipTap = ({ className }: ICommonTipTapProps) => {
  // Define the editor instance
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false
      })
    ],
    content: "<p>Hello World! 🌎️</p>"
  });

  // Function to upload image using the provided API call
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`/api/media`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Handler for the image upload input
  const handleAddImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = await uploadImage(file);
        if (imageUrl && editor) {
          editor.chain().focus().setImage({ src: imageUrl }).run();
        }
      }
    };

    input.click();
  };

  return (
    <div component-name={"CommonTipTap"} className={className}>
      {editor && (
        <div className="toolbar space-x-2 mb-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`btn ${editor.isActive("bold") ? "active" : ""}`}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`btn ${editor.isActive("italic") ? "active" : ""}`}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`btn ${editor.isActive("strike") ? "active" : ""}`}
          >
            Strike
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className="btn"
          >
            Paragraph
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`btn ${editor.isActive("heading", { level: 1 }) ? "active" : ""}`}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`btn ${editor.isActive("heading", { level: 2 }) ? "active" : ""}`}
          >
            H2
          </button>
          <button onClick={handleAddImage} className="btn">
            Add Image
          </button>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default CommonTipTap;