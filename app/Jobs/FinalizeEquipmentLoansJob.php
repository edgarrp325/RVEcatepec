<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;

class FinalizeEquipmentLoansJob implements ShouldQueue
{
    use Queueable;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The number of seconds before the job should timeout.
     */
    public int $timeout = 60;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $loans = DB::table('equipment_user')
            ->join('equipment', 'equipment.id', '=', 'equipment_user.equipment_id')
            ->join('laboratories', 'laboratories.id', '=', 'equipment.laboratory_id')
            ->whereNull('equipment_user.end_time')
            ->select('equipment_user.id', 'laboratories.closing_time')
            ->get();

        foreach ($loans as $loan) {
            DB::table('equipment_user')
                ->where('id', $loan->id)
                ->update(['end_time' => $loan->closing_time]);
        }
    }
}
