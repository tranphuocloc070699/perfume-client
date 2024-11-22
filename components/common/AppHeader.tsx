import { useUserStore } from "@/store/user.store";
import Logo from "../specific/Header/Logo";
import SearchBox from "../specific/Header/SearchBox";
import Sidebar from "../specific/Header/Sidebar";
import UserControl from "../specific/Header/UserControl";
import { useMemo } from "react";

const AppHeader = () => {
  return (
    <header className="box-border">
      <section className="fixed top-0 h-[54px] w-full  max-h-16 border-b border-gray-100 bg-white z-50">
        <div className=" px-8 w-full mx-auto py-2 grid grid-cols-12">
          <div className="col-span-3 h-full hidden md:block">
            <Logo />
          </div>
          <div>
            <HeaderMenu />
          </div>
          <div className="col-span-6 h-full">
            <SearchBox />
          </div>
          <div className="col-span-3 h-full hidden md:block">
            <UserControl />
          </div>
        </div>
      </section>
      {/* Sidebar */}
      <section>
        <Sidebar />
      </section>
      {/* Category */}
      {/* <section className="max-w-3xl w-full mx-auto py-2">
        <PageNavigation />
      </section> */}
    </header>
  );
};

export default AppHeader;
