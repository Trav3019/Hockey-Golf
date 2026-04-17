import { useState, useCallback, useEffect } from 'react';
import { Comment } from '../types';

const LIKES_KEY     = 'hockey-golf-likes';
const FOLLOWS_KEY   = 'hockey-golf-follows-v2'; // keyed by playerId
const COMMENTS_KEY  = 'hockey-golf-comments';

// ── Persistence helpers ───────────────────────────────────────────────────────
function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch { return new Set(); }
}
function saveSet(key: string, set: Set<string>) {
  try { localStorage.setItem(key, JSON.stringify([...set])); } catch {}
}

// follows stored as Record<followerId, followingId[]>
function loadFollowMap(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(FOLLOWS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}
function saveFollowMap(m: Record<string, string[]>) {
  try { localStorage.setItem(FOLLOWS_KEY, JSON.stringify(m)); } catch {}
}

// comments stored as Record<roundId, Comment[]>
function loadComments(): Record<string, Comment[]> {
  try {
    const raw = localStorage.getItem(COMMENTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}
function saveComments(c: Record<string, Comment[]>) {
  try { localStorage.setItem(COMMENTS_KEY, JSON.stringify(c)); } catch {}
}

export function useSocial(currentPlayerId?: string) {
  const [likes, setLikes] = useState<Set<string>>(() => loadSet(LIKES_KEY));
  // followMap[A] = [B, C, ...] means player A follows B, C, …
  const [followMap, setFollowMap] = useState<Record<string, string[]>>(loadFollowMap);
  const [comments, setComments] = useState<Record<string, Comment[]>>(loadComments);

  useEffect(() => { saveSet(LIKES_KEY, likes); }, [likes]);
  useEffect(() => { saveFollowMap(followMap); }, [followMap]);
  useEffect(() => { saveComments(comments); }, [comments]);

  // ── Likes ──────────────────────────────────────────────────────────────────
  const toggleLike = useCallback((roundId: string) => {
    setLikes(prev => {
      const next = new Set(prev);
      next.has(roundId) ? next.delete(roundId) : next.add(roundId);
      return next;
    });
  }, []);
  const isLiked = useCallback((roundId: string) => likes.has(roundId), [likes]);

  // ── Follows ────────────────────────────────────────────────────────────────
  // Toggle follow: currentPlayerId follows/unfollows targetId
  const toggleFollow = useCallback((targetId: string) => {
    if (!currentPlayerId) return;
    setFollowMap(prev => {
      const list = prev[currentPlayerId] ?? [];
      const next = list.includes(targetId)
        ? list.filter(id => id !== targetId)
        : [...list, targetId];
      return { ...prev, [currentPlayerId]: next };
    });
  }, [currentPlayerId]);

  const isFollowing = useCallback((targetId: string): boolean => {
    if (!currentPlayerId) return false;
    return (followMap[currentPlayerId] ?? []).includes(targetId);
  }, [currentPlayerId, followMap]);

  // True if A follows B AND B follows A
  const isMutualFollow = useCallback((playerA: string, playerB: string): boolean => {
    return (followMap[playerA] ?? []).includes(playerB) &&
           (followMap[playerB] ?? []).includes(playerA);
  }, [followMap]);

  const followCount = useCallback((playerId: string): number => {
    // Real followers = everyone in followMap who includes playerId
    const real = Object.values(followMap).filter(list => list.includes(playerId)).length;
    // Simulated base count
    let hash = 0;
    for (let i = 0; i < playerId.length; i++) hash = (hash * 31 + playerId.charCodeAt(i)) & 0xffff;
    const base = 800 + (hash % 9200);
    return base + real;
  }, [followMap]);

  // IDs that the current player follows
  const followingIds = new Set<string>(currentPlayerId ? (followMap[currentPlayerId] ?? []) : []);

  // ── Comments ───────────────────────────────────────────────────────────────
  const addComment = useCallback((roundId: string, text: string) => {
    if (!currentPlayerId || !text.trim()) return;
    const comment: Comment = {
      id: `c-${Date.now()}`,
      roundId,
      authorPlayerId: currentPlayerId,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    setComments(prev => ({
      ...prev,
      [roundId]: [...(prev[roundId] ?? []), comment],
    }));
  }, [currentPlayerId]);

  const deleteComment = useCallback((roundId: string, commentId: string) => {
    setComments(prev => ({
      ...prev,
      [roundId]: (prev[roundId] ?? []).filter(c => c.id !== commentId),
    }));
  }, []);

  const getComments = useCallback((roundId: string): Comment[] => {
    return comments[roundId] ?? [];
  }, [comments]);

  return {
    toggleLike, isLiked,
    toggleFollow, isFollowing, isMutualFollow, followCount, followingIds,
    addComment, deleteComment, getComments,
  };
}
