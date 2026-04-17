import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllPlayers } from '../data/players';
import { addCustomPlayer } from '../data/customPlayers';
import { leagues, getLeague } from '../data/leagues';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Search, CheckCircle, UserPlus, ChevronDown } from 'lucide-react';
import type { Position } from '../types';

export default function RegisterPage() {
  const { register, accounts } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<'find' | 'manual' | 'details' | 'done'>('find');
  const [search, setSearch] = useState('');
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  // Manual registration fields
  const [mFirstName, setMFirstName] = useState('');
  const [mLastName, setMLastName] = useState('');
  const [mPosition, setMPosition] = useState<Position>('C');
  const [mNumber, setMNumber] = useState('');
  const [mTeam, setMTeam] = useState('');
  const [mLeagueId, setMLeagueId] = useState('nhl');
  const [mNationality, setMNationality] = useState('');
  const [mFlag, setMFlag] = useState('');
  const [mBirthYear, setMBirthYear] = useState('');

  const takenPlayerIds = new Set(accounts.map(a => a.playerId));

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return [];
    return getAllPlayers()
      .filter(p =>
        !takenPlayerIds.has(p.id) &&
        (p.name.toLowerCase().includes(q) ||
          p.teamName.toLowerCase().includes(q))
      )
      .slice(0, 10);
  }, [search, takenPlayerIds]);

  const selectedPlayer = getAllPlayers().find(p => p.id === selectedPlayerId);
  const selectedLeague = getLeague(selectedPlayer?.leagueId ?? '');

  function handleSelectPlayer(id: string) {
    setSelectedPlayerId(id);
    setSearch('');
    setStep('details');
  }

  function handleManualContinue(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!mFirstName.trim() || !mLastName.trim()) { setError('First and last name are required.'); return; }
    if (!mTeam.trim()) { setError('Team name is required.'); return; }
    const num = parseInt(mNumber, 10);
    if (isNaN(num) || num < 0 || num > 99) { setError('Jersey number must be 0–99.'); return; }
    const year = parseInt(mBirthYear, 10);
    if (isNaN(year) || year < 1940 || year > 2010) { setError('Please enter a valid birth year (1940–2010).'); return; }
    // Create the custom player
    const newPlayer = addCustomPlayer({
      name: `${mFirstName.trim()} ${mLastName.trim()}`,
      firstName: mFirstName.trim(),
      lastName: mLastName.trim(),
      position: mPosition,
      number: num,
      teamName: mTeam.trim(),
      leagueId: mLeagueId,
      nationality: mNationality.trim() || 'Unknown',
      nationalityFlag: mFlag.trim() || '🏳️',
      birthYear: year,
    });
    setSelectedPlayerId(newPlayer.id);
    setStep('details');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    const result = register(selectedPlayerId, email, password);
    if (result === 'ok') {
      setStep('done');
    } else if (result === 'email-taken') {
      setError('An account with this email already exists.');
    } else if (result === 'player-taken') {
      setError('This player profile already has an account.');
    }
  }

  if (step === 'done') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-white mb-2">Registration Submitted!</h1>
          <p className="text-rink-400 text-sm mb-2">
            Your account is <span className="text-yellow-400 font-semibold">pending approval</span>.
          </p>
          <p className="text-rink-500 text-sm mb-6">
            An admin will verify your identity and approve your account. Once approved you can sign in.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ice-500 hover:bg-ice-400 text-white font-bold text-sm transition-colors"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <button
          onClick={() => {
            if (step === 'details') setStep(selectedPlayerId.startsWith('custom-') ? 'manual' : 'find');
            else if (step === 'manual') setStep('find');
            else navigate('/');
          }}
          className="inline-flex items-center gap-1.5 text-rink-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={15} /> {step === 'find' ? 'Home' : 'Back'}
        </button>

        <div className="mb-6">
          <div className="text-3xl mb-3">🏒⛳</div>
          <h1 className="text-3xl font-black text-white mb-1">Create Account</h1>
          <p className="text-rink-400 text-sm">
            {step === 'find' ? 'Search for your player profile to get started.'
              : step === 'manual' ? 'Enter your player details.'
              : 'Set up your login credentials.'}
          </p>
        </div>

        {/* Step 1: search for player */}
        {step === 'find' && (
          <div className="space-y-4">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-3 text-rink-500" />
              <input
                type="text"
                placeholder={`Search ${getAllPlayers().length.toLocaleString()}+ players by name or team…`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500"
                autoFocus
              />
            </div>
            {filtered.length > 0 && (
              <div className="rounded-xl border border-rink-700 bg-rink-800 overflow-hidden divide-y divide-rink-700">
                {filtered.map(p => {
                  const lg = getLeague(p.leagueId);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPlayer(p.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-rink-700 transition-colors text-left"
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm border shrink-0"
                        style={{
                          borderColor: lg?.color ?? '#334155',
                          color: lg?.color ?? '#94a3b8',
                          background: `${lg?.color ?? '#334155'}22`,
                        }}
                      >
                        {p.number}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">{p.name} {p.nationalityFlag}</p>
                        <p className="text-xs text-rink-400 truncate">{p.teamName} · {lg?.abbreviation ?? p.leagueId.toUpperCase()}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            {search.length >= 2 && filtered.length === 0 && (
              <p className="text-sm text-rink-400 text-center py-2">
                No results — try a different spelling or click below.
              </p>
            )}
            {/* Not in the list? */}
            <div className="pt-2 border-t border-rink-800">
              <p className="text-xs text-rink-500 text-center mb-3">
                Can't find yourself? You can register manually.
              </p>
              <button
                type="button"
                onClick={() => setStep('manual')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-rink-700 text-rink-300 hover:text-white hover:border-rink-500 text-sm font-semibold transition-colors"
              >
                <UserPlus size={15} /> Register manually
              </button>
            </div>
          </div>
        )}

        {/* Step 1b: manual player info */}
        {step === 'manual' && (
          <form onSubmit={handleManualContinue} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-rink-300 mb-1">First Name *</label>
                <input value={mFirstName} onChange={e => setMFirstName(e.target.value)} required
                  className="w-full px-3 py-2 rounded-lg bg-rink-800 border border-rink-700 text-white text-sm focus:outline-none focus:border-ice-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-rink-300 mb-1">Last Name *</label>
                <input value={mLastName} onChange={e => setMLastName(e.target.value)} required
                  className="w-full px-3 py-2 rounded-lg bg-rink-800 border border-rink-700 text-white text-sm focus:outline-none focus:border-ice-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-rink-300 mb-1">Position *</label>
                <div className="relative">
                  <select value={mPosition} onChange={e => setMPosition(e.target.value as Position)}
                    className="w-full px-3 py-2 rounded-lg bg-rink-800 border border-rink-700 text-white text-sm focus:outline-none focus:border-ice-500 appearance-none">
                    {(['C', 'LW', 'RW', 'D', 'G'] as Position[]).map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-3 text-rink-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-rink-300 mb-1">Jersey # *</label>
                <input value={mNumber} onChange={e => setMNumber(e.target.value)} type="number" min={0} max={99} required
                  className="w-full px-3 py-2 rounded-lg bg-rink-800 border border-rink-700 text-white text-sm focus:outline-none focus:border-ice-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-rink-300 mb-1">Team Name *</label>
              <input value={mTeam} onChange={e => setMTeam(e.target.value)} required placeholder="e.g. Skellefteå AIK"
                className="w-full px-3 py-2 rounded-lg bg-rink-800 border border-rink-700 text-white text-sm focus:outline-none focus:border-ice-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-rink-300 mb-1">League *</label>
              <div className="relative">
                <select value={mLeagueId} onChange={e => setMLeagueId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-rink-800 border border-rink-700 text-white text-sm focus:outline-none focus:border-ice-500 appearance-none">
                  {leagues.map(l => (
                    <option key={l.id} value={l.id}>{l.abbreviation} — {l.name}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-3 top-3 text-rink-400 pointer-events-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-rink-300 mb-1">Nationality</label>
                <input value={mNationality} onChange={e => setMNationality(e.target.value)} placeholder="e.g. Canadian"
                  className="w-full px-3 py-2 rounded-lg bg-rink-800 border border-rink-700 text-white text-sm focus:outline-none focus:border-ice-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-rink-300 mb-1">Flag emoji</label>
                <input value={mFlag} onChange={e => setMFlag(e.target.value)} placeholder="🇨🇦"
                  className="w-full px-3 py-2 rounded-lg bg-rink-800 border border-rink-700 text-white text-sm focus:outline-none focus:border-ice-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-rink-300 mb-1">Birth Year *</label>
              <input value={mBirthYear} onChange={e => setMBirthYear(e.target.value)} type="number" min={1940} max={2010} required placeholder="e.g. 1995"
                className="w-full px-3 py-2 rounded-lg bg-rink-800 border border-rink-700 text-white text-sm focus:outline-none focus:border-ice-500" />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="submit"
              className="w-full py-2.5 rounded-lg bg-ice-500 hover:bg-ice-400 text-white font-bold text-sm transition-colors mt-2">
              Continue →
            </button>
          </form>
        )}

        {/* Step 2: email + password */}
        {step === 'details' && selectedPlayer && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-rink-800/80 border border-rink-700 mb-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border shrink-0"
                style={{
                  borderColor: selectedLeague?.color ?? '#334155',
                  color: selectedLeague?.color ?? '#94a3b8',
                  background: `${selectedLeague?.color ?? '#334155'}22`,
                }}
              >
                {selectedPlayer.number}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{selectedPlayer.name} {selectedPlayer.nationalityFlag}</p>
                <p className="text-xs text-rink-400">{selectedPlayer.teamName} · {selectedLeague?.abbreviation ?? selectedPlayer.leagueId.toUpperCase()}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-rink-200 mb-1.5">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-rink-200 mb-1.5">Password</label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-rink-200 mb-1.5">Confirm Password</label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <p className="text-xs text-rink-500 bg-rink-800/60 border border-rink-700 rounded-lg px-3 py-2">
              After registering your account will be <span className="text-yellow-400">pending admin approval</span> before you can log in.
            </p>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-ice-500 hover:bg-ice-400 text-white font-bold text-sm transition-colors"
            >
              Submit Registration
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-rink-400">
          Already have an account?{' '}
          <Link to="/login" className="text-ice-400 hover:text-ice-300 font-semibold transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
