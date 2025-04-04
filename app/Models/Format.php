<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Format extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
    ];

    /**
     * Relationship with the ThreeDModel model.
     */
    public function format()
    {
        return $this->hasMany(ThreeDModel::class);
    }
}
