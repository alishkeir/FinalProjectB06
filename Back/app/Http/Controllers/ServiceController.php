<?php

namespace App\Http\Controllers;
use App\Http\Requests\Service\AddService;
use App\Http\Requests\Service\UpdateService;
use Illuminate\Http\Request;
use App\Service;

class ServiceController extends Controller {
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    public function index( Request $request ) {
        $data = $request->all();
$cat=$request->category;
        if ( $request->page ) {

            return Service::with( 'category' )->where('category_id',$cat)->paginate( 5 );

        } else {
            return Service::with( 'category' )->get();
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

    public function store( AddService $request ) {
        $data = $request->all();
        $request->validated();
        $service = new Service();

        $image = $request->file( 'image' );
        $name = time() . '_' . $image->getClientOriginalName();
        $path = $request->file( 'image' )->storeAs( '/Service', $name, 'public' );

        // return $path;
        $data['image'] = $name;

        if ( $name ) {
            $service->fill( $data );
            $service->save();
            return response()->json( ['status' => 200, 'Service' => $service] );
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
        return Service::where( 'id', $id )->with( 'category' )->first();

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

    public function update( UpdateService $request, $id ) {
        $data = $request->all();

        $service = Service::where( 'id', $id )->first();

        $image = $request->file( 'image' );
        if ( $image ) {
            $name = time() . '_' . $image->getClientOriginalName();
            $path = $request->file( 'image' )->storeAs( '/Service', $name, 'public' );
            $data['image'] = $name;

        }

        if ( $request->service_name ) {
            $service->service_name = $data['service_name'];
        }

        if ( $request->category_id ) {
            $request->category_id = $data['category_id'];
        }

        if ( $request->image ) {
            if ( $name ) {
                $request->image = $name;
            }
        }
        $service->update( $data );

        $service->save();
        return response()->json( ['status' => 200, 'Service' => $service] );

    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function destroy( $id ) {

        $service = Service::findOrFail( $id );
        $service->delete();
        return response( 'Service deleted successfully' );
    }
}
