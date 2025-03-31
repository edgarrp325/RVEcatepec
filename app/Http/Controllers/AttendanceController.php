<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

        // Verify if the register exist 
            DB::table('laboratory_user')
                ->where('id', $id)
                ->update([
                    'end_time' => Carbon::now('America/Mexico_City')->format('H:i'),
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
        $finished_attendance = DB::table('laboratory_user')
        ->whereNotNull('end_time');

        $finished_attendance->delete();

        DB::statement('ALTER TABLE laboratory_user AUTO_INCREMENT = 1');
    }
}
