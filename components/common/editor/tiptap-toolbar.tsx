import React, { useCallback } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
  ImageUp,
  Italic,
  Link,
  List,
  ListOrdered, Pilcrow,
  SquareCode,
  Strikethrough,
  Underline
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import TiptapButton from "@/components/common/editor/tiptap-button";
import { ChainedCommands, Editor } from "@tiptap/core";
import MediaUploaderModal from "@/components/specific/Admin/Product/media-uploader-modal";
import { BubbleMenu } from "@tiptap/react";
import LinkForm from "@/components/common/editor/link-form";
import { twMerge } from "tailwind-merge";


interface CommonTipTapToolbarProps {
  editor: Editor | null;
  isErrored?: boolean;
}

const defaultSize = 16;

interface ITool {
  task: string;
  icon: React.ReactNode;
  showPopover?: boolean;
}

export const tools: ITool[] = [{
  task: "bold",
  icon: <Bold size={defaultSize} />
}, {
  task: "italic",
  icon: <Italic size={defaultSize} />
}, {
  task: "underline",
  icon: <Underline size={defaultSize} />
}, {
  task: "strike",
  icon: <Strikethrough size={defaultSize} />
}, {
  task: "link",
  icon: <Link size={defaultSize} />,
  showPopover: true
},
  {
    task: "code",
    icon: <Code size={defaultSize} />
  },
  {
    task: "codeblock",
    icon: <SquareCode size={defaultSize} />
  }
  , {
    task: "left",
    icon: <AlignLeft size={defaultSize} />
  }, {
    task: "center",
    icon: <AlignCenter size={defaultSize} />
  }, {
    task: "right",
    icon: <AlignRight size={defaultSize} />
  }, {
    task: "justify",
    icon: <AlignJustify size={defaultSize} />
  }, {
    task: "orderedList",
    icon: <ListOrdered size={defaultSize} />
  },
  {
    task: "bulletList",
    icon: <List size={defaultSize} />
  }
  , {
    task: "image",
    icon: <ImageUp size={defaultSize} />
  }
] as const;

const defaultOptionSize = 18;
const defaultClass = "text-gray-600";
export const headingOptions = [{
  value: "Paragraph",
  icon: <Pilcrow size={defaultOptionSize} className={defaultClass} />
},
  {
    value: "Heading 1",
    icon: <Heading1 size={defaultOptionSize} className={defaultClass} />
  },
  {
    value: "Heading 2",
    icon: <Heading2 size={defaultOptionSize} className={defaultClass} />
  },
  {
    value: "Heading 3",
    icon: <Heading3 size={defaultOptionSize} className={defaultClass} />
  },
  {
    value: "Heading 4",
    icon: <Heading4 size={defaultOptionSize} className={defaultClass} />
  },
  {
    value: "Heading 5",
    icon: <Heading5 size={defaultOptionSize} className={defaultClass} />
  },
  {
    value: "Heading 6",
    icon: <Heading6 size={defaultOptionSize} className={defaultClass} />
  }

];


export type TaskType = (typeof tools)[number]["task"]
export type HeadingType = (typeof headingOptions)[number]["value"]

const TiptapToolbar = ({ editor, isErrored }: CommonTipTapToolbarProps) => {

  function chainMethods(editor: Editor | null, command: (chain: ChainedCommands) => ChainedCommands) {
    if (!editor) return;

    command(editor.chain().focus()).run();
  }

  function handleImageButtonClick() {
    mediaUploaderModal.openModal().then(imagesPath => {
      imagesPath.forEach(path => {
        chainMethods(editor, (chain) => chain.setImage({
          src: `http://localhost:8090/upload${path}`,
          alt: "A boring example image"
        }));
      });
      mediaUploaderModal.closeModal();
    });
  }


  function handleOnClick(task: TaskType) {
    switch (task) {
      case "bold":
        return chainMethods(editor, (chain) => chain.toggleBold());
      case "italic":
        return chainMethods(editor, (chain) => chain.toggleItalic());
      case "underline":
        return chainMethods(editor, (chain) => chain.toggleUnderline());
      case "strike":
        return chainMethods(editor, (chain) => chain.toggleStrike());
      case "code":
        return chainMethods(editor, (chain) => chain.toggleCode());
      case "codeblock":
        return chainMethods(editor, (chain) => chain.toggleCodeBlock());
      case "orderedList":
        return chainMethods(editor, (chain) => chain.toggleOrderedList());
      case "bulletList":
        return chainMethods(editor, (chain) => chain.toggleBulletList());
      case "left":
        return chainMethods(editor, (chain) => chain.setTextAlign("left"));
      case "right":
        return chainMethods(editor, (chain) => chain.setTextAlign("right"));
      case "center":
        return chainMethods(editor, (chain) => chain.setTextAlign("center"));
      case "justify":
        return chainMethods(editor, (chain) => chain.setTextAlign("justify"));
      case "image":
        return handleImageButtonClick();
    }
  }

  const getSelectedLink = useCallback(() => {
    return editor?.getAttributes("link")?.href;
  }, [editor?.getAttributes("link")?.href]);

  function handleLinkButtonSubmit(value: string) {
    if (value === null) {
      return;
    }
    if (value === "") {
      chainMethods(editor, (chain) => chain.unsetLink());
      return;
    }
    chainMethods(editor, (chain) => chain.extendMarkRange("link").setLink({ href: value }));
  }

  function handleUnlink() {
    chainMethods(editor, (chain) => chain.unsetLink());
  }

  const mediaUploaderModal = MediaUploaderModal();

  function handleHeadingSelection(optionValue: string) {
    switch (optionValue) {
      case "Paragraph":
        return chainMethods(editor, chain => chain.setParagraph());
      case "Heading 1":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 1 }));
      case "Heading 2":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 2 }));
      case "Heading 3":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 3 }));
      case "Heading 4":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 4 }));
      case "Heading 5":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 5 }));
      case "Heading 6":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 6 }));
    }

  }

  return (
    <>
      <div component-name="TiptapToolbar"
           className={twMerge(`flex item-center justify-around border border-gray-300 p-4 rounded-t transition-all ${isErrored && "border-red-500"}`)}>
        <BubbleMenu editor={editor} shouldShow={({ editor }) => editor.isActive("link")}>
          <div className={"bg-white z-50 shadow-lg rounded-lg px-4 py-2"}>
            <LinkForm onSubmit={handleLinkButtonSubmit} editMode={true} initialValue={getSelectedLink()}
                      onUnlink={handleUnlink} />
          </div>
        </BubbleMenu>

        <Select defaultValue={"Paragraph"} onValueChange={handleHeadingSelection}>
          <SelectTrigger
            className="w-32 px-4 py-2 border bg-gray-100 border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:ring-2 ">
            <SelectValue placeholder="Select Heading" />
          </SelectTrigger>
          <SelectContent className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            <SelectGroup>
              {headingOptions.map(option => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-all "
                >
                  {option.value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {tools.map(({ task, icon, showPopover }) => (
          <TiptapButton onLinkButtonSubmit={handleLinkButtonSubmit} key={task} onClick={() => handleOnClick(task)}
                        active={editor?.isActive(task) || editor?.isActive({ textAlign: task })}
                        showPopover={showPopover}>{icon}</TiptapButton>))}

      </div>
      {mediaUploaderModal.content}
    </>
  );
};

export default TiptapToolbar;