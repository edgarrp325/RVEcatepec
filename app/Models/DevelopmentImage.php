<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DevelopmentImage extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'image_url',
    ];

    /**
     * The relashionship with the Development model.
     */
    public function development()
    {
        return $this->belongsTo(Development::class);
    }

    public $timestamps = false;

}
