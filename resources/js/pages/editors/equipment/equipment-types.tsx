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
        title: 'Equipos',
        href: '/dashboard/equipment',
    },
    {
        title: 'Tipos',
        href: '/dashboard/equipment-types',
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
            title: 'Nuevo tipo de equipo',
            description: 'Puedes crear un nuevo tipo de equipo',
            button: 'Crear',
        },
        edit: {
            title: 'Editar tipo de equipo',
            description: 'Puedes editar el nombre del tipo de equipo',
            button: 'Editar',
        },
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEditSelected) {
            put(route('equipment-types.update', selectedEquipmentType?.id), {
                onSuccess: () => {
                    toast.success('Tipo de equipo actualizado con éxito');
                    closeDialog();
                },
                onFinish: () => reset(),
            });
        } else {
            post(route('equipment-types.store'), {
                onSuccess: () => {
                    toast.success('Tipo de equipo creado con éxito');
                    closeDialog();
                },
                onFinish: () => reset(),
            });
        }
    };

    const deleteEquipmentType = () => {
        destroy(route('equipment-types.destroy', selectedEquipmentType?.id), {
            onSuccess: () => {
                toast.success('Tipo de equipo eliminado con éxito');
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
            <Head title="Tipos de equipos" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Botón de nuevo tipo de equipo */}
                <div className="px-4 md:px-6">
                    <Button variant={'outline'} onClick={() => openDialog('create')}>
                        <Plus /> Nuevo tipo de equipo
                    </Button>
                </div>

                {/* Tabla de tipos de equipos */}
                <div className="@container/main flex flex-1 flex-col gap-4 p-6">
                    <DataTable data={equipmentTypes} columns={columns} searchableColumns={['name']} filename="tipos-de-equipos" />
                </div>

                {/* Diálogo para crear/editar tipo de equipo */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{dialogLabels.title}</DialogTitle>
                            <DialogDescription>{dialogLabels.description}</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="equipment_type_name">Nombre del tipo de equipo</Label>
                                    <Input
                                        id="equipment_type_name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Escribe el nombre del tipo de equipo"
                                    />
                                    <InputError message={errors.name} />
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end gap-4">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeDialog}>
                                        Cancelar
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

                {/* Diálogo de confirmación para eliminar tipo de equipo */}
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro de eliminar este tipo de equipo?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esto eliminará permanentemente este tipo de equipo y los equipos asociados.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={closeDeleteDialog}>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={deleteEquipmentType} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Eliminar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
