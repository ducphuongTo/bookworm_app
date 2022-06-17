<?php

namespace App\Repositories\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


//use Your Model

/**
 * Class AuthRepository.
 */
class AuthRepository
{
    /**
     * @return string
     *  Return the model
     */
    public function model()
    {
        //return YourModel::class;
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email'=>'required|email',
            'password'=>'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=> 'Validation fails'
            ]);
        }
        $user = User::where('email',$request->email)->first();
        if($user){
            if(Hash::check($request->password,$user->password))
            {
                $token = $user->createToken('DuAnRookieBookWormApp')->plainTextToken;
                return response()->json([
                    'message'=>'Login successfully',
                    'token'=>$token,
                    'data'=>$user
                ],200);
            }
            else{
                return response()->json([
                    'message'=>'Wrong password'

                ],400);
            }
        }
        else{
            return response()->json([
                'message'=>'User name dose not exist.'

            ],400);
        }
    }

    public function logout(Request $request){

        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'User log out successfully'
        ]);
    }
    public function user(Request $request){
        return $request->user();
    }

    public function register(Request $request){

        $fields = $request->validate([
            "first_name" => "required|alpha|max:128",
            "last_name" => 'required|alpha|max:128',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|max:50'
        ]);

        $user = User::create([
            'first_name' => $fields['first_name'],
            'last_name' => $fields['last_name'],
//            'full_name' => $fields['last_name']  . " " . $fields['first_name'],
            'email' => $fields['email'],
            'password' => $fields['password']
        ]);
        $response = [
            [
                'message'=> "User successfully created"
            ],
            [
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
//                'full_name' => $user->full_name,
                'email' => $user->email,
                'password' => $user->password,
                'id'=>$user->id,
                'created_at'=>$user->created_at,
                'updated_at'=>$user->updated_at,
            ]
        ];
        return response($response, 201);
    }
}
