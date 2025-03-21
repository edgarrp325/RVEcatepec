<?php

namespace App\Http\Controllers\Auth;

use App\Enums\MajorEnum;
use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\Major;
use App\Models\OTP;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register', [
            'roles' => Role::all(),
            'majors' => Major::all(),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $isSelectedUser = $request->role_id == RoleEnum::USER->value;
        $isSelectedAdmin = $request->role_id == RoleEnum::ADMIN->value;

        $isSelectedOtherMajor = $request->major_id == MajorEnum::OTHER->value;

        //Validate the admin code if is not a normal user
        if (!$isSelectedUser) {
            $otpType = $isSelectedAdmin ? 'admin_code' : 'user_code';
            $request->validate([
                'code' => [
                    'required',
                    'string',
                    'size:6',
                    Rule::exists(OTP::class, 'code')->where('id', $otpType),
                ],
            ]);
        }

        //Common validation rules for all roles
        $rules = [
            'paternal_surname' => 'required|string|max:255',
            'maternal_surname' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role_id' => 'required|exists:' . Role::class . ',id',
        ];

        //Add specific validation rules for each role

        // if is user or is selected other major validate the origin
        if ($isSelectedUser || $isSelectedOtherMajor) {
            $rules['origin'] = 'required|string|max:255';
        } else {
            $rules['major_id'] = 'required|exists:' . Major::class . ',id';
        }


        // All roles except USER require an account number
        if (!$isSelectedUser) {
            $rules['account_number'] = 'required|string|max:7|unique:' . User::class;
        }

        //Validate the request
        $request->validate($rules);

        //Prepare common data to create the user
        $data = [
            'paternal_surname' => $request->paternal_surname,
            'maternal_surname' => $request->maternal_surname,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
        ];

        //Add specific data for each role
        // All roles except USER require an account number
        if (!$isSelectedUser) {
            $data['account_number'] = $request->account_number;
        }

        //Create the user
        $user = User::create($data);

        event(new Registered($user));

        //Add origin if is user or is selected other major
        if ($isSelectedUser || $isSelectedOtherMajor) {
            $user->origin()->create(['name' => $request->origin]);
        } else {
            $user->majors()->attach($request->major_id);
        }

        //Regenerate otp if the user is admin
        if($isSelectedAdmin){
            $otp = OTP::find('admin_code');
            $otp->code = random_int(100000, 999999);
            $otp->save();
        }

        Auth::login($user);

        //if rol is user return to the last page before login
        return $isSelectedUser ? redirect()->intended() : to_route('dashboard');
    }
}
