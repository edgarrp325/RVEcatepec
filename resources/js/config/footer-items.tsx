import FacebookIcon from '@/components/facebook-icon';
import YoutubeIcon from '@/components/youtube-icon';

export const footerItems = [
    { title: 'Servicio Social y Prácticas Profesionales', url: '/services' },
    {
        title: 'Registro de Acceso a Laboratorios',
        url: '/dashboard/attendance/create',
    },
    {
        title: 'Red de inteligencia artificial',
        url: 'https://www.facebook.com',
    },
];

export const footerSocialItems = [
    {
        icon: <FacebookIcon className="size-6" />,
        url: 'https://www.facebook.com/RVEcatepec',
    },
    {
        icon: <YoutubeIcon className="size-7" />,
        url: 'https://www.youtube.com',
    },
];
