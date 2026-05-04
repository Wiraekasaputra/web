export default function ProfileKetua({ nama, periode, alamat }) {
  // Ambil inisial dari nama
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
 
  return (
    <section className="mb-6">
      <h2 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
        Profil Ketua RT
      </h2>
      <div className="bg-white border border-gray-200 rounded-lg p-5 flex items-center gap-4">
        <div className="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center text-lg font-semibold text-blue-800 flex-shrink-0">
          {getInitials(nama)}
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900">{nama}</h3>
          <p className="text-sm text-gray-600 mt-0.5">
            Ketua RT 05 / Periode {periode}
            <br />
            {alamat}
          </p>
          <span className="inline-block mt-2 bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-lg">
            Ketua RT Aktif
          </span>
        </div>
      </div>
    </section>
  );
}