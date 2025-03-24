<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipmentType extends Model
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
     * The relationships with the Equipment model 
     */
    public function equipment()
    {
        return $this->hasMany(Equipment::class);
    }

    public $timestamps = false;
}
