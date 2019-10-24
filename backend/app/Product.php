<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = ['id'];
    public function department(){
        return     $this->hasOne('App\Department','department');
    }
}