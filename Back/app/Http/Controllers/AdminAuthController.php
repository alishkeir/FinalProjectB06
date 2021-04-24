<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;

use App\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// use App\Http\Requests\Admin\AddAdmin;

class AdminAuthController extends Controller {

    public function login() {
        $login = request( ['email', 'password'] );

        if ( !$token = auth( 'admins' )->attempt( $login ) ) {
            return response()->json( ['error' => 'Unauthorized'], 401 );
        }

        return $this->createNewToken( $token );
    }

    public function profile() {
        return response()->json( auth( 'admins' )->user() );
    }

    public function logout() {
        auth( 'admins' )->logout();

        return response()->json( ['message' => 'Successfully logged out'] );
    }

    protected function createNewToken( $token ) {
        $admin = auth( 'admins' )->user();

        return response()->json( [
            'access_token' => $token,
            'token_type' => 'bearer',
            'admin' => $admin,
            // 'expires_in' => auth()->factory()->getTTL() * 60
        ] );
    }

}
