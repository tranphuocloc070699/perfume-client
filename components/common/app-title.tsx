import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface IAppTitleProps {
  loading: boolean;
  title: string;
  icon: string;
  children: React.ReactNode;
}

const AppTitle = ({ loading, title, children, icon }: IAppTitleProps) => {
  return (
    <div>
      <h4 className="text-2xl font-semibold leading-6 flex items-center gap-1 mb-4">
        <Icon icon={icon} className="text-3xl" />
        {title}
      </h4>
      <section>{children}</section>
    </div>
  );
};

export default AppTitle;
