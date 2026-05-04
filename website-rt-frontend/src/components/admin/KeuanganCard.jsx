import { useState, useEffect } from 'react';
import api from '../../services/api';
 
export default function KeuanganCard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetchSummary();
  }, []);
 
  const fetchSummary = async () => {
    try {
      const response = await api.get('/keuangan-summary');
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
      // Dummy data jika API belum ready
      setSummary({
        pemasukan: 770000,
        pengeluaran: 205000,
        saldo_bulan_ini: 565000
      });
    } finally {
      setLoading(false);
    }
  };
 
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };
 
  const getBulanIni = () => {
    const bulan = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const now = new Date();
    return `${bulan[now.getMonth()]} ${now.getFullYear()}`;
  };
 
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Keuangan {getBulanIni()}</h3>
        </div>
        <div className="text-center py-4 text-gray-500 text-sm">Memuat data...</div>
      </div>
    );
  }
 
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Keuangan {getBulanIni()}</h3>
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
          <span className={summary.saldo_bulan_ini >= 0 ? 'text-green-700' : 'text-red-700'}>
            {summary.saldo_bulan_ini >= 0 ? '+' : ''} {formatCurrency(summary.saldo_bulan_ini)}
          </span>
        </div>
      </div>
    </div>
  );
}