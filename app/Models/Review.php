<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'review';
    protected $fillable = ['book_id','review_title','review_details','rating_star','review_date'];
    function book(){
        return $this-> belongsTo(Book::class);
    }


    function getReviewDateFormattedAttribute()
    {
        return Carbon::parse($this->attributes['review_date'])->format('F j, Y');
    }
}
