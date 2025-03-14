import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'One-Time Passwords',
        href: '/one-time-passwords',
    },
];

export default function OneTimePasswords() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='One-Time Passwords' />
        </AppLayout>
    );
}