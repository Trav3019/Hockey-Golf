import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LeaguesPage from './pages/LeaguesPage';
import LeaguePage from './pages/LeaguePage';
import PlayerPage from './pages/PlayerPage';
import AddRoundPage from './pages/AddRoundPage';
import LeaderboardPage from './pages/LeaderboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leagues" element={<LeaguesPage />} />
          <Route path="/leagues/:leagueId" element={<LeaguePage />} />
          <Route path="/player/:playerId" element={<PlayerPage />} />
          <Route path="/player/:playerId/add-round" element={<AddRoundPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
