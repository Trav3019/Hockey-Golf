import { useMemo, useState } from 'react';
import { players } from '../data/players';
import { leagues } from '../data/leagues';
import { useRounds } from '../hooks/useRounds';
import { calcHandicap } from '../utils/handicap';
import PlayerCard from '../components/PlayerCard';
import { Search } from 'lucide-react';

type SortKey = 'handicap' | 'rounds' | 'name';

export default function LeaderboardPage() {
  const [leagueFilter, setLeagueFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('handicap');
  const { getPlayerRounds } = useRounds();

  const rows = useMemo(() =>
    players.map(p => ({ player: p, hcp: calcHandicap(getPlayerRounds(p.id)) })),
    [getPlayerRounds]
  );

  const filtered = useMemo(() => {
    let list = rows;

    if (leagueFilter !== 'all') {
      list = list.filter(({ player }) => player.leagueId === leagueFilter);
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(({ player }) =>
        player.name.toLowerCase().includes(q) ||
        player.teamName.toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) => {
      if (sort === 'rounds') return b.hcp.roundsCount - a.hcp.roundsCount;
      if (sort === 'name')
        return a.player.lastName.localeCompare(b.player.lastName);

      // handicap sort: nulls go last
      if (a.hcp.index === null && b.hcp.index === null) return 0;
      if (a.hcp.index === null) return 1;
      if (b.hcp.index === null) return -1;
      return a.hcp.index - b.hcp.index;
    });
  }, [rows, leagueFilter, search, sort]);

  // Track global rank separately (only for handicap sort, no-filter)
  const showRank = sort === 'handicap' && !search;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-black text-white mb-2">Leaderboard</h1>
      <p className="text-rink-400 mb-8">
        All hockey players ranked by Handicap Index. Filter by league to compare
        within your division.
      </p>

      {/* League filter */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setLeagueFilter('all')}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            leagueFilter === 'all'
              ? 'bg-ice-500 text-white'
              : 'bg-rink-800 text-rink-300 hover:bg-rink-700 hover:text-white border border-rink-700'
          }`}
        >
          All Leagues
        </button>
        {leagues.map(l => (
          <button
            key={l.id}
            onClick={() => setLeagueFilter(l.id)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              leagueFilter === l.id
                ? 'bg-ice-500 text-white'
                : 'bg-rink-800 text-rink-300 hover:bg-rink-700 hover:text-white border border-rink-700'
            }`}
          >
            {l.emoji} {l.abbreviation}
          </button>
        ))}
      </div>

      {/* Search + sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-rink-500" />
          <input
            type="text"
            placeholder="Search player or team…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500"
          />
        </div>
        <div className="flex gap-1">
          {([
            { key: 'handicap', label: 'Handicap' },
            { key: 'rounds', label: 'Rounds' },
            { key: 'name', label: 'Name' },
          ] as { key: SortKey; label: string }[]).map(s => (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                sort === s.key
                  ? 'bg-ice-500 text-white'
                  : 'bg-rink-800 text-rink-400 hover:bg-rink-700 hover:text-white border border-rink-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-rink-500 text-sm mb-4">
        {filtered.length} player{filtered.length !== 1 ? 's' : ''}
        {leagueFilter !== 'all' && (
          <> in <span className="text-rink-300">{leagues.find(l => l.id === leagueFilter)?.name}</span></>
        )}
      </p>

      {/* List */}
      <div className="space-y-2">
        {filtered.map(({ player, hcp }, i) => (
          <PlayerCard
            key={player.id}
            player={player}
            handicap={hcp}
            rank={showRank ? i + 1 : undefined}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-rink-500">No players match your search.</p>
        </div>
      )}
    </div>
  );
}
