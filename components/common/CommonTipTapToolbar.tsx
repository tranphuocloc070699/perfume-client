import React from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  ImageUp,
  Italic,
  List,
  Strikethrough,
  Underline
} from "lucide-react";
import CommonTiptapButton from "@/components/common/CommonTiptapButton";

const defaultClass = "text-sm";

const tools = [{
  task: "bold",
  icon: <Bold size={16} />
}, {
  task: "italic",
  icon: <Italic size={16} />
}, {
  task: "underline",
  icon: <Underline size={16} />
}, {
  task: "strikethrough",
  icon: <Strikethrough size={16} />
}, {
  task: "bold",
  icon: <Bold size={16} />
}, {
  task: "code",
  icon: <Code size={16} />
}, {
  task: "align-left",
  icon: <AlignLeft size={16} />
}, {
  task: "align-center",
  icon: <AlignCenter size={16} />
}, {
  task: "align-right",
  icon: <AlignRight size={16} />
}, {
  task: "list",
  icon: <List size={16} />
}, {
  task: "image",
  icon: <ImageUp size={16} />
}
];

const CommonTipTapToolbar = () => {

  function onButtonClick() {

  }

  return (
    <div component-name="CommonTipTapToolbar" className={"flex item-center gap-2"}>
      {tools.map(tool => (
        <CommonTiptapButton key={tool.task} onClick={onButtonClick} active={false}>{tool.icon}</CommonTiptapButton>))}
    </div>
  );
};

export default CommonTipTapToolbar;