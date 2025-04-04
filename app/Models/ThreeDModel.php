<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ThreeDModel extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'format_id',
        'poligons',
        'textures',
        'animations',
        'rigged',
        'img_url',
        'model_url',
        'download_url',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'textures' => 'boolean',
            'animations' => 'boolean',
            'rigged' => 'boolean',
        ];
    }

     /**
     * Relationship with the Format model.
     */
    public function format()
    {
        return $this->belongsTo(Format::class);
    }

}
