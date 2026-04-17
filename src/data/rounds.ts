import { GolfRound } from '../types';

// All score differentials are pre-computed: (grossScore - courseRating) × 113 / slopeRating
export const mockRounds: GolfRound[] = [

  // ── Connor McDavid (target ~4.0 handicap) ────────────────────────────────
  { id: 'r-mcdavid-1', playerId: 'mcdavid', date: '2026-04-05', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 77, scoreDifferential: 4.1 },
  { id: 'r-mcdavid-2', playerId: 'mcdavid', date: '2026-01-20', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 80, scoreDifferential: 6.6 },
  { id: 'r-mcdavid-3', playerId: 'mcdavid', date: '2025-10-12', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 80, scoreDifferential: 7.5 },
  { id: 'r-mcdavid-4', playerId: 'mcdavid', date: '2025-07-04', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 76, scoreDifferential: 5.5 },
  { id: 'r-mcdavid-5', playerId: 'mcdavid', date: '2025-04-20', courseName: 'Pebble Beach Golf Links', courseRating: 75.5, slopeRating: 145, grossScore: 83, scoreDifferential: 5.8 },

  // ── Nathan MacKinnon (target ~7.1 handicap) ───────────────────────────────
  { id: 'r-mackinnon-1', playerId: 'mackinnon', date: '2026-04-02', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 78, scoreDifferential: 7.4 },
  { id: 'r-mackinnon-2', playerId: 'mackinnon', date: '2026-01-08', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 83, scoreDifferential: 9.2 },
  { id: 'r-mackinnon-3', playerId: 'mackinnon', date: '2025-11-01', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 82, scoreDifferential: 9.3 },
  { id: 'r-mackinnon-4', playerId: 'mackinnon', date: '2025-08-14', courseName: 'Pebble Beach Golf Links', courseRating: 75.5, slopeRating: 145, grossScore: 88, scoreDifferential: 9.7 },
  { id: 'r-mackinnon-5', playerId: 'mackinnon', date: '2025-05-22', courseName: 'Augusta National Golf Club', courseRating: 76.2, slopeRating: 137, grossScore: 86, scoreDifferential: 8.1 },

  // ── Auston Matthews (target ~5.3 handicap) ────────────────────────────────
  { id: 'r-matthews-1', playerId: 'matthews', date: '2026-04-08', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 76, scoreDifferential: 5.5 },
  { id: 'r-matthews-2', playerId: 'matthews', date: '2026-02-03', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 80, scoreDifferential: 6.6 },
  { id: 'r-matthews-3', playerId: 'matthews', date: '2025-10-28', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 80, scoreDifferential: 7.5 },
  { id: 'r-matthews-4', playerId: 'matthews', date: '2025-07-18', courseName: 'Augusta National Golf Club', courseRating: 76.2, slopeRating: 137, grossScore: 85, scoreDifferential: 7.3 },
  { id: 'r-matthews-5', playerId: 'matthews', date: '2025-04-25', courseName: 'Pebble Beach Golf Links', courseRating: 75.5, slopeRating: 145, grossScore: 83, scoreDifferential: 5.8 },

  // ── Leon Draisaitl (target ~8.8 handicap) ────────────────────────────────
  { id: 'r-draisaitl-1', playerId: 'draisaitl', date: '2026-03-30', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 83, scoreDifferential: 9.2 },
  { id: 'r-draisaitl-2', playerId: 'draisaitl', date: '2025-12-10', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 84, scoreDifferential: 11.0 },
  { id: 'r-draisaitl-3', playerId: 'draisaitl', date: '2025-09-05', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 82, scoreDifferential: 11.2 },
  { id: 'r-draisaitl-4', playerId: 'draisaitl', date: '2025-06-20', courseName: 'Augusta National Golf Club', courseRating: 76.2, slopeRating: 137, grossScore: 89, scoreDifferential: 10.6 },
  { id: 'r-draisaitl-5', playerId: 'draisaitl', date: '2025-04-30', courseName: 'Pebble Beach Golf Links', courseRating: 75.5, slopeRating: 145, grossScore: 91, scoreDifferential: 12.1 },

  // ── David Pastrnak (target ~6.3 handicap) ────────────────────────────────
  { id: 'r-pastrnak-1', playerId: 'pastrnak', date: '2026-04-10', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 80, scoreDifferential: 6.6 },
  { id: 'r-pastrnak-2', playerId: 'pastrnak', date: '2026-01-15', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 78, scoreDifferential: 7.4 },
  { id: 'r-pastrnak-3', playerId: 'pastrnak', date: '2025-10-05', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 82, scoreDifferential: 9.3 },
  { id: 'r-pastrnak-4', playerId: 'pastrnak', date: '2025-07-12', courseName: 'Augusta National Golf Club', courseRating: 76.2, slopeRating: 137, grossScore: 86, scoreDifferential: 8.1 },
  { id: 'r-pastrnak-5', playerId: 'pastrnak', date: '2025-05-01', courseName: 'Pebble Beach Golf Links', courseRating: 75.5, slopeRating: 145, grossScore: 86, scoreDifferential: 8.2 },

  // ── Cale Makar (target ~3.1 handicap) ────────────────────────────────────
  { id: 'r-makar-1', playerId: 'makar', date: '2026-04-01', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 76, scoreDifferential: 3.2 },
  { id: 'r-makar-2', playerId: 'makar', date: '2026-01-25', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 79, scoreDifferential: 5.8 },
  { id: 'r-makar-3', playerId: 'makar', date: '2025-09-30', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 78, scoreDifferential: 5.7 },
  { id: 'r-makar-4', playerId: 'makar', date: '2025-07-01', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 76, scoreDifferential: 5.5 },
  { id: 'r-makar-5', playerId: 'makar', date: '2025-04-18', courseName: 'Pebble Beach Golf Links', courseRating: 75.5, slopeRating: 145, grossScore: 83, scoreDifferential: 5.8 },

  // ── Sidney Crosby (target ~5.3 handicap) ─────────────────────────────────
  { id: 'r-crosby-1', playerId: 'crosby', date: '2026-04-06', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 76, scoreDifferential: 5.5 },
  { id: 'r-crosby-2', playerId: 'crosby', date: '2026-02-10', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 80, scoreDifferential: 6.6 },
  { id: 'r-crosby-3', playerId: 'crosby', date: '2025-11-15', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 80, scoreDifferential: 7.5 },
  { id: 'r-crosby-4', playerId: 'crosby', date: '2025-08-20', courseName: 'Pebble Beach Golf Links', courseRating: 75.5, slopeRating: 145, grossScore: 85, scoreDifferential: 7.4 },
  { id: 'r-crosby-5', playerId: 'crosby', date: '2025-05-15', courseName: 'Augusta National Golf Club', courseRating: 76.2, slopeRating: 137, grossScore: 84, scoreDifferential: 6.4 },

  // ── Alex Ovechkin (target ~14.0 handicap) ────────────────────────────────
  { id: 'r-ovechkin-1', playerId: 'ovechkin', date: '2026-03-28', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 88, scoreDifferential: 14.6 },
  { id: 'r-ovechkin-2', playerId: 'ovechkin', date: '2025-12-05', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 90, scoreDifferential: 16.3 },
  { id: 'r-ovechkin-3', playerId: 'ovechkin', date: '2025-09-10', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 90, scoreDifferential: 15.3 },
  { id: 'r-ovechkin-4', playerId: 'ovechkin', date: '2025-06-25', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 90, scoreDifferential: 18.8 },
  { id: 'r-ovechkin-5', playerId: 'ovechkin', date: '2025-04-22', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 92, scoreDifferential: 17.0 },

  // ── Nikita Kucherov (target ~8.1 handicap) ────────────────────────────────
  { id: 'r-kucherov-1', playerId: 'kucherov', date: '2026-04-03', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 82, scoreDifferential: 8.4 },
  { id: 'r-kucherov-2', playerId: 'kucherov', date: '2026-01-05', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 80, scoreDifferential: 9.3 },
  { id: 'r-kucherov-3', playerId: 'kucherov', date: '2025-10-18', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 82, scoreDifferential: 9.3 },
  { id: 'r-kucherov-4', playerId: 'kucherov', date: '2025-07-22', courseName: 'Augusta National Golf Club', courseRating: 76.2, slopeRating: 137, grossScore: 87, scoreDifferential: 8.9 },
  { id: 'r-kucherov-5', playerId: 'kucherov', date: '2025-05-05', courseName: 'Pebble Beach Golf Links', courseRating: 75.5, slopeRating: 145, grossScore: 88, scoreDifferential: 9.7 },

  // ── Mitch Marner (target ~6.3 handicap) ──────────────────────────────────
  { id: 'r-marner-1', playerId: 'marner', date: '2026-04-07', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 80, scoreDifferential: 6.6 },
  { id: 'r-marner-2', playerId: 'marner', date: '2026-01-30', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 78, scoreDifferential: 7.4 },
  { id: 'r-marner-3', playerId: 'marner', date: '2025-10-20', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 80, scoreDifferential: 7.5 },
  { id: 'r-marner-4', playerId: 'marner', date: '2025-07-30', courseName: 'Augusta National Golf Club', courseRating: 76.2, slopeRating: 137, grossScore: 85, scoreDifferential: 7.3 },
  { id: 'r-marner-5', playerId: 'marner', date: '2025-05-10', courseName: 'Pebble Beach Golf Links', courseRating: 75.5, slopeRating: 145, grossScore: 86, scoreDifferential: 8.2 },

  // ── Victor Hedman (target ~9.9 handicap) ─────────────────────────────────
  { id: 'r-hedman-1', playerId: 'hedman', date: '2026-03-25', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 81, scoreDifferential: 10.3 },
  { id: 'r-hedman-2', playerId: 'hedman', date: '2025-12-20', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 84, scoreDifferential: 11.0 },
  { id: 'r-hedman-3', playerId: 'hedman', date: '2025-09-08', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 85, scoreDifferential: 11.0 },
  { id: 'r-hedman-4', playerId: 'hedman', date: '2025-06-10', courseName: 'Pebble Beach Golf Links', courseRating: 75.5, slopeRating: 145, grossScore: 91, scoreDifferential: 12.1 },
  { id: 'r-hedman-5', playerId: 'hedman', date: '2025-04-28', courseName: 'Augusta National Golf Club', courseRating: 76.2, slopeRating: 137, grossScore: 89, scoreDifferential: 10.6 },

  // ── Brad Marchand (target ~12.3 handicap) ────────────────────────────────
  { id: 'r-marchand-1', playerId: 'marchand', date: '2026-04-09', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 86, scoreDifferential: 12.8 },
  { id: 'r-marchand-2', playerId: 'marchand', date: '2026-02-18', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 88, scoreDifferential: 13.5 },
  { id: 'r-marchand-3', playerId: 'marchand', date: '2025-11-10', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 86, scoreDifferential: 15.0 },
  { id: 'r-marchand-4', playerId: 'marchand', date: '2025-08-25', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 88, scoreDifferential: 14.6 },
  { id: 'r-marchand-5', playerId: 'marchand', date: '2025-05-18', courseName: 'Pebble Beach Golf Links', courseRating: 75.5, slopeRating: 145, grossScore: 93, scoreDifferential: 13.6 },

  // ── AHL ──────────────────────────────────────────────────────────────────

  // Mavrik Bourque (target ~14.9 handicap)
  { id: 'r-bourque-1', playerId: 'bourque', date: '2026-03-15', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 89, scoreDifferential: 15.5 },
  { id: 'r-bourque-2', playerId: 'bourque', date: '2025-11-30', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 91, scoreDifferential: 16.1 },
  { id: 'r-bourque-3', playerId: 'bourque', date: '2025-08-10', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 91, scoreDifferential: 17.2 },
  { id: 'r-bourque-4', playerId: 'bourque', date: '2025-05-25', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 89, scoreDifferential: 17.9 },

  // Logan Cooley (target ~18.2 handicap)
  { id: 'r-cooley-1', playerId: 'cooley', date: '2026-03-10', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 93, scoreDifferential: 19.0 },
  { id: 'r-cooley-2', playerId: 'cooley', date: '2025-11-20', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 95, scoreDifferential: 19.6 },
  { id: 'r-cooley-3', playerId: 'cooley', date: '2025-08-05', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 92, scoreDifferential: 20.7 },
  { id: 'r-cooley-4', playerId: 'cooley', date: '2025-05-20', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 95, scoreDifferential: 20.8 },

  // Marco Kasper (target ~16.2 handicap)
  { id: 'r-kasper-1', playerId: 'kasper', date: '2026-03-20', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 88, scoreDifferential: 16.9 },
  { id: 'r-kasper-2', playerId: 'kasper', date: '2025-12-01', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 91, scoreDifferential: 17.2 },
  { id: 'r-kasper-3', playerId: 'kasper', date: '2025-08-15', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 92, scoreDifferential: 17.0 },
  { id: 'r-kasper-4', playerId: 'kasper', date: '2025-05-28', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 92, scoreDifferential: 18.1 },

  // Shane Wright (target ~14.0 handicap)
  { id: 'r-wright-1', playerId: 'wright', date: '2026-03-18', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 88, scoreDifferential: 14.6 },
  { id: 'r-wright-2', playerId: 'wright', date: '2025-12-08', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 90, scoreDifferential: 15.3 },
  { id: 'r-wright-3', playerId: 'wright', date: '2025-08-22', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 87, scoreDifferential: 16.0 },
  { id: 'r-wright-4', playerId: 'wright', date: '2025-06-01', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 90, scoreDifferential: 16.3 },

  // Adam Fantilli (target ~20.0 handicap)
  { id: 'r-fantilli-1', playerId: 'fantilli', date: '2026-02-28', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 95, scoreDifferential: 20.8 },
  { id: 'r-fantilli-2', playerId: 'fantilli', date: '2025-10-15', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 95, scoreDifferential: 23.6 },
  { id: 'r-fantilli-3', playerId: 'fantilli', date: '2025-06-20', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 97, scoreDifferential: 21.3 },

  // ── KHL ──────────────────────────────────────────────────────────────────

  // Nikita Gusev (target ~11.4 handicap)
  { id: 'r-gusev-1', playerId: 'gusev', date: '2026-03-22', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 85, scoreDifferential: 11.9 },
  { id: 'r-gusev-2', playerId: 'gusev', date: '2025-12-15', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 87, scoreDifferential: 12.7 },
  { id: 'r-gusev-3', playerId: 'gusev', date: '2025-09-18', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 84, scoreDifferential: 13.1 },
  { id: 'r-gusev-4', playerId: 'gusev', date: '2025-06-08', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 87, scoreDifferential: 13.7 },

  // Alexander Radulov (target ~8.1 handicap)
  { id: 'r-radulov-1', playerId: 'radulov', date: '2026-03-12', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 82, scoreDifferential: 8.4 },
  { id: 'r-radulov-2', playerId: 'radulov', date: '2025-12-02', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 80, scoreDifferential: 9.3 },
  { id: 'r-radulov-3', playerId: 'radulov', date: '2025-08-28', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 84, scoreDifferential: 11.0 },
  { id: 'r-radulov-4', playerId: 'radulov', date: '2025-05-30', courseName: 'Pebble Beach Golf Links', courseRating: 75.5, slopeRating: 145, grossScore: 88, scoreDifferential: 9.7 },

  // Igor Shesterkin (target ~21.6 handicap — goalie life)
  { id: 'r-shesterkin-1', playerId: 'shesterkin', date: '2026-02-20', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 97, scoreDifferential: 22.5 },
  { id: 'r-shesterkin-2', playerId: 'shesterkin', date: '2025-10-10', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 99, scoreDifferential: 23.1 },
  { id: 'r-shesterkin-3', playerId: 'shesterkin', date: '2025-06-15', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 98, scoreDifferential: 26.4 },

  // Sergei Plotnikov (target ~16.2 handicap)
  { id: 'r-plotnikov-1', playerId: 'plotnikov', date: '2026-03-05', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 88, scoreDifferential: 16.9 },
  { id: 'r-plotnikov-2', playerId: 'plotnikov', date: '2025-11-25', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 91, scoreDifferential: 17.2 },
  { id: 'r-plotnikov-3', playerId: 'plotnikov', date: '2025-08-18', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 92, scoreDifferential: 17.0 },
  { id: 'r-plotnikov-4', playerId: 'plotnikov', date: '2025-05-22', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 93, scoreDifferential: 19.0 },

  // ── SHL ──────────────────────────────────────────────────────────────────

  // Filip Forsberg (target ~8.8 handicap)
  { id: 'r-ekblad_f-1', playerId: 'ekblad_f', date: '2026-03-08', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 83, scoreDifferential: 9.2 },
  { id: 'r-ekblad_f-2', playerId: 'ekblad_f', date: '2025-12-12', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 82, scoreDifferential: 9.3 },
  { id: 'r-ekblad_f-3', playerId: 'ekblad_f', date: '2025-09-15', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 80, scoreDifferential: 9.3 },
  { id: 'r-ekblad_f-4', playerId: 'ekblad_f', date: '2025-06-05', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 86, scoreDifferential: 11.8 },

  // Alexander Nylander (target ~12.2 handicap)
  { id: 'r-nylander_a-1', playerId: 'nylander_a', date: '2026-03-02', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 87, scoreDifferential: 12.7 },
  { id: 'r-nylander_a-2', playerId: 'nylander_a', date: '2025-11-28', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 86, scoreDifferential: 12.8 },
  { id: 'r-nylander_a-3', playerId: 'nylander_a', date: '2025-08-08', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 85, scoreDifferential: 14.1 },
  { id: 'r-nylander_a-4', playerId: 'nylander_a', date: '2025-05-15', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 88, scoreDifferential: 14.6 },

  // Andre Burakovsky (target ~7.1 handicap)
  { id: 'r-burakovsky-1', playerId: 'burakovsky', date: '2026-03-28', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 78, scoreDifferential: 7.4 },
  { id: 'r-burakovsky-2', playerId: 'burakovsky', date: '2025-12-18', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 81, scoreDifferential: 7.5 },
  { id: 'r-burakovsky-3', playerId: 'burakovsky', date: '2025-09-25', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 80, scoreDifferential: 7.5 },
  { id: 'r-burakovsky-4', playerId: 'burakovsky', date: '2025-06-12', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 83, scoreDifferential: 9.2 },

  // Adam Larsson (target ~11.4 handicap)
  { id: 'r-larsson_a-1', playerId: 'larsson_a', date: '2026-03-16', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 85, scoreDifferential: 11.9 },
  { id: 'r-larsson_a-2', playerId: 'larsson_a', date: '2025-12-06', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 87, scoreDifferential: 12.7 },
  { id: 'r-larsson_a-3', playerId: 'larsson_a', date: '2025-09-02', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 84, scoreDifferential: 13.1 },
  { id: 'r-larsson_a-4', playerId: 'larsson_a', date: '2025-06-18', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 87, scoreDifferential: 13.7 },

  // ── Liiga ─────────────────────────────────────────────────────────────────

  // Aleksander Barkov (target ~8.1 handicap)
  { id: 'r-barkov-1', playerId: 'barkov', date: '2026-03-20', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 82, scoreDifferential: 8.4 },
  { id: 'r-barkov-2', playerId: 'barkov', date: '2025-12-10', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 80, scoreDifferential: 9.3 },
  { id: 'r-barkov-3', playerId: 'barkov', date: '2025-09-12', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 82, scoreDifferential: 9.3 },
  { id: 'r-barkov-4', playerId: 'barkov', date: '2025-06-22', courseName: 'Pebble Beach Golf Links', courseRating: 75.5, slopeRating: 145, grossScore: 88, scoreDifferential: 9.7 },

  // Patrik Laine (target ~13.0 handicap)
  { id: 'r-laine-1', playerId: 'laine', date: '2026-03-10', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 88, scoreDifferential: 13.5 },
  { id: 'r-laine-2', playerId: 'laine', date: '2025-12-04', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 88, scoreDifferential: 14.6 },
  { id: 'r-laine-3', playerId: 'laine', date: '2025-09-08', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 86, scoreDifferential: 15.0 },
  { id: 'r-laine-4', playerId: 'laine', date: '2025-06-28', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 90, scoreDifferential: 15.3 },

  // Jesse Puljujärvi (target ~17.2 handicap)
  { id: 'r-puljujarvi-1', playerId: 'puljujarvi', date: '2026-02-25', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 89, scoreDifferential: 17.9 },
  { id: 'r-puljujarvi-2', playerId: 'puljujarvi', date: '2025-10-08', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 94, scoreDifferential: 18.7 },
  { id: 'r-puljujarvi-3', playerId: 'puljujarvi', date: '2025-07-15', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 92, scoreDifferential: 18.1 },
  { id: 'r-puljujarvi-4', playerId: 'puljujarvi', date: '2025-04-26', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 90, scoreDifferential: 18.8 },

  // ── OHL ───────────────────────────────────────────────────────────────────

  // Sam Dickinson (target ~18.2 handicap)
  { id: 'r-dickinson-1', playerId: 'dickinson', date: '2026-02-28', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 93, scoreDifferential: 19.0 },
  { id: 'r-dickinson-2', playerId: 'dickinson', date: '2025-10-15', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 91, scoreDifferential: 19.8 },
  { id: 'r-dickinson-3', playerId: 'dickinson', date: '2025-06-20', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 95, scoreDifferential: 19.6 },

  // Easton Cowan (target ~16.2 handicap)
  { id: 'r-cowan-1', playerId: 'cowan', date: '2026-02-22', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 88, scoreDifferential: 16.9 },
  { id: 'r-cowan-2', playerId: 'cowan', date: '2025-10-05', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 91, scoreDifferential: 17.2 },
  { id: 'r-cowan-3', playerId: 'cowan', date: '2025-06-28', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 92, scoreDifferential: 17.0 },

  // Beckett Sennecke (target ~21.6 handicap)
  { id: 'r-sennecke-1', playerId: 'sennecke', date: '2026-02-15', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 97, scoreDifferential: 22.5 },
  { id: 'r-sennecke-2', playerId: 'sennecke', date: '2025-10-12', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 99, scoreDifferential: 23.1 },
  { id: 'r-sennecke-3', playerId: 'sennecke', date: '2025-06-18', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 98, scoreDifferential: 26.4 },

  // Michael Misa (target ~24.2 handicap)
  { id: 'r-james_m-1', playerId: 'james_m', date: '2026-02-10', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 100, scoreDifferential: 25.2 },
  { id: 'r-james_m-2', playerId: 'james_m', date: '2025-10-02', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 102, scoreDifferential: 30.2 },
  { id: 'r-james_m-3', playerId: 'james_m', date: '2025-06-12', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 102, scoreDifferential: 25.6 },

  // ── WHL ───────────────────────────────────────────────────────────────────

  // Gavin McKenna (target ~20.0 handicap)
  { id: 'r-mckenna-1', playerId: 'mckenna', date: '2026-02-18', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 95, scoreDifferential: 20.8 },
  { id: 'r-mckenna-2', playerId: 'mckenna', date: '2025-10-18', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 95, scoreDifferential: 23.6 },
  { id: 'r-mckenna-3', playerId: 'mckenna', date: '2025-07-08', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 97, scoreDifferential: 21.3 },

  // Tij Iginla (target ~19.1 handicap)
  { id: 'r-iginla_t-1', playerId: 'iginla_t', date: '2026-02-12', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 94, scoreDifferential: 19.9 },
  { id: 'r-iginla_t-2', playerId: 'iginla_t', date: '2025-10-25', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 92, scoreDifferential: 20.7 },
  { id: 'r-iginla_t-3', playerId: 'iginla_t', date: '2025-07-02', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 96, scoreDifferential: 20.5 },

  // Cameron Schmidt (target ~22.5 handicap)
  { id: 'r-schmidt_c-1', playerId: 'schmidt_c', date: '2026-02-05', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 98, scoreDifferential: 23.4 },
  { id: 'r-schmidt_c-2', playerId: 'schmidt_c', date: '2025-10-28', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 95, scoreDifferential: 23.6 },
  { id: 'r-schmidt_c-3', playerId: 'schmidt_c', date: '2025-07-14', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 100, scoreDifferential: 23.9 },

  // Tomas Helenius (target ~20.7 handicap)
  { id: 'r-helenius-1', playerId: 'helenius', date: '2026-01-28', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 96, scoreDifferential: 21.6 },
  { id: 'r-helenius-2', playerId: 'helenius', date: '2025-09-22', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 98, scoreDifferential: 22.2 },
  { id: 'r-helenius-3', playerId: 'helenius', date: '2025-06-10', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 93, scoreDifferential: 21.7 },

  // ── QMJHL ─────────────────────────────────────────────────────────────────

  // Thomas Bolduc (target ~19.1 handicap)
  { id: 'r-bolduc_t-1', playerId: 'bolduc_t', date: '2026-01-22', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 94, scoreDifferential: 19.9 },
  { id: 'r-bolduc_t-2', playerId: 'bolduc_t', date: '2025-09-28', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 92, scoreDifferential: 20.7 },
  { id: 'r-bolduc_t-3', playerId: 'bolduc_t', date: '2025-06-25', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 96, scoreDifferential: 20.5 },

  // Simon Bedard (target ~21.6 handicap)
  { id: 'r-bedard_s-1', playerId: 'bedard_s', date: '2026-01-15', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 97, scoreDifferential: 22.5 },
  { id: 'r-bedard_s-2', playerId: 'bedard_s', date: '2025-09-20', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 99, scoreDifferential: 23.1 },
  { id: 'r-bedard_s-3', playerId: 'bedard_s', date: '2025-06-08', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 98, scoreDifferential: 26.4 },

  // Maxime Tremblay (target ~24.2 handicap)
  { id: 'r-tremblay_m-1', playerId: 'tremblay_m', date: '2026-01-10', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 100, scoreDifferential: 25.2 },
  { id: 'r-tremblay_m-2', playerId: 'tremblay_m', date: '2025-09-15', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 102, scoreDifferential: 30.2 },
  { id: 'r-tremblay_m-3', playerId: 'tremblay_m', date: '2025-06-05', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 102, scoreDifferential: 25.6 },

  // ── DEL ───────────────────────────────────────────────────────────────────

  // Julius Müller (target ~14.0 handicap)
  { id: 'r-mueller_j-1', playerId: 'mueller_j', date: '2026-03-25', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 88, scoreDifferential: 14.6 },
  { id: 'r-mueller_j-2', playerId: 'mueller_j', date: '2025-12-18', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 90, scoreDifferential: 15.3 },
  { id: 'r-mueller_j-3', playerId: 'mueller_j', date: '2025-09-20', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 87, scoreDifferential: 16.0 },
  { id: 'r-mueller_j-4', playerId: 'mueller_j', date: '2025-06-28', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 90, scoreDifferential: 16.3 },

  // Brandon Hagel (target ~11.4 handicap)
  { id: 'r-hager_b-1', playerId: 'hager_b', date: '2026-03-18', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 85, scoreDifferential: 11.9 },
  { id: 'r-hager_b-2', playerId: 'hager_b', date: '2025-12-08', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 87, scoreDifferential: 12.7 },
  { id: 'r-hager_b-3', playerId: 'hager_b', date: '2025-09-14', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 84, scoreDifferential: 13.1 },
  { id: 'r-hager_b-4', playerId: 'hager_b', date: '2025-06-22', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 87, scoreDifferential: 13.7 },

  // ── NLA ───────────────────────────────────────────────────────────────────

  // Marco Herzog (target ~13.0 handicap)
  { id: 'r-herzog_m-1', playerId: 'herzog_m', date: '2026-03-15', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 88, scoreDifferential: 13.5 },
  { id: 'r-herzog_m-2', playerId: 'herzog_m', date: '2025-12-05', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 88, scoreDifferential: 14.6 },
  { id: 'r-herzog_m-3', playerId: 'herzog_m', date: '2025-09-05', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 86, scoreDifferential: 15.0 },
  { id: 'r-herzog_m-4', playerId: 'herzog_m', date: '2025-06-15', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 90, scoreDifferential: 15.3 },

  // Kevin Fiala (target ~8.1 handicap)
  { id: 'r-fiala_k-1', playerId: 'fiala_k', date: '2026-03-10', courseName: 'Eagle Ridge Golf Club', courseRating: 72.3, slopeRating: 131, grossScore: 82, scoreDifferential: 8.4 },
  { id: 'r-fiala_k-2', playerId: 'fiala_k', date: '2025-11-22', courseName: 'Riverside Golf Course', courseRating: 70.2, slopeRating: 119, grossScore: 80, scoreDifferential: 9.3 },
  { id: 'r-fiala_k-3', playerId: 'fiala_k', date: '2025-08-28', courseName: 'The Country Club', courseRating: 71.5, slopeRating: 128, grossScore: 82, scoreDifferential: 9.3 },
  { id: 'r-fiala_k-4', playerId: 'fiala_k', date: '2025-05-30', courseName: 'Pebble Beach Golf Links', courseRating: 75.5, slopeRating: 145, grossScore: 88, scoreDifferential: 9.7 },
];

export function getRoundsForPlayer(playerId: string): GolfRound[] {
  return mockRounds.filter(r => r.playerId === playerId);
}
