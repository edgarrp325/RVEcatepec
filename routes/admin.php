<?php

use App\Http\Controllers\Admin\OTPController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function (){
    
    Route::get('one-time-passwords', [OTPController::class, 'edit'])->name('otp.edit');
});
