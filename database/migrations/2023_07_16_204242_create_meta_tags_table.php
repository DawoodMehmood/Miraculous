<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMetaTagsTable extends Migration
{
    public function up()
    {
        Schema::create('meta_tags', function (Blueprint $table) {
            $table->id();
            $table->string('metaTitle');
            $table->text('metaDesc');
            $table->string('twitchLink');
            $table->string('teleLink');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('meta_tags');
    }
}

