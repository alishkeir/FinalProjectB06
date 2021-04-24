<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model {

    protected $table = 'categories';

    protected $fillable = [ 'category_name', ];

    public function emergency() {

        return $this->hasMany( Emergency::class );
    }

    public function service() {

        return $this->hasMany( Service::class );
    }

    public function tip() {

        return $this->hasMany( Tip::class );
    }

    public function admin() {

        return $this->hasMany( Admin::class );
    }

}
