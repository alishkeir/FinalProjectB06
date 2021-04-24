<?php

namespace App\Http\Requests\Service;

use Illuminate\Foundation\Http\FormRequest;

class AddService extends FormRequest {
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
            'service_name' => 'required|unique:services|min:2|max:40',
            'image' => 'required|mimes:jpeg,png,jpg,gif,svg',
            'category_id' => 'required',

        ];
    }

    public function messages() {
        return [
            'service_name.unique' => 'Service Name already exists',
            'service_name.min' => 'Service Name should be 2 or more characters',
            'service_name.max' => 'Service Name should be less than 40 letter',
            'service_name.required' => "Service Name can't be empty",

            'image.required' => 'Image is Required',
            'image.mimes' => 'Image should be of type jpeg, png, jpg, gif or svg',

            'category_id.required' => "Category ID can't be empty",

        ];
    }

}
