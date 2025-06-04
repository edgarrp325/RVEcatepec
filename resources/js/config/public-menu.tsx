import { Box, GraduationCap, Rocket } from 'lucide-react';

export const publicMenu = [
    { title: 'El laboratorio', url: '/laboratory' },
    {
        title: 'Desarrollos',
        url: '/developments',
    },
    {
        title: 'Repositorio',
        url: '/resources',
        items: [
            {
                title: 'Tutoriales',
                icon: <GraduationCap className="size-5 shrink-0" />,
                description: 'Guías y documentación sobre el uso de motores gráficos, modelado 3D y programación para VR.',
                url: '/resources/tutorials',
            },
            {
                title: 'Elementos 3D',
                icon: <Box className="size-5 shrink-0" />,
                description: 'Modelos y texturas listos para su integración en proyectos.',
                url: '/resources/three-d-models',
            },
            {
                title: 'Proyectos',
                icon: <Rocket className="size-5 shrink-0" />,
                description: 'Códigos de aplicaciones VR, AR e IA disponibles para su modificación y personalización.',
                url: '/resources/projects',
            },
        ],
    },
    {
        title: 'Servicios',
        url: '/services',
    },
    {
        title: 'Contacto',
        url: '/contact',
    },
];

export const publicMenuLogo = {
    title: 'Realidad Virtual Ecatepec',
    url: route('home'),
    src: 'isotipo_RV.png',
    alt: 'Logo RV Ecatepec',
};

export const publicMenuAuthButtons = {
    login: { text: 'Iniciar sesión', url: 'login' },
    signup: { text: 'Regístrate', url: 'register' },
    dashboard: { text: 'Panel', url: 'dashboard' },
};
