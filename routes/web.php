<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ThreeDModelController;
use App\Http\Controllers\TutorialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::delete('attendance/destroy-all', [AttendanceController::class, 'destroyAll'])->name('attendance.destroy-all');
    Route::resource('attendance', AttendanceController::class)->only([
        'update',
    ]);

    Route::resource('three-d-models', ThreeDModelController::class);

    Route::resource('tutorials', TutorialController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/equipment.php';
