import React from "react";
import Link from "next/link";
import { defaultList } from "@/types/user/user.data";

const HeaderNav = () => {

  return (
    <nav>
      <ul className={"flex items-center md:gap-6"}>
        {defaultList.children.map(item => <li key={item.link}><Link className={"font-merriweather"}
                                                                    href={item.link}>{item.title}</Link></li>)}
      </ul>
    </nav>
  );
};
export default HeaderNav;