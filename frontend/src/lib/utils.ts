import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_URL } from "@/config/constants";
import { createAuthClient } from "better-auth/react";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const authClient = createAuthClient({
	baseURL: API_URL,
});
