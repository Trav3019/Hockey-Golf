import { useState, useEffect, useCallback } from 'react';
import { GolfRound } from '../types';
import { mockRounds } from '../data/rounds';
import { calcDifferential } from '../utils/handicap';

const STORAGE_KEY = 'hockey-golf-rounds';

function loadRounds(): GolfRound[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as GolfRound[]) : mockRounds;
  } catch {
    return mockRounds;
  }
}

function saveRounds(rounds: GolfRound[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rounds));
  } catch {
    // storage full — ignore
  }
}

export function useRounds() {
  const [rounds, setRounds] = useState<GolfRound[]>(loadRounds);

  useEffect(() => {
    saveRounds(rounds);
  }, [rounds]);

  const addRound = useCallback(
    (input: Omit<GolfRound, 'id' | 'scoreDifferential'>) => {
      const diff = calcDifferential(input.grossScore, input.courseRating, input.slopeRating);
      const round: GolfRound = {
        ...input,
        id: `r-${input.playerId}-${Date.now()}`,
        scoreDifferential: diff,
      };
      setRounds(prev => [round, ...prev]);
      return round;
    },
    []
  );

  const deleteRound = useCallback((id: string) => {
    setRounds(prev => prev.filter(r => r.id !== id));
  }, []);

  const getPlayerRounds = useCallback(
    (playerId: string): GolfRound[] =>
      rounds
        .filter(r => r.playerId === playerId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [rounds]
  );

  const resetToMockData = useCallback(() => {
    setRounds(mockRounds);
  }, []);

  return { rounds, addRound, deleteRound, getPlayerRounds, resetToMockData };
}
