<?php

namespace App\Repositories\Category;
use App\Models\Category;

//use Your Model

/**
 * Class AuthorRepository.
 */
class CategoryRepository
{
    /**
     * @return string
     *  Return the model
     */
    public function model()
    {
        //return YourModel::class;
    }

    public function getAllCategories(){
        return Category::query()
            ->select('category_name')
            ->orderBy('category_name')
            ->get();
    }
}
