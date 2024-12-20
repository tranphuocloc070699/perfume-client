"use client";

import React from "react";
import AppHeader from "./app-header";
import AppFooter from "./app-footer";
import useLayout from "@/hooks/fetch-data/use-layout";
import Sidebar from "@/components/specific/Header/sidebar";

const LayoutProvider = ({
                          children
                        }: Readonly<{
  children: React.ReactNode;
}>) => {
  const { showLayout, loading } = useLayout();

  return (
    <>
      {!loading && (
        <>
          {showLayout && <AppHeader />}
          {children}
          {showLayout && <AppFooter />}
        </>
      )}
    </>
  );
};

export default LayoutProvider;
