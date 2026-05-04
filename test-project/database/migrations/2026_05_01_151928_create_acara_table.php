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
    Schema::create('acara', function (Blueprint $table) {
        $table->id();
        $table->string('nama_acara');
        $table->text('deskripsi')->nullable();
        $table->dateTime('tanggal_waktu');
        $table->string('lokasi');
        $table->string('penanggung_jawab')->nullable();
        $table->enum('status', ['Akan Datang', 'Berlangsung', 'Selesai'])->default('Akan Datang');
        $table->timestamps();
    });
}
};
