<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CategoryController;
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
Route::post('register',[AuthController::class,'register']);

Route::prefix('books')->group(function () {
    Route::get('/allSale',[BookController::class,'index']);
    Route::get('/sale', [BookController::class,'getSaleBook']);
    Route::get('/popular',[BookController::class,'getPopularBooks']);
    Route::get('/recommend',[BookController::class,'getRecommendedBooks']);
    Route::get('/{id}',[BookController::class,'getBookById']);

});

Route::get('book/condition',[BookController::class,'getByCondition']);


Route::prefix('review')->group(function (){
    Route::get('/{id}',[ReviewController::class,'getReviewList']);
    Route::post('/book',[ReviewController::class,'store']);
    Route::get('/total/{id}',[ReviewController::class,'reviewTotal']);
    Route::get('/countStart/{id}', [ReviewController::class, 'countStart']);
    Route::get('/avgStart/{id}', [ReviewController::class, 'avgStart']);
    Route::get('/sort/{id}',[ReviewController::class,'getReviewByCondition']);

});


Route::get('rating-start/shopPage',[ReviewController::class,'ratingReview']);


Route::prefix('authors')->group(function(){
    Route::get('/shopPage',[AuthorController::class,'getAllAuthors']);

});

Route::prefix('categories')->group(function (){
    Route::get('/shopPage',[CategoryController::class,'getAllCategories']);
});
