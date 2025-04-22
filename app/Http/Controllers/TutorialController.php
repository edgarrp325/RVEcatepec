<?php

namespace App\Http\Controllers;

use App\Models\Tutorial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TutorialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('resources/tutorials/Index', [
            'tutorials' => Tutorial::with('tutorialType')->latest()->paginate(12),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tutorial $tutorial)
    {
        return Inertia::render(('resources/tutorials/Show'), [
            'tutorial' => $tutorial
        ]);
    }
}
