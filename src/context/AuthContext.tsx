import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { UserAccount } from '../types';

// ── Storage keys ─────────────────────────────────────────────────────────────
const ACCOUNTS_KEY = 'hockey-golf-accounts';
const SESSION_KEY  = 'hockey-golf-session';

// ── Simple deterministic hash (NOT cryptographically secure — local-only demo) ─
function simpleHash(str: string): string {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return (h >>> 0).toString(36);
}

// ── Persistence helpers ───────────────────────────────────────────────────────
function loadAccounts(): UserAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as UserAccount[]) : [];
  } catch { return []; }
}
function saveAccounts(accounts: UserAccount[]) {
  try { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts)); } catch {}
}
function loadSession(): string | null {
  try { return localStorage.getItem(SESSION_KEY); } catch { return null; }
}
function saveSession(id: string | null) {
  try {
    id ? localStorage.setItem(SESSION_KEY, id) : localStorage.removeItem(SESSION_KEY);
  } catch {}
}

// ── Context types ─────────────────────────────────────────────────────────────
type LoginResult = 'ok' | 'not-found' | 'wrong-password' | 'pending' | 'rejected';
type RegisterResult = 'ok' | 'email-taken' | 'player-taken';

interface AuthContextValue {
  currentUser: UserAccount | null;
  accounts: UserAccount[];
  login: (email: string, password: string) => LoginResult;
  logout: () => void;
  register: (playerId: string, email: string, password: string) => RegisterResult;
  updateProfile: (data: Partial<Pick<UserAccount, 'bio' | 'homeCourse' | 'profilePhoto'>>) => void;
  // Admin helpers
  approveAccount: (id: string) => void;
  rejectAccount: (id: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<UserAccount[]>(loadAccounts);
  const [sessionId, setSessionId] = useState<string | null>(loadSession);

  useEffect(() => { saveAccounts(accounts); }, [accounts]);
  useEffect(() => { saveSession(sessionId); }, [sessionId]);

  const currentUser = accounts.find(a => a.id === sessionId) ?? null;

  const login = useCallback((email: string, password: string): LoginResult => {
    const acct = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (!acct) return 'not-found';
    if (acct.passwordHash !== simpleHash(password)) return 'wrong-password';
    if (acct.status === 'pending') return 'pending';
    if (acct.status === 'rejected') return 'rejected';
    setSessionId(acct.id);
    return 'ok';
  }, [accounts]);

  const logout = useCallback(() => setSessionId(null), []);

  const register = useCallback((playerId: string, email: string, password: string): RegisterResult => {
    if (accounts.some(a => a.email.toLowerCase() === email.toLowerCase())) return 'email-taken';
    if (accounts.some(a => a.playerId === playerId)) return 'player-taken';
    const newAcct: UserAccount = {
      id: `u-${Date.now()}`,
      playerId,
      email: email.toLowerCase().trim(),
      passwordHash: simpleHash(password),
      status: 'pending',
      joinedAt: new Date().toISOString(),
    };
    setAccounts(prev => [...prev, newAcct]);
    return 'ok';
  }, [accounts]);

  const updateProfile = useCallback((
    data: Partial<Pick<UserAccount, 'bio' | 'homeCourse' | 'profilePhoto'>>
  ) => {
    setAccounts(prev => prev.map(a =>
      a.id === sessionId ? { ...a, ...data } : a
    ));
  }, [sessionId]);

  const approveAccount = useCallback((id: string) => {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, status: 'approved' } : a));
  }, []);

  const rejectAccount = useCallback((id: string) => {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a));
  }, []);

  return (
    <AuthContext.Provider value={{
      currentUser, accounts, login, logout, register,
      updateProfile, approveAccount, rejectAccount,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
