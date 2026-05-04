import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'grid' },
    { path: '/admin/warga', label: 'Data Warga', icon: 'users' },
    { path: '/admin/keuangan', label: 'Data Keuangan', icon: 'wallet' },
    { path: '/admin/gallery', label: 'Gallery', icon: 'image' },
    { path: '/admin/inventaris', label: 'Inventaris', icon: 'box' },
    { path: '/admin/acara', label: 'Acara Mendatang', icon: 'calendar' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderIcon = (type) => {
    const iconProps = {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      viewBox: "0 0 24 24"
    };

    switch (type) {
      case 'grid':
        return (
          <svg {...iconProps}>
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        );
      case 'users':
        return (
          <svg {...iconProps}>
            <circle cx="9" cy="7" r="4"/>
            <circle cx="17" cy="7" r="4"/>
            <path d="M2 21c0-4 3-6 7-6s7 2 7 6M14 21c0-4 3-6 7-6"/>
          </svg>
        );
      case 'wallet':
        return (
          <svg {...iconProps}>
            <rect x="2" y="6" width="20" height="14" rx="2"/>
            <path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
            <line x1="12" y1="12" x2="12" y2="16"/>
            <line x1="10" y1="14" x2="14" y2="14"/>
          </svg>
        );
      case 'image':
        return (
          <svg {...iconProps}>
            <rect x="2" y="2" width="9" height="6" rx="1"/>
            <rect x="13" y="2" width="9" height="6" rx="1"/>
            <rect x="2" y="10" width="9" height="6" rx="1"/>
            <rect x="13" y="10" width="9" height="6" rx="1"/>
            <rect x="2" y="18" width="20" height="4" rx="1"/>
          </svg>
        );
      case 'box':
        return (
          <svg {...iconProps}>
            <rect x="2" y="8" width="20" height="14" rx="2"/>
            <path d="M6 8V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/>
          </svg>
        );
      case 'calendar':
        return (
          <svg {...iconProps}>
            <rect x="2" y="4" width="20" height="18" rx="2"/>
            <line x1="8" y1="2" x2="8" y2="7"/>
            <line x1="16" y1="2" x2="16" y2="7"/>
            <line x1="2" y1="10" x2="22" y2="10"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-52 bg-blue-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-blue-700">
        <h2 className="text-sm font-semibold">Admin RT 06</h2>
        <p className="text-xs text-blue-300 mt-0.5">Panel Pengelolaan</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                isActive
                  ? 'bg-blue-700 text-white border-l-3 border-blue-400'
                  : 'text-blue-200 hover:bg-blue-800'
              }`}
            >
              <div className={isActive ? 'text-white' : 'text-blue-400'}>
                {renderIcon(item.icon)}
              </div>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-700">
        <div className="text-xs text-blue-300 mb-3">
          Admin · {user?.name || 'User'}
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-blue-800 hover:bg-blue-700 text-white text-xs py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
