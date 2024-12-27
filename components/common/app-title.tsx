import React from "react";
import Typography from "@/components/ui/typography";
import Icon, { icons } from "@/components/ui/icon";

interface IAppTitleProps {
  loading: boolean;
  title: string;
  icon?: keyof typeof icons | string;
  children: React.ReactNode;
}

const AppTitle = ({ loading, title, children, icon }: IAppTitleProps) => {
  return (
    <div>
      <Typography.H4 className="flex items-center gap-2 mb-4">
        {icon && <Icon name={icon} size={20} />}
        {title}
      </Typography.H4>
      <section>{children}</section>
    </div>
  );
};

export default AppTitle;
