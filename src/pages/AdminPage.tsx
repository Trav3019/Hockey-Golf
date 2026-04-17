import { useState } from 'react';
import { getPlayer } from '../data/players';
import { getLeague } from '../data/leagues';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, XCircle, Clock, ShieldCheck } from 'lucide-react';

// Simple hardcoded admin passcode — local-only, not a real security boundary
const ADMIN_PASSCODE = 'hockeygolf2026';

export default function AdminPage() {
  const { accounts, approveAccount, rejectAccount } = useAuth();
  const [passcode, setPasscode] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');

  function handlePasscode(e: React.FormEvent) {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setAuthed(true);
    } else {
      setError('Incorrect passcode.');
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-xs">
          <div className="text-center mb-6">
            <ShieldCheck size={40} className="text-ice-400 mx-auto mb-3" />
            <h1 className="text-2xl font-black text-white">Admin Access</h1>
            <p className="text-rink-400 text-sm mt-1">Enter the admin passcode to continue.</p>
          </div>
          <form onSubmit={handlePasscode} className="space-y-4">
            <input
              type="password"
              required
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
              placeholder="Passcode"
              className="w-full px-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-ice-500 hover:bg-ice-400 text-white font-bold text-sm"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filtered = accounts.filter(a => filter === 'all' || a.status === filter);
  const pendingCount = accounts.filter(a => a.status === 'pending').length;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck size={22} className="text-ice-400" />
        <h1 className="text-2xl font-black text-white">Admin Panel</h1>
        {pendingCount > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold">
            {pendingCount} pending
          </span>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {(['pending', 'approved', 'rejected', 'all'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
              filter === f
                ? 'bg-ice-500 text-white'
                : 'bg-rink-800 text-rink-400 hover:text-white'
            }`}
          >
            {f} {f !== 'all' && `(${accounts.filter(a => a.status === f).length})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-rink-400">No {filter} accounts.</p>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map(acct => {
          const player = getPlayer(acct.playerId);
          const league = getLeague(player?.leagueId ?? '');
          return (
            <div key={acct.id} className="p-4 rounded-xl bg-rink-900/70 border border-rink-800">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border shrink-0"
                  style={{
                    borderColor: league?.color ?? '#334155',
                    color: league?.color ?? '#94a3b8',
                    background: `${league?.color ?? '#334155'}22`,
                  }}
                >
                  {player?.number ?? '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">
                    {player?.name ?? 'Unknown player'} {player?.nationalityFlag}
                  </p>
                  <p className="text-xs text-rink-400 truncate">{acct.email}</p>
                  <p className="text-xs text-rink-600">
                    {player?.teamName} · {league?.abbreviation} · Registered {new Date(acct.joinedAt).toLocaleDateString()}
                  </p>
                </div>
                {/* Status + actions */}
                <div className="shrink-0 flex flex-col items-end gap-2">
                  {acct.status === 'pending' && (
                    <span className="flex items-center gap-1 text-xs text-yellow-400 font-bold">
                      <Clock size={11} /> Pending
                    </span>
                  )}
                  {acct.status === 'approved' && (
                    <span className="flex items-center gap-1 text-xs text-green-400 font-bold">
                      <CheckCircle size={11} /> Approved
                    </span>
                  )}
                  {acct.status === 'rejected' && (
                    <span className="flex items-center gap-1 text-xs text-red-400 font-bold">
                      <XCircle size={11} /> Rejected
                    </span>
                  )}
                  {acct.status === 'pending' && (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => approveAccount(acct.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs font-bold transition-colors"
                      >
                        <CheckCircle size={11} /> Approve
                      </button>
                      <button
                        onClick={() => rejectAccount(acct.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold transition-colors"
                      >
                        <XCircle size={11} /> Reject
                      </button>
                    </div>
                  )}
                  {acct.status === 'approved' && (
                    <button
                      onClick={() => rejectAccount(acct.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-colors"
                    >
                      <XCircle size={11} /> Revoke
                    </button>
                  )}
                  {acct.status === 'rejected' && (
                    <button
                      onClick={() => approveAccount(acct.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs font-bold transition-colors"
                    >
                      <CheckCircle size={11} /> Re-approve
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
