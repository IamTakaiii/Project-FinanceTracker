import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ActiveThemeProvider, useTheme } from "@/components/theme/theme-active";

function App() {
	const [activeThemeValue, _] = useTheme();

	return (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<ActiveThemeProvider initialTheme={activeThemeValue}>
					<RouterProvider router={router} />
					<Toaster richColors position="top-center" />
				</ActiveThemeProvider>
			</ThemeProvider>
		</>
	);
}

export default App;
