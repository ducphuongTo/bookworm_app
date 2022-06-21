<?php

namespace App\Http\Controllers;

use App\Repositories\Review\ReviewRepository;
use Illuminate\Http\Request;

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

}
