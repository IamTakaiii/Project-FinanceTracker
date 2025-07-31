import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/global/components/theme/theme-provider";
import {
  ActiveThemeProvider,
  useTheme,
} from "@/global/components/theme/theme-active";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [activeThemeValue, _] = useTheme();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ActiveThemeProvider initialTheme={activeThemeValue}>
            <RouterProvider router={router} />
            <Toaster richColors position="top-center" />
          </ActiveThemeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
