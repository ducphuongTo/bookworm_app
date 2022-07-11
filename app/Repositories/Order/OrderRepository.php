<?php

namespace App\Repositories\Order;



use App\Models\OrderItem;
use App\Models\User;
use App\Models\Book;
use App\Models\Order;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
/**
 * Class OrderRepository.
 */
class OrderRepository
{
    /**
     * @return string
     *  Return the model
     */
    public function model()
    {
        //return YourModel::class;
    }
    public function createOrder($userId, $order_amount, $cart): \Illuminate\Http\JsonResponse
    {
        DB::beginTransaction();
        $unavailableItems = [];
        try {
            $idOrder = DB::table("order")->insertGetId(
                [
                    'user_id' => $userId,
                    'order_date' => date_format(date_create(), 'Y-m-d H:i:s'),
                    'order_amount' => $order_amount
                ]
            );
            $cartMapped = collect($cart)->map(function ($value) use ($idOrder) {
                return [
                    "order_id" => $idOrder,
                    "book_id" => $value["book_id"],
                    "quantity" => $value["quantity"],
                    "price" => $value["price"],
                ];
            })->all();
            foreach ($cartMapped as  $item) {
                if (!Book::where("id", "=", $item['book_id'])->exists()) {
                    $unavailableItems[] = $item['book_id'];
                }
            }
            DB::table("order_item")->insert($cartMapped);
            DB::commit();
            return response()->json([
                "status" => 200,
                "success" => true,
                "message" => "Order successfully"
            ], 200);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                
                "success" => false,
                "message" => "Order failed",
                "data" => $unavailableItems
            ], 400);
        }
        
    }
}
