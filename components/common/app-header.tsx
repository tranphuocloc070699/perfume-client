import { useUserStore } from "@/store/user.store";
import Logo from "../specific/Header/logo";
import SearchBox from "../specific/Header/search-box";
import Sidebar from "../specific/Header/sidebar";
import UserControl from "../specific/Header/user-control";
import { useMemo } from "react";
import HeaderNav from "@/components/specific/Header/header-nav";
import HeaderSearching from "@/components/specific/Header/header-searching";

const AppHeader = () => {
  return (
    <header className={"flex items-center justify-between p-4"}>
      <section className={"flex items-center gap-10"}>
        <Logo />
        <HeaderNav />
      </section>
      <section>
        <HeaderSearching />
      </section>
    </header>
  );
};

export default AppHeader;
