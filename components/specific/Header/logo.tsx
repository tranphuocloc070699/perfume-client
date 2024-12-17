import Link from "next/link";
import NextImg from "next/image";
import React from "react";

const Logo = () => {
  return (
    <h1>
      <Link
        href={"/"}
        className="flex font-montserrat items-center gap-2 text-xl font-medium text-slate-800"
      >
        <NextImg
          src={"/assets/images/logo.svg"}
          alt="logo"
          width={40}
          height={40}
          className="w-10 h-10"
        />
      </Link>
    </h1>
  );
};

export default Logo;
