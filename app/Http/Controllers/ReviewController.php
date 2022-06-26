<?php

namespace App\Http\Controllers;

use App\Http\Requests\Review\CreateRequest;
use App\Repositories\Review\ReviewRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    //

    private $reviewRepository;
    public function __construct(ReviewRepository $reviewRepository){
        $this->reviewRepository = $reviewRepository;
    }
    public function getReviewList($id){
        return $this->reviewRepository->getReview($id);

    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'review_title' => 'required|max:120',
            'review_details' => 'nullable'
        ], [
            'review_title.required' => 'You have not entered the review title!',
            'review_title.alpha_num' => 'Review title content contains only letters or numbers',
            'review_title.max' => 'Review title content must be less than 120 characters in length'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => "Can not write review"

            ]);
        }
        $reviews = $this->reviewRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'Review Stored',
            'data'    => $reviews,
        ]);
    }

    public function reviewTotal($bookId){
        return $this->reviewRepository->totalReview($bookId);
    }
    public function countStart($bookId)
    {
        return $this->reviewRepository->countStart($bookId);
    }






}
