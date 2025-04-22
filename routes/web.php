<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DevelopmentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ThreeDModelController;
use App\Http\Controllers\TutorialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Registered users
Route::middleware(['auth', 'verified'])->group(function () {

    Route::resource('attendance', AttendanceController::class)->only([
        'update',
    ]);

    Route::prefix('resources')->name('resources.')->group(function () {
        Route::resource('three-d-models', ThreeDModelController::class)->only([
            'index',
            'show',
        ]);

        Route::resource('projects', ProjectController::class)->only([
            'index',
            'show',
        ]);

        Route::resource('tutorials', TutorialController::class)->only([
            'index',
            'show',
        ]);
    });

    Route::name('public.')->group(function () {
        Route::resource('developments', DevelopmentController::class)->only([
            'index', 
            'show'
        ]);
    });
});

// Public routes
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/editors.php';
require __DIR__ . '/equipment.php';
