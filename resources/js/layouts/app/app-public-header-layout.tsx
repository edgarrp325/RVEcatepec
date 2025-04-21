import { AppContent } from '@/components/app-content';
import AppPublicHeader from '@/components/app-public-header';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';
import {publicMenu} from '@/config/public-menu';

interface AppHeaderLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppHeaderLayout({ children, breadcrumbs }: AppHeaderLayoutProps) {
    return (
        <AppShell>
            <header className="mb-16 lg:mb-6">
                <AppPublicHeader breadcrumbs={breadcrumbs} menu={publicMenu} />
            </header>
            <AppContent variant="public">{children}</AppContent>
            <footer className="h-48 bg-yellow-500"></footer>
        </AppShell>
    );
}
