"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import UserService from "@/services/modules/user.service";
import { useUserStore } from "@/store/user.store";
import { signIn } from "next-auth/react";

const useLayout = () => {
  const hidingLayoutRoutes: string[] = ["/dang-nhap", "/dang-ky"];
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
    try {
      const response = await signIn("credentials", {
        type: "authenticate",
        redirect: false
      });
      console.log({ response });
      if (!response?.code && response.ok) {
        setLoading(false);
      }
    } catch (error: any) {
      console.log({ catchError: error });
    }


    // const userService = new UserService();
    // const response = await userService.authenticate();
    // if (response.status === 200) {
    //   userStore.setAccessToken(response.data.accessToken);
    //   userStore.setUser(response.data.data);
    // }
    // setLoading(false);
  };

  return { showLayout, loading };
};

export default useLayout;
