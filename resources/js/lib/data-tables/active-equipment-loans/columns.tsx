import { DataTableSortableHeader } from '@/components/data-table/data-table-sortable-header';
import { Button } from '@/components/ui/button';
import texts from '@/config/texts';
import { formatTime } from '@/lib/utils';
import { EquipmentLoansResponseWithoutUser } from '@/types';
import { useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { toast } from 'sonner';

interface ButtonFinishLoanProps {
    id: number;
}
function ButtonFinishLoan({ id }: ButtonFinishLoanProps) {
    const { put, processing } = useForm({});

    const finishLoan = () => {
        put(route('equipment-loans.update', id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Loan finished successfully');
            },
            onError: () => toast.error('Something went wrong'),
        });
    };
    return (
        <Button onClick={() => finishLoan()} disabled={processing}>
            {texts.common.return}
        </Button>
    );
}
export function getColumns(): ColumnDef<EquipmentLoansResponseWithoutUser>[] {
    return [
        {
            accessorKey: 'id',
            header: 'No. bien',
        },
        {
            accessorKey: 'label',
            header: ({ column }) => <DataTableSortableHeader column={column} title={texts.common.label} />,
        },
        {
            accessorKey: 'equipment_type.name',
            header: ({ column }) => <DataTableSortableHeader column={column} title={texts.common.type} />,
        },
        {
            accessorKey: 'pivot.date',
            header: ({ column }) => <DataTableSortableHeader column={column} title={texts.common.date} />,
            cell: ({ row }) => {
                const date = row.original.pivot.date;
                const isToday = dayjs(date).isSame(dayjs(), 'day'); // Verify if the date is today
                return isToday ? texts.common.today : dayjs(date).format('D/MM/YYYY');
            },
        },
        {
            accessorKey: 'pivot.start_time',
            header: ({ column }) => <DataTableSortableHeader column={column} title={texts.common.startTime} />,
            cell: ({ row }) => formatTime(row.original.pivot.date + row.original.pivot.start_time),
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                return (
                    <span className="flex items-center gap-2">
                        <ButtonFinishLoan id={row.original.pivot.id} />
                    </span>
                );
            },
        },
    ];
}
