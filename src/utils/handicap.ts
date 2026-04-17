import { GolfRound, HandicapData } from '../types';

export function calcDifferential(gross: number, rating: number, slope: number): number {
  return Math.round(((gross - rating) * 113) / slope * 10) / 10;
}

// World Handicap System lookup table: best N of most recent 20 rounds × 0.96
function bestCountForRounds(n: number): number {
  if (n <= 5) return 1;   // 3-5 rounds
  if (n <= 8) return 2;   // 6-8 rounds
  if (n <= 11) return 3;  // 9-11 rounds
  if (n <= 14) return 4;  // 12-14 rounds
  if (n <= 17) return 5;  // 15-17 rounds
  if (n === 18) return 6;
  if (n === 19) return 7;
  return 8;               // 20 rounds
}

export function calcHandicap(rounds: GolfRound[]): HandicapData {
  const neededRounds = 3;

  if (rounds.length < neededRounds) {
    return {
      index: null,
      trend: 'stable',
      roundsCount: rounds.length,
      bestDifferential: rounds.length > 0
        ? Math.min(...rounds.map(r => r.scoreDifferential))
        : null,
      lastUpdated: null,
      neededRounds: neededRounds - rounds.length,
    };
  }

  const sorted = [...rounds].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const recent = sorted.slice(0, 20);
  const diffs = recent.map(r => r.scoreDifferential);
  const sortedDiffs = [...diffs].sort((a, b) => a - b);
  const count = bestCountForRounds(recent.length);
  const best = sortedDiffs.slice(0, count);
  const avg = best.reduce((a, b) => a + b, 0) / best.length;
  const index = Math.round(avg * 0.96 * 10) / 10;

  let trend: HandicapData['trend'] = 'stable';
  if (rounds.length >= 6) {
    const last3Avg =
      sorted.slice(0, 3).reduce((a, r) => a + r.scoreDifferential, 0) / 3;
    const prev3Avg =
      sorted.slice(3, 6).reduce((a, r) => a + r.scoreDifferential, 0) / 3;
    if (last3Avg < prev3Avg - 0.8) trend = 'improving';
    else if (last3Avg > prev3Avg + 0.8) trend = 'declining';
  }

  return {
    index,
    trend,
    roundsCount: rounds.length,
    bestDifferential: sortedDiffs[0],
    lastUpdated: sorted[0]?.date ?? null,
    neededRounds: 0,
  };
}

export function fmtHandicap(index: number | null): string {
  if (index === null) return 'N/A';
  if (index <= 0) return index === 0 ? 'SCR' : `+${Math.abs(index).toFixed(1)}`;
  return index.toFixed(1);
}

export function handicapColor(index: number | null): string {
  if (index === null) return 'text-rink-400';
  if (index <= 0) return 'text-amber-400';
  if (index <= 5) return 'text-emerald-400';
  if (index <= 10) return 'text-sky-400';
  if (index <= 18) return 'text-yellow-400';
  if (index <= 28) return 'text-orange-400';
  return 'text-red-400';
}

export function handicapLabel(index: number | null): string {
  if (index === null) return 'No rounds yet';
  if (index <= 0) return 'Scratch / Plus';
  if (index <= 5) return 'Low Handicap';
  if (index <= 10) return 'Mid-Low';
  if (index <= 18) return 'Mid Handicap';
  if (index <= 28) return 'High Handicap';
  return 'Beginner';
}
