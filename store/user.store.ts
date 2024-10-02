import { initUserData } from "@/types/user/user.data";
import { User } from "@/types/user/user.model";
import { create } from "zustand";

interface IUserProps {
  accessToken: string;
  user: User;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
}
export const useUserStore = create<IUserProps>((set) => ({
  accessToken: "",
  setAccessToken: (newToken) => set((state) => ({ accessToken: newToken })),
  user: initUserData,
  setUser: (newUser) =>
    set((state) => ({ user: newUser, isAuthenticated: true })),
  isAuthenticated: false,
}));
