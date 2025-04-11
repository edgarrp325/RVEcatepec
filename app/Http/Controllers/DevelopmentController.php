<?php

namespace App\Http\Controllers;

use App\Models\Development;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('developments/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'images' => 'required|array|max:5', // max 5 images 
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048', // max 2MB
        ]);

        $development = Development::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        foreach ($request->file('images') as $image) {
            $imagePath = Storage::put('developments/images', $image);
            $development->images()->create([
                'image_url' => $imagePath,
            ]);
        }

        return to_route('developments.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Development $development)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Development $development)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Development $development)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Development $development)
    {
        //
    }
}
