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
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { getColumns } from '@/lib/data-tables/equipment-types/columns';
import { EquipmentType, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Plus } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Equipment',
        href: '/equipment',
    },
    {
        title: 'Types',
        href: '/equipment-types',
    },
];

interface EquipmentTypesProps {
    equipmentTypes: EquipmentType[];
}

interface EquipmentTypeForm {
    [key: string]: string;
    name: string;
}
export default function EquipmentTypes({ equipmentTypes }: EquipmentTypesProps) {
    const {
        data,
        setData,
        put,
        post,
        delete: destroy,
        processing,
        errors,
        clearErrors,
        reset,
    } = useForm<EquipmentTypeForm>({
        name: '',
    });
    const [selectedEquipmentType, setSelectedEquipmentType] = useState<EquipmentType | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditSelected, setIsEditSelected] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [dialogLabels, setDialogLabels] = useState({
        title: '',
        description: '',
        button: '',
    });

    const dialogVariants = {
        create: {
            title: 'New Equipment Type',
            description: 'You can create a new equipment type',
            button: 'Create',
        },
        edit: {
            title: 'Edit Equipment Type',
            description: 'You can edit the name of the equipment type',
            button: 'Edit',
        },
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEditSelected) {
            put(route('equipment-types.update', selectedEquipmentType?.id), {
                onSuccess: () => {
                    toast.success('Equipment type updated successfully');
                    closeDialog();
                },
                onFinish: () => reset(),
            });
        } else {
            post(route('equipment-types.store'), {
                onSuccess: () => {
                    toast.success('Equipment type created successfully');
                    closeDialog();
                },
                onFinish: () => reset(),
            });
        }
    };

    const deleteEquipmentType = () => {
        destroy(route('equipment-types.destroy', selectedEquipmentType?.id), {
            onSuccess: () => {
                toast.success('Equipment type deleted successfully');
                closeDialog();
            },
        });
    };
    const openDialog = (variant: 'create' | 'edit', equipmentType?: EquipmentType) => {
        setDialogLabels(dialogVariants[variant]);
        setIsEditSelected(variant === 'edit');
        if (variant === 'edit' && equipmentType) {
            setSelectedEquipmentType(equipmentType);
            setData({
                name: equipmentType.name,
            });
        }
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedEquipmentType(null);
        clearErrors();
        reset();
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedEquipmentType(null);
        clearErrors();
        reset();
    };

    useEffect(() => {
        if (selectedEquipmentType) {
            setData('name', selectedEquipmentType.name);
        }
    }, [selectedEquipmentType]);

    useEffect(() => {
        if (!isDialogOpen) {
            setSelectedEquipmentType(null);
            clearErrors();
            reset();
        }
    }, [isDialogOpen]);

    const columns = getColumns({ setSelectedEquipmentType, openDialog, setIsDeleteDialogOpen });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Equipment types" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* New equipment type button  */}
                <div className="px-4 md:px-6">
                    <Button variant={'outline'} onClick={() => openDialog('create')}>
                        <Plus /> New Equipment Type
                    </Button>
                </div>
                {/* Equipment types table */}
                <div className="@container/main flex flex-1 flex-col gap-4 p-6">
                    <DataTable data={equipmentTypes} columns={columns} searchableColumns={['name']} filename="equipment-types" />
                </div>
                {/* Dialog to edit Equipment type */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{dialogLabels.title}</DialogTitle>
                            <DialogDescription>{dialogLabels.description}</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="equipment_type_name">Equipment Type name</Label>
                                    <Input
                                        id="equipment_type_name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Enter the name of the equipment type"
                                    />
                                    <InputError message={errors.name} />
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
                {/* Alert dialog to delete Equipment type */}
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure to delete this equipment type?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete this equipment type and the associated equipments.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={closeDeleteDialog}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={deleteEquipmentType} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
