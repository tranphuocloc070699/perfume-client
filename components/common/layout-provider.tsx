"use client";

import React from "react";
import AppHeader from "./app-header";
import AppFooter from "./app-footer";
import useLayout from "@/hooks/fetch-data/use-layout";

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
          <section className={showLayout ? "md:ml-80 mt-16 md:mr-8" : ""}>
            {children}
          </section>
          {showLayout && <AppFooter />}
        </>
      )}
    </>
  );
};

export default LayoutProvider;
