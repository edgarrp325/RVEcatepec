<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ThreeDModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        DB::table('three_d_models')->insert([
            'name' => 'Neil Armstrong',
            'format_id' => 2,
            'poligons' => 1000,
            'textures' => true,
            'animations' => true,
            'rigged' => true,
            'img_url' => 'http://127.0.0.1:8000/storage/three-d-models/images/NeilArmstrong.webp',
            'model_url' => 'http://127.0.0.1:8000/storage/three-d-models/models/NeilArmstrong.glb',
            'download_url' => 'http://127.0.0.1:8000/storage/three-d-models/models/NeilArmstrong.glb',
            'created_at' => Carbon::now('America/Mexico_City'),
            'updated_at' => Carbon::now('America/Mexico_City'),
        ]);
    }
}
