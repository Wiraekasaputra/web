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
    Schema::create('keuangan', function (Blueprint $table) {
        $table->id();
        $table->date('tanggal');
        $table->enum('tipe', ['Pemasukan', 'Pengeluaran']);
        $table->string('kategori'); // Iuran kebersihan, Iuran keamanan, ATK, dll
        $table->text('keterangan')->nullable();
        $table->decimal('jumlah', 15, 2);
        $table->string('bukti_path')->nullable(); // Path foto bukti transaksi
        $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Admin yang input
        $table->timestamps();
    });
}
};
