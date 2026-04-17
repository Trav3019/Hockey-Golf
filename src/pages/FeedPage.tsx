import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPlayers, getPlayer } from '../data/players';
import { getLeague } from '../data/leagues';
import { useRounds } from '../hooks/useRounds';
import { useSocial } from '../hooks/useSocial';
import { useAuth } from '../context/AuthContext';
import RoundPost from '../components/RoundPost';
import { GolfRound } from '../types';
import { Rss, Users, Star } from 'lucide-react';

type Filter = 'all' | 'following' | 'top';

export default function FeedPage() {
  const { rounds } = useRounds();
  const { currentUser, accounts } = useAuth();
  const social = useSocial(currentUser?.playerId);
  const { toggleLike, toggleFollow, isLiked, isFollowing, isMutualFollow, followCount, followingIds, addComment, deleteComment, getComments } = social;
  const [filter, setFilter] = useState<Filter>('all');

  // Enrich rounds with player info, sorted by date desc
  const enriched = useMemo(() => {
    return [...rounds]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(r => ({ round: r, player: getPlayer(r.playerId) }))
      .filter((x): x is { round: GolfRound; player: NonNullable<ReturnType<typeof getPlayer>> } =>
        x.player !== undefined
      );
  }, [rounds]);

  const filtered = useMemo(() => {
    if (filter === 'all') {
      return enriched.filter(({ player }) => followingIds.has(player.id));
    }
    if (filter === 'following') {
      return enriched.filter(({ player }) => followingIds.has(player.id));
    }
    if (filter === 'top') {
      return enriched.filter(({ round }) => round.scoreDifferential <= 10);
    }
    return enriched;
  }, [enriched, filter, followingIds]);

  const tabs: { key: Filter; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All Rounds', icon: <Rss size={14} /> },
    { key: 'following', label: 'Following', icon: <Users size={14} /> },
    { key: 'top', label: 'Top Rounds', icon: <Star size={14} /> },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white mb-1">Feed</h1>
        <p className="text-rink-400 text-sm">
          Latest rounds from {getAllPlayers().length.toLocaleString()} players · {rounds.length} rounds logged
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 p-1 rounded-xl bg-rink-900 border border-rink-800">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === tab.key
                ? 'bg-ice-500 text-white shadow'
                : 'text-rink-400 hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-20 text-center">
          {(filter === 'following' || filter === 'all') ? (
            <>
              <p className="text-4xl mb-3">👥</p>
              <p className="text-rink-300 font-semibold mb-1">No one followed yet</p>
              <p className="text-rink-500 text-sm mb-4">
                Follow players from league and profile pages to fill this feed.
              </p>
              <button
                onClick={() => setFilter('top')}
                className="px-4 py-2 rounded-lg bg-ice-500 hover:bg-ice-400 text-white text-sm font-bold transition-colors"
              >
                View top rounds
              </button>
            </>
          ) : (
            <>
              <p className="text-4xl mb-3">⛳</p>
              <p className="text-rink-400">No rounds here yet.</p>
              <Link
                to="/leagues"
                className="mt-3 inline-block text-ice-400 hover:text-ice-300 text-sm"
              >
                Browse players →
              </Link>
            </>
          )}
        </div>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {filtered.map(({ round, player }) => {
          const league = getLeague(player.leagueId);
          const authorAccount = accounts.find(a => a.playerId === player.id && a.status === 'approved');
          const mutual = currentUser
            ? isMutualFollow(currentUser.playerId, player.id)
            : false;
          return (
            <RoundPost
              key={round.id}
              round={round}
              player={player}
              league={league}
              liked={isLiked(round.id)}
              following={isFollowing(player.id)}
              followerCount={followCount(player.id)}
              mutualFollow={mutual}
              currentUser={currentUser}
              authorPhoto={authorAccount?.profilePhoto}
              comments={getComments(round.id)}
              onLike={toggleLike}
              onFollow={toggleFollow}
              onAddComment={addComment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </div>
  );
}
