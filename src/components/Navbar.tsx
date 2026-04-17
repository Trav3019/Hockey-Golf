import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Layers, BarChart2, Rss, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getPlayer } from '../data/players';
import { getLeague } from '../data/leagues';

const mainLinks = [
  { to: '/feed', label: 'Feed', icon: Rss },
  { to: '/leagues', label: 'Leagues', icon: Layers },
  { to: '/leaderboard', label: 'Leaderboard', icon: BarChart2 },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const myPlayer = currentUser ? getPlayer(currentUser.playerId) : null;
  const myLeague = getLeague(myPlayer?.leagueId ?? '');

  function handleLogout() {
    logout();
    navigate('/');
  }

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
            {mainLinks.map(({ to, label, icon: Icon }) => (
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

            {/* Auth area */}
            {currentUser && myPlayer ? (
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-rink-800">
                <Link
                  to={`/player/${myPlayer.id}`}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-rink-800 transition-colors"
                >
                  {currentUser.profilePhoto ? (
                    <img
                      src={currentUser.profilePhoto}
                      alt={myPlayer.name}
                      className="w-6 h-6 rounded-full object-cover border border-rink-600"
                    />
                  ) : (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center font-black text-xs border"
                      style={{
                        borderColor: myLeague?.color ?? '#334155',
                        color: myLeague?.color ?? '#94a3b8',
                        background: `${myLeague?.color ?? '#334155'}22`,
                      }}
                    >
                      {myPlayer.number}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-rink-200 max-w-24 truncate">{myPlayer.firstName}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-md text-rink-400 hover:text-red-400 hover:bg-rink-800 text-sm transition-colors"
                  title="Sign out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-ice-500/20 hover:bg-ice-500/30 text-ice-400 text-sm font-medium transition-colors"
              >
                <LogIn size={14} /> Sign In
              </Link>
            )}
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
          {mainLinks.map(({ to, label, icon: Icon }) => (
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
          <div className="pt-2 border-t border-rink-800">
            {currentUser && myPlayer ? (
              <>
                <Link
                  to={`/player/${myPlayer.id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-rink-200 hover:bg-rink-800"
                >
                  <User size={15} /> {myPlayer.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-400 hover:bg-rink-800"
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-ice-400 hover:bg-rink-800"
              >
                <LogIn size={15} /> Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
