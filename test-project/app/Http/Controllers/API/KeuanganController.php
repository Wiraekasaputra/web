<?php

namespace App\Http\Controllers\API;
 
use App\Http\Controllers\Controller;
use App\Models\Keuangan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
 
class KeuanganController extends Controller
{
    /**
     * Ambil semua data keuangan dengan filter opsional bulan & tahun
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $query = Keuangan::with('user');
 
        // Filter by bulan & tahun jika ada
        if ($request->has('bulan') && $request->has('tahun')) {
            $query->whereMonth('tanggal', $request->bulan)
                  ->whereYear('tanggal', $request->tahun);
        }
 
        $keuangan = $query->orderBy('tanggal', 'desc')->get();
 
        return response()->json($keuangan);
    }
 
    /**
     * Tambah data keuangan baru
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'tipe' => 'required|in:Pemasukan,Pengeluaran',
            'kategori' => 'required|string',
            'keterangan' => 'nullable|string',
            'jumlah' => 'required|numeric|min:0',
            'bukti_path' => 'nullable|string',
        ]);
 
        // Tambahkan user_id dari user yang sedang login
        // auth()->id() return int|string|null, kita pastikan ada dengan auth()->id() ?? 0
        $validated['user_id'] = Auth::id();
 
        $keuangan = Keuangan::create($validated);
 
        return response()->json($keuangan, 201);
    }
 
    /**
     * Ambil detail 1 data keuangan by ID
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $keuangan = Keuangan::with('user')->findOrFail($id);
        
        return response()->json($keuangan);
    }
 
    /**
     * Update data keuangan
     * 
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $keuangan = Keuangan::findOrFail($id);
 
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'tipe' => 'required|in:Pemasukan,Pengeluaran',
            'kategori' => 'required|string',
            'keterangan' => 'nullable|string',
            'jumlah' => 'required|numeric|min:0',
            'bukti_path' => 'nullable|string',
        ]);
 
        $keuangan->update($validated);
 
        return response()->json($keuangan);
    }
 
    /**
     * Hapus data keuangan
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $keuangan = Keuangan::findOrFail($id);
        $keuangan->delete();
 
        return response()->json(['message' => 'Data keuangan berhasil dihapus']);
    }
 
    /**
     * Ringkasan keuangan per bulan & total saldo keseluruhan
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function summary(Request $request): JsonResponse
    {
        $bulan = $request->get('bulan', now()->month);
        $tahun = $request->get('tahun', now()->year);
 
        // Total pemasukan bulan ini
        $pemasukan = Keuangan::where('tipe', 'Pemasukan')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->sum('jumlah');
 
        // Total pengeluaran bulan ini
        $pengeluaran = Keuangan::where('tipe', 'Pengeluaran')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->sum('jumlah');
 
        // Saldo bulan ini
        $saldo = $pemasukan - $pengeluaran;
 
        // Total saldo keseluruhan (dari awal sampai sekarang)
        $totalSaldo = Keuangan::selectRaw('SUM(CASE WHEN tipe = "Pemasukan" THEN jumlah ELSE -jumlah END) as total')
            ->value('total');
 
        return response()->json([
            'pemasukan' => $pemasukan,
            'pengeluaran' => $pengeluaran,
            'saldo_bulan_ini' => $saldo,
            'total_saldo' => $totalSaldo ?? 0, // Null coalescing untuk handle null
        ]);
    }
}
