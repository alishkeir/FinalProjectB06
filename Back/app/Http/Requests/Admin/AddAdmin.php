<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AddAdmin extends FormRequest {
    /**
    * Determine if the user is authorized to make this request.
    *
    * @return bool
    */

    public function authorize() {
        return true;
    }

    /**
    * Get the validation rules that apply to the request.
    *
    * @return array
    */

    public function rules() {
        return [
            'name' => 'required|max:20',
            'email' => 'required|bail|email|unique:admins',
            'password' => 'required|bail|min:6|string',
            'image' => 'required|mimes:jpeg,png,jpg,gif,svg',
            'category_id' => 'required',
        ];
    }

    public function messages() {
        return [

            'name.required' => 'Name is required',
            'name.max' => 'Name should be less than 20 letter',

            'email.unique' => 'Email already in use.',
            'email.required' => 'Email is required',
            'email.email' => 'Email must be a valid email address',

            'password.required' => 'Password is required',
            'password.min' => 'Password should consist of 6 characters or more',

            'image.required' => 'Image is Required',
            'image.mimes' => 'Image should be of type jpeg, png, jpg, gif or svg',

            'category_id.required' => 'Category ID is required',

        ];
    }
}
