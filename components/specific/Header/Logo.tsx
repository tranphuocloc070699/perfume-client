import Link from "next/link";
import NextImg from "next/image";
import React from "react";

const Logo = () => {
  return (
    <section>
      <Link
        href={"/"}
        className="flex items-center gap-2 text-xl font-medium text-slate-800"
      >
        <NextImg
          src={"/assets/images/logo.svg"}
          alt="logo"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        MK Forum
      </Link>
    </section>
  );
};

export default Logo;
