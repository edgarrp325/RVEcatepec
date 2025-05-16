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

export const groupedNavItems: NavGroup[] = [
    {
        title: 'Administración',
        items: [
            {
                title: 'Panel de control',
                url: '/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'Contraseñas de un solo uso',
                url: '/dashboard/one-time-passwords',
                icon: RectangleEllipsis,
                canView: [RoleEnum.ADMIN],
            },
            {
                title: 'Usuarios',
                url: '/dashboard/users',
                icon: UserRoundCog,
                canView: [RoleEnum.ADMIN],
            },
            {
                title: 'Laboratorios',
                url: '/dashboard/laboratories',
                icon: Bot,
                canView: [RoleEnum.ADMIN],
            },
        ],
    },
    {
        title: 'Equipos',
        items: [
            {
                title: 'Equipos',
                url: '/dashboard/equipment',
                icon: MonitorCog,
                canView: [RoleEnum.ADMIN, RoleEnum.SOCIALSERVICE, RoleEnum.INTERNSHIP],
            },
            {
                title: 'Tipos de equipo',
                url: '/dashboard/equipment-types',
                icon: MonitorSmartphone,
                canView: [RoleEnum.ADMIN, RoleEnum.SOCIALSERVICE, RoleEnum.INTERNSHIP],
            },
            {
                title: 'Préstamos de equipo',
                url: '/dashboard/equipment-loans',
                icon: MonitorCheck,
                canView: [RoleEnum.ADMIN],
            },
        ],
    },
    {
        title: 'Recursos',
        items: [
            {
                title: 'Modelos 3D',
                url: '/dashboard/three-d-models',
                icon: Box,
                canView: [RoleEnum.ADMIN, RoleEnum.SOCIALSERVICE, RoleEnum.INTERNSHIP],
            },
            {
                title: 'Tutoriales',
                url: '/dashboard/tutorials',
                icon: GraduationCap,
                canView: [RoleEnum.ADMIN, RoleEnum.SOCIALSERVICE, RoleEnum.INTERNSHIP],
            },
            {
                title: 'Proyectos',
                url: '/dashboard/projects',
                icon: Folder,
                canView: [RoleEnum.ADMIN, RoleEnum.SOCIALSERVICE, RoleEnum.INTERNSHIP],
            },
        ],
    },
    {
        title: 'Publicaciones',
        items: [
            {
                title: 'Desarrollos',
                url: '/dashboard/developments',
                icon: Rocket,
                canView: [RoleEnum.ADMIN, RoleEnum.SOCIALSERVICE, RoleEnum.INTERNSHIP],
            },
        ],
    },
];
