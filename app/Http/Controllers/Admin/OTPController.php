<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OTP;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OTPController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('admin/one-time-passwords', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'otps' => OTP::orderBy('id', 'asc')->get(),
        ]);
    }

    /**
     * Regenerate a one time password
     */
    public function regenerate(Request $request, $id): RedirectResponse
    {
        $otp = OTP::find($id);

        $otp->code = random_int(100000, 999999);
        $otp->save();
        
        return to_route('otp.edit');
    }
}
