<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Laboratory;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LaboratoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/laboratories', [
            'laboratories' => Laboratory::all(),
            'attendanceResponse' => Laboratory::with('users')->get(),
            'status' => session()->get('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'opening_time' => 'required|date_format:H:i',
            'closing_time' => 'required|date_format:H:i|after:opening_time',
        ]);

        // Create new laboratory 
        Laboratory::create($validated);

        // return to the laboratories view
        return to_route('laboratories.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'opening_time' => 'required|date_format:H:i',
            'closing_time' => 'required|date_format:H:i|after:opening_time',
        ]);

        $laboratory = Laboratory::findOrFail($id);

        $laboratory->update($validated);

        return to_route('laboratories.index');
    }
}
