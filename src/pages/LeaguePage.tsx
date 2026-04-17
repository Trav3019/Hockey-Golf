import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLeague } from '../data/leagues';
import { getPlayersByLeague } from '../data/players';
import { useRounds } from '../hooks/useRounds';
import { calcHandicap } from '../utils/handicap';
import PlayerCard from '../components/PlayerCard';
import { ArrowLeft, Search, ExternalLink } from 'lucide-react';
import { EP_LEAGUE_IDS } from '../services/eliteProspects';

const POSITIONS = ['All', 'C', 'LW', 'RW', 'D', 'G'] as const;
type PosFilter = (typeof POSITIONS)[number];

export default function LeaguePage() {
  const { leagueId } = useParams<{ leagueId: string }>();
  const league = getLeague(leagueId ?? '');
  const [search, setSearch] = useState('');
  const [posFilter, setPosFilter] = useState<PosFilter>('All');
  const { getPlayerRounds } = useRounds();

  const playersWithHcp = useMemo(() => {
    if (!leagueId) return [];
    return getPlayersByLeague(leagueId)
      .map(p => ({ player: p, hcp: calcHandicap(getPlayerRounds(p.id)) }))
      .filter(({ player }) => {
        if (posFilter !== 'All' && player.position !== posFilter) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            player.name.toLowerCase().includes(q) ||
            player.teamName.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (a.hcp.index === null && b.hcp.index === null) return 0;
        if (a.hcp.index === null) return 1;
        if (b.hcp.index === null) return -1;
        return a.hcp.index - b.hcp.index;
      });
  }, [leagueId, posFilter, search, getPlayerRounds]);

  const epId = leagueId ? EP_LEAGUE_IDS[leagueId] : undefined;

  if (!league) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-rink-400">League not found.</p>
        <Link to="/leagues" className="text-ice-400 hover:text-ice-300 mt-4 inline-block">
          ← Back to leagues
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <Link
        to="/leagues"
        className="inline-flex items-center gap-1.5 text-rink-400 hover:text-white text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={15} /> All Leagues
      </Link>

      {/* League header */}
      <div
        className={`flex items-center justify-between p-5 rounded-2xl bg-gradient-to-br ${league.bgClass} border mb-8`}
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">{league.emoji}</span>
          <div>
            <h1 className="text-2xl font-black text-white">{league.name}</h1>
            <p className="text-rink-300 text-sm mt-0.5">{league.country}</p>
            <p className="text-rink-400 text-sm mt-1">{league.description}</p>
          </div>
        </div>
        {epId && (
          <a
            href={`https://www.eliteprospects.com/league/${leagueId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/30 border border-rink-600 text-rink-300 hover:text-white text-xs font-medium transition-colors"
          >
            Elite Prospects <ExternalLink size={11} />
          </a>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
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

        {/* Position tabs */}
        <div className="flex gap-1">
          {POSITIONS.map(pos => (
            <button
              key={pos}
              onClick={() => setPosFilter(pos)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                posFilter === pos
                  ? 'bg-ice-500 text-white'
                  : 'bg-rink-800 text-rink-400 hover:bg-rink-700 hover:text-white border border-rink-700'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      {/* Player count */}
      <p className="text-rink-500 text-sm mb-4">
        {playersWithHcp.length} player{playersWithHcp.length !== 1 ? 's' : ''}{' '}
        &mdash; sorted by handicap (best first)
      </p>

      {/* Player list */}
      <div className="space-y-2">
        {playersWithHcp.map(({ player, hcp }, i) => (
          <PlayerCard
            key={player.id}
            player={player}
            handicap={hcp}
            rank={i + 1}
          />
        ))}
      </div>

      {playersWithHcp.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-rink-500">No players match your filters.</p>
        </div>
      )}
    </div>
  );
}
