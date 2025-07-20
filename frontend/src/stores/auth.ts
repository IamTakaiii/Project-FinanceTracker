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

export type AuthState = {
	token: string | null;
	user: User | null;
	isAuthenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
	getme: (user: User) => void;
};

export const AuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			user: null,
			isAuthenticated: false,
			login: (token) => set({ token, isAuthenticated: true }),
			logout: () => set({ token: null, user: null, isAuthenticated: false }),
			getme: (user) => set({ user, isAuthenticated: true }),
		}),
		{
			name: "auth-storage",
		}
	)
);
