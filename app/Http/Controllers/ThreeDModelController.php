<?php

namespace App\Http\Controllers;

use App\Models\ThreeDModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThreeDModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('resources/three-d-models/Index',  [
            'models' => ThreeDModel::with('format')->latest()->paginate(12),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ThreeDModel $threeDModel)
    {
        return Inertia::render('resources/three-d-models/Show', [
            'model' => $threeDModel->load('format'),
        ]);
    }
}
