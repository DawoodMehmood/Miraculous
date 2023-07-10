<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\MetaTagController;
use App\Http\Controllers\LanguageController;

Route::apiResource('videos', VideoController::class);

Route::get('/meta', [MetaTagController::class, 'index']);
Route::post('/meta', [MetaTagController::class, 'store']);

Route::get('/languages', [LanguageController::class, 'index']);
Route::get('/languages/{id}', [LanguageController::class, 'show']);
Route::post('/languages', [LanguageController::class, 'store']);
Route::put('/languages/{id}', [LanguageController::class, 'update']);
Route::delete('/languages/{id}', [LanguageController::class, 'destroy']);


