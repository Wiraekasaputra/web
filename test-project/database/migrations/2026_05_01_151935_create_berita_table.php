<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('berita', function (Blueprint $table) {
        $table->id();
        $table->string('judul');
        $table->text('konten');
        $table->date('tanggal');
        $table->string('kategori')->default('Berita Acara'); // Berita Acara, Pengumuman, dll
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->boolean('is_published')->default(true);
        $table->timestamps();
    });
}
};
