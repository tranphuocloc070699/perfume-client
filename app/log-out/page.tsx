"use client";

import { useToast } from "@/hooks/use-toast";
import UserService from "@/services/modules/user.service";
import { useUserStore } from "@/store/user.store";
import React, { useEffect } from "react";

const page = () => {
  const userService = new UserService();
  const toast = useToast();
  const { isAuthenticated } = useUserStore();
  useEffect(() => {
    if (!isAuthenticated) {
      navigateToHomePage();
      return;
    }
    logout();
  }, []);

  const logout = async () => {
    const response = await userService.logout();
    if (response.body.status === 200) {
      navigateToHomePage();
    }
  };

  const navigateToHomePage = () => {
    window.location.href = "/";
  };
  return (
    <div className="flex items-center justify-center w-full h-full text-xl text-slate-700 font-medium">
      Đang đăng xuất
    </div>
  );
};

export default page;
