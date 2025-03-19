<?php

namespace Database\Seeders;

use App\Enums\LaboratoryEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LaboratorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('laboratories')->insert([
            'name' => LaboratoryEnum::VR->label(),
            'opening_time' => '07:00:00',
            'closing_time' => '17:00:00',
        ]);

        DB::table('laboratories')->insert([
            'name' => LaboratoryEnum::SW->label(),
            'opening_time' => '07:00:00',
            'closing_time' => '17:00:00',
        ]);

        DB::table('laboratories')->insert([
            'name' => LaboratoryEnum::PROTOTYPES->label(),
            'opening_time' => '07:00:00',
            'closing_time' => '17:00:00',
        ]);

        DB::table('laboratories')->insert([
            'name' => LaboratoryEnum::ELECTRONICS->label(),
            'opening_time' => '07:00:00',
            'closing_time' => '17:00:00',
        ]);
    }
}
