<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\WargaController;
use App\Http\Controllers\API\KeuanganController;
use App\Http\Controllers\API\GalleryController;
use App\Http\Controllers\API\InventarisController;
use App\Http\Controllers\API\AcaraController;
use App\Http\Controllers\API\BeritaController;
use App\Http\Controllers\API\DashboardController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Public data (untuk halaman publik)
Route::get('/berita-publik', [BeritaController::class, 'publicIndex']);
Route::get('/acara-publik', [AcaraController::class, 'publicIndex']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Warga
    Route::apiResource('warga', WargaController::class);
    Route::get('/warga-stats', [WargaController::class, 'stats']);

    // Keuangan
    Route::apiResource('keuangan', KeuanganController::class);
    Route::get('/keuangan-summary', [KeuanganController::class, 'summary']);

    // Gallery
    Route::apiResource('gallery', GalleryController::class);

    // Inventaris
    Route::apiResource('inventaris', InventarisController::class);

    // Acara
    Route::apiResource('acara', AcaraController::class);

    // Berita
    Route::apiResource('berita', BeritaController::class);

    Route::get('/test-api', function () {
    return response()->json(["message" => "API jalan"]);
});
});