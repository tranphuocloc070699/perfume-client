"use client";

import React, { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { usePathname } from "next/navigation";
import { getCookies } from "cookies-next";
const LayoutProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const hidingLayoutRoutes: string[] = ["/dang-nhap", "/dang-ky"];
  const refreshToken = getCookies();
  const pathName = usePathname();
  const [showLayout, setShowLayout] = useState(true);
  useEffect(() => {
    if (hidingLayoutRoutes.includes(pathName)) {
      setShowLayout(false);
    }
  }, [pathName]);

  return (
    <>
      {showLayout && (
        <>
          <AppHeader />
          <section className="md:ml-80 mt-16 md:mr-8 ">{children}</section>
          <AppFooter />
        </>
      )}

      {!showLayout && <>{children}</>}
    </>
  );
};

export default LayoutProvider;
