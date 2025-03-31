<?php

namespace App\Http\Controllers\Equipment;

use App\Http\Controllers\Controller;

use App\Models\Equipment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EquipmentLoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('equipment/equipment-loans', [
            'equipmentLoans' => Equipment::whereHas('users')->with('users')->with('equipmentType')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        DB::table('equipment_user')
            ->where('id', $id)
            ->update([
                'end_time' => Carbon::now('America/Mexico_City')->format('H:i'),
            ]);

        $loan = DB::table('equipment_user')
            ->where('id', $id)
            ->first();

        $startTime = Carbon::parse($loan->start_time);
        $endTime = Carbon::parse($loan->end_time);
        $usedMinutes = $startTime->diffInMinutes($endTime);

        Equipment::find($loan->equipment_id)->update([
            'used_time' => DB::raw('used_time + ' . $usedMinutes),
            'status' => 'Available',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function destroyAll()
    {

        $finished_loans = DB::table('equipment_user')
            ->whereNotNull('end_time');

        $finished_loans->delete();

        DB::statement('ALTER TABLE equipment_user AUTO_INCREMENT = 1');
    }
}
