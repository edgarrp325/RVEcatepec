<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            'name' => RoleEnum::ADMIN->label(),
            'description' => 'Gestiona el sistema y administra a los usuarios.',
        ]);

        DB::table('roles')->insert([
            'name' => RoleEnum::USER->label(),
            'description' => 'Obten el acceso a la descarga de recursos.',
        ]);

        DB::table('roles')->insert([
            'name' => RoleEnum::ALUMN->label(),
            'description' => 'Utiliza los laboratorios y el equipo de UAEM Ecatepec.',
        ]);

        DB::table('roles')->insert([
            'name' => RoleEnum::SOCIALSERVICE->label(),
            'description' => 'Realiza el servicio social en alguno de los laboratorios de UAEM Ecatepec.',
        ]);

        DB::table('roles')->insert([
            'name' => RoleEnum::INTERNSHIP->label(),
            'description' => 'Realiza prácticas profesionales en alguno de los laboratorios de UAEM Ecatepec.',
        ]);
    }
}
