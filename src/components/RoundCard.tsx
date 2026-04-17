import { GolfRound } from '../types';
import { Calendar, MapPin, Trash2 } from 'lucide-react';
import { handicapColor } from '../utils/handicap';

interface Props {
  round: GolfRound;
  onDelete?: (id: string) => void;
}

export default function RoundCard({ round, onDelete }: Props) {
  const diffColor = handicapColor(round.scoreDifferential);

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-rink-800/60 border border-rink-700 group">
      {/* Differential */}
      <div className="shrink-0 w-14 text-center">
        <span className={`text-xl font-black tabular-nums ${diffColor}`}>
          {round.scoreDifferential.toFixed(1)}
        </span>
        <p className="text-xs text-rink-500">diff</p>
      </div>

      {/* Score & course */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black text-white">{round.grossScore}</span>
          <span className="text-rink-400 text-sm">gross</span>
        </div>
        <div className="flex items-center gap-1 mt-1 text-rink-400 text-xs">
          <MapPin size={11} className="shrink-0" />
          <span className="truncate">{round.courseName}</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5 text-rink-500 text-xs">
          <span>Rating {round.courseRating} / Slope {round.slopeRating}</span>
        </div>
      </div>

      {/* Date */}
      <div className="shrink-0 text-right">
        <div className="flex items-center gap-1 text-rink-400 text-xs justify-end">
          <Calendar size={11} />
          <span>{new Date(round.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        {round.notes && (
          <p className="text-rink-500 text-xs mt-1 max-w-32 truncate">{round.notes}</p>
        )}
      </div>

      {/* Delete */}
      {onDelete && (
        <button
          onClick={() => onDelete(round.id)}
          className="shrink-0 p-1 rounded text-rink-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
          aria-label="Delete round"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
