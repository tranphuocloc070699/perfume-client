"use client";

import AppHeader from "@/components/common/app-header";
import Sidebar from "@/components/specific/Header/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <section>
    <div>
      <Sidebar />
      <div className={"ml-80 mt-6 mr-6"}>
        {children}
      </div>
    </div>
  </section>;
}