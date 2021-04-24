<?php

namespace App\Http\Requests\Tip;

use Illuminate\Foundation\Http\FormRequest;

class AddTip extends FormRequest {
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
            'tip_name' => 'required|unique:tips|max:40|min:2',
            'tip_description' => 'required',
            'category_id' => 'required',
            'image' => 'required|mimes:jpeg,png,jpg,gif,svg',
            'logo' => 'required|mimes:jpeg,png,jpg,gif,svg',

        ];
    }

    public function messages() {
        return [
            'tip_name.unique' => 'Tip Name already exists',
            'tip_name.min' => 'Tip Name should be 2 or more characters',
            'tip_name.max' => 'Tip Name should be less than 20 letter',
            'tip_name.required' => "Tip Name is required",
            // 'category_name.regex' => 'Category Name should contains only letters',

            'tip_description.required' => "Tip Description is required",

            'category_id.required' => "Category ID is required",

            'image.required' => 'Image is Required',
            'image.mimes' => 'Image should be of type jpeg, png, jpg, gif or svg',

            'logo.required' => 'Logo is Required',
            'logo.mimes' => 'Logo should be of type jpeg, png, jpg, gif or svg',


        ];
    }

}
