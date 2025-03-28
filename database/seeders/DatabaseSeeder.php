<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            EquipmentTypeSeeder::class,
            MajorSeeder::class,
            OTPSeeder::class,
            LaboratorySeeder::class,
            EquipmentSeeder::class,
        ]);
    }
}
