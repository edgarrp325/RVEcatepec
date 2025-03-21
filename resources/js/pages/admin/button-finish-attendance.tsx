import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

interface ButtonFinishAttendanceProps {
    attendanceId: number;
}

export default function ButtonFinishAttendance({ attendanceId }: ButtonFinishAttendanceProps) {
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
