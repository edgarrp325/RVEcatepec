import { DataTableSortableHeader } from '@/components/data-table/data-table-sortable-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn, formatMinutes, getBadgeColor } from '@/lib/utils';
import { Equipment, EquipmentTable } from '@/types';
import { useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { LogOut, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

interface GetColumnsProps {
    setSelectedEquipment: (selectedEquipment: Equipment) => void;
    openDialog: (variant: 'create' | 'edit', equipment?: Equipment) => void;
    setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void;
}

interface ButtonFinishLoanProps {
    loan_id: number;
}
function ButtonFinishLoan({ loan_id }: ButtonFinishLoanProps) {
    const { put, processing } = useForm({});

    const finishLoan = () => {
        put(route('equipment-loans.update', loan_id), {
            onSuccess: () => {
                toast.success('Loan finished successfully');
            },
            onError: () => toast.error('Something went wrong'),
        });
    };
    return (
        <Button variant="ghost" onClick={() => finishLoan()} disabled={processing}>
            <LogOut className="h-4 w-4" />
        </Button>
    );
}

export function getColumns({ setSelectedEquipment, openDialog, setIsDeleteDialogOpen }: GetColumnsProps): ColumnDef<EquipmentTable>[] {
    return [
        {
            accessorKey: 'id',
            header: 'No. bien',
        },
        {
            accessorKey: 'equipment_type_name',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Type" />,
        },
        {
            accessorKey: 'label',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Label" />,
        },
        {
            accessorKey: 'laboratory_name',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Laboratory" />,
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id));
            },
        },
        {
            accessorKey: 'status',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const status = row.original.status;
                return (
                    <Badge variant={'outline'} className={cn('w-24 bg-red-400 font-black text-white', getBadgeColor(status))}>
                        {status}
                    </Badge>
                );
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id));
            },
        },
        {
            accessorKey: 'used_time',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Used time" />,
            cell: ({ row }) => formatMinutes(row.original.used_time),
        },
        {
            accessorKey: 'user_full_name',
            header: ({ column }) => <DataTableSortableHeader column={column} title="User" />,
            cell: ({ row }) =>
                row.original.status === 'In use' ? (
                    <span className="flex items-center gap-2">
                        {row.original.user_full_name}
                        <ButtonFinishLoan loan_id={row.original.loan_id as number} />
                    </span>
                ) : (
                    <span className="">N/A</span>
                ),
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const equipmentType = row.original;
                return (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={'ghost'} className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onSelect={() => {
                                        openDialog('edit', equipmentType);
                                        setSelectedEquipment(equipmentType);
                                    }}
                                >
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={() => {
                                        setIsDeleteDialogOpen(true);
                                        setSelectedEquipment(equipmentType);
                                    }}
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                );
            },
        },
    ];
}
