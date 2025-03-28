<?php

use App\Http\Controllers\Admin\EquipmentTypeController as AdminEquipmentTypeController;
use App\Http\Controllers\Admin\OTPController;
use App\Http\Controllers\Admin\LaboratoryController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function (){
    
    Route::get('one-time-passwords', [OTPController::class, 'edit'])->name('otp.edit');
    Route::post('/one-time-passwords/{id}/regenerate', [OTPController::class, 'regenerate'])->name('otp.regenerate');
   
    Route::resource('laboratories', LaboratoryController::class)->only([
        'index',
        'store',
        'update',
    ]);    
});
