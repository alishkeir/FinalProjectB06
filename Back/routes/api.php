<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('/category', 'CategoryController'); //! No need

Route::resource('/service', 'ServiceController');


Route::post('/emergency', 'EmergencyController@store'); //* With mobile
Route::put('/emergency/{id}', 'EmergencyController@update'); //* With mobile
Route::delete('/emergency/{id}', 'EmergencyController@destroy'); //* With mobile
Route::get('/emergency/pending', 'EmergencyController@pending'); //* With mobile
Route::get('/emergency/new', 'EmergencyController@new'); //* With mobile

// Route::resource('/tip', 'TipController'); //? Done

 //FIXME: Auth

// Route::resource('/admin', 'AdminController');//FIXME: Auth



Route::group(['prefix' => 'admin','middleware' => ['assign.guard:admins','jwt.auth']],function ()
{
  Route::post('/logout', 'AdminAuthController@logout'); 
  Route::resource('/admins', 'AdminController');

});


Route::group(['prefix' => 'user','middleware' => ['assign.guard:users','jwt.auth']],function ()
{ 
  Route::post('/profile', 'UserAuthController@profile');
  Route::post('/logout', 'UserAuthController@logout'); 
  Route::resource('/users', 'UserController');
});

Route::post('/user/login', 'UserAuthController@login');
Route::post('/admin/login', 'AdminAuthController@login');
Route::post('/user/register', 'UserAuthController@register'); //FIXME: Auth
