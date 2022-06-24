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
        $size = $request->query("paginate");
       $books = Book::FeaturedBooks()
           ->sort($request)
           ->filter($request)
           ->paginate($size);
        return response()->json([
            "message" => "Get  book successfully",
            "data" => $books
        ],200);
    }
}
