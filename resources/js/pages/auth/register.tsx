import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MajorEnum, RoleEnum } from '@/enums';
import AuthLayout from '@/layouts/auth-layout';
import { type Major, type Role } from '@/types';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import texts from '@/config/texts';

interface RegisterForm {
    account_number: string;
    paternal_surname: string;
    maternal_surname: string;
    name: string;
    origin: string; // origin or another major
    major_id: string;
    email: string;
    password: string;
    password_confirmation: string;
    role_id: string;
    code: string;
    [key: string]: string;
}

interface RegisterProps {
    roles: Role[];
    majors: Major[];
}

export default function Register({ roles, majors }: RegisterProps) {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        account_number: '',
        paternal_surname: '',
        maternal_surname: '',
        name: '',
        origin: '',
        major_id: MajorEnum.ICO,
        email: '',
        password: '',
        password_confirmation: '',
        role_id: RoleEnum.USER,
        code: '',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isSelectedUser = data.role_id === RoleEnum.USER;
    const isSelectedOtherMajor = data.major_id === MajorEnum.OTHER;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isSelectedUser) {
            return sendRegister();
        }
        setIsDialogOpen(true);
    };

    const sendRegister = () => {
        post(route('register'), {
            onFinish: () => reset('code'),
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    };

    const handleRoleChange = (value: string) => {
        setData('role_id', value);
        if (value === RoleEnum.USER) {
            setData('major_id', MajorEnum.ICO);
        }
    };

    useEffect(() => {
        setIsDialogOpen(!!errors.code);
    }, [errors]);

    return (
        <AuthLayout title={texts.register.title} description={texts.register.description}>
            <Head title={texts.register.title} />
            <div className="text-muted-foreground -mt-4 text-center text-sm">
                {texts.register.info}
                {'  '}
                <TextLink href={route('home')} tabIndex={5}>
                    {texts.common.termsAndConditions}
                </TextLink>
            </div>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="roles">{texts.common.typeUser} </Label>
                        <Select value={data.role_id.toString()} onValueChange={(value) => handleRoleChange(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={texts.register.placeHolderRole} />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role.id} value={role.id.toString()}>
                                        {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                            <small>{texts.common.description + ': ' + roles[parseInt(data.role_id) - 1].description}</small>
                        </Select>
                    </div>
                    {!isSelectedUser && (
                        <div className="grid gap-2">
                            <Label htmlFor="account_number" required>
                                {texts.common.accountNumber}
                            </Label>
                            <Input
                                id="account_number"
                                type="text"
                                autoComplete="account_number"
                                value={data.account_number}
                                onChange={(e) => setData('account_number', e.target.value)}
                                disabled={processing}
                                placeholder={texts.register.placeHolderAccountNumber}
                            />
                            <InputError message={errors.account_number} className="mt-2" />
                        </div>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="paternal_surname" required>{texts.common.paternalSurname}</Label>
                        <Input
                            id="paternal_surname"
                            type="text"
                            autoComplete="paternal_surname"
                            value={data.paternal_surname}
                            onChange={(e) => setData('paternal_surname', e.target.value)}
                            disabled={processing}
                            placeholder={texts.register.placeHolderPaternalSurname}
                        />
                        <InputError message={errors.paternal_surname} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="maternal_surname">{texts.common.maternalSurname}</Label>
                        <Input
                            id="maternal_surname"
                            type="text"
                            autoComplete="maternal_surname"
                            value={data.maternal_surname}
                            onChange={(e) => setData('maternal_surname', e.target.value)}
                            disabled={processing}
                            placeholder={texts.register.placeHolderMaternalSurname}
                        />
                        <InputError message={errors.maternal_surname} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name" required>{texts.common.name}</Label>
                        <Input
                            id="name"
                            type="text"
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder={texts.register.placeHolderName}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {!isSelectedUser && (
                        <div className="grid gap-2">
                            <Label htmlFor="majors">{texts.common.major}</Label>
                            <Select value={data.major_id.toString()} onValueChange={(value) => setData('major_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder={texts.register.placeHolderMajor} />
                                </SelectTrigger>
                                <SelectContent>
                                    {majors.map((major) => (
                                        <SelectItem key={major.id} value={major.id.toString()}>
                                            {major.name.charAt(0).toUpperCase() + major.name.slice(1)}
                                        </SelectItem>
                                    ))}
                                    <SelectItem key={MajorEnum.OTHER} value={MajorEnum.OTHER}>
                                        {texts.common.other}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {(isSelectedUser || isSelectedOtherMajor) && (
                        <div className="grid gap-2">
                            {!isSelectedOtherMajor && <Label htmlFor="origin" required>{texts.common.origin}</Label>}
                            <Input
                                id="origin"
                                type="text"
                                autoComplete="origin"
                                value={data.origin}
                                onChange={(e) => setData('origin', e.target.value)}
                                disabled={processing}
                                placeholder={!isSelectedOtherMajor ? texts.register.placeHolderOrigin : texts.register.placeHolderOtherMajor}
                            />
                            <InputError message={errors.origin} className="mt-2" />
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="email" required>{texts.common.email}</Label>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder={texts.common.placeHolderEmail}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" required>{texts.common.password}</Label>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder={texts.common.placeHolderPassword}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" required>{texts.common.confirmPassword}</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder={texts.register.placeHolderConfirmPassword}
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {texts.register.button}
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    {texts.register.alreadyHaveAccount} <TextLink href={route('login')}>{texts.login.button}</TextLink>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{texts.modals.otp.title}</DialogTitle>
                            <DialogDescription>{texts.modals.otp.description}</DialogDescription>
                        </DialogHeader>
                        <div className="w-full flex-col items-center justify-center gap-2 p-4">
                            <InputOTP value={data.code} onChange={(value) => setData('code', value)} maxLength={6} onComplete={sendRegister}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                            <InputError message={errors.code} />
                        </div>
                    </DialogContent>
                </Dialog>
            </form>
        </AuthLayout>
    );
}
