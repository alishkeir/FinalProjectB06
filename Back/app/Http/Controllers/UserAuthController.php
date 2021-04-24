<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller; 
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\User\AddUser;

class UserAuthController extends Controller {

    // public function __construct()
    // {
    //     $this->middleware( 'auth:api', ['except' => ['login', 'register']] );
    // }

    public function login() {
        $login = request( ['email', 'password'] );

        if ( !$token = auth( 'users' )->attempt( $login ) ) {
            return response()->json( ['error' => 'Unauthorized'], 401 );
        }

        return $this->createNewToken( $token );
    }

    public function register( AddUser $request ) {
        $data = $request->all();
        $request->validated();
        $user = new User();

        $password = $request->password;

        $user->phone_number = $data['phone_number'];

        $user->fill( $data );

        $user->password = bcrypt( $password );

        $user->save();
        return response()->json( ['status' => 200, 'User' => $user] );
    }

    public function profile() {
        return response()->json( auth( 'users' )->user() );
    }

    public function logout() {
        auth( 'users' )->logout();

        return response()->json( ['message' => 'Successfully logged out'] );
    }

    protected function createNewToken( $token ) {
        $user = auth( 'users' )->user();

        return response()->json( [
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => $user,
            // 'expires_in' => auth()->factory()->getTTL() * 60
        ] );
    }

}
