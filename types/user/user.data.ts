import { ISidebarGroup } from "./user.interface";
import { UserDto } from "./user.model";

export const initUserData: UserDto = {
  id: 0,
  name: "",
  avatar: "",
  role: "USER",
  email: ""
};

export const defaultList: ISidebarGroup = {
  title: "Menu",
  children: [
    {
      title: "Trang chủ",
      iconUrl: "iconamoon:home-thin",
      type: "icon",
      link: "/",
      children: []
    },
    {
      title: "Nước hoa",
      iconUrl: "game-icons:square-bottle",
      type: "icon",
      link: "/nuoc-hoa",
      children: []
    },
    {
      title: "Nốt hương",
      iconUrl: "mdi:smell",
      type: "icon",
      link: "/not-huong",
      children: []
    },
    {
      title: "Thương hiệu",
      iconUrl: "ph:building",
      type: "icon",
      link: "/thuong-hieu",
      children: []
    },
    {
      title: "Tin tức",
      iconUrl: "emojione-monotone:newspaper",
      type: "icon",
      link: "/blog",
      children: []
    }
  ]
};

export const userList: ISidebarGroup = {
  title: "Cá nhân",
  children: [
    {
      title: "Trang cá nhân",
      iconUrl: "mingcute:user-4-fill",
      type: "icon",
      link: "/me",
      children: []
    },
    {
      title: "Thoát",
      iconUrl: "iconamoon:exit-thin",
      type: "icon",
      link: "/log-out",
      children: [],
      danger: true
    }
  ]
};

export const adminList: ISidebarGroup = {
  title: "Admin",
  children: [
    {
      title: "Dashboard",
      iconUrl: "iconamoon:home-thin",
      type: "icon",
      link: "/admin",
      children: []
    },
    {
      title: "Quản lý nước hoa",
      iconUrl: "game-icons:square-bottle",
      type: "icon",
      link: "/admin/nuoc-hoa",
      children: []
    },
    {
      title: "Quản lý nốt hương",
      iconUrl: "mdi:smell",
      type: "icon",
      link: "/admin/not-huong",
      children: []
    },
    {
      title: "Quản lý thương hiệu",
      iconUrl: "ph:building",
      type: "icon",
      link: "/admin/thuong-hieu",
      children: []
    },
    {
      title: "Quản lý tin tức",
      iconUrl: "emojione-monotone:newspaper",
      type: "icon",
      link: "/admin/blog",
      children: []
    },
    {
      title: "Quản lý bình luận",
      iconUrl: "ep:chat-dot-round",
      type: "icon",
      link: "/admin/binh-luan",
      children: []
    },
    {
      title: "Quản lý collection",
      iconUrl: "bi:collection",
      type: "icon",
      link: "/admin/collection",
      children: []
    },
    {
      title: "Quản lý sách",
      iconUrl: "heroicons:book-open",
      type: "icon",
      link: "/admin/book",
      children: []
    }
  ]
};
