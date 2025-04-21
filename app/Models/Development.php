<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Development extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
    ];

    /** 
     * The relationship with the development image model.
     */
    public function images()
    {
        return $this->hasMany(DevelopmentImage::class);
    }
}
