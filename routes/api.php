<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
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
Route::post('register',[AuthController::class,'register']);
Route::get('getAuthors',[AuthorController::class,'getAllAuthors']);

Route::get('getOnSaleBooks', [BookController::class,'getSaleBook']);
Route::get('getOnPopularBooks',[BookController::class,'getPopularBooks']);
Route::get('book/recommend',[BookController::class,'getRecommendedBooks']);
Route::get('book/{id}',[BookController::class,'getBookById']);
Route::get('book/review/{id}',[\App\Http\Controllers\ReviewController::class,'getReviewList']);
