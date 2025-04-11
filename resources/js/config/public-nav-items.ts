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
        title: 'El laboratorio',
        items: [
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
                title: 'Users',
                url: '/users',
                icon: UserRoundCog,
            },
            {
                title: 'Laboratories',
                url: '/laboratories',
                icon: Rocket,
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
