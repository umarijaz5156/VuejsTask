<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

Route::get('/{any}', function () {
    return view('app'); // Vue.js will handle routing
})->where('any', '.*'); // Allow Vue to handle frontend routes

