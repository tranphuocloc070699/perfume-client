import { Media } from "../media/media.model";
import { ISidebarGroup } from "./user.interface";
import { User } from "./user.model";

export const initUserData: User = {
  id: 0,
  name: "",
  avatar: {
    id: 0,
    path: "",
    type: "",
  },
  role: "USER",
};

export const defaultList: ISidebarGroup = {
  title: "Menu",
  children: [
    {
      title: "Trang chủ",
      iconUrl: "iconamoon:home-thin",
      type: "icon",
      link: "/",
      children: [],
    },
    {
      title: "Nước hoa",
      iconUrl: "game-icons:square-bottle",
      type: "icon",
      link: "/nuoc-hoa",
      children: [],
    },
    {
      title: "Nốt hương",
      iconUrl: "mdi:smell",
      type: "icon",
      link: "/not-huong",
      children: [],
    },
    {
      title: "Thương hiệu",
      iconUrl: "ph:building",
      type: "icon",
      link: "/thuong-hieu",
      children: [],
    },
    {
      title: "Tin tức",
      iconUrl: "emojione-monotone:newspaper",
      type: "icon",
      link: "/tin-tuc",
      children: [],
    },
  ],
};

export const userList: ISidebarGroup = {
  title: "Cá nhân",
  children: [
    {
      title: "Trang cá nhân",
      iconUrl: "mingcute:user-4-fill",
      type: "icon",
      link: "/me",
      children: [],
    },
    {
      title: "Thoát",
      iconUrl: "iconamoon:exit-thin",
      type: "icon",
      link: "/log-out",
      children: [],
      danger: true,
    },
  ],
};

export const adminList: ISidebarGroup = {
  title: "Admin",
  children: [
    {
      title: "Dashboard",
      iconUrl: "iconamoon:home-thin",
      type: "icon",
      link: "/admin",
      children: [],
    },
    {
      title: "Quản lý nước hoa",
      iconUrl: "game-icons:square-bottle",
      type: "icon",
      link: "/admin/nuoc-hoa",
      children: [],
    },
    {
      title: "Quản lý nốt hương",
      iconUrl: "mdi:smell",
      type: "icon",
      link: "/admin/not-huong",
      children: [],
    },
    {
      title: "Quản lý thương hiệu",
      iconUrl: "ph:building",
      type: "icon",
      link: "/admin/thuong-hieu",
      children: [],
    },
    {
      title: "Quản lý tin tức",
      iconUrl: "emojione-monotone:newspaper",
      type: "icon",
      link: "/admin/tin-tuc",
      children: [],
    },
    {
      title: "Quản lý bình luận",
      iconUrl: "ep:chat-dot-round",
      type: "icon",
      link: "/admin/binh-luan",
      children: [],
    },
  ],
};
