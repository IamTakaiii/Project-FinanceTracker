"use client";

import { useThemeConfig } from "./theme-active";
import { Label } from "@/global/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
} from "@/global/components/ui/select";

const DEFAULT_THEMES = [
	{
		name: "Default",
		value: "default",
	},
	{
		name: "Blue",
		value: "blue",
	},
	{
		name: "Green",
		value: "green",
	},
	{
		name: "Amber",
		value: "amber",
	},
];

const SCALED_THEMES = [
	{
		name: "Default",
		value: "default-scaled",
	},
	{
		name: "Blue",
		value: "blue-scaled",
	},
];

const MONO_THEMES = [
	{
		name: "Mono",
		value: "mono-scaled",
	},
];

export function ThemeSelector() {
	const { activeTheme, setActiveTheme } = useThemeConfig();

	return (
		<div className="hidden sm:flex sm:items-center sm:gap-2">
			<Label htmlFor="theme-selector" className="sr-only">
				Theme
			</Label>
			<Select value={activeTheme} onValueChange={setActiveTheme}>
				<SelectTrigger id="theme-selector" className="justify-start *:data-[slot=select-value]:w-12">
					<p className="text-muted-foreground mx-2">Select a theme:</p>
					<p className="mr-2 font-bold text-primary">{activeTheme.charAt(0).toUpperCase() + activeTheme.slice(1)}</p>
				</SelectTrigger>
				<SelectContent align="end">
					<SelectGroup>
						<SelectLabel className="font-bold">Pure Color</SelectLabel>
						{DEFAULT_THEMES.map((theme) => (
							<SelectItem key={theme.name} value={theme.value}>
								{theme.name}
							</SelectItem>
						))}
					</SelectGroup>
					<SelectSeparator className="border-1" />
					<SelectGroup>
						<SelectLabel className="font-bold">Scaled</SelectLabel>
						{SCALED_THEMES.map((theme) => (
							<SelectItem key={theme.name} value={theme.value}>
								{theme.name}
							</SelectItem>
						))}
					</SelectGroup>
					<SelectSeparator className="border-1" />
					<SelectGroup>
						<SelectLabel className="front-bold">Monospaced</SelectLabel>
						{MONO_THEMES.map((theme) => (
							<SelectItem key={theme.name} value={theme.value}>
								{theme.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
