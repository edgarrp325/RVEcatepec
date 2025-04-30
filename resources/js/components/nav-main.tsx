import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavGroup, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ groups }: { groups: NavGroup[] }) {
    const url = usePage().url;
    const { auth } = usePage<SharedData>().props;
    const currentRole = auth.user.role_id.toString();
    return (
        <>
            {groups.map(({ title, items }) => {
                const visibleItems = items.filter((item) => {
                    const canView = item.canView || [];
                    return canView.length === 0 || canView.includes(currentRole);
                });

                if (visibleItems.length === 0) return null;

                return (
                    <SidebarGroup key={title} className="px-2 py-0">
                        <SidebarGroupLabel>{title}</SidebarGroupLabel>
                        <SidebarMenu>
                            {visibleItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={item.url === url}>
                                        <Link href={item.url} prefetch>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                );
            })}
        </>
    );
}
