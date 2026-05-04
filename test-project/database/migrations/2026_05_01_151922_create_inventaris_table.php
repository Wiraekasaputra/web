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
    Schema::create('inventaris', function (Blueprint $table) {
        $table->id();
        $table->string('nama_barang');
        $table->string('kode_barang')->unique();
        $table->integer('jumlah');
        $table->string('satuan'); // Unit, Buah, Set, dll
        $table->enum('kondisi', ['Baik', 'Rusak Ringan', 'Rusak Berat'])->default('Baik');
        $table->date('tanggal_perolehan');
        $table->text('keterangan')->nullable();
        $table->string('lokasi_penyimpanan')->nullable();
        $table->timestamps();
    });
}
};
