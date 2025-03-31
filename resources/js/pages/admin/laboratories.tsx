import { DataTable } from '@/components/data-table/data-table';
import InputError from '@/components/input-error';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type AttendanceResponse, type BreadcrumbItem, type Laboratory } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Plus, Trash } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

import { columns } from '@/lib/data-tables/attendance/columns';
import { isActiveFilter, laboratoryFilter } from '@/lib/data-tables/attendance/filters';
import { transformAttendanceData } from '@/lib/data-tables/attendance/transformer';

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
    const attendanceData = transformAttendanceData(attendanceResponse);
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        clearErrors,
        reset,
    } = useForm<LaboratoryForm>({
        name: '',
        opening_time: '',
        closing_time: '',
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);
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

    const deleteAllAttendance = () => {
        destroy(route('attendance.destroy-all'), {
            onSuccess: () => {
                setIsDeleteAllDialogOpen(false);
                toast.success('Attendance history deleted successfully');
            },
            onFinish: () => reset(),
            onError: () => toast.error('Something went wrong'),
        });
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        clearErrors();
        reset();
    };
    const closeDeleteDialog = () => {
        setIsDeleteAllDialogOpen(false);
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
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                {/* New lab button  */}
                <div className="px-4 md:px-6">
                    <Button variant={'outline'} onClick={() => openDialog('create')}>
                        <Plus /> New Laboratory
                    </Button>
                </div>
                {/* Delete all equipment loans button  */}
                {attendanceResponse.length > 0 && <div className="px-4 md:px-6"></div>}
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 md:gap-6">
                        {/* Laboratories cards grid */}
                        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                            {laboratories.map((laboratory) => {
                                return (
                                    <Card key={laboratory.id} className="@container/card">
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
                        {/* Lab attendances table */}
                        <div className="@container/main flex flex-1 flex-col gap-4 p-6">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Lab attendances</h2>
                                <p className="text-muted-foreground">
                                    Here&apos;s a list of lab attendances you can filter, search, sort and export!
                                </p>
                                {/* Delete all attendances button  */}
                                {attendanceResponse.length > 0 && (
                                    <div className="mt-6">
                                        <Button variant={'destructive'} size={'sm'} onClick={() => setIsDeleteAllDialogOpen(true)}>
                                            <Trash /> Delete history
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <DataTable
                                data={attendanceData}
                                columns={columns}
                                searchableColumns={['account_number', 'user_full_name', 'date']}
                                filters={[laboratoryFilter, isActiveFilter]}
                                filename="lab_attendances"
                            />
                        </div>
                    </div>
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
                {/* Alert dialog to delete all attendance */}
                <AlertDialog open={isDeleteAllDialogOpen} onOpenChange={setIsDeleteAllDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-destructive">Are you sure to delete every attendance?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete the attendance history; only active attendance may remain unaffected.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={closeDeleteDialog}>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={deleteAllAttendance} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Delete permanently
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
