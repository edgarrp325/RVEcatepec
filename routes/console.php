<?php

use App\Jobs\FinalizeAttendancesJob;
use App\Jobs\FinalizeEquipmentLoansJob;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::job(new FinalizeAttendancesJob())->dailyAt('09:47');

Schedule::job(new FinalizeEquipmentLoansJob())->dailyAt('09:47');
