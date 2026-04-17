import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GolfRound, Player, League, Comment, UserAccount } from '../types';
import { Heart, MapPin, Star, Image, X, UserPlus, UserCheck, MessageCircle, Lock, Send, Trash2 } from 'lucide-react';
import { handicapColor } from '../utils/handicap';
import { getPlayer } from '../data/players';

interface Props {
  round: GolfRound;
  player: Player;
  league?: League;
  liked: boolean;
  following: boolean;
  followerCount: number;
  /** True when the post author also follows back the current user */
  mutualFollow: boolean;
  /** The logged-in account, if any */
  currentUser: UserAccount | null;
  /** Profile photo of the post author (if they have an account) */
  authorPhoto?: string;
  comments: Comment[];
  onLike: (id: string) => void;
  onFollow: (playerId: string) => void;
  onAddComment: (roundId: string, text: string) => void;
  onDeleteComment: (roundId: string, commentId: string) => void;
}

export default function RoundPost({
  round, player, league,
  liked, following, followerCount, mutualFollow,
  currentUser, authorPhoto,
  comments,
  onLike, onFollow, onAddComment, onDeleteComment,
}: Props) {
  const [lightbox, setLightbox] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const diffColor = handicapColor(round.scoreDifferential);

  const isOwnPost = currentUser?.playerId === player.id;
  const canComment = isOwnPost || mutualFollow;

  const relativeTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr + 'T12:00:00').getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
  };

  const relativeComment = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const baseLikes = (() => {
    let h = 0;
    for (let i = 0; i < round.id.length; i++) h = (h * 31 + round.id.charCodeAt(i)) & 0xffff;
    return h % 48;
  })();
  const displayLikes = liked ? baseLikes + 1 : baseLikes;

  function submitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(round.id, commentText);
    setCommentText('');
  }

  return (
    <>
      <article className="rounded-2xl bg-rink-900/70 border border-rink-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <Link to={`/player/${player.id}`} className="flex items-center gap-3 group min-w-0">
            {authorPhoto ? (
              <img
                src={authorPhoto}
                alt={player.name}
                className="w-10 h-10 rounded-full object-cover border-2 shrink-0"
                style={{ borderColor: league?.color ?? '#334155' }}
              />
            ) : (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 shrink-0"
                style={{
                  borderColor: league?.color ?? '#334155',
                  color: league?.color ?? '#94a3b8',
                  background: `${league?.color ?? '#334155'}22`,
                }}
              >
                {player.number}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-bold text-white text-sm group-hover:text-ice-300 transition-colors truncate">
                {player.name} {player.nationalityFlag}
              </p>
              <p className="text-xs text-rink-500 truncate">
                {player.teamName}
                {league && <span className="text-rink-600"> · {league.abbreviation}</span>}
                <span className="text-rink-700"> · {followerCount.toLocaleString()} followers</span>
              </p>
            </div>
          </Link>

          {!isOwnPost && (
            <button
              onClick={() => onFollow(player.id)}
              className={`shrink-0 ml-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                following
                  ? 'bg-rink-700 text-rink-300 hover:bg-red-900/40 hover:text-red-400'
                  : 'bg-ice-500 hover:bg-ice-400 text-white'
              }`}
            >
              {following ? <UserCheck size={12} /> : <UserPlus size={12} />}
              {following ? 'Following' : 'Follow'}
            </button>
          )}
        </div>

        {/* Score banner */}
        <div className="mx-4 mb-3 rounded-xl bg-rink-800/80 border border-rink-700 px-4 py-3 flex items-center gap-4">
          <div className="text-center shrink-0">
            <p className="text-4xl font-black text-white tabular-nums leading-none">{round.grossScore}</p>
            <p className="text-xs text-rink-500 mt-0.5">gross</p>
          </div>
          <div className="w-px h-10 bg-rink-700 shrink-0" />
          <div className="text-center shrink-0">
            <p className={`text-2xl font-black tabular-nums leading-none ${diffColor}`}>
              {round.scoreDifferential.toFixed(1)}
            </p>
            <p className="text-xs text-rink-500 mt-0.5">differential</p>
          </div>
          <div className="w-px h-10 bg-rink-700 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-rink-300 text-sm font-semibold truncate">
              <MapPin size={12} className="shrink-0 text-rink-500" />
              <span className="truncate">{round.courseName}</span>
            </div>
            <p className="text-xs text-rink-500 mt-0.5">
              Rating {round.courseRating} · Slope {round.slopeRating}
            </p>
            <p className="text-xs text-rink-600 mt-0.5">{relativeTime(round.date)}</p>
          </div>
        </div>

        {round.notes && (
          <p className="px-4 pb-3 text-sm text-rink-300 italic">"{round.notes}"</p>
        )}

        {round.scorecardImage && (
          <button type="button" onClick={() => setLightbox(true)} className="w-full px-4 pb-3 group">
            <div className="relative rounded-xl overflow-hidden border border-rink-700">
              <img src={round.scorecardImage} alt="Scorecard" className="w-full max-h-48 object-cover bg-rink-900" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Image size={12} /> View scorecard
                </div>
              </div>
            </div>
          </button>
        )}

        {/* Actions bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-rink-800">
          <button
            onClick={() => onLike(round.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
              liked ? 'text-red-400 bg-red-500/10' : 'text-rink-400 hover:text-red-400 hover:bg-red-500/10'
            }`}
          >
            <Heart size={15} className={liked ? 'fill-red-400' : ''} />
            {displayLikes > 0 && <span>{displayLikes}</span>}
          </button>

          <button
            onClick={() => {
              setShowComments(v => !v);
              setTimeout(() => inputRef.current?.focus(), 60);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
              showComments
                ? 'text-ice-400 bg-ice-500/10'
                : 'text-rink-400 hover:text-ice-400 hover:bg-ice-500/10'
            }`}
          >
            <MessageCircle size={15} />
            {comments.length > 0 && <span>{comments.length}</span>}
            {!canComment && <Lock size={11} className="ml-0.5 text-rink-600" />}
          </button>

          {round.scoreDifferential <= 5 && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold">
              <Star size={11} className="fill-yellow-400" /> Scratch
            </span>
          )}
          {round.scoreDifferential > 5 && round.scoreDifferential <= 12 && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-ice-500/10 text-ice-400 text-xs font-bold">
              <Star size={11} /> Solid
            </span>
          )}

          <span className="ml-auto text-xs text-rink-600">
            {new Date(round.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="border-t border-rink-800 bg-rink-950/40">
            {canComment ? (
              <>
                {comments.length > 0 && (
                  <div className="px-4 pt-3 space-y-3">
                    {comments.map(c => {
                      const author = getPlayer(c.authorPlayerId);
                      const isOwn = c.authorPlayerId === currentUser?.playerId;
                      return (
                        <div key={c.id} className="flex items-start gap-2.5 group/comment">
                          <div className="w-7 h-7 rounded-full bg-rink-800 border border-rink-700 flex items-center justify-center text-xs font-black shrink-0 text-rink-300">
                            {author?.number ?? '?'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2">
                              <Link
                                to={`/player/${c.authorPlayerId}`}
                                className="text-xs font-bold text-rink-200 hover:text-ice-300 transition-colors"
                              >
                                {author?.firstName ?? 'Player'}
                              </Link>
                              <span className="text-xs text-rink-600">{relativeComment(c.createdAt)}</span>
                            </div>
                            <p className="text-sm text-rink-300 mt-0.5 break-words">{c.text}</p>
                          </div>
                          {isOwn && (
                            <button
                              onClick={() => onDeleteComment(round.id, c.id)}
                              className="shrink-0 p-1 rounded text-rink-700 hover:text-red-400 opacity-0 group-hover/comment:opacity-100 transition-all"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {mutualFollow && !isOwnPost && (
                  <p className="px-4 pt-2 flex items-center gap-1 text-xs text-rink-600">
                    <Lock size={10} /> Private · mutual followers only
                  </p>
                )}

                {currentUser ? (
                  <form onSubmit={submitComment} className="flex items-center gap-2 px-4 py-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      placeholder="Add a comment…"
                      maxLength={300}
                      className="flex-1 px-3 py-2 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-600 text-sm focus:outline-none focus:border-ice-500"
                    />
                    <button
                      type="submit"
                      disabled={!commentText.trim()}
                      className="p-2 rounded-lg bg-ice-500 hover:bg-ice-400 disabled:bg-rink-700 disabled:text-rink-500 text-white transition-colors"
                    >
                      <Send size={14} />
                    </button>
                  </form>
                ) : (
                  <p className="px-4 py-3 text-xs text-rink-500">
                    <Link to="/login" className="text-ice-400 hover:text-ice-300">Sign in</Link> to comment.
                  </p>
                )}
              </>
            ) : (
              <div className="px-4 py-5 flex flex-col items-center gap-2 text-center">
                <Lock size={18} className="text-rink-600" />
                <p className="text-sm font-semibold text-rink-400">Private comments</p>
                <p className="text-xs text-rink-600 max-w-xs">
                  Comments are only visible to players who mutually follow each other.
                  {currentUser && following && !isOwnPost && (
                    <> {player.firstName} needs to follow you back to unlock.</>
                  )}
                  {currentUser && !following && !isOwnPost && (
                    <> Follow {player.firstName} — if they follow back, comments will unlock.</>
                  )}
                  {!currentUser && (
                    <> <Link to="/login" className="text-ice-400 hover:text-ice-300">Sign in</Link> to get started.</>
                  )}
                </p>
              </div>
            )}
          </div>
        )}
      </article>

      {/* Lightbox */}
      {lightbox && round.scorecardImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightbox(false)}
        >
          <div
            className="relative max-w-3xl w-full rounded-xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img src={round.scorecardImage} alt="Scorecard verification" className="w-full object-contain max-h-[80vh] bg-rink-900" />
            <button
              onClick={() => setLightbox(false)}
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
