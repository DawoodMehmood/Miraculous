<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'flagUrl',
    ];

    public static function rules()
    {
        return [
            'name' => 'required|string',
            'flagUrl' => 'required|url',
        ];
    }

    public function videos()
    {
        return $this->hasMany(Video::class);
    }
}
