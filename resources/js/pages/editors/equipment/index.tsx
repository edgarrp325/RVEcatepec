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
        title: 'Equipment',
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
        equipment_type_id: '',
        laboratory_id: '',
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
            title: 'New Equipment',
            description: 'You can create a new equipment',
            button: 'Create',
        },
        edit: {
            title: 'Edit Equipment',
            description: 'You can edit the id, label, equipment type and laboratory for this equipment',
            button: 'Edit',
        },
    };
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEditSelected) {
            put(route('equipment.update', selectedEquipment?.id), {
                onSuccess: () => {
                    toast.success('Equipment updated successfully');
                    closeDialog();
                },
                onFinish: () => reset(),
            });
        } else {
            post(route('equipment.store'), {
                onSuccess: () => {
                    toast.success('Equipment created successfully');
                    closeDialog();
                },
                onFinish: () => reset(),
            });
        }
    };
    const deleteEquipment = () => {
        destroy(route('equipment.destroy', selectedEquipment?.id), {
            onSuccess: () => {
                toast.success('Equipment type deleted successfully');
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
            <Head title="Equipments" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                {/* New Equipment button  */}
                <div className="px-4 md:px-6">
                    <Button variant={'outline'} onClick={() => openDialog('create')}>
                        <Plus /> New Equipment
                    </Button>
                </div>
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 md:gap-6">
                        {/* iMacs cards grid */}
                        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 lg:px-6 @xl/main:grid-cols-3 @5xl/main:grid-cols-6">
                            {iMacs.map((iMac) => {
                                return (
                                    <Card key={iMac.id} className="@container/card">
                                        <CardHeader className="relative">
                                            <CardDescription>{'In use for ' + formatMinutes(iMac.used_time)}</CardDescription>
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
                                            {iMac.status === 'In use' && (
                                                <>
                                                    <CardTitle>{iMac.user_full_name}</CardTitle>
                                                    <LogOut className="size-8" />
                                                </>
                                            )}
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>
                        {/* Equipment table */}
                        <div className="@container/main flex flex-1 flex-col gap-4 p-6">
                            <DataTable
                                data={equipmentData}
                                columns={columns}
                                searchableColumns={['id', 'equipment_type_name', 'label', 'user_full_name']}
                                filters={[statusFilter, laboratoryFilter]}
                                filename="Equipment"
                            />
                        </div>
                        {/* Dialog to edit Equipment  */}
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
                                                    placeholder="Enter the equipment id"
                                                />
                                                <InputError message={errors.id} />
                                            </div>
                                        )}

                                        <div className="grid gap-2">
                                            <Label htmlFor="equipment_label">Label</Label>
                                            <Input
                                                id="equipment_label"
                                                type="text"
                                                autoComplete="equipment_label"
                                                value={data.label}
                                                onChange={(e) => setData('label', e.target.value)}
                                                disabled={processing}
                                                placeholder="Enter the equipment label (Model - number)"
                                            />
                                            <InputError message={errors.label} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="equipment_types">Equipment type</Label>
                                            <Select
                                                value={data.equipment_type_id.toString()}
                                                onValueChange={(value) => setData('equipment_type_id', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the type of equipment you need" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {equipmentTypes.map((equipmentType) => (
                                                        <SelectItem key={equipmentType.id} value={equipmentType.id.toString()}>
                                                            {equipmentType.name.charAt(0).toUpperCase() + equipmentType.name.slice(1)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="laboratories">Laboratory</Label>
                                            <Select value={data.laboratory_id.toString()} onValueChange={(value) => setData('laboratory_id', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the laboratory where the equipment is located" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {laboratories.map((laboratory) => (
                                                        <SelectItem key={laboratory.id} value={laboratory.id.toString()}>
                                                            {laboratory.name.charAt(0).toUpperCase() + laboratory.name.slice(1)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
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
                        {/* Alert dialog to delete Equipment  */}
                        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure to delete this equipment?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete this equipment and the associated loans.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={closeDeleteDialog}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={deleteEquipment} disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Delete
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
