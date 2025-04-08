<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TutorialType extends Model
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
     * The relationships with the Tutorial model 
     */
    public function tutorial()
    {
        return $this->hasMany(Tutorial::class);
    }

    public $timestamps = false;
}
