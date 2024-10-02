"use client";

import React, { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { usePathname } from "next/navigation";
import UserService from "@/services/modules/user.service";
import { useUserStore } from "@/store/user.store";

const LayoutProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const hidingLayoutRoutes: string[] = ["/dang-nhap", "/dang-ky"];

  const userStore = useUserStore();
  const pathName = usePathname();
  const [showLayout, setShowLayout] = useState(true);
  useEffect(() => {
    if (hidingLayoutRoutes.includes(pathName)) {
      setShowLayout(false);
    }
  }, [pathName]);

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    const userService = new UserService();
    const response = await userService.authenticate();

    if (response.status === 200) {
      userStore.setAccessToken(response.data.accessToken);
      userStore.setUser(response.data.data);
    }
  };

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
