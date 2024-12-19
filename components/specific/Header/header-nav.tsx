import React from "react";
import Link from "next/link";
import { defaultList } from "@/types/user/user.data";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const HeaderNav = () => {

  const pathName = usePathname();


  return (
    <nav>
      <ul className={"flex items-center md:gap-6"}>
        {defaultList.children.map(item => <li key={item.link}><Link
          className={twMerge(`font-merriweather font-normal text-gray-700 text-sm ${pathName === item.link ? "text-red-700" : ""}`)}
          href={item.link}>{item.title}</Link></li>)}
      </ul>
    </nav>
  );
};
export default HeaderNav;