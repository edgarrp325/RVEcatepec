import { DataTableSortableHeader } from '@/components/data-table/data-table-sortable-header';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UsersTable } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { MoreHorizontal } from 'lucide-react';

interface GetColumnsProps {
    setSelectedUser: (setSelectedEquipment: UsersTable) => void;
    openDialog: () => void;
    setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void;
}
export function getColumns({ setSelectedUser, openDialog, setIsDeleteDialogOpen }: GetColumnsProps): ColumnDef<UsersTable>[] {
    return [
        {
            accessorKey: 'account_number',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Account Number" />,
            cell: ({ row }) => (row.original.account_number ? row.original.account_number : 'N/A'),
        },
        {
            accessorKey: 'name',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Name" />,
        },
        {
            accessorKey: 'paternal_surname',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Paternal Surname" />,
        },
        {
            accessorKey: 'maternal_surname',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Maternal Surname" />,
            cell: ({ row }) => (row.original.maternal_surname ? row.original.maternal_surname : '-'),
        },
        {
            accessorKey: 'major_origin',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Major / Origin" />,
            cell: ({ row }) => {
                const major = row.original.major;
                const origin = row.original.origin;
                if (major != null) return major;
                if (origin != null) return origin;
            },
        },
        {
            accessorKey: 'email',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Email" />,
        },
        {
            accessorKey: 'role',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Role" />,
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id));
            },
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Registered At" />,
            cell: ({ row }) => dayjs(row.original.created_at).format('D/MM/YYYY'),
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const user = row.original;
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
                                        setSelectedUser(user);
                                        openDialog();
                                    }}
                                >
                                    Edit role
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={() => {
                                        setIsDeleteDialogOpen(true);
                                        setSelectedUser(user);
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
