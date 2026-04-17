import { GolfRound } from '../types';
import { Calendar, MapPin, Trash2, Image, X } from 'lucide-react';
import { handicapColor } from '../utils/handicap';
import { useState } from 'react';

interface Props {
  round: GolfRound;
  onDelete?: (id: string) => void;
}

export default function RoundCard({ round, onDelete }: Props) {
  const diffColor = handicapColor(round.scoreDifferential);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
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

        {/* Date + scorecard thumbnail */}
        <div className="shrink-0 text-right">
          <div className="flex items-center gap-1 text-rink-400 text-xs justify-end">
            <Calendar size={11} />
            <span>{new Date(round.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          {round.notes && (
            <p className="text-rink-500 text-xs mt-1 max-w-32 truncate">{round.notes}</p>
          )}
          {round.scorecardImage && (
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="mt-2 flex items-center gap-1 text-xs text-ice-400 hover:text-ice-300 transition-colors ml-auto"
            >
              <Image size={11} />
              <span>Scorecard</span>
            </button>
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

      {/* Lightbox */}
      {lightboxOpen && round.scorecardImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full rounded-xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={round.scorecardImage}
              alt="Scorecard verification"
              className="w-full object-contain max-h-[80vh] bg-rink-900"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-rink-900/80 text-rink-300 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <div className="absolute bottom-0 inset-x-0 bg-rink-900/70 px-4 py-2 text-xs text-rink-400">
              {round.courseName} · {new Date(round.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · Score {round.grossScore}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
