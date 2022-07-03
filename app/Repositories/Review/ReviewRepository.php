<?php

namespace App\Repositories\Review;


//use Your Model
use App\Models\Author;
use App\Models\Book;
use App\Models\Review;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Class ReviewRepository.
 */
class ReviewRepository
{
    /**
     * @return string
     *  Return the model
     */
    public function model()
    {
        //return YourModel::class;
    }

    public function getReview($id){
        // $reviews = DB::table('review')
        // ->where('book_id',$id)
        // ->select('review.rating_start')
        // ->groupBy('rating_start')
        // ->get();
        // return $reviews;
        $reviews = Review::where('book_id',$id)->get();
        return $reviews;
    }

    public function create($request){
        $reviews = new Review();
        $reviews->book_id = $request->book_id;
        $reviews->review_title = $request->review_title;
        $reviews->review_details = $request->review_details;
        $reviews->rating_start = $request->rating_start;
        $reviews->review_date = Carbon::now();
        $reviews->save();

        return $reviews;
    }

    public function totalReview($bookId)
    {
       return Review::query()
            ->where('book_id',$bookId)
            ->count('book_id');
    }

    public function countStart($bookId)
    {
        return Review::query()
            ->where('book_id', $bookId)
            ->select('rating_start', DB::raw('count(review.book_id) as count'))
            ->groupBy('rating_start')
            ->get();
    }

    public function getAvgStar($bookId)
    {
        return Review::query()
            ->where('review.book_id','=',$bookId)
            ->avg('rating_start');
    }

    public function getReivewByCondition(Request $request,$bookId)
    {
        $size = $request->query("paginate");
        $books = Review::select('review.*')
            ->where('review.book_id','=',$bookId)
//           ->orderByDesc('sub_price')
//           ->orderByAsc('final_price')
            ->sort($request)
            ->paginate($size);
//            ->paginate($size);
        return response()->json([
            "message" => "Get  book successfully",
            "data" => $books
        ],200);

    }

    public function ratingReview(){
        return Review::query()
            ->selectRaw('rating_start')
            ->groupBy('rating_start')
            ->orderBy('rating_start','asc')
            ->get();
    }
}
