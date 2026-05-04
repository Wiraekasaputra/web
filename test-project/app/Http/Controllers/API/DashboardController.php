<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Warga;
use App\Models\Keuangan;
use App\Models\Inventaris;
use App\Models\Acara;

class DashboardController extends Controller
{
    public function index()
    {
        $totalWarga = Warga::count();
        $totalKK = Warga::distinct('no_kk')->count('no_kk');

        $totalSaldo = Keuangan::selectRaw('SUM(CASE WHEN tipe = "Pemasukan" THEN jumlah ELSE -jumlah END) as total')
            ->value('total');

        $totalInventaris = Inventaris::sum('jumlah');
        $inventarisPerluCek = Inventaris::where('kondisi', '!=', 'Baik')->count();

        $acaraBulanIni = Acara::whereMonth('tanggal_waktu', now()->month)
            ->whereYear('tanggal_waktu', now()->year)
            ->where('status', 'Akan Datang')
            ->count();

        return response()->json([
            'total_warga' => $totalWarga,
            'total_kk' => $totalKK,
            'total_saldo' => $totalSaldo,
            'total_inventaris' => $totalInventaris,
            'inventaris_perlu_cek' => $inventarisPerluCek,
            'acara_bulan_ini' => $acaraBulanIni,
        ]);
    }
}
