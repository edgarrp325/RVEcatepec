<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tutorial extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'image_url',
        'embed_url',
        'tutorial_type_id'
    ];
   
    /**
    * Relashionship with the Tutorial Type model.
    */
    public function tutorialType()
    {
        return $this->belongsTo(TutorialType::class);
    }
}
