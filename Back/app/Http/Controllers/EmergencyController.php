<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Emergency;

class EmergencyController extends Controller {
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    // public function index( Request $request ) {
    //     $data = $request->all();
    //     $cat = $request->category;

    //     if ( $request->page ) {
    //         return Emergency::with( 'category' )->with( 'user' )->where( 'category_id', $cat )->paginate( 5 );

    //     } else {
    //         return Emergency::with( 'category' )->with( 'user' )->get();
    //     }
    // }

    public function new( Request $request ) {
        $data = $request->all();

        $cat = $request->category;

        return Emergency::with( 'category' )->with( 'user' )->where( 'category_id', $cat )->where( 'status', 'new' )->orderBy('id', 'desc')->paginate( 5 );

    }

    public function pending( Request $request ) {
      $data = $request->all();

        $cat = $request->category;

        return Emergency::with( 'category' )->with( 'user' )->where( 'category_id', $cat )->where( 'status', 'pending' )->orderBy('id', 'desc')->paginate( 5 );

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

    public function store( Request $request ) {
        $data = $request->all();
        $emergency = new  Emergency();
        $emergency->emergency_name = $data['emergency_name'];
        $emergency->emergency_lat = $data['emergency_lat'];
        $emergency->emergency_long = $data['emergency_long'];
        $emergency->user_id = $data['user_id'];
        $emergency->status = $data['status'];
        $emergency->category_id = $data['category_id'];
        $emergency->save();
        return response()->json( ['status' => 200, 'Emergency' => $emergency] );

    }

    /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function show( $id ) {
        return Emergency::where( 'id', $id )->with( 'category' )->with( 'user' )->first();

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

    public function update( Request $request, $id ) {
        $data = $request->all();

        $emergency = Emergency::where( 'id', $id )->first();

        // if ( $request->status ) {

        $emergency->status = $data['status'];

        // }

        $emergency->save();
        return response()->json( ['status' => 200, 'Emergency' => $emergency] );
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function destroy( $id ) {
        $emergency = Emergency::findOrFail( $id );
        $emergency->delete();
        return response( 'Emergency deleted successfully' );
    }
}
