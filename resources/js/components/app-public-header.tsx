import { BreadcrumbItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';

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

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

const isRouteActive = (currentUrl: string, targetUrl: string) => (targetUrl === '/' ? currentUrl === '/' : currentUrl.startsWith(targetUrl));

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
    menu,
    authButtons = {
        login: { text: 'Log in', url: 'login' },
        signup: { text: 'Sign up', url: 'register' },
        dashboard: { text: 'Dashboard', url: 'dashboard' },
    },
    breadcrumbs = [],
}: NavbarProps) => {
    const page = usePage<SharedData>();
    const { auth } = page.props;

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
                            <NavigationMenuList>{menu?.map((item) => renderMenuItem(item, page.url))}</NavigationMenuList>
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
                                    {menu?.map((item) => renderMobileMenuItem(item))}
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
            <div className="border-sidebar-border/70 flex w-full border-b">
                <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-[1920px]">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>
        </>
    );
};

const renderMenuItem = (item: MenuItem, url: string) => {
    const isActive = isRouteActive(url, item.url);
    const hasActiveChild = item.items?.some((subItem) => isRouteActive(url, subItem.url));
    const active = isActive || hasActiveChild;
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <Link href={item.url}>
                    <NavigationMenuTrigger
                        className={`hover:cursor-pointer text-md relative px-2 font-normal after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-green-600 after:transition after:duration-500 ${
                            active ? 'font-bold text-black after:scale-x-100' : 'hover:text-black hover:after:scale-x-100'
                        }`}
                    >
                        {item.title}
                    </NavigationMenuTrigger>
                </Link>
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
        <NavigationMenuItem key={item.title}>
            <Link href={item.url}>
                <NavigationMenuLink
                    className={`text-md relative font-normal after:absolute after:bottom-0.5 after:left-0 after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-green-600 after:transition after:duration-500 ${
                        active ? 'font-bold text-black after:scale-x-100' : 'hover:text-black hover:after:scale-x-100'
                    }`}
                    active={url.startsWith(item.url)}
                >
                    {item.title}
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
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
