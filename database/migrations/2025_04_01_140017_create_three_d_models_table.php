<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('three_d_models', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('format_id')->constrained()->onDelete('cascade');
            $table->unsignedInteger('poligons');
            $table->boolean('textures');
            $table->boolean('animations');
            $table->boolean('rigged');
            $table->string('img_url');
            $table->string('model_url');
            $table->string('download_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('three_models');
    }
};
