/**
 * Custom player store — players who self-registered and aren't in the static list.
 * Persisted to localStorage.
 */
import { Player } from '../types';

const KEY = 'hockey-golf-custom-players';

export function getCustomPlayers(): Player[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Player[]) : [];
  } catch { return []; }
}

export function addCustomPlayer(data: Omit<Player, 'id'>): Player {
  const existing = getCustomPlayers();
  const player: Player = { ...data, id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
  try { localStorage.setItem(KEY, JSON.stringify([...existing, player])); } catch {}
  return player;
}

export function removeCustomPlayer(id: string): void {
  const existing = getCustomPlayers();
  try { localStorage.setItem(KEY, JSON.stringify(existing.filter(p => p.id !== id))); } catch {}
}
