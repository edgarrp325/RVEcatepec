import AppPublicLayout from '@/layouts/app-public-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Services',
        href: route('services'),
    },
];

export default function Services() {
    return (
        <AppPublicLayout breadcrumbs={breadcrumb}>
            <Head title="Services" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">Services</div>
        </AppPublicLayout>
    );
}
