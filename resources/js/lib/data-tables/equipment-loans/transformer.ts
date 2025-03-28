import { cn } from '@/lib/utils';
import { EquipmentLoansResponse } from '@/types';

export const transformEquipmentLoanData = (equipmentLoans: EquipmentLoansResponse[]) => {
    return equipmentLoans.flatMap((equipment) =>
        equipment.users.flatMap((user) => {
            // Asegurar que pivot siempre sea un array
            const loans = Array.isArray(user.pivot) ? user.pivot : [user.pivot];

            return loans.map((pivot) => ({
                equipment_id: equipment.id,
                equipment_type: equipment.equipment_type.name,
                equipment_label: equipment.label,
                user_full_name: cn(user.name, user.paternal_surname, user.maternal_surname),
                loan_date: pivot.date,
                loan_start_time: pivot.start_time,
                loan_end_time: pivot.end_time,
            }));
        })
    );
};
