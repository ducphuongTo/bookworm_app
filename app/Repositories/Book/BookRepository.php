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

    public function getBookById($id){
       $book = DB::table('book')
       ->join('category','book.category_id','=','category.id')
       ->leftJoin('discount','book.id','=','discount.book_id')
       ->join('author','book.author_id','=','author.id')
       ->where('book.id','=',$id)
       ->select('book.id',
                'book.book_price',
                'book.book_title',
                'book.book_cover_photo',
                'book.book_summary',
                'author.author_name',
                'discount.discount_price',
                'category.category_name')
        ->selectRaw('(CASE WHEN discount.discount_price is null
                    THEN book.book_price
                    ELSE discount.discount_price END) as final_price')
        ->get();
       return response()->json([
            "message" => "Get book by id: {$id} successfully",
            "data" => $book
       ],200);
    }


    public function getByCondition(Request $request){

        if(isset($request['onSale']))
        {
            $size = $request->query("paginate");
            $books = Book::FeaturedBooks()
                ->orderBy('sub_price','desc')
                ->orderBy('final_price')
                ->sort($request)
                ->filter($request)
                ->paginate($size);

            return response()->json([
                "message" => "Get  book successfully",
                "data" => $books
            ],200);
        }

        if(isset($request['popularity']))
        {
            $size = $request->query("paginate");
            $books = Book::FeaturedBooks()
                ->orderBy("total_review", 'desc')
                ->orderBy("final_price")
                ->sort($request)
                ->filter($request)
                ->paginate($size);

            return response()->json([
                "message" => "Get  book successfully",
                "data" => $books
            ],200);
        }
        if(isset($request['finalPriceByDesc']))
        {
            $size = $request->query("paginate");
            $books = Book::FeaturedBooks()
                ->orderBy("final_price",'desc')
                ->sort($request)
                ->filter($request)
                ->paginate($size);

            return response()->json([
                "message" => "Get  book successfully",
                "data" => $books
            ],200);
        }
        if(isset($request['finalPriceByAsc']))
        {
            $size = $request->query("paginate");
            $books = Book::FeaturedBooks()
                ->orderBy("final_price",'asc')
                ->sort($request)
                ->filter($request)
                ->paginate($size);

            return response()->json([
                "message" => "Get  book successfully",
                "data" => $books
            ],200);
        }

    }


}
