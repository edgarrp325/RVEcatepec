import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type AttendanceResponse, type BreadcrumbItem, type Laboratory } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

import { useAttendanceData } from '@/hooks/useAttendanceData';
import { DataTable } from './data-table';

import { columns } from '@/pages/admin/columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laboratories',
        href: '/laboratories',
    },
];

interface LaboratoriesProps {
    laboratories: Laboratory[];
    attendanceResponse: AttendanceResponse[];
    status?: string;
}

interface LaboratoryForm {
    [key: string]: string;
    name: string;
    opening_time: string;
    closing_time: string;
}

export default function Laboratories({ laboratories, attendanceResponse }: LaboratoriesProps) {
    const { attendanceData } = useAttendanceData(attendanceResponse);
    const { data, setData, post, put, processing, errors, clearErrors, reset } = useForm<LaboratoryForm>({
        name: '',
        opening_time: '',
        closing_time: '',
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditSelected, setIsEditSelected] = useState(false);
    const [currentLaboratory, setCurrentLaboratory] = useState<Laboratory | undefined>();
    const [dialogLabels, setDialogLabels] = useState({
        title: '',
        description: '',
        button: '',
    });

    const dialogVariants = {
        create: {
            title: 'New Laboratory',
            description: 'You can create a new laboratory and set its schedule',
            button: 'Create',
        },
        edit: {
            title: 'Edit Laboratory',
            description: 'You can edit the name and the schedule for this laboratory',
            button: 'Update',
        },
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEditSelected) {
            put(route('laboratories.update', currentLaboratory?.id), {
                onSuccess: () => {
                    toast.success('Laboratory updated successfully');
                    closeDialog();
                },
                onFinish: () => reset(),
            });
        } else {
            post(route('laboratories.store'), {
                onSuccess: () => {
                    toast.success('Laboratory created successfully');
                    closeDialog();
                },
                onFinish: () => reset(),
            });
        }
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        clearErrors();
        reset();
    };

    const openDialog = (variant: 'create' | 'edit', laboratory?: Laboratory) => {
        setDialogLabels(dialogVariants[variant]);
        setIsEditSelected(variant === 'edit');
        if (variant === 'edit' && laboratory) {
            setCurrentLaboratory(laboratory);
            setData({
                name: laboratory.name,
                opening_time: laboratory.opening_time,
                closing_time: laboratory.closing_time,
            });
        }
        setIsDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laboratories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* New lab and list all  */}
                <div>
                    <Button onClick={() => openDialog('create')}>New</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                    {laboratories.map((laboratory) => {
                        return (
                            <Card key={laboratory.id} className="w-96">
                                <CardHeader>
                                    <CardDescription>{laboratory.name}</CardDescription>
                                    <CardTitle className="text-2xl tabular-nums @[250px]/card:text-3xl">
                                        {laboratory.opening_time} - {laboratory.closing_time}
                                    </CardTitle>
                                </CardHeader>
                                <CardFooter>
                                    <Button onClick={() => openDialog('edit', laboratory)}>Edit</Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>

                {/* Dialog to create and edit lab */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{dialogLabels.title}</DialogTitle>
                            <DialogDescription>{dialogLabels.description}</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="lab_name">Laboratory´s name</Label>
                                    <Input
                                        id="lab_name"
                                        type="text"
                                        required
                                        autoComplete="lab_name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Enter the name of the new lab"
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="opening_time">Opening time</Label>
                                    <Input
                                        id="opening_time"
                                        type="time"
                                        required
                                        value={data.opening_time}
                                        onChange={(e) => setData('opening_time', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.opening_time} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="closing_time">Closing time</Label>
                                    <Input
                                        id="closing_time"
                                        type="time"
                                        required
                                        value={data.closing_time}
                                        onChange={(e) => setData('closing_time', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.closing_time} />
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end gap-4">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeDialog}>
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    {dialogLabels.button}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Lab attendances label */}
                <div className="py-6">
                    <h1 className="mb-4 text-2xl font-bold">Lab Attendances</h1>
                    <DataTable data={attendanceData} columns={columns} />
                </div>
            </div>
        </AppLayout>
    );
}
