import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Camera, X, Save } from 'lucide-react';

export default function EditProfilePage() {
  const { currentUser, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [bio, setBio] = useState(currentUser?.bio ?? '');
  const [homeCourse, setHomeCourse] = useState(currentUser?.homeCourse ?? '');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(currentUser?.profilePhoto ?? null);
  const [saved, setSaved] = useState(false);

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-rink-400">You must be signed in to edit your profile.</p>
        <Link to="/login" className="mt-3 inline-block text-ice-400 hover:text-ice-300 text-sm">
          Sign In →
        </Link>
      </div>
    );
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Image must be under 5 MB.'); return; }
    const reader = new FileReader();
    reader.onload = ev => setProfilePhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({ bio, homeCourse, profilePhoto: profilePhoto ?? undefined });
    setSaved(true);
    setTimeout(() => {
      navigate(`/player/${currentUser!.playerId}`);
    }, 800);
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to={`/player/${currentUser!.playerId}`}
        className="inline-flex items-center gap-1.5 text-rink-400 hover:text-white text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={15} /> My Profile
      </Link>

      <h1 className="text-2xl font-black text-white mb-1">Edit Profile</h1>
      <p className="text-rink-400 text-sm mb-8">Customize how others see you on Hockey Golf.</p>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile photo */}
        <div>
          <label className="block text-sm font-semibold text-rink-200 mb-3">Profile Photo</label>
          <div className="flex items-center gap-4">
            {profilePhoto ? (
              <div className="relative shrink-0">
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-ice-500"
                />
                <button
                  type="button"
                  onClick={() => setProfilePhoto(null)}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rink-900 border border-rink-700 text-rink-300 hover:text-white flex items-center justify-center"
                >
                  <X size={10} />
                </button>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-rink-800 border-2 border-dashed border-rink-700 flex items-center justify-center shrink-0">
                <Camera size={20} className="text-rink-500" />
              </div>
            )}
            <label className="flex flex-col gap-1 cursor-pointer">
              <span className="px-4 py-2 rounded-lg bg-rink-800 hover:bg-rink-700 border border-rink-700 text-sm text-rink-200 font-semibold transition-colors inline-flex items-center gap-2">
                <Camera size={14} /> {profilePhoto ? 'Change Photo' : 'Upload Photo'}
              </span>
              <span className="text-xs text-rink-500">JPG, PNG · max 5 MB</span>
              <input type="file" accept="image/*" className="sr-only" onChange={handlePhotoChange} />
            </label>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-semibold text-rink-200 mb-1.5">
            Bio <span className="font-normal text-rink-500">(optional)</span>
          </label>
          <textarea
            rows={3}
            maxLength={200}
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="Tell people a bit about yourself — position, golf goals, favourite course…"
            className="w-full px-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500 resize-none"
          />
          <p className="text-xs text-rink-600 mt-1 text-right">{bio.length}/200</p>
        </div>

        {/* Home course */}
        <div>
          <label className="block text-sm font-semibold text-rink-200 mb-1.5">
            Home Course <span className="font-normal text-rink-500">(optional)</span>
          </label>
          <input
            type="text"
            maxLength={80}
            value={homeCourse}
            onChange={e => setHomeCourse(e.target.value)}
            placeholder="e.g. Pebble Beach Golf Links"
            className="w-full px-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500"
          />
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-ice-500 hover:bg-ice-400 text-white'
          }`}
        >
          <Save size={15} />
          {saved ? 'Saved!' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
