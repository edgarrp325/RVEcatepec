<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('resources/projects/Index', [
            'projects' => Project::latest()->paginate(12),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return Inertia::render('resources/projects/Show', [
            'project' => $project,
        ]);
    }
}