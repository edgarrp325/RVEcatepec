<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OTP extends Model
{
    protected $table = 'o_t_p_s';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'code',
    ];
    protected $hidden = [
        'code',
    ];
}
