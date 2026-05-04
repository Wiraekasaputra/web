import { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import api from '../../services/api';
 
export default function Gallery() {
  const [galleryList, setGalleryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    tanggal_kegiatan: '',
    kategori: '',
    foto_path: ''
  });
 
  const [errors, setErrors] = useState({});
 
  const kategoriOptions = ['Rapat', 'Kerja Bakti', 'Posyandu', 'Perayaan', 'Kegiatan Sosial', 'Lainnya'];
 
  useEffect(() => {
    fetchGallery();
  }, []);
 
  const fetchGallery = async () => {
    try {
      const response = await api.get('/gallery');
      setGalleryList(response.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 
  const resetForm = () => {
    setFormData({
      judul: '',
      deskripsi: '',
      tanggal_kegiatan: '',
      kategori: '',
      foto_path: ''
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
        await api.put(`/gallery/${currentId}`, formData);
      } else {
        await api.post('/gallery', formData);
      }
      
      fetchGallery();
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
      judul: item.judul,
      deskripsi: item.deskripsi || '',
      tanggal_kegiatan: item.tanggal_kegiatan,
      kategori: item.kategori || '',
      foto_path: item.foto_path
    });
    setCurrentId(item.id);
    setEditMode(true);
    setShowModal(true);
  };
 
  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus foto ini?')) {
      try {
        await api.delete(`/gallery/${id}`);
        fetchGallery();
      } catch (error) {
        console.error('Error deleting gallery:', error);
      }
    }
  };
 
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
 
  return (
    <div className="flex min-h-screen">
      <Sidebar />
 
      <div className="flex-1 bg-gray-50">
        {/* Topbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Gallery Kegiatan</h1>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + Upload Foto
          </button>
        </div>
 
        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-3 text-sm text-gray-600">Memuat gallery...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryList.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                  {/* Image */}
                  <div 
                    className="h-48 bg-gray-200 flex items-center justify-center cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  >
                    {item.foto_path ? (
                      <img 
                        src={item.foto_path} 
                        alt={item.judul}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
 
                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-900 flex-1">{item.judul}</h3>
                      {item.kategori && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                          {item.kategori}
                        </span>
                      )}
                    </div>
                    
                    {item.deskripsi && (
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.deskripsi}</p>
                    )}
                    
                    <p className="text-xs text-gray-500 mb-3">
                      {formatDate(item.tanggal_kegiatan)}
                    </p>
 
                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded text-xs font-medium border border-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded text-xs font-medium border border-red-200"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
 
              {galleryList.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  Belum ada foto di gallery
                </div>
              )}
            </div>
          )}
        </div>
      </div>
 
      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editMode ? 'Edit Foto' : 'Upload Foto'}
              </h2>
            </div>
 
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Judul */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Foto *
                </label>
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  required
                />
                {errors.judul && <p className="text-xs text-red-600 mt-1">{errors.judul[0]}</p>}
              </div>
 
              {/* Kategori */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">Pilih Kategori</option>
                  {kategoriOptions.map(kat => (
                    <option key={kat} value={kat}>{kat}</option>
                  ))}
                </select>
              </div>
 
              {/* Tanggal Kegiatan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Kegiatan *
                </label>
                <input
                  type="date"
                  name="tanggal_kegiatan"
                  value={formData.tanggal_kegiatan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
 
              {/* URL Foto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Foto *
                </label>
                <input
                  type="text"
                  name="foto_path"
                  value={formData.foto_path}
                  onChange={handleInputChange}
                  placeholder="https://example.com/foto.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Untuk sementara gunakan URL foto dari internet
                </p>
              </div>
 
              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Deskripsi kegiatan..."
                />
              </div>
 
              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  {editMode ? 'Update' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
 
      {/* Modal Preview Image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full">
            <img 
              src={selectedImage.foto_path} 
              alt={selectedImage.judul}
              className="w-full h-auto rounded-lg"
            />
            <div className="bg-white mt-4 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900">{selectedImage.judul}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedImage.deskripsi}</p>
              <p className="text-xs text-gray-500 mt-2">{formatDate(selectedImage.tanggal_kegiatan)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}