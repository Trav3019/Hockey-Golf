import { useMemo, useState } from 'react';
import { leagues } from '../data/leagues';
import { players } from '../data/players';
import { useRounds } from '../hooks/useRounds';
import { calcHandicap } from '../utils/handicap';
import LeagueCard from '../components/LeagueCard';
import { League } from '../types';

const TYPES: { value: League['type'] | 'all'; label: string }[] = [
  { value: 'all', label: 'All Leagues' },
  { value: 'nhl', label: 'NHL' },
  { value: 'ahl', label: 'AHL' },
  { value: 'junior', label: 'Major Junior' },
  { value: 'european', label: 'European' },
];

export default function LeaguesPage() {
  const [filter, setFilter] = useState<League['type'] | 'all'>('all');
  const { getPlayerRounds } = useRounds();

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

  const filtered = useMemo(
    () => leagueStats.filter(({ league }) => filter === 'all' || league.type === filter),
    [leagueStats, filter]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-black text-white mb-2">Hockey Leagues</h1>
      <p className="text-rink-400 mb-8">
        Browse players by the league they play in. Click a league to see the full
        handicap leaderboard.
      </p>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TYPES.map(t => (
          <button
            key={t.value}
            onClick={() => setFilter(t.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === t.value
                ? 'bg-ice-500 text-white'
                : 'bg-rink-800 text-rink-300 hover:bg-rink-700 hover:text-white border border-rink-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(({ league, playerCount, avgHandicap }) => (
          <LeagueCard
            key={league.id}
            league={league}
            playerCount={playerCount}
            avgHandicap={avgHandicap}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-rink-500 py-20">No leagues in this category.</p>
      )}
    </div>
  );
}
