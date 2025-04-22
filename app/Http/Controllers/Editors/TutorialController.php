<?php

namespace App\Http\Controllers\Editors;

use App\Http\Controllers\Controller;

use App\Models\Tutorial;
use App\Models\TutorialType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TutorialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('editors/tutorials/Index', [
            'tutorials' => Tutorial::with('tutorialType')->latest()->paginate(12),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('editors/tutorials/Create', [
            'tutorialTypes' => TutorialType::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {


        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'tutorial_type_id' => 'required|exists:tutorial_types,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8192',
        ];

        $isPDF = $request->tutorial_type_id == 2;

        if ($isPDF) {
            $rules['pdf'] = 'required|file|mimes:pdf|max:122880';
        } else {
            $rules['embed_url'] = 'required|string|max:255';
        }

        $data = $request->validate($rules);

        if ($isPDF && $request->hasFile('pdf')) {
            $data['embed_url'] = Storage::put('editors/tutorials/files', $request->pdf);
        }

        if ($request->hasFile('image')) {
            $data['image_url'] = Storage::put('editors/tutorials/images', $request->image);
        }

        Tutorial::create($data);
        return to_route('tutorials.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tutorial $tutorial)
    {
        return Inertia::render(('editors/tutorials/Show'), [
            'tutorial' => $tutorial
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tutorial $tutorial)
    {
        return Inertia::render('editors/tutorials/Edit', [
            'tutorial' => $tutorial,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tutorial $tutorial)
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'tutorial_type_id' => 'required|exists:tutorial_types,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8192',
        ];

        $isPDF = $request->tutorial_type_id == 2;

        if ($isPDF) {
            $rules['pdf'] = 'nullable|file|mimes:pdf|max:122880';
        } else {
            $rules['embed_url'] = 'required|string|max:255';
        }

        $data = $request->validate($rules);

        // Valores por defecto actuales
        $validated['image_url'] = $tutorial->image_url;
        $validated['embed_url'] = $tutorial->embed_url;

        if ($isPDF && $request->hasFile('pdf')) {
            Storage::delete($tutorial->embed_url);
            $data['embed_url'] = Storage::put('editors/tutorials/files', $request->pdf);
        }

        if ($request->hasFile('image')) {
            Storage::delete($tutorial->image_url);
            $data['image_url'] = Storage::put('editors/tutorials/images', $request->image);
        }

        $tutorial->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tutorial $tutorial)
    {
        Storage::delete($tutorial->image_url);

        if ($tutorial->tutorial_type_id == 2) {
            Storage::delete($tutorial->embed_url);
        }

        $tutorial->delete();

        return to_route('tutorials.index');
    }
}
