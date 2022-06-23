<?php

namespace App\Http\Controllers;

use App\Repositories\Book\BookRepository;
use Illuminate\Http\Request;

class BookController extends Controller
{
    //
    private $bookRepository;
    public function __construct(BookRepository $bookRepository){
        $this->bookRepository = $bookRepository;
    }

    public function getAllBook(Request $request){

    }
    public function getSaleBook(){
        return $this->bookRepository->getOnSaleBooks();
    }
    public function getPopularBooks(){
        return $this->bookRepository->getPopularBooks();
    }
    public function getBookById($id){
        return $this->bookRepository->getBookById($id);
    }
    public function getRecommendedBooks(){
        return $this->bookRepository->getRecommendedBooks();
    }

    public function getByCondition(Request $request){
        return $this->bookRepository->getByCondition($request);
}
}
