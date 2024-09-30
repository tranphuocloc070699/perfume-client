import React from "react";
import Link from "next/link";
const UserControl = () => {
  return (
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
  );
};

export default UserControl;
