<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warga extends Model
{
    use HasFactory;

    protected $table = 'warga';

    protected $fillable = [
        'nama', 'nik', 'no_kk', 'jenis_kelamin', 'tempat_lahir',
        'tanggal_lahir', 'alamat', 'rt', 'rw', 'no_hp',
        'status_tinggal', 'status_perkawinan', 'pekerjaan'
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
    ];
}
