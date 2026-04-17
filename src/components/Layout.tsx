import { ReactNode } from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-rink-950 text-white">
      <Navbar />
      <main className="pt-14">{children}</main>
      <footer className="mt-20 border-t border-rink-800 py-8 text-center text-rink-500 text-sm">
        <p>
          Hockey Golf &mdash; Compare your game off the ice.{' '}
          <span className="text-rink-600">
            Player data powered by{' '}
            <a
              href="https://www.eliteprospects.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ice-600 hover:text-ice-400 transition-colors"
            >
              Elite Prospects
            </a>
            .
          </span>
        </p>
        <p className="mt-1 text-rink-700 text-xs">
          Handicaps calculated using the World Handicap System (WHS).
        </p>
      </footer>
    </div>
  );
}
