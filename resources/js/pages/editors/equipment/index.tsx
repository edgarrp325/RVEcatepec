import { DataTable } from '@/components/data-table/data-table';
import ImacIcon from '@/components/imac-icon';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { getColumns } from '@/lib/data-tables/equipment/columns';
import { laboratoryFilter, statusFilter } from '@/lib/data-tables/equipment/filters';
import { transformEquipmentData } from '@/lib/data-tables/equipment/transformer';
import { cn, formatMinutes, getBadgeColor } from '@/lib/utils';
import { Equipment, EquipmentResponse, EquipmentType, type BreadcrumbItem, type Laboratory } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, LogOut, Plus } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Equipos',
        href: '/dashboard/equipment',
    },
];

interface EquipmentProps {
    equipment: EquipmentResponse[];
    equipmentTypes: EquipmentType[];
    laboratories: Laboratory[];
}

interface EquipmentForm {
    [key: string]: string;
    id: string;
    label: string;
    equipment_type_id: string;
    laboratory_id: string;
}

export default function Equipments({ equipment, equipmentTypes, laboratories }: EquipmentProps) {
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
    } = useForm<EquipmentForm>({
        id: '',
        label: '',
        equipment_type_id: '1',
        laboratory_id: '1',
    });

    const equipmentData = transformEquipmentData(equipment);
    const iMacs = equipmentData.filter((equipment) => equipment.equipment_type_id === 1);

    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
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
            title: 'Nuevo equipo',
            description: 'Puedes crear un nuevo equipo',
            button: 'Crear',
        },
        edit: {
            title: 'Editar equipo',
            description: 'Puedes editar el número, nombre, tipo y laboratorio de este equipo',
            button: 'Editar',
        },
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEditSelected) {
            put(route('equipment.update', selectedEquipment?.id), {
                onSuccess: () => {
                    toast.success('Equipo actualizado exitosamente');
                    closeDialog();
                },
                onFinish: () => reset(),
            });
        } else {
            post(route('equipment.store'), {
                onSuccess: () => {
                    toast.success('Equipo creado exitosamente');
                    closeDialog();
                },
                onFinish: () => reset(),
            });
        }
    };

    const deleteEquipment = () => {
        destroy(route('equipment.destroy', selectedEquipment?.id), {
            onSuccess: () => {
                toast.success('Equipo eliminado exitosamente');
                closeDialog();
            },
        });
    };

    const openDialog = (variant: 'create' | 'edit', equipment?: Equipment) => {
        setDialogLabels(dialogVariants[variant]);
        setIsEditSelected(variant === 'edit');
        if (variant === 'edit' && equipment) {
            setSelectedEquipment(equipment);
            setData({
                id: equipment.id,
                label: equipment.label,
                equipment_type_id: equipment.equipment_type_id.toString(),
                laboratory_id: equipment.laboratory_id.toString(),
            });
        }
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedEquipment(null);
        clearErrors();
        reset();
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedEquipment(null);
        clearErrors();
        reset();
    };

    const finishLoan = (id: number) => {
        put(route('equipment-loans.update', id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Préstamo finalizado correctamente');
            },
            onError: () => toast.error('Algo salió mal'),
        });
    };
    useEffect(() => {
        if (selectedEquipment) {
            setData({
                id: '',
                label: selectedEquipment.label,
                equipment_type_id: selectedEquipment.equipment_type_id.toString(),
                laboratory_id: selectedEquipment.laboratory_id.toString(),
            });
        }
    }, [selectedEquipment]);

    useEffect(() => {
        if (!isDialogOpen) {
            setSelectedEquipment(null);
            clearErrors();
            reset();
        }
    }, [isDialogOpen]);

    const columns = getColumns({ setSelectedEquipment, openDialog, setIsDeleteDialogOpen });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Equipos" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                <div className="px-4 md:px-6">
                    <Button variant={'outline'} onClick={() => openDialog('create')}>
                        <Plus /> Nuevo equipo
                    </Button>
                </div>

                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 md:gap-6">
                        {/* Tarjetas de iMacs */}
                        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 lg:px-6 @xl/main:grid-cols-3 @5xl/main:grid-cols-6">
                            {iMacs.map((iMac) => (
                                <Card key={iMac.id} className="@container/card">
                                    <CardHeader className="relative">
                                        <CardDescription>{'En uso por ' + formatMinutes(iMac.used_time)}</CardDescription>
                                        <div className="absolute top-0 right-4 h-fit w-fit">
                                            <Badge className={cn('flex size-5 gap-1 rounded-full text-xs', getBadgeColor(iMac.status))} />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div
                                            className={cn(
                                                'relative flex w-full justify-center',
                                                iMac.status === 'Maintenance' || iMac.status === 'In use' ? 'opacity-50' : '',
                                            )}
                                        >
                                            <ImacIcon className="size-28" />
                                            <p className="text-primary-foreground absolute bottom-1/2 z-10 text-2xl font-semibold tabular-nums">
                                                {iMac.label}
                                            </p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between gap-4">
                                        {iMac.status === 'In use' && iMac.loan_id && (
                                            <>
                                                <CardTitle>{iMac.user_full_name}</CardTitle>
                                                <Button variant="ghost" onClick={() => finishLoan(iMac.loan_id)} disabled={processing}>
                                                    <LogOut className="size-8" />
                                                </Button>
                                            </>
                                        )}
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        {/* Tabla de equipos */}
                        <div className="@container/main flex flex-1 flex-col gap-4 p-6">
                            <DataTable
                                data={equipmentData}
                                columns={columns}
                                searchableColumns={['id', 'equipment_type_name', 'label', 'user_full_name']}
                                filters={[statusFilter, laboratoryFilter]}
                                filename="Equipos"
                            />
                        </div>

                        {/* Diálogo para editar equipo */}
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{dialogLabels.title}</DialogTitle>
                                    <DialogDescription>{dialogLabels.description}</DialogDescription>
                                </DialogHeader>
                                <form onSubmit={submit}>
                                    <div className="grid gap-6">
                                        {!isEditSelected && (
                                            <div className="grid gap-2">
                                                <Label htmlFor="equipment_id">No. bien</Label>
                                                <Input
                                                    id="equipment_id"
                                                    type="text"
                                                    autoComplete="equipment_id"
                                                    value={data.id}
                                                    onChange={(e) => setData('id', e.target.value)}
                                                    disabled={processing}
                                                    placeholder="Ingresa el número del equipo"
                                                />
                                                <InputError message={errors.id} />
                                            </div>
                                        )}

                                        <div className="grid gap-2">
                                            <Label htmlFor="equipment_label">Nombre</Label>
                                            <Input
                                                id="equipment_label"
                                                type="text"
                                                autoComplete="equipment_label"
                                                value={data.label}
                                                onChange={(e) => setData('label', e.target.value)}
                                                disabled={processing}
                                                placeholder="Ingresa el nombre del equipo (modelo - número)"
                                            />
                                            <InputError message={errors.label} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="equipment_types">Tipo de equipo</Label>
                                            <Select
                                                value={data.equipment_type_id.toString()}
                                                onValueChange={(value) => setData('equipment_type_id', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona el tipo de equipo" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {equipmentTypes.map((type) => (
                                                        <SelectItem key={type.id} value={type.id.toString()}>
                                                            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="laboratories">Laboratorio</Label>
                                            <Select value={data.laboratory_id.toString()} onValueChange={(value) => setData('laboratory_id', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona el laboratorio donde está el equipo" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {laboratories.map((lab) => (
                                                        <SelectItem key={lab.id} value={lab.id.toString()}>
                                                            {lab.name.charAt(0).toUpperCase() + lab.name.slice(1)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
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

                        {/* Diálogo de confirmación para eliminar equipo */}
                        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>¿Estás seguro de eliminar este equipo?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Esto eliminará permanentemente el equipo y sus préstamos asociados.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={closeDeleteDialog}>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={deleteEquipment} disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Eliminar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
