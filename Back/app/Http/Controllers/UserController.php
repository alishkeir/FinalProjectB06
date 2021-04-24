<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Requests\User\AddUser;
use App\Http\Requests\User\UpdateUser;

class UserController extends Controller {
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    public function index() {
        return User::with( 'emergency' )->get();

    }

    /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */

    public function store( AddUser $request ) {

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

    /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function show( $id ) {

        return User::where( 'id', $id )->with( 'emergency' )->first();

    }

    /**
    * Show the form for editing the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function update( UpdateUser $request, $id ) {
        $data = $request->all();

        $user = User::where( 'id', $id )->first();


        $password = $request->password;

        if ( $request->first_name ) {
            $user->first_name = $data['first_name'];
        }

        if ( $request->last_name ) {
            $user->last_name = $data['last_name'];
        }

        if ( $request->phone_number ) {
            $user->phone_number = $data['phone_number'];
        }

        if ( $request->email ) {
            $user->email = $data['email'];
        }

        if ( $request->disease ) {
            $user->disease = $data['disease'];
        }

        if ( $request->allergy ) {
            $user->allergy = $data['allergy'];
        }

        if ( $request->medical ) {
            $user->medical = $data['medical'];
        }

        $user->update( $data );

        if ( $request->password ) {
            $user->password = bcrypt( $password );

        }

        $user->save();
        return response()->json( ['status' => 200, 'User' => $user] );

    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function destroy( $id ) {
        $user = User::findOrFail( $id );
        $user->delete();
        return response( 'User deleted successfully' );
    }
}
