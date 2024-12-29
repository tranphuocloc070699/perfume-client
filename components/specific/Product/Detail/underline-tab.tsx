"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type UnderlineTabsProps = {
  tabs: Tab[];
  className?: string;
};

const UnderlineTabs: React.FC<UnderlineTabsProps> = ({ tabs, className }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <div className={twMerge(`flex flex-col`, className)}>
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={twMerge(
              `px-4 py-2 text-gray-600 font-medium focus:outline-none transition-all`,
              activeTab === tab.id
                ? `border-b-2 border-red-700 text-red-700`
                : `hover:text-red-500`
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 text-gray-700">{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  );
};

export default UnderlineTabs;
