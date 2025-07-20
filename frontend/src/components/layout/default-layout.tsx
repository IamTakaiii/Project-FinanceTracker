import type React from "react";
import { AppSidebar } from "@/components/navbar/sidebar-collapse";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "@tanstack/react-router";
import { CustomBreadcrumb } from "@/components/navbar/breadcrumb";
import { ThemeModeToggle } from "../theme/theme-mode";
import { ThemeSelector } from "../theme/theme-selector";

import navlist from "../navbar/menu-list";

const DefaultLayout = (): React.JSX.Element => {
	return (
		<SidebarProvider>
			<AppSidebar navList={navlist} />
			<SidebarInset>
				<header
					className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between
"
				>
					<div className="flex items-center gap-2">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
						<CustomBreadcrumb />
					</div>
					<div className="flex items-center gap-4">
						<ThemeSelector />
						<ThemeModeToggle />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">{<Outlet />}</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DefaultLayout;
