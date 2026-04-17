import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Layers, BarChart2 } from 'lucide-react';

const links = [
  { to: '/leagues', label: 'Leagues', icon: Layers },
  { to: '/leaderboard', label: 'Leaderboard', icon: BarChart2 },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-rink-950/90 backdrop-blur border-b border-rink-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg text-white hover:text-ice-400 transition-colors"
          >
            <span className="text-xl">🏒</span>
            <span className="hidden sm:block">Hockey</span>
            <span className="text-ice-400">Golf</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-ice-500/20 text-ice-400'
                      : 'text-rink-300 hover:text-white hover:bg-rink-800'
                  }`
                }
              >
                <Icon size={15} />
                {label}
              </NavLink>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="sm:hidden p-1.5 rounded text-rink-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="sm:hidden border-t border-rink-800 bg-rink-950 px-4 py-3 space-y-1"
          onClick={() => setOpen(false)}
        >
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-ice-500/20 text-ice-400'
                    : 'text-rink-300 hover:text-white hover:bg-rink-800'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </div>
      )}

      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #0ea5e9 50%, transparent)' }}
      />
    </nav>
  );
}
