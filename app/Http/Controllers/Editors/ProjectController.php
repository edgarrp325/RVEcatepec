<?php

namespace App\Http\Controllers\Editors;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('editors/projects/Index', [
            'projects' => Project::latest()->paginate(12),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('editors/projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8192',
            'download_url' => 'required|string|max:255|url',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_url'] = Storage::put('editors/projects/images', $request->image);
        }

        Project::create($validated);
        return to_route('projects.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return Inertia::render('editors/projects/Show', [
            'project' => $project,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render('editors/projects/Edit', [
            'project' => $project,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8192',
            'download_url' => 'required|string|max:255|url',
        ]);

        // Valores por defecto actuales
        $validated['image_url'] = $project->image_url;

        if ($request->hasFile('image')) {
            $validated['image_url'] = Storage::put('editors/projects/images', $request->image);
        }

        $project->update($validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        Storage::delete($project->image_url);
        $project->delete();
        return to_route('projects.index');
    }
}
