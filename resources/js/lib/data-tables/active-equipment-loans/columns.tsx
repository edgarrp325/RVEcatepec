import { DataTableSortableHeader } from '@/components/data-table/data-table-sortable-header';
import { formatTime } from '@/lib/utils';
import { EquipmentLoansResponseWithoutUser } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

export function getColumns(): ColumnDef<EquipmentLoansResponseWithoutUser>[] {
    return [
        {
            accessorKey: 'id',
            header: 'No. bien',
        },
        {
            accessorKey: 'label',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Label" />,
        },
        {
            accessorKey: 'equipment_type.name',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Type" />,
        },
        {
            accessorKey: 'pivot.date',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Date" />,
            cell: ({ row }) => {
                const date = row.original.pivot.date;
                const isToday = dayjs(date).isSame(dayjs(), 'day'); // Verify if the date is today
                return isToday ? 'Today' : dayjs(date).format('D/MM/YYYY');
            },
        },
        {
            accessorKey: 'pivot.start_time',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Start time" />,
            cell: ({ row }) => formatTime(row.original.pivot.date + row.original.pivot.start_time),
        },
    ];
}
