<?php

namespace App\Http\Controllers;

use App\Models\Development;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DevelopmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('developments/Index', [
            'developments' => Development::with('images')->latest()->paginate(12),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Development $development)
    {
        return Inertia::render('developments/Show', [
            'development' => $development::with('images')->find($development->id),
        ]);
    }
}
