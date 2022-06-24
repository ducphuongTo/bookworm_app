<?php

namespace App\Repositories\Author;

use App\Models\Author;
use Illuminate\Support\Facades\Auth;
//use JasonGuru\LaravelMakeRepository\Repository\BaseRepository;
//use Your Model

/**
 * Class AuthorRepository.
 */
class AuthorRepository
{
    /**
     * @return string
     *  Return the model
     */
    public function model()
    {
        //return YourModel::class;
    }

    public function getAllAuthors(){
        return Author::query()
            ->select('author_name')
            ->orderBy('author_name')
            ->get();
    }
}
