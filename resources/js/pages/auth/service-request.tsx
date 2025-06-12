import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
        <AuthLayout title="Solicitud de Servicio" description="Ingresa tus datos para solicitar un servicio">
            <Head title="Solicitud de Servicio">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <form className="flex flex-col gap-6" onSubmit={submit} encType="multipart/form-data">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="full_name">Nombre completo</Label>
                        <Input
                            id="full_name"
                            type="text"
                            autoComplete="full_name"
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            disabled={processing}
                            placeholder="Ingresa tu nombre completo"
                        />
                        <InputError message={errors.full_name} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="correo@ejemplo.com"
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="procedence">Procedencia</Label>
                        <Select value={data.procedence} onValueChange={(value) => setData('procedence', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona tu procedencia" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="UAEM">UAEM</SelectItem>
                                <SelectItem value="External">Externo</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.procedence} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="institute_name">Nombre del instituto</Label>
                        <Input
                            id="institute_name"
                            type="text"
                            autoComplete="institute_name"
                            value={data.institute_name}
                            onChange={(e) => setData('institute_name', e.target.value)}
                            disabled={processing}
                            placeholder="Ingresa el nombre de tu institución y carrera"
                        />
                        <InputError message={errors.institute_name} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="service">Servicio</Label>
                        <Select value={data.service} onValueChange={(value) => setData('service', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona el servicio que necesitas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="social_service">Servicio Social</SelectItem>
                                <SelectItem value="internship">Prácticas Profesionales</SelectItem>
                                <SelectItem value="development">Desarrollo</SelectItem>
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
                        Enviar solicitud
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
