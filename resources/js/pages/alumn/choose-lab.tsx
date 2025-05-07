import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Laboratory, SharedData } from '@/types';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RoleEnum } from '@/enums';
import { formatMinutes } from '@/lib/utils';

interface ChooseLabForm {
    laboratory_id: number;
    [key: string]: number;
}

interface ChooseLabProps {
    laboratories: Laboratory[];
    totalServiceMinutes: number;
}

export default function ChooseLab({ laboratories, totalServiceMinutes }: ChooseLabProps) {
    const { data, setData, post, processing } = useForm<ChooseLabForm>({
        laboratory_id: 1,
    });
    const { auth } = usePage<SharedData>().props;
    const currentRole = auth.user.role_id.toString();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('attendance.store'));
    };
    console.log(currentRole);

    return (
        <AuthLayout title="Choose a laboratory" description="Select the laboratory you are going to stay">
            <Head title="Register" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                {(currentRole === RoleEnum.SOCIALSERVICE || currentRole === RoleEnum.INTERNSHIP) && (
                    <Card className="w-full max-w-lg border-emerald-200 bg-emerald-50">
                        <CardHeader>
                            <CardTitle className="text-xl tracking-tight">Total service hours</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="grid gap-4">
                                <div>
                                    <p className="text-muted-foreground text-sm">Total</p>
                                    <p className="text-2xl font-semibold tabular-nums @[250px]/card:text-5xl">{formatMinutes(totalServiceMinutes)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="laboratories">Laboratory</Label>
                        <Select value={data.laboratory_id.toString()} onValueChange={(value) => setData('laboratory_id', Number(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select the laboratory you are going to stay" />
                            </SelectTrigger>
                            <SelectContent>
                                {laboratories.map((laboratory) => (
                                    <SelectItem key={laboratory.id} value={laboratory.id.toString()}>
                                        {laboratory.name.charAt(0).toUpperCase() +
                                            laboratory.name.slice(1) +
                                            ' ( ' +
                                            laboratory.opening_time +
                                            ' - ' +
                                            laboratory.closing_time +
                                            ' )'}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="mt-2 w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Continue
                    </Button>
                    <Link href={route('home')} className={buttonVariants({ variant: 'link' })}>
                        Go home
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
