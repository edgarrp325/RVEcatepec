import { SharedData } from '@/types';
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
import { NavLink } from './navlink';

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
}

const AppNavbar = ({
    logo = {
        url: 'https://realidadvirtualecatepec.com.mx/',
        src: 'https://realidadvirtualecatepec.com.mx/public/img/logo_RV.png',
        alt: 'logo',
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
}: NavbarProps) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            {/* Desktop Menu */}
            <nav className="hidden justify-between px-4 lg:flex">
                <div className="flex items-center gap-6">
                    <a href={logo.url} className="flex items-center gap-2">
                        <img src={logo.src} className="w-24" alt={logo.alt} />
                        <span className="text-lg font-semibold">{logo.title}</span>
                    </a>
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
            <div className="block lg:hidden">
                <div className="flex items-center justify-between">
                    <a href={logo.url} className="flex items-center gap-2">
                        <img src={logo.src} className="w-8" alt={logo.alt} />
                        <span className="text-lg font-semibold">{logo.title}</span>
                    </a>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="size-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>
                                    <a href={logo.url} className="flex items-center gap-2">
                                        <img src={logo.src} className="w-8" alt={logo.alt} />
                                        <span className="text-lg font-semibold">{logo.title}</span>
                                    </a>
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
        </>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title} className="">
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
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
        <NavLink
            key={item.title}
            active={false}
            href={item.url}
        >
            {item.title}
        </NavLink>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title} className="border-b-0">
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">{item.title}</AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <a key={item.title} href={item.url} className="text-md">
            {item.title}
        </a>
    );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <a
            className="text-md hover:bg-muted hover:text-accent-foreground flex w-96 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
            href={item.url}
        >
            <div>{item.icon}</div>
            <div>
                <div className="font-semibold">{item.title}</div>
                {item.description && <p className="text-muted-foreground text-sm leading-snug">{item.description}</p>}
            </div>
        </a>
    );
};

export default AppNavbar;
