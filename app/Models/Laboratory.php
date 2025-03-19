<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laboratory extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'opening_time',
        'closing_time',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'opening_time' => 'datetime:H:i:s',
            'closing_time' => 'datetime:H:i:s',
        ];
    }

    /**
     * Relashionship with the User model.
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public $timestamps = false;
}
