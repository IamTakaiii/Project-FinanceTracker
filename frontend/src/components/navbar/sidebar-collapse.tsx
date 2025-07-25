import * as React from "react";
import { ChevronRight } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";

import { SearchForm } from "@/components/navbar/form-search";
import { VersionSwitcher } from "@/components/navbar/version-switcher";
import { NavUser } from "./nav-user";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { AuthStore } from "@/stores/auth";

type AdditionalSidebarProps = {
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
type SidebarProps = React.ComponentProps<typeof Sidebar> & AdditionalSidebarProps;

export function AppSidebar({ navList, ...props }: SidebarProps) {
    const { pathname } = useRouterState({ select: (s) => s.location });
	
    const { isAuthenticated, user } = AuthStore((state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
    }));

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <VersionSwitcher versions={navList.versions} defaultVersion={navList.versions?.[0] || "N/A"} />
                <SearchForm />
            </SidebarHeader>
            <SidebarContent className="gap-0">
                {navList.navMain.map((item) => (
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
                                                <SidebarMenuButton asChild isActive={pathname.startsWith(menuItem.url)}>
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
            <SidebarFooter>
                {isAuthenticated ? (
                    <NavUser
                        user={{
                            name: user?.name || "Anonymous User",
                            email: user?.email || "-",
                            avatar: user?.image || "https://via.placeholder.com/150",
                        }}
                    />
                ) : (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="/login">Login</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}