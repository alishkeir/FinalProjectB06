<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

class AddCategories extends FormRequest {
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
            'category_name' => 'bail|required|unique:categories|min:2|max:20',

        ];
    }

    public function messages() {
        return [
            'category_name.unique' => 'Category Name already exists',
            'category_name.min' => 'Category Name should be 2 or more characters',
            'category_name.max' => 'Category Name should be less than 20 letter',
            'category_name.required' => "Category Name can't be empty",
            // 'category_name.regex' => 'Category Name should contains only letters',

        ];
    }
}

