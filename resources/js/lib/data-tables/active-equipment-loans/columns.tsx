import { DataTableSortableHeader } from '@/components/data-table/data-table-sortable-header';
import { Button } from '@/components/ui/button';
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
                toast.success('Préstamo finalizado correctamente');
            },
            onError: () => toast.error('Ocurrió un error al finalizar el préstamo'),
        });
    };

    return (
        <Button onClick={() => finishLoan()} disabled={processing}>
            Devolver
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
            header: ({ column }) => <DataTableSortableHeader column={column} title="Etiqueta" />,
        },
        {
            accessorKey: 'equipment_type.name',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Tipo" />,
        },
        {
            accessorKey: 'pivot.date',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Fecha" />,
            cell: ({ row }) => {
                const date = row.original.pivot.date;
                const isToday = dayjs(date).isSame(dayjs(), 'day');
                return isToday ? 'Hoy' : dayjs(date).format('D/MM/YYYY');
            },
        },
        {
            accessorKey: 'pivot.start_time',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Hora de inicio" />,
            cell: ({ row }) => formatTime(row.original.pivot.date + row.original.pivot.start_time),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <span className="flex items-center gap-2">
                    <ButtonFinishLoan id={row.original.pivot.id} />
                </span>
            ),
        },
    ];
}
