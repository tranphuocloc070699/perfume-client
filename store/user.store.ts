import { create } from "zustand";

interface IUserProps {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}
export const useUserStore = create<IUserProps>((set) => ({
  accessToken: "",
  setAccessToken: (newToken) => set((state) => ({ accessToken: newToken })),
}));
