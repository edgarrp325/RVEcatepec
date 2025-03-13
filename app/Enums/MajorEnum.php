<?php

namespace App\Enums;

enum MajorEnum: string
{
    // CASE NAMEINAPP = "ID IN DATABASE";

    case ICO = '1';
    case LIA = '2';
    case LPS = '3';
    case LAM = '4';
    case LCN = '5';
    case LDE = '6';
    case OTHER = '7';
    

    public function label(): string
    {
        return match ($this) {
            self::ICO => 'Ingeniería en computación',
            self::LIA => 'Informática Administrativa',
            self::LPS => 'Psicología',
            self::LAM => 'Administración',
            self::LCN => 'Contaduría',
            self::LDE => 'Derecho',
        };
    }
}
