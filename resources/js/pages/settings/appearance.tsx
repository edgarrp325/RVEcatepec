import { Head, usePage } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { SharedData, type BreadcrumbItem } from '@/types';

import { RoleEnum } from '@/enums';
import AppLayout from '@/layouts/app-layout';
import AppPublicLayout from '@/layouts/app-public-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Apariencia',
        href: '/settings/appearance',
    },
];

const Layout = ({ breadcrumbs, children, role }: { breadcrumbs: BreadcrumbItem[]; children: React.ReactNode; role: string }) => {
    if (role === RoleEnum.USER) {
        return (
            <AppPublicLayout breadcrumbs={breadcrumbs}>
                <div className="max-w-[1920px] px-4 lg:px-6">{children}</div>
            </AppPublicLayout>
        );
    }
    return <AppLayout>{children}</AppLayout>;
};

export default function Appearance() {
    const { auth } = usePage<SharedData>().props;
    const role = auth.user.role_id.toString();

    return (
        <Layout breadcrumbs={breadcrumbs} role={role}>
            <Head title="Configuración de apariencia" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Ajustes de Apariencia" description="Aquí puedes personalizar la apariencia de tu interfaz." />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </Layout>
    );
}
