<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tip extends Model {
    protected $table = 'tips';

    protected $fillable = [
        'tip_name', 'tip_description', 'image', 'logo', 'category_id',
    ];

    public function category() {

        return $this->belongsTo( Category::class, 'category_id', 'id' );
    }

}
