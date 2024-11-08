import React, { useCallback } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code, Heading1,
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

import TiptapButton from "@/components/common/editor/TiptapButton";
import { ChainedCommands, Editor } from "@tiptap/core";
import MediaUploaderModal from "@/components/specific/Admin/Product/MediaUploaderModal";
import { BubbleMenu } from "@tiptap/react";
import LinkForm from "@/components/common/editor/LinkForm";


interface CommonTipTapToolbarProps {
  editor: Editor | null;

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
  value: "p",
  icon: <Pilcrow size={defaultOptionSize} className={defaultClass} />
},
  {
    value: "h1",
    icon: <Heading1 size={defaultOptionSize} className={defaultClass} />
  }

];


export type TaskType = (typeof tools)[number]["task"]
export type HeadingType = (typeof headingOptions)[number]["value"]

const TipTapToolbar = ({ editor }: CommonTipTapToolbarProps) => {

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
      case "p":
        return chainMethods(editor, chain => chain.setParagraph());
      case "h1":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 1 }));
      case "h2":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 2 }));
      case "h3":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 3 }));
      case "h4":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 4 }));
      case "h5":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 5 }));
      case "h6":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 6 }));
    }

  }

  return (
    <>
      <div component-name="TipTapToolbar"
           className={"flex item-center justify-around border border-gray-300 p-4 rounded-t-lg"}>
        <BubbleMenu editor={editor} shouldShow={({ editor }) => editor.isActive("link")}>
          <div className={"bg-white z-50 shadow-lg rounded-lg px-4 py-2"}>
            <LinkForm onSubmit={handleLinkButtonSubmit} editMode={true} initialValue={getSelectedLink()}
                      onUnlink={handleUnlink} />
          </div>
        </BubbleMenu>

        <Select defaultValue={"p"} onValueChange={handleHeadingSelection}>
          <SelectTrigger className="w-18">
            <SelectValue placeholder="Heading" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {headingOptions.map(option => <SelectItem key={option.value}
                                                        value={option.value}>{option.icon}</SelectItem>)}
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

export default TipTapToolbar;