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
        'name',
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
            'opening_time' => 'datetime:H:i',
            'closing_time' => 'datetime:H:i',
        ];
    }

    /**
     * Relashionship with the User model.
     */
    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('id', 'date', 'start_time', 'end_time');
    }

    /**
     * Relashionship with the Equipment model.
     */
    public function equipment()
    {
        return $this->hasMany(Equipment::class);
    }

    public $timestamps = false;
}
