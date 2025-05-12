import { RoleEnum } from '@/enums';
import { NavGroup } from '@/types';
import {
    Bot,
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
import texts from './texts';

export const groupedNavItems: NavGroup[] = [
    {
        title: texts.common.administration,
        items: [
            {
                title: texts.common.dashboard,
                url: '/dashboard',
                icon: LayoutGrid,
            },
            {
                title: texts.oneTimePasswords.title,
                url: '/dashboard/one-time-passwords',
                icon: RectangleEllipsis,
                canView: [RoleEnum.ADMIN],
            },
            {
                title: texts.common.users,
                url: '/dashboard/users',
                icon: UserRoundCog,
                canView: [RoleEnum.ADMIN],
            },
            {
                title: texts.common.laboratories,
                url: '/dashboard/laboratories',
                icon: Bot,
                canView: [RoleEnum.ADMIN],
            },
        ],
    },
    {
        title: 'Equipment',
        items: [
            {
                title: 'Equipment',
                url: '/dashboard/equipment',
                icon: MonitorCog,
                canView: [RoleEnum.ADMIN, RoleEnum.SOCIALSERVICE, RoleEnum.INTERNSHIP],
            },
            {
                title: 'Equipment Types',
                url: '/dashboard/equipment-types',
                icon: MonitorSmartphone,
                canView: [RoleEnum.ADMIN, RoleEnum.SOCIALSERVICE, RoleEnum.INTERNSHIP],
            },
            {
                title: 'Equipment Loans',
                url: '/dashboard/equipment-loans',
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
                url: '/dashboard/three-d-models',
                icon: Box,
                canView: [RoleEnum.ADMIN, RoleEnum.SOCIALSERVICE, RoleEnum.INTERNSHIP],
            },
            {
                title: 'Tutorials',
                url: '/dashboard/tutorials',
                icon: GraduationCap,
                canView: [RoleEnum.ADMIN, RoleEnum.SOCIALSERVICE, RoleEnum.INTERNSHIP],
            },
            {
                title: 'Projects',
                url: '/dashboard/projects',
                icon: Folder,
                canView: [RoleEnum.ADMIN, RoleEnum.SOCIALSERVICE, RoleEnum.INTERNSHIP],
            },
        ],
    },
    {
        title: 'Posts',
        items: [
            {
                title: 'Developments',
                url: '/dashboard/developments',
                icon: Rocket,
                canView: [RoleEnum.ADMIN, RoleEnum.SOCIALSERVICE, RoleEnum.INTERNSHIP],
            },
        ],
    },
];
