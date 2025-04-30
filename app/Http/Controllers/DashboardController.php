<?php

namespace App\Http\Controllers;

use App\Enums\EquipmentTypeEnum;
use App\Enums\RoleEnum;
use App\Models\Equipment;
use App\Models\Laboratory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $isUsingMac = $user->isUsingEquipmentType(EquipmentTypeEnum::IMAC->value);
        $isUsingPC = $user->isUsingEquipmentType(EquipmentTypeEnum::PC->value);

        if ($user->role_id == RoleEnum::ALUMN->value) {

            $data = $user->hasActiveAttendance()
                ? ['attendance' => $user->laboratories()->wherePivotNull('end_time')->first()]
                : ['laboratories' => Laboratory::all()];

            if ($user->hasActiveEquipmentLoan()) {
                $data['equipmentLoans'] = $user->equipment()->with('equipmentType')->wherePivotNull('end_time')->get();
            }

            if (!$user->hasActiveAttendance() && !$user->hasActiveEquipmentLoan()) {
                return redirect(route('attendance.create'));
            }
            $data['availableEquipment'] = Equipment::with('equipmentType')->with('laboratory')->orderBy('label', 'desc')->where('status', 'Available')->get();

            $data['isUsingComputer'] = $isUsingMac || $isUsingPC;

            return Inertia::render('dashboard/alumn-dashboard', $data);
        }
    }
}
