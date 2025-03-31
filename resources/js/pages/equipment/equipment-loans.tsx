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
        title: 'Equipment',
        href: '/equipment',
    },
    {
        title: 'Loans',
        href: '/equipment-loans',
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
                toast.success('Equipment Loans history deleted successfully');
            },
            onFinish: () => reset(),
            onError: () => toast.error('Something went wrong'),
        });
    };

    const closeDeleteDialog = () => {
        setIsDeleteAllDialogOpen(false);
        clearErrors();
        reset();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Equipment Loans" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Delete all equipment loans button  */}
                {equipmentLoans.length > 0 && (
                    <div className="px-4 md:px-6">
                        <Button variant={'destructive'} onClick={() => setIsDeleteAllDialogOpen(true)}>
                            <Trash /> Delete history
                        </Button>
                    </div>
                )}
                {/* Equipment loans table */}
                <div className="@container/main flex flex-1 flex-col gap-4 p-6">
                    <DataTable
                        data={equipmentLoanData}
                        searchableColumns={['equipment_label', 'equipment_type', 'user_full_name']}
                        columns={columns}
                        filename="equipment-loans"
                    />
                </div>
                {/* Alert dialog to delete all Equipment loans */}
                <AlertDialog open={isDeleteAllDialogOpen} onOpenChange={setIsDeleteAllDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-destructive">Are you sure to delete every equipment loan?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete the loan history; only in-progress loans may remain unaffected.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={closeDeleteDialog}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-destructive hover:bg-destructive/90"
                                onClick={deleteAllEquipmentLoans}
                                disabled={processing}
                            >
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
