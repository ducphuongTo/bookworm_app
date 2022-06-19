<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'book';

    function author(){
        return $this->belongsTo(Author::class);
    }
    function review(){
        return $this-> hasMany(Review::class);
    }
}
