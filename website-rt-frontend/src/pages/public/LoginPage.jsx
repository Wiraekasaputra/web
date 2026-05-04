import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Username atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branding */}
      <div className="w-64 bg-blue-900 text-white p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold">RT</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">Website Resmi<br />RT 06 Tretes</h1>
              <p className="text-xs text-blue-300 mt-1">Kelurahan Prigen,<br />Kecamatan Prigen</p>
            </div>
          </div>

          <div className="space-y-3 mt-8">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-sm text-blue-200">Kelola data warga dengan mudah</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-sm text-blue-200">Pantau keuangan RT secara transparan</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-sm text-blue-200">Atur acara & inventaris RT</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-sm text-blue-200">Kelola gallery & dokumentasi kegiatan</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-blue-400">© 2026 RT 06 Tretes</p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Login Admin</h2>
              <p className="text-sm text-gray-600">Masuk ke panel pengelolaan RT 05</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                <svg className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                  <line x1="8" y1="5" x2="8" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="8" cy="11.5" r="0.8" fill="currentColor"/>
                </svg>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 16 16">
                      <ellipse cx="8" cy="8" rx="6" ry="4" stroke="currentColor" strokeWidth="1.2"/>
                      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="text-right mb-5">
                <a href="#" className="text-xs text-blue-700 hover:underline">Lupa password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Masuk ke Dashboard'}
              </button>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-gray-400">atau</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <div className="text-center">
                <a href="/" className="text-sm text-blue-700 font-medium hover:underline">
                  ← Kembali ke halaman publik
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
