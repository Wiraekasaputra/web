import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function HomePage() {
  const [beritaList, setBeritaList] = useState([]);

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const response = await api.get('/berita-publik');
      setBeritaList(response.data);
    } catch (error) {
      console.error('Error fetching berita:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">RT</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <h1 className="text-base font-semibold text-gray-900">Website RT 06</h1>
              <p className="text-xs text-gray-600">Kel. Prigen, Kec. Prigen</p>
            </div>
          </div>
          <Link
            to="/login"
            className="bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 border-b border-gray-200 py-10 px-6 text-center">
        <h1 className="text-2xl font-semibold text-blue-900 mb-2">
          Selamat Datang di Website Resmi RT 06
        </h1>
        <p className="text-sm text-blue-700">
          Informasi, berita, dan layanan warga RT 06 tersedia di sini
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Profil Ketua RT */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
            Profil Ketua RT
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-5 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center text-lg font-semibold text-blue-800 flex-shrink-0">
              BW
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Sri Lestari Puji A.</h3>
              <p className="text-sm text-gray-600 mt-0.5">
                Ketua RT 06 / Periode 2026 – 2030<br />
                Jl.Pesanggrahan No.12
              </p>
              <span className="inline-block mt-2 bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-lg">
                Ketua RT Aktif
              </span>
            </div>
          </div>
        </section>

        {/* Berita Acara */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
            Berita Acara Terbaru
          </h2>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-3">
              <div className="bg-blue-700 text-white rounded-lg px-2.5 py-1.5 text-center flex-shrink-0">
                <div className="text-lg font-semibold leading-tight">15</div>
                <div className="text-xs">Apr</div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                  Rapat Bulanan Warga RT 06
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Pembahasan anggaran kebersihan dan jadwal ronda malam bulan Mei 2026.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-3">
              <div className="bg-blue-700 text-white rounded-lg px-2.5 py-1.5 text-center flex-shrink-0">
                <div className="text-lg font-semibold leading-tight">08</div>
                <div className="text-xs">Apr</div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                  Kerja Bakti Lingkungan
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Kegiatan bersih-bersih saluran air dan taman depan kantor RT.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-3">
              <div className="bg-blue-700 text-white rounded-lg px-2.5 py-1.5 text-center flex-shrink-0">
                <div className="text-lg font-semibold leading-tight">01</div>
                <div className="text-xs">Apr</div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                  Pembagian Bansos Tahap 2
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Penyaluran bantuan sosial untuk 12 KK yang terdaftar di data warga.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tutorial Daftar Admin */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
            Tutorial Daftar sebagai Admin
          </h2>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-5">
            <p className="text-sm text-gray-700 mb-3">
              Ingin menjadi admin? Ikuti langkah berikut:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-700 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">
                  Hubungi Ketua RT secara langsung atau via WhatsApp untuk mengajukan permohonan.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-700 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">
                  Ketua RT akan membuatkan akun dan memberikan username & password sementara.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-700 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">
                  Login menggunakan tombol <span className="font-semibold">Login Admin</span> di pojok kanan atas halaman ini.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-700 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                  4
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">
                  Ganti password pada menu Pengaturan Akun setelah login pertama kali.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-4 mt-10 text-center">
        <p className="text-xs text-gray-600">
          © 2026 RT 06 Kel. Pandaan · Dibuat dengan ❤ untuk warga
        </p>
      </footer>
    </div>
  );
}
