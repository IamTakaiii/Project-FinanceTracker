import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

export type User = {
	id: string;
	email: string;
	name: string;
	image: string | null | undefined;
	emailVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type AuthState = {
	token: string | null;
	user: User | null;
	isAuthenticated: boolean;
	login: (user: User) => void;
	getme: (user: User) => void;
	logout: () => void;
};

export const AuthStore = create<AuthState>()(
	persist(
		set => ({
			token: null,
			user: null,
			isAuthenticated: false,
			login: (user) => set({ user, isAuthenticated: true }),
			getme: (user) => set({ user, isAuthenticated: true }),
			logout: () => set(initialState),
		}),
		{
			name: "auth-storage",
		}
	)
);
