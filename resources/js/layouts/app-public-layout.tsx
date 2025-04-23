import AppLayoutTemplate from '@/layouts/app/app-public-header-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppPublicLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const page = usePage<SharedData>();
    const { flash } = page.props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster richColors />
        </AppLayoutTemplate>
    );
}
