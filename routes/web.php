<?php

use App\Enums\RoleEnum;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DevelopmentController;
use App\Http\Controllers\Equipment\EquipmentLoanController;
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
});

// Social service, internship and alumns
$roles = [
    'alumn' => RoleEnum::ALUMN->value,
    'social_service' => RoleEnum::SOCIALSERVICE->value,
    'internship' => RoleEnum::INTERNSHIP->value,
];

$admin = RoleEnum::ADMIN->value;


Route::middleware(['auth', 'verified', 'role:' . implode(',', $roles)])->prefix('dashboard')->group(function () {


    Route::resource('attendance', AttendanceController::class)->only(
        'create',
        'store',
    );

    Route::put('attendance/finish', [AttendanceController::class, 'finish'])->name('attendance.finish');

    Route::resource('equipment-loans', EquipmentLoanController::class)->only(
        'create',
        'store',
    )->middleware('weekend');
});

Route::middleware(['auth', 'verified', 'role:' . $admin . ',' . implode(',', $roles)])->prefix('dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
});


// Public routes
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/laboratory', function () {
    return Inertia::render('laboratory');
})->name('laboratory');
Route::name('public.')->group(function () {
    Route::resource('developments', DevelopmentController::class)->only([
        'index',
        'show'
    ]);
});
Route::get('/resources', function () {
    return Inertia::render('resources/repository');
})->name('resources');

Route::get('/services', function () {
    return Inertia::render('services');
})->name('services');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/editors.php';
require __DIR__ . '/equipment.php';
