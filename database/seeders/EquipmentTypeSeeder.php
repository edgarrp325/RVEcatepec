<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquipmentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        DB::table('equipment_types')->insert([
            'name' => 'iMac',
        ]);
        
        DB::table('equipment_types')->insert([
            'name' => 'Microfono',
        ]);

        DB::table('equipment_types')->insert([
            'name' => 'Tablet',
        ]);

        DB::table('equipment_types')->insert([
            'name' => 'Impresora',
        ]);

        DB::table('equipment_types')->insert([
            'name' => 'Leap Motion',
        ]);

        DB::table('equipment_types')->insert([
            'name' => 'Kinect',
        ]);

        DB::table('equipment_types')->insert([
            'name' => 'PC',
        ]);
    }
}
