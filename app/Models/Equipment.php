<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'label',
        'status',
        'used_time',
        'laboratory_id',
        'equipment_type_id',
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

    /**
     * Relashionship with the User model.
     */
    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('id', 'date', 'start_time', 'end_time');
    }

    /**
     * Relashionship with the User model where the end_time is null return only the user that is using the equipment.
     */
    public function usersInUse()
    {
        return $this->belongsToMany(User::class)
            ->wherePivotNull('end_time')
            ->withPivot('id', 'date', 'start_time', 'end_time');
    }

    /**
     * Get the equipment type iMacs.
     */
    public function scopeIMacs()
    {
        return $this->where('equipment_type_id', 1);
    }

    /*
    * Get the equipment if status is in use get the users that are using the equipment.
    */
    public function scopeInUse()
    {
        return $this->where('status', 'In use');
    }
    protected $keyType = 'string'; // 
    public $timestamps = false;
}
