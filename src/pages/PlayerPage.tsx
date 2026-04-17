import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlayer } from '../data/players';
import { getLeague } from '../data/leagues';
import { useRounds } from '../hooks/useRounds';
import { calcHandicap } from '../utils/handicap';
import HandicapBadge from '../components/HandicapBadge';
import RoundCard from '../components/RoundCard';
import { ArrowLeft, Plus, ExternalLink } from 'lucide-react';

export default function PlayerPage() {
  const { playerId } = useParams<{ playerId: string }>();
  const player = getPlayer(playerId ?? '');
  const league = getLeague(player?.leagueId ?? '');
  const { getPlayerRounds, deleteRound } = useRounds();

  const rounds = useMemo(
    () => (playerId ? getPlayerRounds(playerId) : []),
    [playerId, getPlayerRounds]
  );
  const handicap = useMemo(() => calcHandicap(rounds), [rounds]);

  if (!player) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-rink-400">Player not found.</p>
        <Link to="/leagues" className="text-ice-400 hover:text-ice-300 mt-4 inline-block">
          ← Back to leagues
        </Link>
      </div>
    );
  }

  const bestRound = rounds.length
    ? rounds.reduce((b, r) => r.scoreDifferential < b.scoreDifferential ? r : b)
    : null;

  const avgScore = rounds.length
    ? Math.round(rounds.reduce((a, r) => a + r.grossScore, 0) / rounds.length)
    : null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Back */}
      <Link
        to={`/leagues/${player.leagueId}`}
        className="inline-flex items-center gap-1.5 text-rink-400 hover:text-white text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={15} /> {league?.abbreviation ?? 'League'}
      </Link>

      {/* Player header */}
      <div className="flex flex-col sm:flex-row gap-6 items-start mb-8 p-6 rounded-2xl bg-rink-900/60 border border-rink-800">
        {/* Jersey */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-3xl border-2 shrink-0"
          style={{
            borderColor: league?.color ?? '#334155',
            color: league?.color ?? '#94a3b8',
            background: `${league?.color ?? '#334155'}20`,
          }}
        >
          {player.number}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-black text-white">{player.name}</h1>
            <span className="text-2xl">{player.nationalityFlag}</span>
          </div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-rink-700 text-rink-200 text-xs font-bold">
              {player.position}
            </span>
            <span className="text-rink-300 text-sm">{player.teamName}</span>
            {league && (
              <>
                <span className="text-rink-600">·</span>
                <Link
                  to={`/leagues/${league.id}`}
                  className="text-ice-400 hover:text-ice-300 text-sm transition-colors"
                >
                  {league.abbreviation}
                </Link>
              </>
            )}
          </div>
          <p className="text-rink-500 text-sm mt-1">
            {player.nationality} · Born {player.birthYear}
          </p>
          {player.eliteProspectsId && (
            <a
              href={`https://www.eliteprospects.com/player/${player.eliteProspectsId}/${player.firstName.toLowerCase()}-${player.lastName.toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-rink-500 hover:text-ice-400 transition-colors mt-2"
            >
              View on Elite Prospects <ExternalLink size={10} />
            </a>
          )}
        </div>

        {/* Handicap */}
        <div className="shrink-0 text-center">
          <HandicapBadge data={handicap} size="lg" />
        </div>
      </div>

      {/* Golf stats summary */}
      {rounds.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            {
              label: 'Rounds',
              value: rounds.length.toString(),
              sub: 'total',
            },
            {
              label: 'Best Diff',
              value: bestRound ? bestRound.scoreDifferential.toFixed(1) : '—',
              sub: bestRound?.courseName.split(' ').slice(0, 2).join(' ') ?? '',
            },
            {
              label: 'Avg Score',
              value: avgScore?.toString() ?? '—',
              sub: 'gross',
            },
          ].map(stat => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-rink-800/60 border border-rink-700 text-center"
            >
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-rink-400 mt-0.5">{stat.label}</p>
              <p className="text-xs text-rink-600 truncate">{stat.sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* Rounds section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-white">
          Round History{' '}
          <span className="text-rink-500 font-normal text-sm">({rounds.length})</span>
        </h2>
        <Link
          to={`/player/${player.id}/add-round`}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-ice-500 hover:bg-ice-400 text-white font-bold text-sm transition-colors"
        >
          <Plus size={14} /> Add Round
        </Link>
      </div>

      {rounds.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-rink-800 rounded-2xl">
          <p className="text-4xl mb-3">⛳</p>
          <p className="text-rink-400 mb-4">
            No rounds logged yet for {player.firstName}.
          </p>
          <Link
            to={`/player/${player.id}/add-round`}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-ice-500 hover:bg-ice-400 text-white font-bold text-sm transition-colors"
          >
            <Plus size={15} /> Log First Round
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {rounds.map(round => (
            <RoundCard key={round.id} round={round} onDelete={deleteRound} />
          ))}
        </div>
      )}

      {handicap.index === null && rounds.length > 0 && (
        <p className="mt-4 text-center text-rink-500 text-sm">
          {handicap.neededRounds} more round{handicap.neededRounds !== 1 ? 's' : ''} needed
          to establish a Handicap Index.
        </p>
      )}
    </div>
  );
}
