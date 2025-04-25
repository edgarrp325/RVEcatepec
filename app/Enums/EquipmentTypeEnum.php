<?php

namespace App\Enums;

enum EquipmentTypeEnum: string
{
    // CASE NAMEINAPP = "ID IN DATABASE";

    case IMAC = '1';
    case PC = '7';


    public function label(): string
    {
        return match ($this) {
            self::IMAC => 'iMac',
            self::PC => 'PC',
        };
    }
}
