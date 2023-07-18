<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'language_id',
        'season_no',
        'episode_no',
        'episode_title',
        'episode_duration',
        'episode_type',
        'video_url',
        'thumbnail_image_link',
        'download_link',
        'article_heading',
        'article_description',
        'meta_title',
        'meta_description',
        'jsCode',
    ];

    public static function rules()
    {
        return [
            'language_id' => 'required|integer',
            'season_no' => 'required|integer',
            'episode_no' => 'required|integer',
            'episode_title' => 'required|string',
            'episode_duration' => 'required|string',
            'episode_type' => 'required|string',
            'video_url' => 'required|url',
            'thumbnail_image_link' => 'required|url',
            'download_link' => 'nullable|url',
            'article_heading' => 'nullable|string',
            'article_description' => 'nullable|string',
            'meta_title' => 'required|string',
            'meta_description' => 'required|string',
            'jsCode' => 'nullable|string',
        ];
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }
}
