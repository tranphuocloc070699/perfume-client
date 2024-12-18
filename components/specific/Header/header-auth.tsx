import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { signOut } from "next-auth/react";

const HeaderAuth = () => {
  const { data, status } = useSession();

  async function handleLogout() {
    /*
    * Call api to sign out on server side
    * */
    await signOut();
  }

  if (status === "loading") return <></>;


  return (
    <div component-name="HeaderAuth">
      {
        data ? <div className={"relative group"}>
          <Icon name={"user"}
                className={"rounded-full w-8 h-8 p-1 shadow border border-gray-300 transition-all duration-300 cursor-pointer hover:shadow-none"} />
          <div
            className={"absolute z-10 shadow-xl bg-white rounded-lg top-[100%] right-0 min-w-[200px]  p-4 border border-gray-300 hidden group-hover:block"}>
            <div className={"flex items-center gap-2 border-b border-gray-300 pb-4"}>
              <Icon name={"user"} size={20} />
              <span className={"font-montserrat font-semibold"}>{data?.user?.name}</span>
            </div>
            <div
              onClick={handleLogout}
              className={"flex items-center gap-2  mt-4 p-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-red-50"}>
              <Icon name={"logout"} className={"text-red-600"} size={20} />
              <span className={"font-montserrat font-semibold text-sm text-red-600"}>Thoát</span>
            </div>
          </div>
        </div> : <div>
          <section className="h-full flex items-center gap-4 justify-end">
            <Link href={"/dang-ky"}>
              <Button
                size={"sm"}
                className="bg-white text-black font-medium border border-slate-300 outline-none rounded-md px-4 py-1 text-sm transition-all hover:bg-slate-50">
                Đăng ký
              </Button>
            </Link>
            <Link href={"/dang-nhap"}>
              <Button
                size={"sm"}
                className="bg-slate-900 text-white font-medium  outline-none rounded-md px-4 py-1 text-sm border border-slate-700 transition-all hover:bg-slate-800">
                Đăng nhập
              </Button>
            </Link>
          </section>
        </div>
      }
    </div>
  );
};

export default HeaderAuth;