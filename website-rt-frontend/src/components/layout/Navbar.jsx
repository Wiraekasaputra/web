import { Link } from 'react-router-dom';
 
export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">RT</span>
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900">Website RT 05</h1>
            <p className="text-xs text-gray-600">Kel. Pandaan, Kec. Pandaan</p>
          </div>
        </div>
        <Link
          to="/login"
          className="bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition"
        >
          Login Admin
        </Link>
      </div>
    </nav>
  );
}