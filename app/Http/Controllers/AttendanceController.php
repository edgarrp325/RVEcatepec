<?php

namespace App\Http\Controllers;

use App\Models\Laboratory;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

        if ($user->hasActiveAttendance() || $user->hasActiveEquipmentLoan()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('alumn/choose-lab', [
            'laboratories' => Laboratory::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $now = Carbon::now();

        $user->laboratories()->attach($request->laboratory_id, [
            'date' => $now->toDateString(),
            'start_time' => $now->format('H:i'),
            'end_time' => null,
        ]);

        if ($user->hasActiveEquipmentLoan()) {
            return to_route('dashboard')->with('success', 'Attendance started successfully.');
        }
        return to_route('equipment-loans.create')->with('success', 'Attendance started successfully.');
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

        // Verify if the register exist 
        DB::table('laboratory_user')
            ->where('id', $id)
            ->update([
                'end_time' => Carbon::now('America/Mexico_City')->format('H:i'),
            ]);
    }

    public function finish()
    {
        $user = Auth::user();

        DB::table('laboratory_user')
            ->where('user_id', $user->id)
            ->where('end_time', null)
            ->update([
                'end_time' => Carbon::now('America/Mexico_City')->format('H:i'),
            ]);

        return to_route('dashboard')->with('success', 'Attendance finished successfully.');
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
        $finished_attendance = DB::table('laboratory_user')
            ->whereNotNull('end_time');

        $finished_attendance->delete();

        DB::statement('ALTER TABLE laboratory_user AUTO_INCREMENT = 1');
    }
}
