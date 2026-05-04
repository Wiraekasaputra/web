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
    Schema::create('warga', function (Blueprint $table) {
        $table->id();
        $table->string('nama');
        $table->string('nik', 16)->unique();
        $table->string('no_kk', 16);
        $table->enum('jenis_kelamin', ['L', 'P']);
        $table->string('tempat_lahir');
        $table->date('tanggal_lahir');
        $table->text('alamat');
        $table->string('rt', 3);
        $table->string('rw', 3);
        $table->string('no_hp')->nullable();
        $table->enum('status_tinggal', ['Tetap', 'Kontrak', 'Kost'])->default('Tetap');
        $table->enum('status_perkawinan', ['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'])->nullable();
        $table->string('pekerjaan')->nullable();
        $table->timestamps();
    });
}
};
