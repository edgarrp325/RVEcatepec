<?php

namespace App\Http\Controllers\Equipment;

use App\Http\Controllers\Controller;


use App\Models\Equipment;
use App\Models\EquipmentType;
use App\Models\Laboratory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('editors/equipment/index', [
            'equipment' => Equipment::with('usersInUse')->with('equipmentType')->with('laboratory')->orderBy('label', 'desc')->get(),
            'equipmentTypes' => EquipmentType::all(),
            'laboratories' => Laboratory::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|string|max:255|unique:equipment',
            'label' => 'required|string|max:255',
            'equipment_type_id' => 'required',
            'laboratory_id' => 'required',
        ]);

        Equipment::create($validated);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Equipment $equipment)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'equipment_type_id' => 'required',
            'laboratory_id' => 'required',
        ]);

        $equipment->update(
            [
                'label' => $validated['label'],
                'equipment_type_id' => $validated['equipment_type_id'],
                'laboratory_id' => $validated['laboratory_id'],
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipment $equipment)
    {
        $equipment->delete();
    }
}
