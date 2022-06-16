<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->group(function(){
    Route::post("users/logout", [AuthController::class, "logoutUser"]);
    Route::get("users/profile",[AuthController::class,'me']);
});

Route::post('login',[AuthController::class,'login']);
Route::get('getAuthors',[\App\Http\Controllers\AuthorController::class,'getAllAuthors']);
