"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import UserService from "@/services/modules/user.service";
import { useUserStore } from "@/store/user.store";

const useLayout = () => {
  const hidingLayoutRoutes: string[] = ["/dang-nhap", "/dang-ky"];
  const userStore = useUserStore();
  const pathName = usePathname();
  const [showLayout, setShowLayout] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hidingLayoutRoutes.includes(pathName)) {
      setShowLayout(false);
    } else {
      setShowLayout(true);
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
    setLoading(false);
  };

  return { showLayout, loading };
};

export default useLayout;
