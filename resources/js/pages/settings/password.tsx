import InputError from '@/components/input-error';
import SettingsLayout from '@/layouts/settings/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RoleEnum } from '@/enums';
import AppLayout from '@/layouts/app-layout';
import AppPublicLayout from '@/layouts/app-public-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password Settings',
        href: '/settings/password',
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

export default function Password() {
    const { auth } = usePage<SharedData>().props;
    const role = auth.user.role_id.toString();
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <Layout breadcrumbs={breadcrumbs} role={role}>
            <Head title="Change Password" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Change Your Password" description="Please update your password below." />

                    <form onSubmit={updatePassword} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="current_password">Current Password</Label>

                            <Input
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                placeholder="Enter your current password"
                            />

                            <InputError message={errors.current_password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">New Password</Label>

                            <Input
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Enter a new password"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm New Password</Label>

                            <Input
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Confirm your new password"
                            />

                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Update Password</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Your password has been updated successfully!</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </Layout>
    );
}
