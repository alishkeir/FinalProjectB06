<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Tip\AddTip;
use App\Http\Requests\Tip\UpdateTip;
use App\Tip;

class TipController extends Controller {
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    public function index() {
        return Tip::with('category')->paginate(5);

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

    public function store( AddTip $request ) {
        $data = $request->all();
        $request->validated();
        $tip = new Tip();

        $image = $request->file( 'image' );
        $name = time() . '_' . $image->getClientOriginalName();
        $path = $request->file( 'image' )->storeAs( '/Tip', $name, 'public' );

        $logo = $request->file( 'logo' );
        $name2 = time() . '_' . $image->getClientOriginalName();
        $path2 = $request->file( 'logo' )->storeAs( '/Tip', $name2, 'public' );

        $data['image'] = $name;
        $data['logo'] = $name2;

        if ( $name && $name2 ) {
            $tip->fill( $data );
            $tip->save();
            return response()->json( ['status' => 200, 'Tip' => $tip] );
        } else {
            return response()->json( ['staus' => 500, 'error' => 'couldnt upload image or logo'] );

        }
    }

    /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function show( $id ) {
        return Tip::where( 'id', $id )->with('category')->first();

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

    public function update( UpdateTip $request, $id ) {
        $data = $request->all();

        $tip = Tip::where( 'id', $id )->first();

        $image = $request->file( 'image' );
        if ( $image ) {
            $name = time() . '_' . $image->getClientOriginalName();
            $path = $request->file( 'image' )->storeAs( '/Tip', $name, 'public' );
            $data['image'] = $name; 
        }

        $logo = $request->file( 'logo' );
        if ( $logo ) {
            $name2 = time() . '_' . $image->getClientOriginalName();
            $path2 = $request->file( 'logo' )->storeAs( '/Tip', $name2, 'public' );
            $data['logo'] = $name2;

        }


        if ( $request->tip_name ) {
            $tip->tip_name = $data['tip_name'];
        }

        if ( $request->tip_description ) {
            $tip->tip_description = $data['tip_description'];
        }

        if ( $request->category_id ) {
            $tip->category_id = $data['category_id'];
        }

        if ( $request->image ) {
            if ( $name ) {
                $tip->image = $name;
            }
        }

        if ( $request->logo ) {
            if ( $name2 ) {
                $tip->logo = $name2;
            }
        }

        $tip->update( $data ); 
        $tip->save();
        return response()->json( ['status' => 200, 'Tip' => $tip] );

    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function destroy( $id ) {
        $tip = Tip::findOrFail( $id );
        $tip->delete();
        return response( 'Tip deleted successfully' );
    }
}
