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
        $login = $this->autRepository->login($request);
        return $login;
    }
}
