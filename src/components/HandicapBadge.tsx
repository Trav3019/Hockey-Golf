import { HandicapData } from '../types';
import { fmtHandicap, handicapColor, handicapLabel } from '../utils/handicap';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface Props {
  data: HandicapData;
  size?: 'sm' | 'md' | 'lg';
}

export default function HandicapBadge({ data, size = 'md' }: Props) {
  const color = handicapColor(data.index);
  const label = handicapLabel(data.index);

  const TrendIcon =
    data.trend === 'improving' ? TrendingDown :
    data.trend === 'declining' ? TrendingUp :
    Minus;

  const trendColor =
    data.trend === 'improving' ? 'text-emerald-400' :
    data.trend === 'declining' ? 'text-red-400' :
    'text-rink-400';

  if (size === 'sm') {
    return (
      <span className={`font-bold tabular-nums ${color}`}>
        {fmtHandicap(data.index)}
      </span>
    );
  }

  if (size === 'lg') {
    return (
      <div className="flex flex-col items-center gap-1">
        <span className={`text-5xl font-black tabular-nums ${color}`}>
          {fmtHandicap(data.index)}
        </span>
        <span className="text-sm text-rink-400">{label}</span>
        {data.index !== null && data.roundsCount >= 6 && (
          <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
            <TrendIcon size={12} />
            {data.trend === 'improving' ? 'Improving' :
             data.trend === 'declining' ? 'Declining' : 'Stable'}
          </div>
        )}
        {data.index === null && (
          <span className="text-xs text-rink-500">
            {data.neededRounds} more round{data.neededRounds !== 1 ? 's' : ''} needed
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`text-2xl font-black tabular-nums ${color}`}>
        {fmtHandicap(data.index)}
      </span>
      {data.index !== null && data.roundsCount >= 6 && (
        <TrendIcon size={14} className={trendColor} />
      )}
    </div>
  );
}
