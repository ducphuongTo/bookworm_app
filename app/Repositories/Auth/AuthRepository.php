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
}
