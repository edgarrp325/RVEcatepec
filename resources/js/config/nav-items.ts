import { RoleEnum } from '@/enums';
import { NavGroup } from '@/types';
import {
    Box,
    Folder,
    GraduationCap,
    LayoutGrid,
    MonitorCheck,
    MonitorCog,
    MonitorSmartphone,
    RectangleEllipsis,
    Rocket,
    UserRoundCog,
} from 'lucide-react';

export const groupedNavItems: NavGroup[] = [
    {
        title: 'Administration',
        items: [
            {
                title: 'Dashboard',
                url: '/dashboard',
                icon: LayoutGrid,
                canView: [RoleEnum.ADMIN],
            },
            {
                title: 'One-time Passwords',
                url: '/one-time-passwords',
                icon: RectangleEllipsis,
                canView: [RoleEnum.ADMIN],
            },
            {
                title: 'Users',
                url: '/users',
                icon: UserRoundCog,
                canView: [RoleEnum.ADMIN],
            },
            {
                title: 'Laboratories',
                url: '/laboratories',
                icon: Rocket,
                canView: [RoleEnum.ADMIN],
            },
        ],
    },
    {
        title: 'Equipment',
        items: [
            {
                title: 'Equipment',
                url: '/equipment',
                icon: MonitorCog,
            },
            {
                title: 'Equipment Types',
                url: '/equipment-types',
                icon: MonitorSmartphone,
            },
            {
                title: 'Equipment Loans',
                url: '/equipment-loans',
                icon: MonitorCheck,
                canView: [RoleEnum.ADMIN],
            },
        ],
    },
    {
        title: 'Resources',
        items: [
            {
                title: '3D Models',
                url: '/three-d-models',
                icon: Box,
            },
            {
                title: 'Tutorials',
                url: '/tutorials',
                icon: GraduationCap,
            },
            {
                title: 'Projects',
                url: '/projects',
                icon: Folder,
            },
        ],
    },
];
