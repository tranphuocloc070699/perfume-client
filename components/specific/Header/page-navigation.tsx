import Link from "next/link";
import React from "react";

interface IPageNavigate {
  title: string;
  link: string;
  name: string;
}

const PageNavigation = () => {
  const navigateList: IPageNavigate[] = [
    {
      title: "Trang chủ",
      link: "/",
      name: "home",
    },
    {
      title: "Switch",
      link: "/",
      name: "switch",
    },
    {
      title: "Keycap",
      link: "/",
      name: "keycap",
    },
  ];

  return (
    <div>
      <ul className="flex items-center gap-4">
        {navigateList.map((item) => (
          <li key={item.name}>
            <Link href={item.link} className="border border-slate-200 font-medium px-2 py-[6px] text-gray-600 rounded-lg">{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageNavigation;
