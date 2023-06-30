<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       
        Schema::create('localdata', function (Blueprint $table) {
            $table->id();
            $table->string('from');
            $table->string('news_id');
            $table->string('source');
            $table->string('categories');
            $table->string('author')->nullable();
            $table->string('publish_date');
            $table->Text('content');
            $table->Text('titleContent');
            $table->Text('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('localdata');
    }
};
