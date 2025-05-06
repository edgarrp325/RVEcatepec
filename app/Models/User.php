<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'account_number',
        'paternal_surname',
        'maternal_surname',
        'name',
        'email',
        'password',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relationship with the Role model.
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Relationship with the Origin model.
     */
    public function origin()
    {
        return $this->hasOne(Origin::class);
    }

    /**
     * Relationship with the Major model.
     */
    public function major()
    {
        return $this->belongsToMany(Major::class)->limit(1);
    }

    /**
     * Relashionship with the Laboratory model.
     */
    public function laboratories()
    {
        return $this->belongsToMany(Laboratory::class)->withPivot('id', 'date', 'start_time', 'end_time');
    }

    /**
     * Relationship with the Equipment model.
     */
    public function equipment()
    {
        return $this->belongsToMany(Equipment::class)->withPivot('id', 'date', 'start_time', 'end_time');
    }

    /**
     * If the user is using a equipment of equipment type imac or pc
     */
    public function isUsingEquipmentType(string $typeId): bool
    {
        return $this->equipment()
            ->where('equipment_type_id', $typeId)
            ->wherePivotNull('end_time')
            ->exists();
    }

    /** 
     * Determine whether the user has an activated attendance
     */
    public function hasActiveAttendance(): bool
    {
        return $this->laboratories()
            ->wherePivotNull('end_time')
            ->exists();
    }

    /**
     * Determine whether the user has an equipment using 
     */
    public function hasActiveEquipmentLoan(): bool
    {
        return $this->equipment()
            ->wherePivotNull('end_time')
            ->exists();
    }

    /**
     * Get the total service hours of the user
     */
    public function totalServiceMinutes(): int
    {
        return $this->laboratories()
            ->wherePivotNotNull('end_time')
            ->sum(
                DB::raw('TIMESTAMPDIFF(MINUTE, start_time, end_time)')
            );
    }
}
