<?php

namespace App\Http\Controllers;

use App\Repositories\Auth\AuthRepository;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //

    protected $autRepository;
    public function __construct(AuthRepository $authRepository)
    {
        $this->autRepository = $authRepository;
    }

    public function login(Request $request)
    {
        return $this->autRepository->login($request);
    }
    public function logoutUser(Request $request){
        return $this->autRepository->logout($request);
    }
    public function me(Request $request){
        return $this->autRepository->user($request);
    }
}
