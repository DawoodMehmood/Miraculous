<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('language_id');
            $table->integer('season_no');
            $table->integer('episode_no');
            $table->string('episode_title');
            $table->string('episode_duration');
            $table->string('episode_type');
            $table->string('video_url');
            $table->string('thumbnail_image_link');
            $table->string('download_link')->nullable();
            $table->string('article_heading')->nullable();
            $table->text('article_description')->nullable();
            $table->string('meta_title');
            $table->text('meta_description');
            $table->text('jsCode')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
