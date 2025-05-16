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
            header: ({ column }) => <DataTableSortableHeader column={column} title="Etiqueta" />,
        },
        {
            accessorKey: 'equipment_type',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Tipo" />,
        },
        {
            accessorKey: 'user_full_name',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Usuario" />,
        },
        {
            accessorKey: 'loan_date',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Fecha" />,
            cell: ({ row }) => {
                const date = row.original.loan_date;
                const isToday = dayjs(date).isSame(dayjs(), 'day'); // Verificar si es hoy
                return isToday ? 'Hoy' : dayjs(date).format('D/MM/YYYY');
            },
        },
        {
            accessorKey: 'loan_start_time',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Hora de inicio" />,
        },
        {
            accessorKey: 'loan_end_time',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Hora de finalización" />,
            cell: ({ row }) => row.original.loan_end_time ?? 'En curso',
        },
    ];
}
