<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Http\Requests\Category\AddCategories;
use App\Http\Requests\Category\UpdateCategories;

class CategoryController extends Controller {
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    public function index() {
        return Category::with( 'emergency' )->with( 'admin' )->with( 'tip' )->with( 'service' )->get();

    }

    public function specific() {
      return Category::with( 'emergency' )->with( 'admin' )->with( 'tip' )->with( 'service' )->get();

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

    public function store( AddCategories $request ) {
        $data = $request->all();
        $request->validated();
        $category = new Category();
        $category->fill( $data );
        $category->save();
        return response()->json( ['status' => 200, 'Category' => $category] );

    }

    /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function show( $id ) {
        return Category::where( 'id', $id )->with( 'admin' )->with( 'emergency' )->with( 'tip' )->with( 'service' )->first();

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

    public function update( UpdateCategories $request, $id ) {
        $data = $request->all();

        $category = Category::where( 'id', $id )->first();
        if ( $request->category_name ) {
            $category->category_name = $data['category_name'];
        }

        $category->update( $data );

        $category->save();
        return response()->json( ['status' => 200, 'Category' => $category] );

    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function destroy( $id ) {
        $category = Category::findOrFail( $id );
        $category->delete();
        return response( 'Category deleted successfully' );
    }
}
