import { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import api from '../../services/api';
 
export default function Inventaris() {
  const [inventarisList, setInventarisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKondisi, setFilterKondisi] = useState('');
 
  const [formData, setFormData] = useState({
    nama_barang: '',
    kode_barang: '',
    jumlah: '',
    satuan: '',
    kondisi: 'Baik',
    tanggal_perolehan: '',
    lokasi_penyimpanan: '',
    keterangan: ''
  });
 
  const [errors, setErrors] = useState({});
 
  useEffect(() => {
    fetchInventaris();
  }, []);
 
  const fetchInventaris = async () => {
    try {
      const response = await api.get('/inventaris');
      setInventarisList(response.data);
    } catch (error) {
      console.error('Error fetching inventaris:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const resetForm = () => {
    setFormData({
      nama_barang: '',
      kode_barang: '',
      jumlah: '',
      satuan: '',
      kondisi: 'Baik',
      tanggal_perolehan: '',
      lokasi_penyimpanan: '',
      keterangan: ''
    });
    setErrors({});
    setEditMode(false);
    setCurrentId(null);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      if (editMode) {
        await api.put(`/inventaris/${currentId}`, formData);
      } else {
        await api.post('/inventaris', formData);
      }
      fetchInventaris();
      setShowModal(false);
      resetForm();
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };
 
  const handleEdit = (item) => {
    setFormData({
      nama_barang: item.nama_barang,
      kode_barang: item.kode_barang,
      jumlah: item.jumlah,
      satuan: item.satuan,
      kondisi: item.kondisi,
      tanggal_perolehan: item.tanggal_perolehan,
      lokasi_penyimpanan: item.lokasi_penyimpanan || '',
      keterangan: item.keterangan || ''
    });
    setCurrentId(item.id);
    setEditMode(true);
    setShowModal(true);
  };
 
  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data inventaris ini?')) {
      try {
        await api.delete(`/inventaris/${id}`);
        fetchInventaris();
      } catch (error) {
        console.error('Error deleting inventaris:', error);
      }
    }
  };
 
  const kondisiBadge = (kondisi) => {
    const styles = {
      'Baik': 'bg-green-100 text-green-800',
      'Rusak Ringan': 'bg-amber-100 text-amber-800',
      'Rusak Berat': 'bg-red-100 text-red-800'
    };
    return styles[kondisi] || 'bg-gray-100 text-gray-800';
  };
 
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };
 
  const filtered = inventarisList.filter(item => {
    const matchSearch = item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
      || item.kode_barang.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKondisi = filterKondisi === '' || item.kondisi === filterKondisi;
    return matchSearch && matchKondisi;
  });
 
  const stats = {
    total: inventarisList.length,
    baik: inventarisList.filter(i => i.kondisi === 'Baik').length,
    rusakRingan: inventarisList.filter(i => i.kondisi === 'Rusak Ringan').length,
    rusakBerat: inventarisList.filter(i => i.kondisi === 'Rusak Berat').length
  };
 
  return (
    <div className="flex min-h-screen">
      <Sidebar />
 
      <div className="flex-1 bg-gray-50">
        {/* Topbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Inventaris RT</h1>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + Tambah Barang
          </button>
        </div>
 
        <div className="p-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Total Barang</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-xs text-green-700 mb-1">Kondisi Baik</p>
              <p className="text-2xl font-semibold text-green-900">{stats.baik}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-xs text-amber-700 mb-1">Rusak Ringan</p>
              <p className="text-2xl font-semibold text-amber-900">{stats.rusakRingan}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-xs text-red-700 mb-1">Rusak Berat</p>
              <p className="text-2xl font-semibold text-red-900">{stats.rusakBerat}</p>
            </div>
          </div>
 
          {/* Filter & Search */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex gap-4">
            <input
              type="text"
              placeholder="Cari nama atau kode barang..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
            <select
              value={filterKondisi}
              onChange={(e) => setFilterKondisi(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Semua Kondisi</option>
              <option value="Baik">Baik</option>
              <option value="Rusak Ringan">Rusak Ringan</option>
              <option value="Rusak Berat">Rusak Berat</option>
            </select>
          </div>
 
          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-3 text-sm text-gray-600">Memuat data...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">No</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Kode</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Nama Barang</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Jumlah</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Kondisi</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Lokasi</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Tgl Perolehan</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filtered.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 text-sm font-mono text-gray-700">{item.kode_barang}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.nama_barang}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.jumlah} <span className="text-gray-500">{item.satuan}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${kondisiBadge(item.kondisi)}`}>
                            {item.kondisi}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.lokasi_penyimpanan || '-'}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{formatDate(item.tanggal_perolehan)}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >Edit</button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="p-8 text-center text-gray-500 text-sm">
                    Tidak ada data inventaris
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
 
      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editMode ? 'Edit Barang' : 'Tambah Barang'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Nama Barang */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Barang *</label>
                  <input
                    type="text" name="nama_barang" value={formData.nama_barang}
                    onChange={handleInputChange} required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                  {errors.nama_barang && <p className="text-xs text-red-600 mt-1">{errors.nama_barang[0]}</p>}
                </div>
 
                {/* Kode Barang */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kode Barang *</label>
                  <input
                    type="text" name="kode_barang" value={formData.kode_barang}
                    onChange={handleInputChange} required
                    placeholder="contoh: INV-001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                  {errors.kode_barang && <p className="text-xs text-red-600 mt-1">{errors.kode_barang[0]}</p>}
                </div>
 
                {/* Kondisi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kondisi *</label>
                  <select
                    name="kondisi" value={formData.kondisi}
                    onChange={handleInputChange} required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Baik">Baik</option>
                    <option value="Rusak Ringan">Rusak Ringan</option>
                    <option value="Rusak Berat">Rusak Berat</option>
                  </select>
                </div>
 
                {/* Jumlah */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah *</label>
                  <input
                    type="number" name="jumlah" value={formData.jumlah}
                    onChange={handleInputChange} min="0" required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
 
                {/* Satuan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Satuan *</label>
                  <input
                    type="text" name="satuan" value={formData.satuan}
                    onChange={handleInputChange} required placeholder="Unit / Buah / Set"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
 
                {/* Tanggal Perolehan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Perolehan *</label>
                  <input
                    type="date" name="tanggal_perolehan" value={formData.tanggal_perolehan}
                    onChange={handleInputChange} required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
 
                {/* Lokasi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Penyimpanan</label>
                  <input
                    type="text" name="lokasi_penyimpanan" value={formData.lokasi_penyimpanan}
                    onChange={handleInputChange} placeholder="contoh: Gudang RT"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
 
                {/* Keterangan */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                  <textarea
                    name="keterangan" value={formData.keterangan}
                    onChange={handleInputChange} rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Keterangan tambahan..."
                  />
                </div>
              </div>
 
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Batal
                </button>
                <button type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  {editMode ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}