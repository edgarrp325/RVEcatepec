<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FormatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('formats')->insert([
            'name' => 'fbx',
        ]);

        DB::table('formats')->insert([
            'name' => 'obj',
        ]);
    }
}
