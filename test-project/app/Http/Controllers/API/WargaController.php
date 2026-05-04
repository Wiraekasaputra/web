<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Warga;
use Illuminate\Http\Request;

class WargaController extends Controller
{
    public function index()
    {
        $warga = Warga::orderBy('nama')->get();
        return response()->json($warga);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nik' => 'required|string|size:16|unique:warga',
            'no_kk' => 'required|string|size:16',
            'jenis_kelamin' => 'required|in:L,P',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'rt' => 'required|string|max:3',
            'rw' => 'required|string|max:3',
            'no_hp' => 'nullable|string',
            'status_tinggal' => 'required|in:Tetap,Kontrak,Kost',
            'status_perkawinan' => 'nullable|in:Belum Kawin,Kawin,Cerai Hidup,Cerai Mati',
            'pekerjaan' => 'nullable|string',
        ]);

        $warga = Warga::create($validated);

        return response()->json($warga, 201);
    }

    public function show($id)
    {
        $warga = Warga::findOrFail($id);
        return response()->json($warga);
    }

    public function update(Request $request, $id)
    {
        $warga = Warga::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nik' => 'required|string|size:16|unique:warga,nik,' . $id,
            'no_kk' => 'required|string|size:16',
            'jenis_kelamin' => 'required|in:L,P',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'rt' => 'required|string|max:3',
            'rw' => 'required|string|max:3',
            'no_hp' => 'nullable|string',
            'status_tinggal' => 'required|in:Tetap,Kontrak,Kost',
            'status_perkawinan' => 'nullable|in:Belum Kawin,Kawin,Cerai Hidup,Cerai Mati',
            'pekerjaan' => 'nullable|string',
        ]);

        $warga->update($validated);

        return response()->json($warga);
    }

    public function destroy($id)
    {
        $warga = Warga::findOrFail($id);
        $warga->delete();

        return response()->json(['message' => 'Data warga berhasil dihapus']);
    }

    public function stats()
    {
        $total = Warga::count();
        $totalKK = Warga::distinct('no_kk')->count('no_kk');
        $tetap = Warga::where('status_tinggal', 'Tetap')->count();
        $kontrak = Warga::where('status_tinggal', 'Kontrak')->count();

        return response()->json([
            'total_warga' => $total,
            'total_kk' => $totalKK,
            'tetap' => $tetap,
            'kontrak' => $kontrak,
        ]);
    }
}
