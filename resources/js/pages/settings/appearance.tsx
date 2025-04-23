import { Head, usePage } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { SharedData, type BreadcrumbItem } from '@/types';

import { RoleEnum } from '@/enums';
import AppPublicLayout from '@/layouts/app-public-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    const { auth } = usePage<SharedData>().props;

    const Layout = ({ breadcrumbs, children }: { breadcrumbs: BreadcrumbItem[]; children: React.ReactNode }) => {
        if (auth.user.role_id.toString() === RoleEnum.USER) {
            return (
                <AppPublicLayout breadcrumbs={breadcrumbs}>
                    <div className="max-w-[1920px] px-4 lg:px-6">{children}</div>
                </AppPublicLayout>
            );
        }
    };
    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </Layout>
    );
}
