import AppPublicLayout from '@/layouts/app-public-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Servicios',
        href: route('services'),
    },
];

export default function Services() {
    return (
        <AppPublicLayout breadcrumbs={breadcrumb}>
            <Head title="Servicios" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">Servicios</div>
        </AppPublicLayout>
    );
}
