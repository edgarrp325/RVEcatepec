import { BreadcrumbItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Box, GraduationCap, Menu, Rocket } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Breadcrumbs } from './breadcrumbs';
import { NavLink } from './ui/navlink';

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface NavbarProps {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title?: string;
    };
    menu?: MenuItem[];
    mobileExtraLinks?: {
        name: string;
        url: string;
    }[];
    authButtons?: {
        login: {
            text: string;
            url: string;
        };
        signup: {
            text: string;
            url: string;
        };
        dashboard: {
            text: string;
            url: string;
        };
    };
    breadcrumbs?: BreadcrumbItem[];
}

const AppPublicHeader = ({
    logo = {
        title: 'Realidad Virtual Ecatepec',
        url: route('home'),
        src: 'https://realidadvirtualecatepec.com.mx/public/img/isotipo_RV.png',
        alt: 'Logo RV Ecatepec',
    },
    menu = [
        { title: 'El laboratorio', url: '#' },
        {
            title: 'Desarrollos',
            url: '#',
        },
        {
            title: 'Repositorio',
            url: '#',
            items: [
                {
                    title: 'Elementos 3D',
                    icon: <Box className="size-5 shrink-0" />,
                    description: 'Aqui podras encontrar modelos 3D para tus proyectos de realidad virtual y aumentada',
                    url: '#',
                },
                {
                    title: 'Proyectos',
                    icon: <Rocket className="size-5 shrink-0" />,
                    description: 'Aqui podras descargar proyectos de realidad virtual y aumentada',
                    url: '#',
                },
                {
                    title: 'Tutoriales',
                    icon: <GraduationCap className="size-5 shrink-0" />,
                    description: 'Aqui podras encontrar tutoriales de realidad virtual y aumentada en video y pdf',
                    url: '#',
                },
            ],
        },
        {
            title: 'Servicios',
            url: '#',
        },
        {
            title: 'Contacto',
            url: '#',
        },
    ],
    authButtons = {
        login: { text: 'Log in', url: 'login' },
        signup: { text: 'Sign up', url: 'register' },
        dashboard: { text: 'Dashboard', url: 'dashboard' },
    },
    breadcrumbs = [],
}: NavbarProps) => {
    const { auth } = usePage<SharedData>().props;
    console.log(breadcrumbs);

    return (
        <>
            {/* Desktop Menu */}
            <nav className="hidden justify-between px-4 shadow xl:flex">
                <div className="text-primary flex items-center gap-6">
                    <Link href={logo.url} className="flex items-center gap-2 p-4">
                        <img src={logo.src} className="w-16" alt={logo.alt} />
                        <span className="text-lg font-semibold">{logo.title}</span>
                    </Link>
                    <div className="flex items-center">
                        <NavigationMenu>
                            <NavigationMenuList>{menu.map((item) => renderMenuItem(item))}</NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {auth.user ? (
                        <Button asChild variant="outline" size="sm">
                            <Link href={route(authButtons.dashboard.url)}>{authButtons.dashboard.text}</Link>
                        </Button>
                    ) : (
                        <>
                            <Button asChild variant="outline" size="sm">
                                <Link href={route(authButtons.login.url)}>{authButtons.login.text}</Link>
                            </Button>
                            <Button asChild size="sm">
                                <Link href={route(authButtons.signup.url)}>{authButtons.signup.text}</Link>
                            </Button>
                        </>
                    )}
                </div>
            </nav>
            {/* Mobile Menu */}
            <div className="block shadow xl:hidden">
                <div className="text-primary flex items-center justify-between p-4">
                    <Link href={logo.url} className="flex items-center gap-2">
                        <img src={logo.src} className="w-8" alt={logo.alt} />
                        <span className="text-lg font-semibold">{logo.title}</span>
                    </Link>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="size-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="overflow-y-auto">
                            <SheetHeader className="px-2">
                                <SheetTitle>
                                    <Link href={logo.url} className="flex items-center">
                                        <img src={logo.src} className="w-10" alt={logo.alt} />
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6 p-4">
                                <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                                    {menu.map((item) => renderMobileMenuItem(item))}
                                </Accordion>

                                <div className="flex flex-col gap-3">
                                    {auth.user ? (
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={route(authButtons.dashboard.url)}>{authButtons.dashboard.text}</Link>
                                        </Button>
                                    ) : (
                                        <>
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={route(authButtons.login.url)}>{authButtons.login.text}</Link>
                                            </Button>
                                            <Button asChild size="sm">
                                                <Link href={route(authButtons.signup.url)}>{authButtons.signup.text}</Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="border-sidebar-border/70 flex w-full border-b">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger className="text-md font-normal">{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                    {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title} className="w-120">
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavLink key={item.title} active={false} href={item.url}>
            {item.title}
        </NavLink>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title} className="border-b-0">
                <AccordionTrigger className="text-md py-0 font-normal hover:no-underline">{item.title}</AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <Link key={item.title} href={item.url} className="text-md">
            {item.title}
        </Link>
    );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <Link
            className="text-md hover:bg-muted hover:text-accent-foreground flex w-full flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none xl:w-96"
            href={item.url}
        >
            <div>{item.icon}</div>
            <div>
                <div className="font-semibold">{item.title}</div>
                {item.description && <p className="text-muted-foreground text-sm leading-snug text-balance">{item.description}</p>}
            </div>
        </Link>
    );
};

export default AppPublicHeader;
