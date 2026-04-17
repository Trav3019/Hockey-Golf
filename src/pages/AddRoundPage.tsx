import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPlayer } from '../data/players';
import { getLeague } from '../data/leagues';
import { useRounds } from '../hooks/useRounds';
import { useAuth } from '../context/AuthContext';
import { calcDifferential } from '../utils/handicap';
import { ArrowLeft, Info, Camera, X, Lock } from 'lucide-react';

const POPULAR_COURSES = [
  // Iconic / Bucket-list
  { name: 'Augusta National Golf Club', rating: 76.2, slope: 137 },
  { name: 'Pebble Beach Golf Links', rating: 75.5, slope: 145 },
  { name: 'TPC Sawgrass (Stadium)', rating: 76.0, slope: 144 },
  { name: 'Pinehurst No. 2', rating: 75.3, slope: 135 },
  { name: 'Bethpage Black', rating: 76.6, slope: 148 },
  { name: 'Whistling Straits (Straits)', rating: 76.9, slope: 148 },
  { name: 'Bandon Dunes', rating: 74.8, slope: 142 },
  { name: 'Bandon Trails', rating: 74.7, slope: 144 },
  { name: 'Pacific Dunes', rating: 73.8, slope: 138 },
  { name: 'Old Macdonald', rating: 73.4, slope: 132 },
  { name: 'Sheep Ranch', rating: 74.5, slope: 140 },
  { name: 'Spyglass Hill Golf Course', rating: 75.0, slope: 148 },
  { name: 'Cypress Point Club', rating: 75.4, slope: 144 },
  { name: 'Shadow Creek Golf Club', rating: 74.2, slope: 139 },
  { name: 'Oakmont Country Club', rating: 77.6, slope: 155 },
  { name: 'Shinnecock Hills Golf Club', rating: 76.5, slope: 145 },
  { name: 'The Country Club (Brookline)', rating: 74.0, slope: 142 },
  { name: 'Winged Foot Golf Club (West)', rating: 75.8, slope: 144 },
  { name: 'Merion Golf Club (East)', rating: 74.8, slope: 144 },
  { name: 'Riviera Country Club', rating: 75.6, slope: 143 },
  { name: 'Torrey Pines Golf Course (South)', rating: 75.1, slope: 145 },
  { name: 'Kiawah Island (Ocean)', rating: 77.3, slope: 152 },
  { name: 'TPC Scottsdale (Stadium)', rating: 73.7, slope: 130 },
  { name: 'Cabot Cliffs', rating: 76.1, slope: 149 },
  { name: 'Cabot Links', rating: 73.5, slope: 136 },
  { name: 'St. Andrews (Old Course)', rating: 73.1, slope: 132 },
  { name: 'Royal Birkdale', rating: 74.8, slope: 140 },
  { name: 'Royal County Down', rating: 75.9, slope: 147 },
  { name: 'Royal Portrush (Dunluce)', rating: 76.3, slope: 143 },
  { name: 'Carnoustie Golf Links', rating: 76.3, slope: 147 },
  { name: 'Muirfield', rating: 73.9, slope: 132 },
  // Canada
  { name: 'Capilano Golf & Country Club', rating: 72.3, slope: 133 },
  { name: 'Shaughnessy Golf & Country Club', rating: 73.5, slope: 136 },
  { name: 'Marine Drive Golf Club', rating: 70.8, slope: 126 },
  { name: 'University Golf Club (Vancouver)', rating: 70.3, slope: 121 },
  { name: 'Northview Golf & Country Club (Ridge)', rating: 72.5, slope: 130 },
  { name: 'Northview Golf & Country Club (Canal)', rating: 71.0, slope: 124 },
  { name: "Gallagher's Canyon Golf Club", rating: 71.8, slope: 128 },
  { name: 'Predator Ridge Golf Resort', rating: 72.1, slope: 132 },
  { name: 'Tobiano Golf Course', rating: 73.2, slope: 137 },
  { name: 'Big Sky Golf Club', rating: 70.5, slope: 125 },
  { name: 'Furry Creek Golf & Country Club', rating: 71.2, slope: 130 },
  { name: "St. George's Golf & Country Club", rating: 73.8, slope: 137 },
  { name: 'Glen Abbey Golf Club', rating: 74.0, slope: 138 },
  { name: 'Angus Glen Golf Club (North)', rating: 73.2, slope: 132 },
  { name: 'Angus Glen Golf Club (South)', rating: 74.1, slope: 138 },
  { name: 'Lionhead Golf Club (Legends)', rating: 72.8, slope: 130 },
  { name: 'Royal Woodbine Golf Club', rating: 71.9, slope: 128 },
  { name: 'Whistle Bear Golf Club', rating: 73.0, slope: 134 },
  { name: 'Hamilton Golf & Country Club', rating: 73.4, slope: 136 },
  { name: 'Beacon Hall Golf Club', rating: 73.9, slope: 140 },
  { name: 'Royal Montreal Golf Club', rating: 73.2, slope: 131 },
  { name: 'Le Maitre Golf Club', rating: 72.3, slope: 131 },
  { name: 'Kanata Golf & Country Club', rating: 71.4, slope: 126 },
  { name: 'Wolf Creek Golf Resort', rating: 73.5, slope: 139 },
  { name: 'Bearspaw Country Club', rating: 72.8, slope: 131 },
  { name: 'Heritage Pointe Golf Club', rating: 73.1, slope: 135 },
  { name: 'Priddis Greens Golf & Country Club', rating: 72.6, slope: 132 },
  { name: 'Lynx Ridge Golf Club', rating: 71.8, slope: 128 },
  { name: 'Dakota Dunes Golf Links', rating: 72.2, slope: 130 },
  { name: 'Wascana Country Club', rating: 71.5, slope: 127 },
  { name: 'Elmhurst Golf & Country Club', rating: 71.8, slope: 128 },
  { name: 'Niakwa Country Club', rating: 70.9, slope: 123 },
  { name: 'Cabot Prince Edward Island', rating: 74.2, slope: 140 },
  { name: "Fox Harb'r Resort", rating: 73.0, slope: 135 },
  { name: 'Highlands Links Golf Course', rating: 73.8, slope: 139 },
  // USA Popular / Resort
  { name: 'Erin Hills Golf Course', rating: 76.0, slope: 147 },
  { name: 'Hazeltine National Golf Club', rating: 75.5, slope: 143 },
  { name: 'Valhalla Golf Club', rating: 75.3, slope: 140 },
  { name: 'Medinah Country Club (No. 3)', rating: 75.8, slope: 144 },
  { name: 'Southern Hills Country Club', rating: 74.8, slope: 140 },
  { name: 'Muirfield Village Golf Club', rating: 75.4, slope: 144 },
  { name: 'Quail Hollow Club', rating: 75.2, slope: 142 },
  { name: 'Baltusrol Golf Club (Lower)', rating: 75.5, slope: 145 },
  { name: 'Firestone Country Club (South)', rating: 74.8, slope: 141 },
  { name: 'Harbour Town Golf Links', rating: 73.8, slope: 137 },
  { name: 'Bay Hill Club & Lodge', rating: 74.5, slope: 140 },
  { name: 'Chambers Bay Golf Course', rating: 75.8, slope: 145 },
  { name: 'Sand Valley Golf Resort', rating: 74.2, slope: 141 },
  { name: 'Mammoth Dunes', rating: 73.5, slope: 136 },
  { name: 'Streamsong Resort (Red)', rating: 72.8, slope: 133 },
  { name: 'Streamsong Resort (Blue)', rating: 73.4, slope: 137 },
  { name: 'Streamsong Resort (Black)', rating: 75.1, slope: 143 },
  { name: 'Gamble Sands', rating: 72.5, slope: 128 },
  { name: 'Wine Valley Golf Club', rating: 73.2, slope: 135 },
  { name: "Coeur d'Alene Resort Golf Course", rating: 71.8, slope: 129 },
  { name: 'Circling Raven Golf Club', rating: 73.5, slope: 139 },
  { name: 'East Lake Golf Club', rating: 74.0, slope: 133 },
  { name: 'Riviera Country Club', rating: 75.6, slope: 143 },
  { name: 'Los Angeles Country Club (North)', rating: 75.3, slope: 141 },
  { name: 'Sedgefield Country Club', rating: 71.8, slope: 125 },
  { name: 'Waialae Country Club', rating: 72.5, slope: 131 },
  { name: 'Kapalua Resort (Plantation)', rating: 73.0, slope: 135 },
  { name: 'Sea Island Golf Club (Seaside)', rating: 71.5, slope: 126 },
  { name: 'Colonial Country Club', rating: 71.0, slope: 127 },
  // Public / Accessible
  { name: 'Eagle Ridge Golf Club', rating: 72.3, slope: 131 },
  { name: 'Riverside Golf Course', rating: 70.2, slope: 119 },
  { name: 'The Pines Golf Club', rating: 71.8, slope: 125 },
  { name: 'Willow Creek Golf Course', rating: 69.8, slope: 113 },
  { name: 'Maple Ridge Golf Course', rating: 70.5, slope: 120 },
  { name: 'Sunset Ranch Golf & Country Club', rating: 71.0, slope: 124 },
  { name: 'Meadow Gardens Golf Course', rating: 70.8, slope: 122 },
  { name: 'Swan-E-Set Bay Resort', rating: 72.0, slope: 131 },
  { name: 'Morgan Creek Golf Course', rating: 71.5, slope: 126 },
  { name: 'Sandpiper Golf Course', rating: 72.8, slope: 134 },
  { name: 'Crown Isle Resort', rating: 71.2, slope: 127 },
  { name: 'Olympic View Golf Club', rating: 70.9, slope: 123 },
  { name: 'Bear Mountain Golf Resort (Mountain)', rating: 72.5, slope: 135 },
  { name: 'Bear Mountain Golf Resort (Valley)', rating: 70.8, slope: 124 },
];

export default function AddRoundPage() {
  const { playerId } = useParams<{ playerId: string }>();
  const player = getPlayer(playerId ?? '');
  const league = getLeague(player?.leagueId ?? '');
  const navigate = useNavigate();
  const { addRound } = useRounds();
  const { currentUser } = useAuth();

  // Access guard — must be logged in as this player
  const canAdd = currentUser?.playerId === playerId;

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <Lock size={32} className="text-rink-500 mx-auto mb-3" />
        <p className="text-white font-bold mb-1">Sign in required</p>
        <p className="text-rink-400 text-sm mb-4">You need to be signed in to log a round.</p>
        <Link to="/login" className="px-5 py-2 rounded-lg bg-ice-500 hover:bg-ice-400 text-white font-bold text-sm transition-colors">
          Sign In
        </Link>
      </div>
    );
  }

  if (!canAdd) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <Lock size={32} className="text-rink-500 mx-auto mb-3" />
        <p className="text-white font-bold mb-1">Not your profile</p>
        <p className="text-rink-400 text-sm mb-4">You can only add rounds to your own profile.</p>
        <Link
          to={`/player/${currentUser.playerId}`}
          className="px-5 py-2 rounded-lg bg-ice-500 hover:bg-ice-400 text-white font-bold text-sm transition-colors"
        >
          Go to My Profile
        </Link>
      </div>
    );
  }

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    courseName: '',
    courseRating: '',
    slopeRating: '113',
    grossScore: '',
    notes: '',
  });
  const [scorecardImage, setScorecardImage] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredCourses = useMemo(() => {
    const q = form.courseName.toLowerCase().trim();
    if (!q) return POPULAR_COURSES.slice(0, 8);
    return POPULAR_COURSES.filter(c =>
      c.name.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [form.courseName]);

  const preview = useMemo(() => {
    const gross = Number(form.grossScore);
    const rating = Number(form.courseRating);
    const slope = Number(form.slopeRating);
    if (gross > 0 && rating > 0 && slope > 0) {
      return calcDifferential(gross, rating, slope);
    }
    return null;
  }, [form.grossScore, form.courseRating, form.slopeRating]);

  function selectCourse(course: (typeof POPULAR_COURSES)[number]) {
    setForm(f => ({
      ...f,
      courseName: course.name,
      courseRating: String(course.rating),
      slopeRating: String(course.slope),
    }));
    setShowSuggestions(false);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Limit to 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5 MB.');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => setScorecardImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!playerId) return;
    addRound({
      playerId,
      date: form.date,
      courseName: form.courseName,
      courseRating: Number(form.courseRating),
      slopeRating: Number(form.slopeRating),
      grossScore: Number(form.grossScore),
      notes: form.notes || undefined,
      scorecardImage: scorecardImage ?? undefined,
    });
    navigate(`/player/${playerId}`);
  }

  if (!player) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-rink-400">Player not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to={`/player/${player.id}`}
        className="inline-flex items-center gap-1.5 text-rink-400 hover:text-white text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={15} /> {player.name}
      </Link>

      <h1 className="text-2xl font-black text-white mb-1">Log a Golf Round</h1>
      <p className="text-rink-400 text-sm mb-8">
        Adding a round for{' '}
        <span className="text-white font-semibold">{player.name}</span>{' '}
        {player.nationalityFlag} — {player.teamName}
        {league && (
          <span className="text-rink-500"> · {league.abbreviation}</span>
        )}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-rink-200 mb-1.5">
            Date Played
          </label>
          <input
            type="date"
            required
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white text-sm focus:outline-none focus:border-ice-500"
          />
        </div>

        {/* Course name */}
        <div className="relative">
          <label className="block text-sm font-semibold text-rink-200 mb-1.5">
            Course Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Pebble Beach Golf Links"
            value={form.courseName}
            onChange={e => {
              setForm(f => ({ ...f, courseName: e.target.value }));
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full px-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500"
          />
          {showSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-rink-800 border border-rink-700 rounded-lg shadow-xl overflow-hidden max-h-72 overflow-y-auto">
              {filteredCourses.length > 0 ? (
                <>
                  {!form.courseName && (
                    <p className="px-4 py-2 text-xs text-rink-500 border-b border-rink-700">Popular courses — start typing to search</p>
                  )}
                  {filteredCourses.map(c => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => selectCourse(c)}
                      className="w-full px-4 py-2.5 text-left hover:bg-rink-700 transition-colors border-b border-rink-800 last:border-0"
                    >
                      <p className="text-sm text-white">{c.name}</p>
                      <p className="text-xs text-rink-400">
                        Rating {c.rating} / Slope {c.slope}
                      </p>
                    </button>
                  ))}
                </>
              ) : (
                <p className="px-4 py-3 text-sm text-rink-400">No matching courses — enter details manually below.</p>
              )}
            </div>
          )}
        </div>

        {/* Rating + Slope */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-rink-200 mb-1.5">
              Course Rating
            </label>
            <input
              type="number"
              required
              step="0.1"
              min="55"
              max="80"
              placeholder="e.g. 72.1"
              value={form.courseRating}
              onChange={e => setForm(f => ({ ...f, courseRating: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-rink-200 mb-1.5">
              Slope Rating
            </label>
            <input
              type="number"
              required
              min="55"
              max="155"
              placeholder="e.g. 131"
              value={form.slopeRating}
              onChange={e => setForm(f => ({ ...f, slopeRating: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500"
            />
          </div>
        </div>

        {/* Gross score */}
        <div>
          <label className="block text-sm font-semibold text-rink-200 mb-1.5">
            Adjusted Gross Score
          </label>
          <input
            type="number"
            required
            min="50"
            max="160"
            placeholder="e.g. 82"
            value={form.grossScore}
            onChange={e => setForm(f => ({ ...f, grossScore: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500"
          />
        </div>

        {/* Differential preview */}
        {preview !== null && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-ice-500/10 border border-ice-500/20">
            <Info size={16} className="text-ice-400 shrink-0" />
            <div>
              <p className="text-sm text-white">
                Score Differential:{' '}
                <span className="font-black text-ice-400">{preview.toFixed(1)}</span>
              </p>
              <p className="text-xs text-rink-400 mt-0.5">
                (Gross Score − Course Rating) × 113 ÷ Slope Rating
              </p>
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-rink-200 mb-1.5">
            Notes{' '}
            <span className="font-normal text-rink-500">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Playing with the boys, windy conditions…"
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500"
          />
        </div>

        {/* Scorecard photo */}
        <div>
          <label className="block text-sm font-semibold text-rink-200 mb-1.5">
            Scorecard Photo{' '}
            <span className="font-normal text-rink-500">(optional — for verification)</span>
          </label>
          {scorecardImage ? (
            <div className="relative rounded-lg overflow-hidden border border-rink-700">
              <img
                src={scorecardImage}
                alt="Scorecard"
                className="w-full max-h-64 object-contain bg-rink-900"
              />
              <button
                type="button"
                onClick={() => setScorecardImage(null)}
                className="absolute top-2 right-2 p-1 rounded-full bg-rink-900/80 text-rink-300 hover:text-white transition-colors"
                aria-label="Remove scorecard photo"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-2 w-full h-28 rounded-lg border-2 border-dashed border-rink-700 bg-rink-800 hover:border-ice-500 hover:bg-rink-800/80 cursor-pointer transition-colors">
              <Camera size={22} className="text-rink-500" />
              <span className="text-xs text-rink-400">Tap to upload scorecard image</span>
              <span className="text-xs text-rink-600">JPG, PNG or HEIC · max 5 MB</span>
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!form.courseName || !form.courseRating || !form.slopeRating || !form.grossScore}
          className="w-full py-3 rounded-lg bg-ice-500 hover:bg-ice-400 disabled:bg-rink-700 disabled:text-rink-500 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors"
        >
          Save Round
        </button>
      </form>
    </div>
  );
}
