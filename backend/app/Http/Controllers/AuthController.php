<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use Illuminate\Http\Request;
use App\User;
use DB;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','signup']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Email And Password Incorrect'], 401);
        }
        $userLoginDetail=DB::table('users')->where('email',request(['email']))->get();
         $name= $userLoginDetail['0']->name;
         $id= $userLoginDetail['0']->id;
         $email= $userLoginDetail['0']->email;
        return $this->respondWithToken($token,$name,$id,$email);
    }
    public function signup(SignUpRequest $request)
    {
        $user=User::create($request->all());
        return $this->login($request);
       // $credentials = request(['email', 'password']);

       //  if (! $token = auth('api')->attempt($credentials)) {
       //      return response()->json(['error' => 'Email And Password Incorrect'], 401);
       //  }

       //  return $this->respondWithToken($token); 
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token,$name,$id,$email)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'name' => $name ,
            'id' => $id,
            'email' => $email
        ]);
    }
}