<?php

namespace App\Repositories\Review;


//use Your Model
use App\Models\Review;

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
        return Review::all()->where('book_id', '=', $id);
    }

}
