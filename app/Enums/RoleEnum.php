<?php

namespace App\Enums;

enum RoleEnum: string
{
    // CASE NAMEINAPP = "ID IN DATABASE";

    case ADMIN = '1';
    case USER = '2';
    case ALUMN = '3';
    case SOCIALSERVICE = '4';
    case INTERNSHIP = '5';

    public function label(): string
    {
        return match ($this) {
            self::ADMIN => 'Administrador',
            self::USER => 'Usuario',
            self::ALUMN => 'Alumno',
            self::SOCIALSERVICE => 'Servicio Social',
            self::INTERNSHIP => 'Prácticas Profesionales',
        };
    }
}
