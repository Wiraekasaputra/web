import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import api from '../../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total_warga: 0,
    total_kk: 0,
    total_saldo: 0,
    total_inventaris: 0,
    inventaris_perlu_cek: 0,
    acara_bulan_ini: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-50">
        {/* Topbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-lg font-medium">
            Admin
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-3 text-sm text-gray-600">Memuat data...</p>
            </div>
          ) : (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Total Warga</p>
                  <p className="text-3xl font-semibold text-gray-900">{stats.total_warga}</p>
                  <p className="text-xs text-gray-500 mt-1">{stats.total_kk} KK terdaftar</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Saldo Kas</p>
                  <p className="text-3xl font-semibold text-gray-900">
                    {formatCurrency(stats.total_saldo)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">per April 2026</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Item Inventaris</p>
                  <p className="text-3xl font-semibold text-gray-900">{stats.total_inventaris}</p>
                  <p className="text-xs text-gray-500 mt-1">{stats.inventaris_perlu_cek} perlu cek</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Acara Bulan Ini</p>
                  <p className="text-3xl font-semibold text-gray-900">{stats.acara_bulan_ini}</p>
                  <p className="text-xs text-gray-500 mt-1">1 minggu lagi</p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* List Warga */}
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-900">List Warga</h3>
                    <a href="/admin/warga" className="text-xs text-blue-700 hover:underline">
                      Lihat semua →
                    </a>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <div className="w-7 h-7 bg-blue-200 rounded-full flex items-center justify-center text-xs font-medium text-blue-800">
                        BW
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Budi <Wibowo></Wibowo></p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Tetap
                      </span>
                    </div>
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <div className="w-7 h-7 bg-teal-200 rounded-full flex items-center justify-center text-xs font-medium text-teal-800">
                        SR
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Siti Rahayu</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Tetap
                      </span>
                    </div>
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <div className="w-7 h-7 bg-amber-200 rounded-full flex items-center justify-center text-xs font-medium text-amber-800">
                        AL
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Ahmad Lukman</p>
                      </div>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        Kontrak
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-pink-200 rounded-full flex items-center justify-center text-xs font-medium text-pink-800">
                        DN
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Dewi Nuraini</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Tetap
                      </span>
                    </div>
                  </div>
                </div>

                {/* Keuangan */}
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-900">Keuangan April 2026</h3>
                    <a href="/admin/keuangan" className="text-xs text-blue-700 hover:underline">
                      Detail →
                    </a>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Iuran kebersihan</span>
                      <span className="font-medium text-green-700">+ Rp 420.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Iuran keamanan</span>
                      <span className="font-medium text-green-700">+ Rp 350.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pengadaan ATK</span>
                      <span className="font-medium text-red-700">- Rp 85.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Biaya listrik pos</span>
                      <span className="font-medium text-red-700">- Rp 120.000</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between font-semibold text-gray-900">
                      <span>Saldo bulan ini</span>
                      <span>+ Rp 565.000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acara Mendatang */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Acara Mendatang</h3>
                  <a href="/admin/acara" className="text-xs text-blue-700 hover:underline">
                    Tambah acara →
                  </a>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Posyandu Balita</p>
                      <p className="text-xs text-gray-600">20 April 2026 · 08.00 WIB · Balai RT</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex-shrink-0">
                      3 hari lagi
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Rapat Bulanan Warga</p>
                      <p className="text-xs text-gray-600">25 April 2026 · 19.30 WIB · Rumah Ketua RT</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full flex-shrink-0">
                      8 hari lagi
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Kerja Bakti Selokan</p>
                      <p className="text-xs text-gray-600">1 Mei 2026 · 07.00 WIB · Lingkungan RT</p>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex-shrink-0">
                      14 hari lagi
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
