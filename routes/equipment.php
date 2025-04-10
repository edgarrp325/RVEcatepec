<?php

use App\Enums\RoleEnum;
use App\Http\Controllers\Equipment\EquipmentLoanController;
use App\Http\Controllers\Equipment\EquipmentTypeController;
use App\Http\Controllers\Equipment\EquipmentController;
use Illuminate\Support\Facades\Route;

// Social service, internship and admin
$editors = [
    'admin' => RoleEnum::ADMIN->value,
    'social_service' => RoleEnum::SOCIALSERVICE->value,
    'internship' => RoleEnum::INTERNSHIP->value,
];

$alumn = RoleEnum::ALUMN->value;

Route::middleware(['auth', 'verified', 'role:' . implode(',', $editors)])->group(function () {
    Route::resource('equipment', EquipmentController::class)->except([
        'create',
        'show',
        'edit',
    ]);

    Route::resource('equipment-types', EquipmentTypeController::class)->except([
        'create',
        'show',
        'edit',
    ]);
});

// Admin
Route::middleware(['auth', 'verified', 'role:' . $editors['admin']])->group(function () {
    Route::delete('equipment-loans/destroy-all', [EquipmentLoanController::class, 'destroyAll'])->name('equipment-loans.destroy-all');
    Route::resource('equipment-loans', EquipmentLoanController::class)->only([
        'index',
    ]);
});

Route::middleware(['auth', 'verified', 'role:' . implode(',', array_merge($editors, [$alumn]))])->group(function () {
    Route::resource('equipment-loans', EquipmentLoanController::class)->only([
        'update',
    ]);
});
