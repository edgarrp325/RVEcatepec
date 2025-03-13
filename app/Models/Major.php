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
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    public $timestamps = false;
}
