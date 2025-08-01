import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconHelp,
  IconSearch,
  IconSettings,
  IconUsers,
  IconWallet,
} from "@tabler/icons-react"
import { SquareTerminal } from "lucide-react"


export interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  isActive?: boolean;
  items?: Omit<NavItem, 'icon' | 'items'>[];
  preload?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

export const userProfile: UserProfile = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export const mainNavItems: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
  { title: "Wallets", url: "/wallets", icon: IconWallet },
  { title: "Analytics", url: "/dashboard/bob", icon: IconChartBar },
  { title: "Projects", url: "#", icon: IconFolder },
  { title: "Team", url: "#", icon: IconUsers },
];

export const collapseNavItems: NavItem[] = [
  {
    title: "Playground",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      { title: "History", url: "#" },
      { title: "Starred", url: "#" },
      { title: "Settings", url: "#" },
    ],
  },
];

export const secondaryNavItems: NavItem[] = [
  { title: "Settings", url: "#", icon: IconSettings },
  { title: "Get Help", url: "#", icon: IconHelp },
  { title: "Search", url: "#", icon: IconSearch },
];