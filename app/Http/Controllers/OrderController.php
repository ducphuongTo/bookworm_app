<?php

namespace App\Http\Controllers;

use App\Repositories\Order\OrderRepository;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    public $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'order_amount' => 'required',
            'cart' => "required"
        ]);

        $user_id = $request->user_id;
        $order_amount = $request->order_amount;
        $cart = $request->cart;

        return $this->orderRepository->createOrder($user_id, $order_amount, $cart);
    }
}
