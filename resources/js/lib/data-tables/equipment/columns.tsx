import { DataTableSortableHeader } from "@/components/data-table/data-table-sortable-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn, formatMinutes, getBadgeColor } from "@/lib/utils";
import { Equipment, EquipmentTable } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

interface GetColumnsProps {
    setSelectedEquipment: (selectedEquipment: Equipment) => void;
    openDialog: (variant: "create" | "edit", equipment?: Equipment) => void;    
    setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void;
}
export function getColumns({setSelectedEquipment, openDialog, setIsDeleteDialogOpen}: GetColumnsProps): ColumnDef<EquipmentTable>[] {
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
        },
        {
            accessorKey: 'status',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Status" />,
            cell: ({ row }) =>{
                const status = row.original.status;
                return <Badge variant={'outline'} className={cn("bg-red-400 text-white font-black w-24", getBadgeColor(status))}>{status}</Badge>                
            }
        },
        {
            accessorKey: 'used_time',
            header: ({ column }) => <DataTableSortableHeader column={column} title="Used time" />,
            cell: ({ row }) => formatMinutes(row.original.used_time)

        },{
            accessorKey: 'user_full_name',
            header: ({ column }) => <DataTableSortableHeader column={column} title="User" />,
            cell: ({ row }) => {if(row.original.user_full_name){
                return row.original.user_full_name
            }else{
                return 'N/A'
            }
            }
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
