<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OTPSeeder extends Seeder
{
    /**
     * Run codes just for testing purposes.
     */
    public function run(): void
    {
        DB::table('o_t_p_s')->insert([
            'id' => 'admin_code',
            'code' => '123456',
        ]);

        DB::table('o_t_p_s')->insert([
            'id' => 'user_code',
            'code' => '111111',
        ]);
    }
}
