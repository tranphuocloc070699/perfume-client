"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/user.store";
import { Icon } from "@iconify/react/dist/iconify.js";
const UserControl = () => {
  const { user, isAuthenticated } = useUserStore();

  return (
    <>
      {!isAuthenticated && (
        <section className="h-full flex items-center gap-4 justify-end">
          <Link href={"/dang-ky"}>
            <button className="bg-white text-black font-medium border border-slate-300 outline-none rounded-md px-4 py-1 text-sm transition-all hover:bg-slate-50">
              Đăng ký
            </button>
          </Link>
          <Link href={"/dang-nhap"}>
            <button className="bg-slate-700 text-white font-medium  outline-none rounded-md px-4 py-1 text-sm border border-slate-700 transition-all hover:bg-slate-800">
              Đăng nhập
            </button>
          </Link>
        </section>
      )}

      {isAuthenticated && (
        <section className="flex items-center justify-end h-full gap-2 ">
          <Icon
            icon="mingcute:user-4-fill"
            className="w-8 h-8 text-slate-700 cursor-pointer"
          />
          <span className="text-sm font-semibold text-slate-700 hover:cursor-pointer hover:underline">
            {user.name}
          </span>
        </section>
      )}
    </>
  );
};

export default UserControl;
