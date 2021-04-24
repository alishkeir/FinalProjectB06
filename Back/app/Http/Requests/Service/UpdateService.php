<?php

namespace App\Http\Requests\Service;

use Illuminate\Foundation\Http\FormRequest;

class UpdateService extends FormRequest {
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
            'service_name' => 'unique:services|min:2|max:40',
            'image' => 'mimes:jpeg,png,jpg,gif,svg',

        ];
    }

    public function messages() {
        return [
            'service_name.unique' => 'Service Name already exists',
            'service_name.min' => 'Service Name should be 2 or more characters',
            'service_name.max' => 'Service Name should be less than 40 letter',

            'image.mimes' => 'Image should be of type jpeg, png, jpg, gif or svg',

        ];
    }
}
