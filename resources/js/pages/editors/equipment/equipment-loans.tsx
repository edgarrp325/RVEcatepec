import { DataTable } from '@/components/data-table/data-table';
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
import AppLayout from '@/layouts/app-layout';
import { getColumns } from '@/lib/data-tables/equipment-loans/columns';
import { transformEquipmentLoanData } from '@/lib/data-tables/equipment-loans/transformer';
import { EquipmentLoansResponse, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Equipos',
        href: '/dashboard/equipment',
    },
    {
        title: 'Préstamos',
        href: '/dashboard/equipment-loans',
    },
];

interface EquipmentLoansProps {
    equipmentLoans: EquipmentLoansResponse[];
}

export default function EquipmentLoans({ equipmentLoans }: EquipmentLoansProps) {
    const { delete: destroy, processing, clearErrors, reset } = useForm({});

    const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);

    const equipmentLoanData = transformEquipmentLoanData(equipmentLoans);
    const columns = getColumns();

    const deleteAllEquipmentLoans = () => {
        destroy(route('equipment-loans.destroy-all'), {
            onSuccess: () => {
                setIsDeleteAllDialogOpen(false);
                toast.success('Historial de préstamos eliminado con éxito');
            },
            onFinish: () => reset(),
            onError: () => toast.error('Algo salió mal'),
        });
    };

    const closeDeleteDialog = () => {
        setIsDeleteAllDialogOpen(false);
        clearErrors();
        reset();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Préstamos de equipos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Botón para eliminar todos los préstamos */}
                {equipmentLoans.length > 0 && (
                    <div className="px-4 md:px-6">
                        <Button variant={'destructive'} size={'sm'} onClick={() => setIsDeleteAllDialogOpen(true)}>
                            <Trash /> Eliminar historial
                        </Button>
                    </div>
                )}
                {/* Tabla de préstamos de equipos */}
                <div className="@container/main flex flex-1 flex-col gap-4 p-6">
                    <DataTable
                        data={equipmentLoanData}
                        searchableColumns={['equipment_label', 'equipment_type', 'user_full_name']}
                        columns={columns}
                        filename="prestamos-de-equipos"
                    />
                </div>
                {/* Diálogo de confirmación para eliminar todos los préstamos */}
                <AlertDialog open={isDeleteAllDialogOpen} onOpenChange={setIsDeleteAllDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-destructive">
                                ¿Estás seguro de eliminar todos los préstamos de equipos?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Esto eliminará permanentemente el historial de préstamos. Solo los préstamos en curso podrían mantenerse.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={closeDeleteDialog}>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-destructive hover:bg-destructive/90"
                                onClick={deleteAllEquipmentLoans}
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Eliminar permanentemente
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
