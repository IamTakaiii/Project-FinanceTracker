"use client";

import { type ReactNode, createContext, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_NAME = "active_theme";
const DEFAULT_THEME = "default";

function setThemeInLocalStorage(theme: string) {
	if (typeof window === "undefined") return;
	localStorage.setItem(STORAGE_NAME, theme);
}

type ThemeContextType = {
	activeTheme: string;
	setActiveTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ActiveThemeProvider({ children, initialTheme }: { children: ReactNode; initialTheme?: string }) {
	const [activeTheme, setActiveTheme] = useState<string>(() => initialTheme || DEFAULT_THEME);

	useEffect(() => {
		setThemeInLocalStorage(activeTheme);

		console.log(`Setting active theme to: ${activeTheme}`);

		Array.from(document.body.classList)
			.filter((className) => className.startsWith("theme-"))
			.forEach((className) => {
				document.body.classList.remove(className);
			});
		document.body.classList.add(`theme-${activeTheme}`);
		if (activeTheme.endsWith("-scaled")) {
			document.body.classList.add("theme-scaled");
		}
	}, [activeTheme]);

	return <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>{children}</ThemeContext.Provider>;
}

export function useThemeConfig() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useThemeConfig must be used within an ActiveThemeProvider");
	}
	return context;
}

export function useTheme() {
	const [theme, setTheme] = useState<string | undefined>(() => {
		return localStorage.getItem("active_theme") || undefined;
	});

	useEffect(() => {
		const isScaled = theme?.endsWith("-scaled");
		const body = document.body;

		body.className = cn(
			"bg-background overscroll-none font-sans antialiased",
			theme ? `theme-${theme}` : "",
			isScaled ? "theme-scaled" : ""
		);

		if (theme) {
			localStorage.setItem("active_theme", theme);
		} else {
			localStorage.removeItem("active_theme");
		}
	}, [theme]);

	return [theme, setTheme] as const;
}
