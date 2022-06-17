<?php

namespace App\Repositories\Book;


//use Your Model
use App\Models\Book;

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

    public function getOnSaleBooks(){
        return Book::join('discount', 'discount.book_id', '=', 'book.id' )
            -> join('author', 'author.id', '=', 'book.author_id')
            ->selectRaw('book.id,
            book.book_title,
            book.book_price,
            book.book_cover_photo,
            author.author_name,
            discount.discount_price,
            book.book_price - discount.discount_price as sub_price')
            ->orderBy('sub_price', 'desc')
            ->limit(10)
            ->get();
    }
}
