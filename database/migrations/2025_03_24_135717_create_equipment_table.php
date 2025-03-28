<?php

use App\Enums\EquipmentStatusEnum;
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
        Schema::create('equipment', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('label');
            $table->foreignId('equipment_type_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->enum('status', [EquipmentStatusEnum::USING->label(), EquipmentStatusEnum::AVAILABLE->label(), EquipmentStatusEnum::MAINTENANCE->label()])->default(EquipmentStatusEnum::AVAILABLE->label());
            $table->foreignId('laboratory_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->integer('used_time')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};
