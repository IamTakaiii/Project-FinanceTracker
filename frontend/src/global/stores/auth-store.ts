import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
	id: string;
	email: string;
	name: string;
	image: string | null | undefined;
	emailVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
};

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);