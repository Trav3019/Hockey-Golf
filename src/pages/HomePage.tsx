import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { players } from '../data/players';
import { leagues } from '../data/leagues';
import { useRounds } from '../hooks/useRounds';
import { calcHandicap, fmtHandicap, handicapColor } from '../utils/handicap';
import LeagueCard from '../components/LeagueCard';
import { ChevronRight, Award, Users, ListChecks } from 'lucide-react';

export default function HomePage() {
  const { getPlayerRounds } = useRounds();

  const playerHandicaps = useMemo(() =>
    players.map(p => ({ player: p, hcp: calcHandicap(getPlayerRounds(p.id)) })),
    [getPlayerRounds]
  );

  const totalRounds = useMemo(() =>
    players.reduce((acc, p) => acc + getPlayerRounds(p.id).length, 0),
    [getPlayerRounds]
  );

  const top5 = useMemo(() =>
    playerHandicaps
      .filter(({ hcp }) => hcp.index !== null)
      .sort((a, b) => (a.hcp.index ?? 99) - (b.hcp.index ?? 99))
      .slice(0, 5),
    [playerHandicaps]
  );

  const leagueStats = useMemo(() =>
    leagues.map(l => {
      const lPlayers = players.filter(p => p.leagueId === l.id);
      const withHcp = lPlayers
        .map(p => calcHandicap(getPlayerRounds(p.id)).index)
        .filter((x): x is number => x !== null);
      const avg = withHcp.length
        ? withHcp.reduce((a, b) => a + b, 0) / withHcp.length
        : null;
      return { league: l, playerCount: lPlayers.length, avgHandicap: avg };
    }),
    [getPlayerRounds]
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rink-950 via-rink-900 to-rink-950" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 40px, #0ea5e9 40px, #0ea5e9 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #0ea5e9 40px, #0ea5e9 41px)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ice-500/10 border border-ice-500/20 text-ice-400 text-sm font-medium mb-6">
              <span>🏒</span> Where hockey meets the fairway
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-4">
              Hockey <span className="text-ice-400">Golf</span>
            </h1>
            <p className="text-rink-300 text-lg sm:text-xl mb-8 leading-relaxed">
              Track and compare golf handicaps for hockey players across every
              major league. From the NHL to the juniors — see who's the real
              scratch player off the ice.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ice-500 hover:bg-ice-400 text-white font-bold text-sm transition-colors"
              >
                View Leaderboard <ChevronRight size={16} />
              </Link>
              <Link
                to="/leagues"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-rink-800 hover:bg-rink-700 border border-rink-600 text-white font-bold text-sm transition-colors"
              >
                Browse Leagues
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-rink-800 bg-rink-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { icon: Users, value: players.length, label: 'Players' },
              { icon: ListChecks, value: leagues.length, label: 'Leagues' },
              { icon: Award, value: totalRounds, label: 'Rounds Tracked' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <Icon size={18} className="text-ice-500 shrink-0" />
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white">{value}</span>
                  <span className="hidden sm:inline text-rink-400 ml-1.5 text-sm">{label}</span>
                  <p className="sm:hidden text-rink-400 text-xs">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top performers */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white">
              🏆 Top Low Handicappers
            </h2>
            <Link
              to="/leaderboard"
              className="text-ice-400 hover:text-ice-300 text-sm font-medium flex items-center gap-1"
            >
              Full list <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-2">
            {top5.map(({ player, hcp }, i) => (
              <Link
                key={player.id}
                to={`/player/${player.id}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-rink-800/60 border border-rink-700 hover:border-ice-500/40 hover:bg-rink-800 transition-all group"
              >
                <span className="w-7 text-center font-black text-rink-400 group-hover:text-rink-200">
                  {i + 1}
                </span>
                <span className="text-lg">{player.nationalityFlag}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white group-hover:text-ice-300 transition-colors truncate">
                    {player.name}
                  </p>
                  <p className="text-rink-400 text-sm truncate">
                    {player.teamName}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className={`text-xl font-black tabular-nums ${handicapColor(hcp.index)}`}>
                    {fmtHandicap(hcp.index)}
                  </span>
                  <p className="text-rink-500 text-xs">{hcp.roundsCount} rounds</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Leagues grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white">Browse by League</h2>
            <Link
              to="/leagues"
              className="text-ice-400 hover:text-ice-300 text-sm font-medium flex items-center gap-1"
            >
              All leagues <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leagueStats.map(({ league, playerCount, avgHandicap }) => (
              <LeagueCard
                key={league.id}
                league={league}
                playerCount={playerCount}
                avgHandicap={avgHandicap}
              />
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-16 p-6 rounded-2xl bg-rink-900/50 border border-rink-800">
          <h2 className="text-xl font-black text-white mb-4">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm text-rink-300">
            <div>
              <div className="text-2xl mb-2">🏒</div>
              <h3 className="font-bold text-white mb-1">Pick your player</h3>
              <p>Browse hockey players grouped by their league, from NHL stars to Major Junior prospects.</p>
            </div>
            <div>
              <div className="text-2xl mb-2">⛳</div>
              <h3 className="font-bold text-white mb-1">Log golf rounds</h3>
              <p>Enter course rating, slope, and gross score. The app calculates score differentials automatically.</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-bold text-white mb-1">World Handicap System</h3>
              <p>Handicap Indexes are computed using official WHS rules — best differentials from your last 20 rounds × 0.96.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
