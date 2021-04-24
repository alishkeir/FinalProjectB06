<?php

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder {
    /**
    * Run the database seeds.
    *
    * @return void
    */

    public function run() {
        DB::table( 'categories' )->insert( [

            [
                'category_name' => ' Red Cross',
            ],
            [
                'category_name' => 'Civilian Defence',
            ],
            [
                'category_name' => 'Police',
            ],

        ] );
    }
}
