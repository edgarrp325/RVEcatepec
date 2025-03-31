<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Major extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = ['name'];

    /**
     * Relationship with the User model.
     */
    public function user()
    {
        return $this->belongsToMany(User::class)->limit(1);
    }
    public $timestamps = false;
}
