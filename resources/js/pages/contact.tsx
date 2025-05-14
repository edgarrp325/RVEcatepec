import AppPublicLayout from '@/layouts/app-public-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Contacto',
        href: '/contact',
    },
];

export default function Contact() {
    return (
        <AppPublicLayout breadcrumbs={breadcrumb}>
            <Head title="Contacto" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">Contacto</div>
        </AppPublicLayout>
    );
}
