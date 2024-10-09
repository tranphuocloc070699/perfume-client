import { initUserData } from "@/types/user/user.data";
import { UserDto } from "@/types/user/user.model";
import { create } from "zustand";

interface IUserProps {
  accessToken: string;
  user: UserDto;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: UserDto) => void;
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
