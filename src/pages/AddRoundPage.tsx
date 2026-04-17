import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPlayer } from '../data/players';
import { getLeague } from '../data/leagues';
import { useRounds } from '../hooks/useRounds';
import { calcDifferential } from '../utils/handicap';
import { ArrowLeft, Info, Camera, X } from 'lucide-react';

const POPULAR_COURSES = [
  { name: 'Pebble Beach Golf Links', rating: 75.5, slope: 145 },
  { name: 'TPC Sawgrass', rating: 76.0, slope: 144 },
  { name: 'Augusta National Golf Club', rating: 76.2, slope: 137 },
  { name: 'Bandon Dunes', rating: 74.8, slope: 142 },
  { name: 'Shadow Creek Golf Club', rating: 74.2, slope: 139 },
  { name: 'Whistling Straits', rating: 76.9, slope: 148 },
  { name: 'Bethpage Black', rating: 76.6, slope: 148 },
  { name: 'Spyglass Hill Golf Course', rating: 75.0, slope: 148 },
  { name: 'Pinehurst No. 2', rating: 75.3, slope: 135 },
  { name: 'Eagle Ridge Golf Club', rating: 72.3, slope: 131 },
  { name: 'Riverside Golf Course', rating: 70.2, slope: 119 },
  { name: 'The Country Club', rating: 71.5, slope: 128 },
  { name: 'The Pines Golf Club', rating: 71.8, slope: 125 },
  { name: 'Willow Creek Golf Course', rating: 69.8, slope: 113 },
];

export default function AddRoundPage() {
  const { playerId } = useParams<{ playerId: string }>();
  const player = getPlayer(playerId ?? '');
  const league = getLeague(player?.leagueId ?? '');
  const navigate = useNavigate();
  const { addRound } = useRounds();

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

  const filteredCourses = useMemo(
    () =>
      form.courseName.length >= 2
        ? POPULAR_COURSES.filter(c =>
            c.name.toLowerCase().includes(form.courseName.toLowerCase())
          )
        : [],
    [form.courseName]
  );

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
          {showSuggestions && filteredCourses.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-rink-800 border border-rink-700 rounded-lg shadow-xl overflow-hidden">
              {filteredCourses.slice(0, 6).map(c => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => selectCourse(c)}
                  className="w-full px-4 py-2.5 text-left hover:bg-rink-700 transition-colors"
                >
                  <p className="text-sm text-white">{c.name}</p>
                  <p className="text-xs text-rink-400">
                    Rating {c.rating} / Slope {c.slope}
                  </p>
                </button>
              ))}
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
