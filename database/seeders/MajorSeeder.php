<?php

namespace Database\Seeders;

use App\Enums\MajorEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MajorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('majors')->insert([
            'name' => MajorEnum::ICO->label(),
        ]);

        DB::table('majors')->insert([
            'name' => MajorEnum::LIA->label(),
        ]);
        
        DB::table('majors')->insert([
            'name' => MajorEnum::LPS->label(),
        ]);
        DB::table('majors')->insert([
            'name' => MajorEnum::LAM->label(),
        ]);

        DB::table('majors')->insert([
            'name' => MajorEnum::LCN->label(),
        ]);

        DB::table('majors')->insert([
            'name' => MajorEnum::LDE->label(),
        ]);

    }
}
