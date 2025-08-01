import type React from "react";
import { AppSidebar } from "@/global/components/navigation/basic-navbar/app-sidebar";
import { Separator } from "@/global/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/global/components/ui/sidebar";
import { Outlet } from "@tanstack/react-router";
import { CustomBreadcrumb } from "@/global/components/navigation/breadcrumb";
import { ThemeModeToggle } from "../theme/theme-mode";
import { ThemeSelector } from "../theme/theme-selector";
import { collapseNavItems, mainNavItems, secondaryNavItems, userProfile } from "../navigation/basic-navbar/options";

const DefaultLayout = (): React.JSX.Element => {
	return (
		<SidebarProvider>
			<AppSidebar mainNavItems={mainNavItems} collapseNavItems={collapseNavItems} secondaryNavItems={secondaryNavItems} user={userProfile} />
			<SidebarInset>
				<header
					className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between"
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
				<div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">{<Outlet />}</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DefaultLayout;
