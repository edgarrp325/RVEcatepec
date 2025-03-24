<?php

namespace App\Enums;

enum EquipmentStatusEnum: string
{
    // CASE NAMEINAPP = "ID IN DATABASE";

    case USING = '1';
    case AVAILABLE = '2';
    case MAINTENANCE = '3';


    public function label(): string
    {
        return match ($this) {
            self::USING=> 'In use',
            self::AVAILABLE=> 'Available',
            self::MAINTENANCE=> 'Maintenance',
        };
    }
}
