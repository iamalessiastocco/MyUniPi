<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
use App\Http\Controllers\AuthController;

// Rotta per il login
Route::post('/auth/login', [AuthController::class, 'login']);

// Rotta per il logout (protetta da autenticazione)
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Rotta per ottenere i dati dell'utente corrente
Route::get('/auth/user', [AuthController::class, 'user'])->middleware('auth:sanctum');