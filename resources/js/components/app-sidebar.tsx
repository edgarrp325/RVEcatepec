import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Box, Folder, LayoutGrid, MonitorCheck, MonitorCog, MonitorSmartphone, RectangleEllipsis, Rocket, UserRoundCog } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'One-time Passwords',
        url: '/one-time-passwords',
        icon: RectangleEllipsis,
    },
    {
        title: 'Laboratories',
        url:'/laboratories',
        icon: Rocket,
    },
    {
        title:'Equipment',
        url:'/equipment',
        icon:MonitorCog,
    },
    {
        title:'Equipment Types',
        url:'/equipment-types',
        icon:MonitorSmartphone,
    },
    
    {
        title:'Equipment Loans',
        url:'/equipment-loans',
        icon:MonitorCheck,
    },
    {
        title:'Users',
        url:'/users',
        icon: UserRoundCog,
    },
    {
        title:'3D Models',
        url:'/three-d-models',
        icon:Box,
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
