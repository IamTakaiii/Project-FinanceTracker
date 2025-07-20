import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/app/routeTree.gen";

const router = createRouter({ routeTree, defaultPreload: "intent" });

export { router };
