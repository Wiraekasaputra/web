<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    protected $table = 'gallery';

    protected $fillable = [
        'judul', 'deskripsi', 'foto_path',
        'tanggal_kegiatan', 'kategori', 'user_id'
    ];

    protected $casts = [
        'tanggal_kegiatan' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
