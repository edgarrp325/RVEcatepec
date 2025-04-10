<?php

use App\Enums\RoleEnum;
use App\Http\Controllers\Admin\OTPController;
use App\Http\Controllers\Admin\LaboratoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AttendanceController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:' . RoleEnum::ADMIN->value])->group(function () {

    Route::get('one-time-passwords', [OTPController::class, 'edit'])->name('otp.edit');
    Route::post('/one-time-passwords/{id}/regenerate', [OTPController::class, 'regenerate'])->name('otp.regenerate');

    Route::resource('laboratories', LaboratoryController::class)->only([
        'index',
        'store',
        'update',
    ]);

    Route::resource('users', UserController::class)->only([
        'index',
        'update',
        'destroy',
    ]);

    Route::delete('attendance/destroy-all', [AttendanceController::class, 'destroyAll'])->name('attendance.destroy-all');
});
