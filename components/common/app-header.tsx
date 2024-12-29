import { useUserStore } from "@/store/user.store";
import Logo from "../specific/Header/logo";
import SearchBox from "../specific/Header/search-box";
import Sidebar from "../specific/Header/sidebar";
import UserControl from "../specific/Header/user-control";
import { useMemo } from "react";
import HeaderNav from "@/components/specific/Header/header-nav";
import HeaderSearching from "@/components/specific/Header/header-searching";
import { useSession } from "next-auth/react";
import HeaderAuth from "@/components/specific/Header/header-auth";

const AppHeader = () => {
  return (
    <header className={" flex items-center justify-between py-2 px-4 border-b border-gray-100"}>
      <section className={"flex items-center gap-10"}>
        <Logo />
        <HeaderNav />
      </section>
      <section className={"flex items-center md:gap-6"}>
        <HeaderSearching />
        <HeaderAuth />
      </section>
    </header>

  );
};

export default AppHeader;
