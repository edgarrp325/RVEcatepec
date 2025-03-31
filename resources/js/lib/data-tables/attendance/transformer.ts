import { cn } from "@/lib/utils";
import { AttendanceResponse } from "@/types";

export const transformAttendanceData = (labs: AttendanceResponse[]) => {
    return labs.flatMap((lab) =>
        lab.users.map((user) => ({
            laboratory_name: lab.name,
            account_number: user.account_number,
            user_full_name: cn(user.name, user.paternal_surname, user.maternal_surname),
            attendance_id: user.pivot.id,
            date: user.pivot.date,
            start_time: user.pivot.start_time,
            end_time: user.pivot.end_time,
            is_active: !user.pivot.end_time ? 'active' : 'finished',
        }))
    );
};
