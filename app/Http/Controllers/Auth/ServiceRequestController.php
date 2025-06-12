<?php


namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\ServiceRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ServiceRequestController extends Controller
{
    /**
     * Show the service request page.
     */
    public function show(): Response
    {
        return Inertia::render('auth/service-request');
    }

    public function send(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
            'procedence' => 'required|string',
            'institute_name' => 'required|string|max:255',
            'service' => 'required|string',
            'cv_file' => 'required|file|mimes:pdf|max:5120',
        ]);

        try {
            Mail::to('jjamadorr@uaemex.mx')->send(new ServiceRequest($request));
            return to_route('home')->with('success', 'Solicitud de servicio enviada exitosamente.');
        } catch (\Throwable $th) {
            return to_route('home')->with('error', 'Error al enviar la solicitud de servicio. Por favor, intenta más tarde.');
        }
    }
}
