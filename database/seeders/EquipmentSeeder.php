<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('equipment')->insert([
            'id' => '356047',
            'label' => '01',
            'equipment_type_id' => 1,
            'laboratory_id' => 2,
        ]);

        DB::table('equipment')->insert([
            'id' => '356048',
            'label' => '01',
            'equipment_type_id' => 1,
            'laboratory_id' => 2,
        ]);

        DB::table('equipment')->insert([
            'id' => '356049',
            'label' => '01',
            'equipment_type_id' => 1,
            'laboratory_id' => 2,
        ]);

        DB::table('equipment')->insert([
            'id' => '356050',
            'label' => '01',
            'equipment_type_id' => 1,
            'laboratory_id' => 2,
        ]);

        DB::table('equipment')->insert([
            'id' => '356051',
            'label' => '01',
            'equipment_type_id' => 1,
            'laboratory_id' => 2,
        ]);

        DB::table('equipment')->insert([
            'id' => '356026',
            'label' => '01',
            'equipment_type_id' => 1,
            'laboratory_id' => 2,
        ]);

        DB::table('equipment')->insert([
            'id' => '356027',
            'label' => '01',
            'equipment_type_id' => 1,
            'laboratory_id' => 2,
        ]);

        DB::table('equipment')->insert([
            'id' => '356028',
            'label' => '01',
            'equipment_type_id' => 1,
            'laboratory_id' => 2,
        ]);

        DB::table('equipment')->insert([
            'id' => '356030',
            'label' => '01',
            'equipment_type_id' => 1,
            'laboratory_id' => 2,
        ]);

        DB::table('equipment')->insert([
            'id' => '356031',
            'label' => '01',
            'equipment_type_id' => 1,
            'laboratory_id' => 2,
        ]);

        DB::table('equipment')->insert([
            'id' => '356032',
            'label' => '01',
            'equipment_type_id' => 1,
            'laboratory_id' => 2,
        ]);

        DB::table('equipment')->insert([
            'id' => '357124',
            'label' => 'HP',
            'equipment_type_id' => 7,
            'laboratory_id' => 3,
        ]);

        DB::table('equipment')->insert([
            'id' => '357136',
            'label' => 'HP',
            'equipment_type_id' => 7,
            'laboratory_id' => 3,
        ]);

        DB::table('equipment')->insert([
            'id' => '362106',
            'label' => 'PC No. 03',
            'equipment_type_id' => 7,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => '362727',
            'label' => 'HP',
            'equipment_type_id' => 7,
            'laboratory_id' => 3,
        ]);

        DB::table('equipment')->insert([
            'id' => '413364',
            'label' => 'PC No. 01',
            'equipment_type_id' => 7,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => '418688',
            'label' => 'PC No. 02',
            'equipment_type_id' => 7,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => '304667',
            'label' => 'HP',
            'equipment_type_id' => 7,
            'laboratory_id' => 2,
        ]);

        DB::table('equipment')->insert([
            'id' => '307913',
            'label' => 'HP',
            'equipment_type_id' => 7,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => '341032',
            'label' => 'HP',
            'equipment_type_id' => 7,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => 'ptcjja03',
            'label' => 'No. 01',
            'equipment_type_id' => 2,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => 'ptcjja04',
            'label' => 'No. 02',
            'equipment_type_id' => 2,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => 'ptcjja13',
            'label' => 'No. 01',
            'equipment_type_id' => 3,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => 'ptcjja14',
            'label' => 'No. 02',
            'equipment_type_id' => 3,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => 'ptcjja15',
            'label' => 'No. 03',
            'equipment_type_id' => 3,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => 'ptcjja16',
            'label' => 'No. 04',
            'equipment_type_id' => 3,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => 'ptcjja17',
            'label' => 'No. 01',
            'equipment_type_id' => 4,
            'laboratory_id' => 3,
        ]);

        DB::table('equipment')->insert([
            'id' => 'ptcjja18',
            'label' => 'No. 02',
            'equipment_type_id' => 4,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => 'ptcjja09',
            'label' => 'V1 No. 01',
            'equipment_type_id' => 5,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => 'ptcjja10',
            'label' => 'V1 No. 02',
            'equipment_type_id' => 5,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => 'ptcjja07',
            'label' => 'V2 No. 01',
            'equipment_type_id' => 5,
            'laboratory_id' => 1,
        ]);

        DB::table('equipment')->insert([
            'id' => 'ptcjja08',
            'label' => 'V2 No.02',
            'equipment_type_id' => 5,
            'laboratory_id' => 1,
        ]);
    }
}
