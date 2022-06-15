<?php

namespace App\Http\Controllers;


use App\Repositories\Author\AuthorRepository;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    //

    protected $authorRepository;
    public function __construct(AuthorRepository $authorRepository)
    {
        $this->authorRepository = $authorRepository;
    }
    public function getAllAuthors(){
        $authors = $this->authorRepository->getAllAuthors();
        return $authors;
    }
}
