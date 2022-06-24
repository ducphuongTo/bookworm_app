<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\ReviewController;
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

Route::middleware('auth:sanctum')->group(function(){
    Route::post("users/logout", [AuthController::class, "logoutUser"]);
    Route::get("users/profile",[AuthController::class,'me']);
});

Route::post('login',[AuthController::class,'login']);

//Books
Route::prefix('books')->group(function () {
    Route::get('/allSale',[BookController::class,'index']);
    Route::get('/sale', [BookController::class,'getSaleBook']);
    Route::get('/popular',[BookController::class,'getPopularBooks']);
    Route::get('/recommend',[BookController::class,'getRecommendedBooks']);
    Route::get('/{id}',[BookController::class,'getBookById']);

});
Route::get('book/condition',[BookController::class,'getByCondition']);

//Cart
Route::get('book/review/{id}',[ReviewController::class,'getReviewList']);

//review

Route::prefix('review')->group(function (){

});


Route::get('getAuthors',[AuthorController::class,'getAllAuthors']);
