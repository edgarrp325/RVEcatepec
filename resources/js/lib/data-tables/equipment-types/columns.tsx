import { DataTableSortableHeader } from '@/components/data-table/data-table-sortable-header';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type EquipmentType } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

interface GetColumnsProps {
    setSelectedEquipmentType: (selectedEquipmentType: EquipmentType) => void;
    openDialog: (variant: "create" | "edit", equipmentType?: EquipmentType) => void;    
    setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void;
}
export function getColumns({ setSelectedEquipmentType, openDialog, setIsDeleteDialogOpen }: GetColumnsProps): ColumnDef<EquipmentType>[] {
    return [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Name" />,
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
                                        setSelectedEquipmentType(equipmentType);
                                    }}
                                >
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={() => {
                                        setIsDeleteDialogOpen(true);
                                        setSelectedEquipmentType(equipmentType);
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
