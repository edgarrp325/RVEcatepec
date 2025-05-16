import { DataTableSortableHeader } from '@/components/data-table/data-table-sortable-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn, formatMinutes, getBadgeColor } from '@/lib/utils';
import { Equipment, EquipmentTable, EquipmentTablePublic } from '@/types';
import { useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { LogOut, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

interface GetColumnsProps {
    setSelectedEquipment: (selectedEquipment: Equipment) => void;
    openDialog: (variant: 'create' | 'edit', equipment?: Equipment) => void;
    setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void;
}

interface GetPublicColumnsProps {
    isUsingComputer: boolean;
}

interface ButtonFinishLoanProps {
    id: number;
}

interface ButtonStartLoanProps {
    id: string;
    disabled: boolean;
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
        <Button variant="ghost" onClick={finishLoan} disabled={processing}>
            <LogOut className="h-4 w-4" />
        </Button>
    );
}

function ButtonStartLoan({ id, disabled }: ButtonStartLoanProps) {
    const { post, processing } = useForm({
        equipment_id: id,
    });

    const startLoan = () => {
        post(route('equipment-loans.store'), {
            onSuccess: () => {
                toast.success('Préstamo de equipo iniciado correctamente');
            },
            onError: () => toast.error('Ocurrió un error al iniciar el préstamo'),
        });
    };

    return (
        <Button onClick={startLoan} disabled={processing || disabled}>
            Usar
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
            header: ({ column }) => <DataTableSortableHeader column={column} title="Tipo" />,
        },
        {
            accessorKey: 'label',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Etiqueta" />,
        },
        {
            accessorKey: 'laboratory_name',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Laboratorio" />,
            filterFn: (row, id, value) => value.includes(row.getValue(id)),
        },
        {
            accessorKey: 'status',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Estado" />,
            cell: ({ row }) => {
                const status = row.original.status;
                return (
                    <Badge variant="outline" className={cn('w-24 bg-red-400 font-black text-white', getBadgeColor(status))}>
                        {status}
                    </Badge>
                );
            },
            filterFn: (row, id, value) => value.includes(row.getValue(id)),
        },
        {
            accessorKey: 'used_time',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Tiempo de uso" />,
            cell: ({ row }) => formatMinutes(row.original.used_time),
        },
        {
            accessorKey: 'user_full_name',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Usuario" />,
            cell: ({ row }) =>
                row.original.status === 'In use' ? (
                    <span className="flex items-center gap-2">
                        {row.original.user_full_name}
                        <ButtonFinishLoan id={row.original.loan_id as number} />
                    </span>
                ) : (
                    <span className="">N/D</span>
                ),
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const equipmentType = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menú</span>
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
                                Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => {
                                    setIsDeleteDialogOpen(true);
                                    setSelectedEquipment(equipmentType);
                                }}
                            >
                                Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
}

export function getPublicColumns({ isUsingComputer }: GetPublicColumnsProps): ColumnDef<EquipmentTablePublic>[] {
    return [
        {
            accessorKey: 'id',
            header: 'No. bien',
        },
        {
            accessorKey: 'equipment_type_name',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Tipo" />,
        },
        {
            accessorKey: 'label',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Etiqueta" />,
        },
        {
            accessorKey: 'laboratory_name',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Laboratorio" />,
            filterFn: (row, id, value) => value.includes(row.getValue(id)),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <span className="flex items-center gap-2">
                    <ButtonStartLoan
                        id={row.original.id}
                        disabled={isUsingComputer && (row.original.equipment_type_name === 'PC' || row.original.equipment_type_name === 'iMac')}
                    />
                </span>
            ),
        },
    ];
}
