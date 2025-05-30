import { DataTableSortableHeader } from '@/components/data-table/data-table-sortable-header';
import { Button } from '@/components/ui/button';
import { type AttendanceTable } from '@/types';
import { useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface ButtonFinishAttendanceProps {
    attendanceId: number;
}
function ButtonFinishAttendance({ attendanceId }: ButtonFinishAttendanceProps) {
    const { put, processing } = useForm({});

    const finishAttendance = () => {
        put(route('attendance.update', attendanceId), {
            onSuccess: () => {
                toast.success('Assistance finished successfully');
            },
        });
    };
    return (
        <Button variant="ghost" onClick={() => finishAttendance()} disabled={processing}>
            <LogOut className="h-4 w-4" />
        </Button>
    );
}

export const columns: ColumnDef<AttendanceTable>[] = [
    {
        accessorKey: 'laboratory_name',
        header: 'Laboratory',
        // Custom OR filter: shows rows if cell value is in filter array
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'account_number',
        header: 'Account Number',
    },
    {
        accessorKey: 'user_full_name',
        header: ({ column }) => <DataTableSortableHeader column={column} title="User" />,
    },
    {
        accessorKey: 'date',
        header: ({ column }) => <DataTableSortableHeader column={column} title="Date" />,
        cell: ({ row }) => {
            const date = row.original.date;
            const isToday = dayjs(date).isSame(dayjs(), 'day'); // Verify if the date is today
            return isToday ? 'Today' : dayjs(date).format('D/MM/YYYY');
        },
    },
    {
        accessorKey: 'start_time',
        header: ({ column }) => <DataTableSortableHeader column={column} title="Start Time" />,
    },
    {
        accessorKey: 'end_time',
        header: 'End Time',
        cell: ({ row }) => row.original.end_time ?? 'In progress',
    },
    {
        accessorKey: 'is_active',
        header: 'Active',

        cell: ({ row }) =>
            row.original.is_active === 'active' ? (
                <span className="flex items-center gap-2 font-semibold text-green-600">
                    Yes
                    <ButtonFinishAttendance attendanceId={row.original.attendance_id} />
                </span>
            ) : (
                <span className="font-semibold text-red-600">No</span>
            ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
];
