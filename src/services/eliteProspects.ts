/**
 * Elite Prospects API integration.
 *
 * When VITE_EP_API_KEY is set in .env, real player/league data is fetched from
 * the EP REST API (https://api.eliteprospects.com/v1).
 * Without the key the service returns undefined and the app falls back to the
 * built-in mock data in src/data/.
 */

import { Player, League } from '../types';

const EP_BASE = 'https://api.eliteprospects.com/v1';
const apiKey = import.meta.env.VITE_EP_API_KEY as string | undefined;

function url(path: string, params: Record<string, string> = {}): string {
  const q = new URLSearchParams({ ...params, apiKey: apiKey ?? '' });
  return `${EP_BASE}${path}?${q.toString()}`;
}

// EP league slug → our internal league ID
const EP_LEAGUE_SLUG_MAP: Record<string, string> = {
  nhl: 'nhl',
  ahl: 'ahl',
  khl: 'khl',
  shl: 'shl',
  liiga: 'liiga',
  ohl: 'ohl',
  whl: 'whl',
  qmjhl: 'qmjhl',
  del: 'del',
  'national-league': 'nla',
};

// Known EP league IDs
export const EP_LEAGUE_IDS: Record<string, number> = {
  nhl: 133,
  ahl: 153,
  khl: 213,
  shl: 57,
  liiga: 20,
  ohl: 68,
  whl: 69,
  qmjhl: 70,
  del: 26,
  nla: 16,
};

export async function fetchEPPlayers(leagueId: string): Promise<Partial<Player>[] | undefined> {
  if (!apiKey) return undefined;

  const epId = EP_LEAGUE_IDS[leagueId];
  if (!epId) return undefined;

  try {
    const res = await fetch(
      url('/players', {
        leagueId: String(epId),
        limit: '50',
        sort: 'lastName',
        fields: 'id,firstName,lastName,position,dateOfBirth,nationality,latestStats,imageUrl',
      })
    );
    if (!res.ok) return undefined;
    const json = await res.json() as { data: EPRawPlayer[] };

    return json.data.map(p => ({
      eliteProspectsId: p.id,
      firstName: p.firstName,
      lastName: p.lastName,
      name: `${p.firstName} ${p.lastName}`,
      position: mapPosition(p.position?.code),
      teamName: p.latestStats?.team?.name ?? 'Unknown Team',
      leagueId: EP_LEAGUE_SLUG_MAP[p.latestStats?.league?.slug ?? ''] ?? leagueId,
      nationality: p.nationality?.name ?? 'Unknown',
      nationalityFlag: flagForCountry(p.nationality?.iso2),
      birthYear: p.dateOfBirth ? new Date(p.dateOfBirth).getFullYear() : 0,
    }));
  } catch {
    return undefined;
  }
}

export async function fetchEPLeagues(): Promise<Partial<League>[] | undefined> {
  if (!apiKey) return undefined;

  try {
    const ids = Object.values(EP_LEAGUE_IDS).join(',');
    const res = await fetch(url('/leagues', { 'filter[id]': ids }));
    if (!res.ok) return undefined;
    const json = await res.json() as { data: EPRawLeague[] };
    return json.data.map(l => ({
      name: l.name,
      country: l.country?.name ?? '',
    }));
  } catch {
    return undefined;
  }
}

// ── Internal helpers ──────────────────────────────────────────────────────────

interface EPRawPlayer {
  id: number;
  firstName: string;
  lastName: string;
  position?: { code: string };
  dateOfBirth?: string;
  nationality?: { name: string; iso2: string };
  imageUrl?: string;
  latestStats?: {
    team?: { id: number; name: string };
    league?: { id: number; name: string; slug: string };
  };
}

interface EPRawLeague {
  id: number;
  name: string;
  slug: string;
  country?: { name: string; iso2: string };
}

function mapPosition(code?: string): Player['position'] {
  const map: Record<string, Player['position']> = {
    C: 'C', LW: 'LW', RW: 'RW', D: 'D', G: 'G',
    F: 'C', W: 'RW',
  };
  return map[code ?? ''] ?? 'C';
}

function flagForCountry(iso2?: string): string {
  if (!iso2) return '🏒';
  const flags: Record<string, string> = {
    CA: '🇨🇦', US: '🇺🇸', RU: '🇷🇺', SE: '🇸🇪', FI: '🇫🇮',
    CZ: '🇨🇿', SK: '🇸🇰', DE: '🇩🇪', CH: '🇨🇭', AT: '🇦🇹',
    BY: '🇧🇾', LV: '🇱🇻', DK: '🇩🇰', NO: '🇳🇴', FR: '🇫🇷',
  };
  return flags[iso2.toUpperCase()] ?? '🏒';
}
