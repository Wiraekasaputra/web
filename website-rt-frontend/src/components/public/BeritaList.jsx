import { useState, useEffect } from 'react';
import api from '../../services/api';
 
export default function BeritaList() {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetchBerita();
  }, []);
 
  const fetchBerita = async () => {
    try {
      const response = await api.get('/berita-publik');
      setBeritaList(response.data);
    } catch (error) {
      console.error('Error fetching berita:', error);
      // Jika API belum ada, gunakan data dummy
      setBeritaList([
        {
          id: 1,
          tanggal: '2024-04-15',
          judul: 'Rapat Bulanan Warga RT 05',
          konten: 'Pembahasan anggaran kebersihan dan jadwal ronda malam bulan Mei 2026.'
        },
        {
          id: 2,
          tanggal: '2024-04-08',
          judul: 'Kerja Bakti Lingkungan',
          konten: 'Kegiatan bersih-bersih saluran air dan taman depan kantor RT.'
        },
        {
          id: 3,
          tanggal: '2024-04-01',
          judul: 'Pembagian Bansos Tahap 2',
          konten: 'Penyaluran bantuan sosial untuk 12 KK yang terdaftar di data warga.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('id-ID', { month: 'short' });
    return { day, month };
  };
 
  if (loading) {
    return (
      <section className="mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
          Berita Acara Terbaru
        </h2>
        <div className="text-center py-8 text-gray-500 text-sm">Memuat berita...</div>
      </section>
    );
  }
 
  return (
    <section className="mb-6">
      <h2 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
        Berita Acara Terbaru
      </h2>
      <div className="space-y-3">
        {beritaList.map((berita) => {
          const { day, month } = formatDate(berita.tanggal);
          return (
            <div key={berita.id} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-3">
              <div className="bg-blue-700 text-white rounded-lg px-2.5 py-1.5 text-center flex-shrink-0">
                <div className="text-lg font-semibold leading-tight">{day}</div>
                <div className="text-xs">{month}</div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                  {berita.judul}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {berita.konten}
                </p>
              </div>
            </div>
          );
        })}
 
        {beritaList.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            Belum ada berita acara
          </div>
        )}
      </div>
    </section>
  );
}