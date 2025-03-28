<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\EquipmentTypeController;
use App\Http\Controllers\LoanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('attendance', AttendanceController::class)->only([
        'update',
    ]);

    
    Route::resource('equipment', EquipmentController::class)->only([
        'index',
        'store',
        'update',
        'destroy',
    ]);
    Route::resource('equipment-types', EquipmentTypeController::class);

    Route::delete('equipment-loans/destroy-all', [LoanController::class, 'destroyAll'])->name('equipment-loans.destroy-all');
    Route::resource('equipment-loans', LoanController::class)->only([
        'index',
    ]);
    

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
