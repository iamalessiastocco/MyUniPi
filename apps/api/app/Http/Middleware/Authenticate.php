<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // Per le API, restituisci errore JSON invece di redirect
        if ($request->is('api/*')) {
            abort(response()->json([
                'message' => 'Unauthenticated.'
            ], 401));
        }

        // Per le web routes, redirect al login (se esiste)
        return route('login');
    }
}