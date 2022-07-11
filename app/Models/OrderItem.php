<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\SoftDeletes;
class OrderItem extends Model
{
    use HasFactory, SoftDeletes, Prunable;

    public $timestamps = false;
    protected $table = 'order_item';

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function book()
    {
        return $this->belongsTo(Book::class);
    }

}
