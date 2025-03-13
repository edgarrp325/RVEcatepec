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
            'description' => 'Administrate the system and manage users.',
        ]);

        DB::table('roles')->insert([
            'name' => RoleEnum::USER->label(),
            'description' => 'You only need to download resources.',
        ]);

        DB::table('roles')->insert([
            'name' => RoleEnum::ALUMN->label(),
            'description' => 'You need to use a laboratory and equipment from UAEM Ecatepec.',
        ]);

        DB::table('roles')->insert([
            'name' => RoleEnum::SOCIALSERVICE->label(),
            'description' => 'You need to do social service in UAEM Ecatepec.',
        ]);

        DB::table('roles')->insert([
            'name' => RoleEnum::INTERNSHIP->label(),
            'description' => 'You need to do internships in UAEM Ecatepec.',
        ]);
    }
}
