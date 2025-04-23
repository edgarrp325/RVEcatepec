import { Box, GraduationCap, Rocket } from 'lucide-react';

export const publicMenu = [
    {   title: 'El laboratorio', 
        url: '/laboratory', 
    },
    {
        title: 'Desarrollos',
        url: '/developments',
    },
    {
        title: 'Repositorio',
        url: '/resources',
        items: [
            {
                title: 'Elementos 3D',
                icon: <Box className="size-5 shrink-0" />,
                description: 'Aquí podrás encontrar modelos 3D para tus proyectos de realidad virtual y aumentada',
                url: '/resources/three-d-models',
            },
            {
                title: 'Proyectos',
                icon: <Rocket className="size-5 shrink-0" />,
                description: 'Aquí podrás descargar proyectos de realidad virtual y aumentada',
                url: '/resources/projects',
            },
            {
                title: 'Tutoriales',
                icon: <GraduationCap className="size-5 shrink-0" />,
                description: 'Aquí podrás encontrar tutoriales de realidad virtual y aumentada en video y PDF',
                url: '/resources/tutorials',
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
