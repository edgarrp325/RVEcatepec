<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TutorialTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tutorial_types')->insert([
            'name' => 'Video',
        ]);

        DB::table('tutorial_types')->insert([
            'name' => 'PDF',
        ]);
    }
}
