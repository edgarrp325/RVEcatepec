<?php

use App\Http\Controllers\Equipment\EquipmentLoanController;
use App\Http\Controllers\Equipment\EquipmentTypeController;
use App\Http\Controllers\Equipment\EquipmentController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('equipment', EquipmentController::class)->only([
        'index',
        'store',
        'update',
        'destroy',
    ]);
    Route::resource('equipment-types', EquipmentTypeController::class);

    Route::delete('equipment-loans/destroy-all', [EquipmentLoanController::class, 'destroyAll'])->name('equipment-loans.destroy-all');
    Route::resource('equipment-loans', EquipmentLoanController::class)->only([
        'index',
    ]);
});
