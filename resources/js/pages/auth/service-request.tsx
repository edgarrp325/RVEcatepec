import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RoleEnum, roleLabel } from '@/enums';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface ServiceRequestForm {
    full_name: string;
    email: string;
    procedence: string;
    institute_name: string;
    service: string;
    cv_file: File | null;
    [key: string]: string | File | null;
}

export default function ServiceRequest() {
    const { data, setData, post, processing, errors, reset } = useForm<ServiceRequestForm>({
        full_name: '',
        email: '',
        procedence: 'UAEM',
        institute_name: '',
        service: 'social_service',
        cv_file: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('service-request.send'), {
            onFinish: () => reset('code'),
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Service Request" description="Enter your details below to request a service">
            <Head title="Service Request">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <form className="flex flex-col gap-6" onSubmit={submit} encType="multipart/form-data">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                            id="full_name"
                            type="text"
                            autoComplete="full_name"
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            disabled={processing}
                            placeholder="Enter your full name"
                        />
                        <InputError message={errors.full_name} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="procedence">Procedence</Label>
                        <Select value={data.procedence} onValueChange={(value) => setData('procedence', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your procedence" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="UAEM">UAEM</SelectItem>
                                <SelectItem value="External">External</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.procedence} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="institute_name">Institute Name</Label>
                        <Input
                            id="institute_name"
                            type="text"
                            autoComplete="institute_name"
                            value={data.institute_name}
                            onChange={(e) => setData('institute_name', e.target.value)}
                            disabled={processing}
                            placeholder="Enter your institute name and major"
                        />
                        <InputError message={errors.institute_name} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="service">Service</Label>
                        <Select value={data.service} onValueChange={(value) => setData('service', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select the service you need" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='social_service'>Social Service</SelectItem>
                                <SelectItem value='internship'>Internship</SelectItem>
                                <SelectItem value="development">Development</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.service} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="cv_file">CV</Label>
                        <Input
                            id="cv_file"
                            type="file"
                            autoComplete="cv_file"
                            accept=".pdf"
                            onChange={(e) => setData('cv_file', e.target.files?.[0] ?? null)}
                            disabled={processing}
                        />
                        <InputError message={errors.cv_file} className="mt-2" />
                    </div>
                    <Button type="submit" className="mt-2 w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Send request
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
