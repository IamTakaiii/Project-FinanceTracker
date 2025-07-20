import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/index.css";
import App from "@/app/app";
import { router } from "@/app/router";

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = createRoot(rootElement);
	root.render(
		<StrictMode>
			<App />
		</StrictMode>
	);
}
