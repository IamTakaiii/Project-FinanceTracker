"use client"

import * as React from "react"
import { useRouterState } from "@tanstack/react-router"
import { IconInnerShadowTop } from "@tabler/icons-react"
import type { NavItem, UserProfile } from "@/global/components/navigation/basic-navbar/options"

import { NavCollapse } from "@/global/components/navigation/basic-navbar/nav-collapse"
import { NavMain } from "@/global/components/navigation/basic-navbar/nav-main"
import { NavSecondary } from "@/global/components/navigation/basic-navbar/nav-secondary"
import { NavUser } from "@/global/components/navigation/basic-navbar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/global/components/ui/sidebar"

// Define component props for reusability
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: UserProfile;
  mainNavItems: NavItem[];
  collapseNavItems: NavItem[];
  secondaryNavItems: NavItem[];
}

export function AppSidebar({
  user,
  mainNavItems,
  collapseNavItems,
  secondaryNavItems,
  ...props
}: AppSidebarProps) {
  const { pathname } = useRouterState({ select: (s) => s.location });

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} pathname={pathname} />
        <NavCollapse items={collapseNavItems} pathname={pathname} groupLabel="Others" />
        <NavSecondary items={secondaryNavItems} className="mt-auto" pathname={pathname} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  )
}