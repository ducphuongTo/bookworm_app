<?php

namespace App\Repositories\Book;


//use Your Model
use App\Models\Book;
use Illuminate\Support\Facades\DB;

/**
 * Class BookRepository.
 */
class BookRepository
{
    /**
     * @return string
     *  Return the model
     */
    public function model()
    {
        //return YourModel::class;
    }

    public function getOnSaleBooks(){
        $books =  Book::join('discount', 'discount.book_id', '=', 'book.id' )
            -> join('author', 'author.id', '=', 'book.author_id')
            ->selectRaw('book.id,
            book.book_title,
            book.book_price,
            book.book_cover_photo,
            author.author_name,
            discount.discount_price,
            book.book_price - discount.discount_price as sub_price')
            ->orderBy('sub_price', 'desc')
            ->limit(10)
            ->get();
        return response()->json([
          "message" => "Get sale book successfully",
          "data" => $books
        ],200);
    }

    public function getPopularBooks(){
        $books =  Book::join('author', 'author.id', '=', 'book.author_id')
            ->select('book.id',
                'book.book_title',
                'book.book_price',
                'book.book_cover_photo',
                'author.author_name')
            ->selectRaw('(CASE WHEN EXISTS (select book_id from discount where book.id=book_id)
                              THEN (select discount_price from discount where book_id=book.id)
                              ELSE book.book_price END) as final_price')
            ->join('review', 'review.book_id', '=', 'book.id')
            ->withCount('review')
            ->distinct()
            ->orderBy('review_count', 'desc')
            ->orderBy('final_price', 'asc')
            ->limit(8)
            ->get();
        return response()->json([
            "message" => "Get popular book successfully",
            "data" => $books
        ],200);
    }

    public function getBookById($id){
       $book = Book::join('review','review.book_id', '=','book.id')
                    ->join('author','author.id','=','book.author_id')
                    ->join('category','category.id','=','book.category_id')
                    ->join('discount','discount.book_id','=','book.id')
                    ->select('book.id',
                            'book.book_title',
                            'book.book_summary',
                            'book.book_price',
                            'book.book_cover_photo'
                            ,'author_name',
                            'category.category_name',
                            'discount.discount_price')
                    ->withCount('review')
                    ->distinct()
                    ->withAvg('review','rating_start')
                    ->where('book.id','=',$id)
                    ->get();

       return response()->json([
            "message" => "Get book by id: {$id} successfully",
            "data" => $book
       ],200);
    }

    public function getRecommendedBooks(){
        $book = Book::join('review','review.book_id','=','book.id')
            ->join('author','author.id','=','book.author_id')
            ->select('book.id',
                'book.book_title',
                'book.book_summary',

                'book.book_cover_photo',
                'author.author_name'
            )
            ->selectRaw('(
                CASE
                WHEN exists(select book_id from discount where book.id = book_id)
                THEN (select discount_price from discount where book.id = discount.book_id)
                ELSE
                    book.book_price
                END
            ) as final_price')

            ->withAvg('review','rating_start')
            ->orderBy('review_avg_rating_start','desc')
            ->orderBy('final_price','asc')
            ->distinct()
            ->limit(8)
            ->get();
        return response()->json([
            "message" => "Get recommend book successfully",
            "data" => $book
        ],200);
    }
}
