<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class AddUser extends FormRequest {
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
            'first_name' => 'required|max:20',
            'last_name' => 'required|max:20',
            'phone_number' => 'required|min:8|numeric',
            'email' => 'required|bail|email|unique:users',
            'password' => 'required|min:6',
            'disease' => 'required',
            'allergy' => 'required',
            'medical' => 'required',
            // 'image' => 'required|mimes:jpeg,png,jpg,gif,svg',

        ];
    }

    public function messages() {
        return [

            'first_name.required' => 'First Name is required',
            'first_name.max' => 'First Name should be less than 20 letter',

            'last_name.required' => 'Last Name is required',
            'last_name.max' => 'Last Name should be less than 20 letter',

            'phone_number.required' => 'Phone Number is required',

            'phone_number.digits' => 'Phone Number must consists of 8 digits',
            'phone_number.min' => 'Phone Number must be 8 digits or more',

            'email.unique' => 'Email already in use.',
            'email.required' => 'Email is required',
            'email.email' => 'Email must be a valid email address',

            'password.required' => 'Password is required',
            'password.min' => 'Password should consist of 6 characters or more',

            'disease.required' => 'Disease is required',

            'allergy.required' => "Category Name can't be empty",

            'medical.required' => "Category Name can't be empty",

        ];
    }

}
