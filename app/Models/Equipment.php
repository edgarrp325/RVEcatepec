<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{

     /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'label',
        'status',
    ];


    /**
     * Relashionship with the equipment type model.
     */
    public function equipmentType()
    {
        return $this->belongsTo(EquipmentType::class);
    }

    /**
    * Relashionship with the Laboratory model.
    */
    public function laboratory()
    {
        return $this->belongsTo(Laboratory::class);
    }

    public $timestamps = false;
}
