import { Link } from 'react-router-dom';
import { Player } from '../types';
import { HandicapData } from '../types';
import HandicapBadge from './HandicapBadge';
import { getLeague } from '../data/leagues';

interface Props {
  player: Player;
  handicap: HandicapData;
  rank?: number;
}

const POSITION_COLORS: Record<string, string> = {
  C: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  LW: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  RW: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  D: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  G: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
};

export default function PlayerCard({ player, handicap, rank }: Props) {
  const league = getLeague(player.leagueId);

  return (
    <Link
      to={`/player/${player.id}`}
      className="group flex items-center gap-4 p-4 rounded-xl bg-rink-800/60 border border-rink-700 hover:border-ice-500/50 hover:bg-rink-800 transition-all duration-150"
    >
      {/* Rank */}
      {rank !== undefined && (
        <div className="w-8 text-center font-black text-lg text-rink-500 group-hover:text-rink-300 transition-colors shrink-0">
          {rank}
        </div>
      )}

      {/* Jersey number circle */}
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center font-black text-base shrink-0 border-2"
        style={{ borderColor: league?.color ?? '#334155', color: league?.color ?? '#94a3b8', background: `${league?.color ?? '#334155'}20` }}
      >
        {player.number}
      </div>

      {/* Name & team */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-white group-hover:text-ice-300 transition-colors truncate">
            {player.name}
          </span>
          <span className="text-base">{player.nationalityFlag}</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded border text-xs font-bold ${POSITION_COLORS[player.position] ?? ''}`}
          >
            {player.position}
          </span>
          <span className="text-rink-400 text-sm truncate">{player.teamName}</span>
        </div>
      </div>

      {/* Handicap */}
      <div className="shrink-0 text-right">
        <HandicapBadge data={handicap} size="md" />
        <p className="text-xs text-rink-500 mt-0.5">
          {handicap.roundsCount} round{handicap.roundsCount !== 1 ? 's' : ''}
        </p>
      </div>
    </Link>
  );
}
