import React from "react";
import Link from "next/link";
import { defaultList } from "@/types/user/user.data";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react";

const HeaderNav = () => {
  const pathName = usePathname();
  const { data } = useSession();


  return (
    <nav>
      <ul className={" items-center md:gap-6 md:flex hidden"}>
        {defaultList.children.map(item => <li key={item.link}><Link
          className={twMerge(`font-merriweather font-normal text-gray-700 text-sm ${pathName === item.link ? "text-red-700" : ""}`)}
          href={item.link}>{item.title}</Link></li>)}
        {(data?.user as any)?.role === "ADMIN" && <li key={"/admin"}><Link
          className={twMerge(`font-merriweather font-normal text-gray-700 text-sm ${pathName === "/admin" ? "text-red-700" : ""}`)}
          href={"/admin"}>Trang quản lý</Link></li>}
      </ul>
      <ul
        className={"md:hidden fixed h-16 bottom-0 left-0 right-0 px-4 bg-white border-t border-gray-300 flex items-center justify-between z-40"}>
        {defaultList.children.map(item => <li key={item.link}><Link
          className={twMerge(`font-merriweather font-normal text-gray-700 flex flex-col items-center gap-1 text-xs ${pathName === item.link ? "text-red-700" : ""}`)}
          href={item.link}>
          <Icon icon={item.iconUrl} className="text-2xl" />
          {item.title}

        </Link></li>)}
      </ul>
    </nav>
  );
};
export default HeaderNav;