import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export default function AuthLayout({
    children,
    title,
    description,
    size = 'sm',
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
    size?: 'sm' | 'full';
}) {
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
        <AuthLayoutTemplate title={title} description={description} variant={size} {...props}>
            {children}
            <Toaster richColors />
        </AuthLayoutTemplate>
    );
}
