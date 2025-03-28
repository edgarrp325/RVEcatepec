import { cn } from "@/lib/utils";
import { EquipmentResponse } from "@/types";

export const transformEquipmentData = (equipment: EquipmentResponse[]) => {
    return equipment.flatMap((equipment) => {
        const data = {
            id: equipment.id,
            label: equipment.label,
            status: equipment.status,
            used_time: equipment.used_time,
            laboratory_id: equipment.laboratory_id,
            laboratory_name: equipment.laboratory.name,
            equipment_type_id: equipment.equipment_type_id,
            equipment_type_name: equipment.equipment_type.name
        }
        //Verify if the equipment has users
        if (equipment.users_in_use && equipment.users_in_use.length > 0) {
            const user = equipment.users_in_use[0];
            return {
                ...data,
                user_id: equipment.users_in_use[0].id,
                user_full_name: cn(user.name, user.paternal_surname, user.maternal_surname),  
            }
        }else{
            return {
                ...data,
                user_id: null,
                user_full_name: null,
            }
        }   
    });
};