<?php

use App\Enums\RoleEnum;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DevelopmentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ThreeDModelController;
use App\Http\Controllers\TutorialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




// Social service, internship and admin
$editors = [
    'admin' => RoleEnum::ADMIN->value,
    'social_service' => RoleEnum::SOCIALSERVICE->value,
    'internship' => RoleEnum::INTERNSHIP->value,
];


Route::middleware(['auth', 'verified', 'role:' . implode(',', $editors)])->group(function () {
    
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('three-d-models', ThreeDModelController::class)->except(
        'index',
        'show',
    );

    Route::resource('tutorials', TutorialController::class)->except(
        'index',
        'show',
    );

    Route::resource('projects', ProjectController::class)->except(
        'index',
        'show',
    );

    Route::resource('developments', DevelopmentController::class)->except([
        'index',
        'show',
    ]);
});

// Registered users
Route::middleware(['auth', 'verified'])->group(function () {

    Route::resource('attendance', AttendanceController::class)->only([
        'update',
    ]);

    Route::resource('three-d-models', ThreeDModelController::class)->only([
        'index',
        'show',
    ]);

    Route::resource('tutorials', TutorialController::class)->only([
        'index',
        'show',
    ]);

    Route::resource('projects', ProjectController::class)->only([
        'index',
        'show',
    ]);
});


// Public routes
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::resource('developments', DevelopmentController::class)->only([
    'index',
    'show',
]);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/equipment.php';
