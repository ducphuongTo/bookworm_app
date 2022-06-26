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


    public function scopeSort($query, $request)
    {
        if ($request->has("sort")) {
            foreach ($request->query("sort") as $key => $value) {
                $sortBy = $key;
                $sortValue = $value;
            }
            if ($sortBy == "review_date") {
                $query->orderBy($sortBy, $sortValue);
            }

        }
        return $query;
    }
}
