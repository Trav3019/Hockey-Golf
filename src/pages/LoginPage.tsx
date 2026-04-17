import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, LogIn } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = login(email, password);
    setLoading(false);
    if (result === 'ok') {
      navigate('/feed');
    } else if (result === 'not-found') {
      setError('No account found with that email.');
    } else if (result === 'wrong-password') {
      setError('Incorrect password.');
    } else if (result === 'pending') {
      setError('Your account is pending admin approval. Check back soon.');
    } else if (result === 'rejected') {
      setError('Your registration was not approved. Contact an admin for help.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-rink-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={15} /> Home
        </Link>

        <div className="mb-8">
          <div className="text-3xl mb-3">🏒⛳</div>
          <h1 className="text-3xl font-black text-white mb-1">Sign In</h1>
          <p className="text-rink-400 text-sm">Welcome back to Hockey Golf.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-rink-200 mb-1.5">Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-rink-200 mb-1.5">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-rink-800 border border-rink-700 text-white placeholder:text-rink-500 text-sm focus:outline-none focus:border-ice-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-ice-500 hover:bg-ice-400 disabled:bg-rink-700 disabled:text-rink-500 text-white font-bold text-sm transition-colors"
          >
            <LogIn size={15} /> Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-rink-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-ice-400 hover:text-ice-300 font-semibold transition-colors">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
