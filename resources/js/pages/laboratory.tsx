import AppPublicLayout from '@/layouts/app-public-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Laboratorio',
        href: '/laboratory',
    },
];

export default function Laboratory() {
    return (
        <AppPublicLayout breadcrumbs={breadcrumb}>
            <Head title="Laboratorio" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">Laboratorio</div>
        </AppPublicLayout>
    );
}
