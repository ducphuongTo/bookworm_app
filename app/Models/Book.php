<?php

namespace App\Models;

use http\Env\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'book';

    function author(){
        return $this->belongsTo(Author::class);
    }
    function review(){
        return $this-> hasMany(Review::class);
    }
    function category(){
        return $this->belongsTo(Category::class);
    }
    function discount(){
        return $this->hasOne(Discount::class);
    }
    function orderItem()
    {
        return $this->hasMany(OrderItem::class);
    }


    public function scopeOnSale(){
        return Book::join('discount', 'discount.book_id', '=', 'book.id' )
            ->join('category', 'book.category_id', '=', 'category.id')
            -> join('author', 'author.id', '=', 'book.author_id')
            ->selectRaw('book.id,
            book.book_title,
            book.book_price,
            book.book_cover_photo,
            author.author_name,
            discount.discount_price,
            category.category_name,
            book.book_price - discount.discount_price as sub_price')
            ->orderBy('sub_price', 'desc');
    }

    public function scopePopular(){
        return  Book::join('author', 'author.id', '=', 'book.author_id')
            ->join('review', 'review.book_id', '=', 'book.id')
            ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
            ->join('category', 'book.category_id', '=', 'category.id')
            ->select('book.id',
                'book.book_title',
                'book.book_price',
                'discount.discount_price',
                'book.book_cover_photo',
                'category.category_name',

                'author.author_name')
            ->selectRaw('(CASE WHEN discount.discount_price is null
                              THEN book.book_price
                              ELSE discount.discount_price END) as final_price')

            ->withCount('review')
            ->distinct();
    }

    public function scopeRecommend(){
        return Book::join('review','review.book_id','=','book.id')
            ->join('author','author.id','=','book.author_id')
            ->join('category', 'book.category_id', '=', 'category.id')
            ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
            ->select('book.id',
                'book.book_title',
                'book.book_price',
                'discount.discount_price',
                'book.book_summary',
                'book.book_cover_photo',
                'author.author_name',
                'category.category_name'
            )
            ->selectRaw('(CASE WHEN discount.discount_price is null
                        THEN book.book_price
                        ELSE discount.discount_price END)
                        AS final_price')
            ->withAvg('review','rating_start');
    }


    public function scopeFeaturedBooks(){
        return Book::join('category', 'book.category_id', '=', 'category.id')
            ->join('discount', 'discount.book_id', '=', 'book.id' )
            ->join('author', 'author.id', '=', 'book.author_id')
            ->join('review', 'review.book_id', '=', 'book.id')
            ->select('book.*',
                'category.category_name',
                'author.author_name',
                'discount.discount_price',
            )
            ->selectRaw('(CASE WHEN discount.discount_price is null
                        THEN book.book_price
                        ELSE discount.discount_price END)
                        AS final_price,
                         book.book_price - discount.discount_price as sub_price,
                         count(review.book_id) as total_review,
                         avg(review.rating_start) as rating_start
                        ')
            ->groupBy('book.id','category.category_name','author.author_name','discount.discount_price','sub_price');

    }

    public function scopeSort($query, $request)
    {
        if ($request->has("sort")) {
            foreach ($request->query("sort") as $key => $value) {
                $sortBy = $key;
                $sortValue = $value;
            }
            if ($sortBy == "onSale") {

                $query->orderBy($sortBy, $sortValue);
            }
            if ($sortBy == "popularity") {

                $query->orderBy($sortBy, $sortValue);
            }
            if ($sortBy == "final_price") {
                $query->orderBy($sortBy, $sortValue);
            }
        }
        return $query;
    }

    public function scopeFilter($query, $request){
        if ($request->has("filter.category_name")) {
            $categoryList = explode(",", $request->query("filter")["category_name"]);
            $query->where("category_name",'=', $categoryList);
        }
        if ($request->has("filter.author_name")) {
            $categoryList = explode(",", $request->query("filter")["author_name"]);
            $query->where("author_name",'=', $categoryList);
        }
        if ($request->has("filter.rating_start")) {
            $categoryList = explode(",", $request->query("filter")["rating_start"]);
            $query->where("rating_start",'>=', $categoryList);
        }
        return $query;
    }


}
