"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import NextImg from "next/image";
import { usePathname } from "next/navigation";
interface ISidebarList {
  title: string;
  iconUrl: string;
  link: string;
  type: "image" | "icon";
  children: ISidebarItem[];
}
interface ISidebarItem {
  title: string;
  icon: string;
  link: string;
}

const Sidebar = () => {
  const sidebarList: ISidebarList[] = [
    {
      title: "Trang chủ",
      iconUrl: "iconamoon:home-thin",
      type: "icon",
      link: "/",
      children: [],
    },
    {
      title: "Keycap",
      iconUrl: "arcticons:snow-icon-pack",
      type: "icon",
      link: "/key-cap",
      children: [],
    },
    {
      title: "Switch",
      iconUrl: "arcticons:snow-icon-pack",
      type: "icon",
      link: "/switch",
      children: [],
    },
    {
      title: "Kit bàn phím",
      iconUrl: "arcticons:snow-icon-pack",
      type: "icon",
      link: "/kit",
      children: [],
    },
  ];
  const pathName = usePathname();

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <section>
      <Icon
        icon={isMenuOpened ? "iconamoon:close-duotone" : "lucide:menu"}
        className={`z-50 block md:hidden fixed top-2 md:left-8 left-4 text-4xl transition-all`}
      />
      <input
        onChange={() => {
          setIsMenuOpened((prevState) => !prevState);
        }}
        type="checkbox"
        className="absolute top-2 left-5 w-9 h-9 [&:checked+.menu]:left-0 z-50 opacity-0"
      />
      <div className="fixed top-[54px] w-full max-w-full  md:max-w-72 h-screen border-r border-gray-100 py-6 menu transition-all duration-300 left-[-768px]  md:left-0 z-10 bg-white ">
        <h4 className="flex items-center px-8 font-medium ">
          Menu
          <Icon
            icon={"material-symbols-light:keyboard-arrow-right"}
            className="text-2xl text-black mt-[3px]"
          />
        </h4>
        <ul className="flex flex-col mt-2 border-b border-gray-100 pb-6">
          {sidebarList.map((sidebarItem) => (
            <li
              key={sidebarItem.link}
              className={`px-4 mx-4 my-1 py-2 font-light text-[15px] flex items-center gap-4 rounded-lg ${
                pathName === sidebarItem.link ? "bg-slate-100 font-medium" : ""
              }`}
            >
              {sidebarItem.type === "icon" ? (
                <Icon icon={sidebarItem.iconUrl} className="text-xl" />
              ) : (
                <NextImg src={sidebarItem.iconUrl} alt="Sidebar Icon" />
              )}
              <Link href={sidebarItem.link} className="leading-3">
                {sidebarItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
