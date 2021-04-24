<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model {
    protected $table = 'services';

    protected $fillable = [
        'service_name', 'image', 'category_id',
    ];

    public function category() {

        return $this->belongsTo( Category::class, 'category_id', 'id' );
    }
}
