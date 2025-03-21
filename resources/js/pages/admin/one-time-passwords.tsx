import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'One-Time Passwords',
        href: '/one-time-passwords',
    },
];

interface OTP {
    id: string;
    code: string;
}

interface OneTimePasswordsProps {
    otps: OTP[];
}

export default function OneTimePasswords({ otps }: OneTimePasswordsProps) {
    const { post, processing } = useForm({});

    const regenerateOTP = (otpType: string) => {
        post(route('otp.regenerate', otpType));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="One-Time Passwords" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex h-full flex-wrap items-center justify-center gap-4">
                    <Card className="w-96">
                        <CardHeader>
                            <CardTitle className="text-center">Admin One Time Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <p className="text-center text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{otps[0].code}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-center gap-6">
                            <div className="grid w-full items-center gap-4">
                                <Button onClick={() => regenerateOTP('admin_code')} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Regenerate
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                    <Card className="w-96">
                        <CardHeader>
                            <CardTitle className="text-center">User One Time Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <p className="text-center text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{otps[1].code}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-center gap-6">
                            <div className="grid w-full items-center gap-4">
                                <Button onClick={() => regenerateOTP('user_code')} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Regenerate
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
