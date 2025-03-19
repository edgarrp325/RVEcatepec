<?php

namespace App\Enums;

enum LaboratoryEnum: string
{
    // CASE NAMEINAPP = "ID IN DATABASE";

    case VR = '1';
    case SW = '2';
    case PROTOTYPES = '3';
    case ELECTRONICS = '4';


    public function label(): string
    {
        return match ($this) {
            self::VR => 'Realidad virtual',
            self::SW => 'Software',
            self::PROTOTYPES => 'Fabricación y prototipos',
            self::ELECTRONICS => 'Electrónica',
        };
    }
}
