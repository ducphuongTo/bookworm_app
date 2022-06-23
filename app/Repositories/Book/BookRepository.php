<?php

namespace App\Repositories\Book;


//use Your Model
use App\Models\Book;
use Illuminate\Http\Request;
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


    public function getAll(){
        $booksOnSale = Book::OnSale()

            ->get();
        return response()->json([
            "message" => "Get sale books successfully",
            "data" => $booksOnSale
        ],200);
    }
    //get on sale books
    public function getOnSaleBooks(){
        $booksOnSale = Book::OnSale()
                    ->limit(10)
                    ->get();
        return response()->json([
            "message" => "Get sale books successfully",
            "data" => $booksOnSale
        ],200);
    }

    //get Popular books
    public function getPopularBooks(){
        $popularBooks = Book::Popular()
            ->orderBy('review_count', 'desc')
            ->orderBy('final_price', 'asc')
            ->limit(8)
            ->get();
        return response()->json([
            "message" => "Get popular book successfully",
            "data" => $popularBooks
        ],200);

//        $featuredBooks = DB::table('book')
//            ->join('review', 'book.id', '=', 'review.book_id')
//            ->join('category', 'book.category_id', '=', 'category.id')
//            ->join('author', 'book.author_id', '=', 'author.id')
//            ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
//            ->select('review.book_id', 'category.category_name', 'author.author_name', 'discount.discount_price', 'book.book_title', 'book.book_cover_photo', 'book.book_price')
//            ->selectRaw('(CASE WHEN discount.discount_price is null THEN book.book_price ELSE discount.discount_price END) AS final_price')
//            ->groupBy('review.book_id', 'author.author_name', 'discount.discount_price', 'book.book_title', 'book.book_price', 'book.book_cover_photo', 'category.category_name')
//            ->selectRaw('count(review.book_id) as total_review')
//            ->orderByDesc('total_review')
//            ->orderBy('final_price')
//            ->take(8)
//            ->get();


    }
    // recommend books
    public function getRecommendedBooks(){
       $recommendBooks = Book::Recommend()
            ->orderBy('review_avg_rating_start','desc')
            ->orderBy('final_price','asc')
            ->distinct()
            ->limit(8)
            ->get();
        return response()->json([
            "message" => "Get recommend book successfully",
            "data" => $recommendBooks
        ],200);
    }

    // get book by id
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


    public function getByCondition(Request $request){
       $books = Book::FeaturedBooks()
           ->sort($request)
           ->get();

        return response()->json([
            "message" => "Get  book successfully",
            "data" => $books
        ],200);
    }
}
