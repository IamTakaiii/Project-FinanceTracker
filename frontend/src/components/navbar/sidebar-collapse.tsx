import * as React from "react";
import { ChevronRight } from "lucide-react";

import { SearchForm } from "@/components/navbar/form-search";
import { VersionSwitcher } from "@/components/navbar/version-switcher";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useRouterState } from "@tanstack/react-router";

type AdditonalSidebarProps = {
	navList: {
		versions: string[];
		navMain: {
			title: string;
			url: string;
			items: {
				title: string;
				url: string;
			}[];
		}[];
	};
};
type SidebarProps = React.ComponentProps<typeof Sidebar> & AdditonalSidebarProps;

export function AppSidebar({ ...props }: SidebarProps) {
	const { pathname } = useRouterState({ select: (s) => s.location });

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<VersionSwitcher versions={props.navList.versions} defaultVersion={props.navList.versions[0]} />
				<SearchForm />
			</SidebarHeader>
			<SidebarContent className="gap-0">
				{props.navList.navMain.map((item) => (
					<Collapsible key={item.title} title={item.title} className="group/collapsible">
						<SidebarGroup>
							<SidebarGroupLabel
								asChild
								className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
							>
								<CollapsibleTrigger className="group-data-[state=open]/collapsible:!font-bold group-data-[state=open]/collapsible:!text-primary">
									{item.title}{" "}
									<ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
								</CollapsibleTrigger>
							</SidebarGroupLabel>
							<CollapsibleContent>
								<SidebarGroupContent>
									<SidebarMenu>
										{item.items.map((menuItem) => (
											<SidebarMenuItem key={menuItem.title}>
												<SidebarMenuButton asChild isActive={pathname === menuItem.url}>
													<Link to={menuItem.url}>{menuItem.title}</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</CollapsibleContent>
						</SidebarGroup>
					</Collapsible>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
