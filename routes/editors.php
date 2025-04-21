<?php

use App\Enums\RoleEnum;
use App\Http\Controllers\Editors\DevelopmentController;
use App\Http\Controllers\Editors\ProjectController;
use App\Http\Controllers\Editors\ThreeDModelController;
use App\Http\Controllers\Editors\TutorialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Social service, internship and admin
$editors = [
    'admin' => RoleEnum::ADMIN->value,
    'social_service' => RoleEnum::SOCIALSERVICE->value,
    'internship' => RoleEnum::INTERNSHIP->value,
];


Route::middleware(['auth', 'verified', 'role:' . implode(',', $editors)])->prefix('dashboard')->group(function () {
    
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('three-d-models', ThreeDModelController::class);

    Route::resource('tutorials', TutorialController::class);

    Route::resource('projects', ProjectController::class);

    Route::resource('developments', DevelopmentController::class)->except([
        'edit',
        'update',
    ]);
});

