import { useState, useEffect } from 'react';
import api from '../../services/api';
 
export default function WargaTable({ limit = 5 }) {
  const [wargaList, setWargaList] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetchWarga();
  }, []);
 
  const fetchWarga = async () => {
    try {
      const response = await api.get('/warga');
      // Ambil beberapa data pertama sesuai limit
      setWargaList(response.data.slice(0, limit));
    } catch (error) {
      console.error('Error fetching warga:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
 
  const getAvatarColor = (index) => {
    const colors = [
      'bg-blue-200 text-blue-800',
      'bg-teal-200 text-teal-800',
      'bg-amber-200 text-amber-800',
      'bg-pink-200 text-pink-800',
      'bg-purple-200 text-purple-800'
    ];
    return colors[index % colors.length];
  };
 
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">List Warga</h3>
        </div>
        <div className="text-center py-4 text-gray-500 text-sm">Memuat data...</div>
      </div>
    );
  }
 
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">List Warga</h3>
        <a href="/admin/warga" className="text-xs text-blue-700 hover:underline">
          Lihat semua →
        </a>
      </div>
 
      <div className="space-y-3">
        {wargaList.map((warga, index) => (
          <div key={warga.id} className="flex items-center gap-3 pb-2 border-b border-gray-100 last:border-b-0">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${getAvatarColor(index)}`}>
              {getInitials(warga.nama)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 truncate">{warga.nama}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
              warga.status_tinggal === 'Tetap'
                ? 'bg-green-100 text-green-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              {warga.status_tinggal}
            </span>
          </div>
        ))}
 
        {wargaList.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">
            Belum ada data warga
          </div>
        )}
      </div>
    </div>
  );
}