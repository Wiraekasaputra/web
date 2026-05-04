<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventaris extends Model
{
    use HasFactory;

    protected $table = 'inventaris';

    protected $fillable = [
        'nama_barang', 'kode_barang', 'jumlah', 'satuan',
        'kondisi', 'tanggal_perolehan', 'keterangan', 'lokasi_penyimpanan'
    ];

    protected $casts = [
        'tanggal_perolehan' => 'date',
    ];
}
