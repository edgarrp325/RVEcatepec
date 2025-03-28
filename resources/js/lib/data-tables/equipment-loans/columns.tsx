import { DataTableSortableHeader } from '@/components/data-table/data-table-sortable-header';
import { EquipmentLoansTable } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

export function getColumns(): ColumnDef<EquipmentLoansTable>[] {
    return [
        {
            accessorKey: 'equipment_id',
            header: 'No. bien',
        },
        {
            accessorKey: 'equipment_label',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Label" />,
        },
        {
            accessorKey: 'equipment_type',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Type" />,
        },
        {
            accessorKey: 'user_full_name',
            header: ({ column }) => <DataTableSortableHeader column={column} title="User" />,
        },
        {
            accessorKey: 'loan_date',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Date" />,
            cell: ({ row }) => {
                const date = row.original.loan_date;
                const isToday = dayjs(date).isSame(dayjs(), 'day'); // Verify if the date is today
                return isToday ? 'Today' : dayjs(date).format('D/MM/YYYY');
            },
        },
        {
            accessorKey: 'loan_start_time',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Start time" />,
        },
        {
            accessorKey: 'loan_end_time',
            header: ({ column }) => <DataTableSortableHeader column={column} title="End time" />,
            cell: ({ row }) => row.original.loan_end_time ?? 'In progress',
        },
    ];
}
