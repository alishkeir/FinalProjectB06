<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Admin;
use App\Http\Requests\Admin\AddAdmin;
use App\Http\Requests\Admin\UpdateAdmin;

class AdminController extends Controller {
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    public function index( Request $request ) {
        if ( $request->page ) {
          $cat = $request->category;
            return Admin::with( 'category' )->where( 'category_id', $cat )->paginate();
        } else{
       
            return Admin::with( 'category' )->get();
        }
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

    public function store( AddAdmin $request ) {
        $data = $request->all();
        $request->validated();
        $admin = new Admin();

        $image = $request->file( 'image' );
        $name = time() . '_' . $image->getClientOriginalName();
        $path = $request->file( 'image' )->storeAs( '/Admin', $name, 'public' );

        $password = $request->password;
        $data['image'] = $name;
        if ( $name ) {
            $admin->fill( $data );
            $admin->password = bcrypt( $password );
            $admin->save();
            return response()->json( ['status' => 200, 'Admin' => $admin] );
        } else {
            return response()->json( ['staus' => 500, 'error' => 'couldnt upload image'] );

        }
    }

    /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function show( $id ) {

        return Admin::where( 'id', $id )->with( 'category' )->first();

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

    public function update( UpdateAdmin $request, $id ) {

        $data = $request->all();

        $admin = Admin::where( 'id', $id )->first();

        $image = $request->file( 'image' );
        // if ( $image ) {
        //     $name = time() . '_' . $image->getClientOriginalName();
        //     $path = $request->file( 'image' )->storeAs( '/Service', $name, 'public' );
        //     $data['image'] = $name;

        // }

        $password = $request->password;

        if ( $request->name ) {
            $admin->name = $data['name'];
        }
        if ( $request->email ) {
            $admin->email = $data['email'];
        }
        if ( $request->category_id ) {
            $admin->category_id = $data['category_id'];
        }

        if ( $image ) {
            $name = time() . '_' . $image->getClientOriginalName();
            $path = $request->file( 'image' )->storeAs( '/Admin', $name, 'public' );
            $data['image'] = $name;

        }
        if ( $image ) {
            if ( $name ) {
                $admin->image = $name;
            }
        }

        $admin->update( $data );

        if ( $request->password ) {
            $admin->password = bcrypt( $password );

        }

        $admin->save();
        return response()->json( ['status' => 200, 'Admin' => $admin] );

    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function destroy( $id ) {

        $admin = Admin::findOrFail( $id );

        $admin->delete();
        return response( 'Admin deleted successfully',);
    }
}
