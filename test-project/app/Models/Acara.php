<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acara extends Model
{
    use HasFactory;

    protected $table = 'acara';

    protected $fillable = [
        'nama_acara', 'deskripsi', 'tanggal_waktu',
        'lokasi', 'penanggung_jawab', 'status'
    ];

    protected $casts = [
        'tanggal_waktu' => 'datetime',
    ];
}
