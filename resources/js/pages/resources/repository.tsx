import AppPublicLayout from '@/layouts/app-public-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Recursos',
        href: '/resources',
    },
];

export default function Repository() {
    return (
        <AppPublicLayout breadcrumbs={breadcrumb}>
            <Head title="Recursos" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">Repositorio</div>
        </AppPublicLayout>
    );
}
