import { AppContent } from '@/components/app-content';
import AppFooter from '@/components/app-footer';
import AppPublicHeader from '@/components/app-public-header';
import { AppShell } from '@/components/app-shell';
import { publicMenu, publicMenuAuthButtons, publicMenuLogo } from '@/config/public-menu';
import { type BreadcrumbItem } from '@/types';

interface AppHeaderLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppHeaderLayout({ children, breadcrumbs }: AppHeaderLayoutProps) {
    return (
        <AppShell>
            <header className="mb-16 lg:mb-6">
                <AppPublicHeader breadcrumbs={breadcrumbs} menu={publicMenu} logo={publicMenuLogo} authButtons={publicMenuAuthButtons} />
            </header>
            <AppContent variant="public">{children}</AppContent>
            <AppFooter className="mt-16" />
        </AppShell>
    );
}
