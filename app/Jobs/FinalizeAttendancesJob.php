<?php

namespace App\Jobs;

use App\Models\Laboratory;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;

class FinalizeAttendancesJob implements ShouldQueue
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
        $attendances = DB::table('laboratory_user')
            ->join('laboratories', 'laboratories.id', '=', 'laboratory_user.laboratory_id')
            ->whereNull('laboratory_user.end_time')
            ->select('laboratory_user.id', 'laboratories.closing_time')
            ->get();

        foreach ($attendances as $attendance) {
            DB::table('laboratory_user')
                ->where('id', $attendance->id)
                ->update(['end_time' => $attendance->closing_time]);
        }
    }
}
