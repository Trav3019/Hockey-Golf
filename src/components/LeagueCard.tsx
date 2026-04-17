import { Link } from 'react-router-dom';
import { League } from '../types';
import { ChevronRight } from 'lucide-react';

interface Props {
  league: League;
  playerCount: number;
  avgHandicap: number | null;
}

export default function LeagueCard({ league, playerCount, avgHandicap }: Props) {
  return (
    <Link
      to={`/leagues/${league.id}`}
      className={`group relative flex flex-col p-5 rounded-xl border bg-gradient-to-br ${league.bgClass} hover:scale-[1.02] transition-all duration-200 hover:shadow-xl hover:shadow-black/30`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{league.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl text-white">{league.abbreviation}</span>
            </div>
            <p className="text-xs text-rink-400 mt-0.5">{league.country}</p>
          </div>
        </div>
        <ChevronRight
          size={18}
          className="text-rink-500 group-hover:text-white group-hover:translate-x-1 transition-all"
        />
      </div>

      <p className="text-sm text-rink-300 mb-4 line-clamp-2">{league.description}</p>

      <div className="mt-auto flex items-center justify-between text-sm">
        <span className="text-rink-400">
          <span className="font-bold text-white">{playerCount}</span> players
        </span>
        {avgHandicap !== null ? (
          <span className="text-rink-400">
            Avg{' '}
            <span className="font-bold text-ice-400">
              {avgHandicap.toFixed(1)}
            </span>{' '}
            HCP
          </span>
        ) : (
          <span className="text-rink-600 text-xs">No rounds yet</span>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px rounded-b-xl opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, currentColor, transparent)', color: league.color }} />
    </Link>
  );
}
