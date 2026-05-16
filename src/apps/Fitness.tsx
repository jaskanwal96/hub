import React, { useState, useEffect } from 'react';

// ----- TYPES -----
interface Exercise {
  name: string;
  sets: string;
  note?: string;
}

interface Session {
  day: string;
  label: string;
  type: 'strength' | 'run' | 'rest';
  detail: string;
  exercises?: Exercise[];
}

interface Phase {
  id: string;
  name: string;
  weeks: string;
  weekRange: [number, number];
  color: string;
  intent: string;
  weeklyTemplate: Session[];
}

interface Milestone {
  id: string;
  sessions: number;
  emoji: string;
  title: string;
  sub: string;
}

interface CompletedMap {
  [key: string]: boolean;
}

// ----- PLAN DATA -----
const PHASES: Phase[] = [
  {
    id: 'p1',
    name: 'Reentry',
    weeks: '1–2',
    weekRange: [1, 2],
    color: '#22d3ee',
    intent: 'Wake up the nervous system. Light weights, easy runs. Survive, do not perform.',
    weeklyTemplate: [
      { day: 'Mon', label: 'Push', type: 'strength', detail: 'Bench, OHP, incline DB, lateral raises, tricep ext. 70% of April loads. 3×8–10.', exercises: [
        { name: 'Bench Press', sets: '3×8–10', note: '70% of April weight' },
        { name: 'OHP', sets: '3×8–10', note: '70% of April weight' },
        { name: 'Incline DB Press', sets: '3×10' },
        { name: 'Lateral Raises', sets: '3×12' },
        { name: 'Tricep Extension', sets: '3×10' },
      ]},
      { day: 'Tue', label: 'Z2 Run · 4 km', type: 'run', detail: 'Easy aerobic. HR 132–147. Pace 6:30–7:00/km. Nose breathing only.' },
      { day: 'Wed', label: 'Pull', type: 'strength', detail: 'Deadlift (light), pull-ups, rows, face pulls, biceps. 3×8–10.', exercises: [
        { name: 'Deadlift', sets: '3×8', note: 'Light — 60% of max' },
        { name: 'Pull-ups', sets: '3×8–10', note: 'Bodyweight' },
        { name: 'Barbell Row', sets: '3×10' },
        { name: 'Face Pulls', sets: '3×15' },
        { name: 'Bicep Curls', sets: '3×10' },
      ]},
      { day: 'Thu', label: 'Walk / Rest', type: 'rest', detail: '30–45 min walk outside. Sunlight. Reset.' },
      { day: 'Fri', label: 'Legs', type: 'strength', detail: 'Squat (light), RDL, lunges, leg curl, calf. 3×8–10. Stop with 2 reps in tank.', exercises: [
        { name: 'Squat', sets: '3×8–10', note: '70% of max, 2 reps in tank' },
        { name: 'RDL', sets: '3×10' },
        { name: 'Lunges', sets: '3×10 each leg' },
        { name: 'Leg Curl', sets: '3×12' },
        { name: 'Calf Raises', sets: '3×15' },
      ]},
      { day: 'Sat', label: 'Z2 Run · 5 km', type: 'run', detail: 'Same zone as Tuesday. Slightly longer. Hold pace.' },
      { day: 'Sun', label: 'Rest', type: 'rest', detail: 'Full off. Stretch, mobility, hydrate.' },
    ],
  },
  {
    id: 'p2',
    name: 'Build',
    weeks: '3–4',
    weekRange: [3, 4],
    color: '#a78bfa',
    intent: 'Return to full strength loads. Add one tempo run. Volume creeps up.',
    weeklyTemplate: [
      { day: 'Mon', label: 'Push', type: 'strength', detail: 'Back to full April weights. 4×6–8 compound, 3×10–12 isolation.', exercises: [
        { name: 'Bench Press', sets: '4×6–8', note: 'Back to April weight' },
        { name: 'OHP', sets: '4×6–8' },
        { name: 'Incline DB Press', sets: '3×10–12' },
        { name: 'Lateral Raises', sets: '3×12' },
        { name: 'Tricep Extension', sets: '3×10–12' },
      ]},
      { day: 'Tue', label: 'Z2 Run · 5–6 km', type: 'run', detail: 'Easy. HR 132–147. Build aerobic base.' },
      { day: 'Wed', label: 'Pull', type: 'strength', detail: 'Deadlift heavier, weighted pull-ups if possible, rows, biceps.', exercises: [
        { name: 'Deadlift', sets: '4×6', note: 'Heavier than Phase 1' },
        { name: 'Weighted Pull-ups', sets: '3×6–8', note: 'Add weight if possible' },
        { name: 'Barbell Row', sets: '4×8' },
        { name: 'Face Pulls', sets: '3×15' },
        { name: 'Bicep Curls', sets: '3×10–12' },
      ]},
      { day: 'Thu', label: 'Tempo · 4 km', type: 'run', detail: '1 km warm-up + 3 km at 5:30–5:50/km + cooldown.' },
      { day: 'Fri', label: 'Legs', type: 'strength', detail: 'Squat 4×6, RDL 4×8, lunges, calf raises.', exercises: [
        { name: 'Squat', sets: '4×6' },
        { name: 'RDL', sets: '4×8' },
        { name: 'Lunges', sets: '3×10 each leg' },
        { name: 'Leg Curl', sets: '3×12' },
        { name: 'Calf Raises', sets: '4×12' },
      ]},
      { day: 'Sat', label: 'Z2 Long · 6 km', type: 'run', detail: 'Slow and steady. HR ceiling 147.' },
      { day: 'Sun', label: 'Rest', type: 'rest', detail: 'Recovery. Optional mobility.' },
    ],
  },
  {
    id: 'p3',
    name: 'Full Hybrid',
    weeks: '5–8',
    weekRange: [5, 8],
    color: '#4ade80',
    intent: '4-day strength split + 3 runs. This is the engine you maintain for the cut.',
    weeklyTemplate: [
      { day: 'Mon', label: 'Upper (Push focus)', type: 'strength', detail: 'Bench 4×5, OHP 4×6, incline DB, lateral, tricep, ab work.', exercises: [
        { name: 'Bench Press', sets: '4×5' },
        { name: 'OHP', sets: '4×6' },
        { name: 'Incline DB Press', sets: '3×10–12' },
        { name: 'Lateral Raises', sets: '3×15' },
        { name: 'Tricep Pushdown', sets: '3×12' },
        { name: 'Ab Work', sets: '3×15' },
      ]},
      { day: 'Tue', label: 'Z2 Run · 6–7 km', type: 'run', detail: 'Easy aerobic. Critical for fat oxidation.' },
      { day: 'Wed', label: 'Lower', type: 'strength', detail: 'Squat 4×5, RDL 4×6, leg press, hamstring curl, calf, core.', exercises: [
        { name: 'Squat', sets: '4×5' },
        { name: 'RDL', sets: '4×6' },
        { name: 'Leg Press', sets: '3×10' },
        { name: 'Hamstring Curl', sets: '3×12' },
        { name: 'Calf Raises', sets: '4×15' },
        { name: 'Core', sets: '3×15' },
      ]},
      { day: 'Thu', label: 'Speed / Tempo · 5 km', type: 'run', detail: 'Intervals: 5×800m at 5:00/km with 90s recovery, OR sustained tempo.' },
      { day: 'Fri', label: 'Pull', type: 'strength', detail: 'Deadlift 3×5, weighted pull-ups, rows, biceps, rear delts.', exercises: [
        { name: 'Deadlift', sets: '3×5' },
        { name: 'Weighted Pull-ups', sets: '4×6' },
        { name: 'Barbell Row', sets: '4×8' },
        { name: 'Bicep Curls', sets: '3×10–12' },
        { name: 'Rear Delt Fly', sets: '3×15' },
      ]},
      { day: 'Sat', label: 'Long Z2 · 8–10 km', type: 'run', detail: 'Build to 10 km by week 8. HR ceiling 147. Fuel before.' },
      { day: 'Sun', label: 'Rest', type: 'rest', detail: 'Full rest. Sunday meal prep for the week.' },
    ],
  },
  {
    id: 'p4',
    name: 'Hold & Cut',
    weeks: '9–32',
    weekRange: [9, 32],
    color: '#fb923c',
    intent: 'Sustain Phase 3 structure. Real work is now in the kitchen. 0.3–0.4 kg/week fat loss.',
    weeklyTemplate: [
      { day: 'Mon', label: 'Upper (Push focus)', type: 'strength', detail: 'Same structure as Phase 3. Push to add 2.5 kg every 2 weeks.', exercises: [
        { name: 'Bench Press', sets: '4×5', note: '+2.5 kg every 2 weeks' },
        { name: 'OHP', sets: '4×6' },
        { name: 'Incline DB Press', sets: '3×10–12' },
        { name: 'Lateral Raises', sets: '3×15' },
        { name: 'Tricep Pushdown', sets: '3×12' },
        { name: 'Ab Work', sets: '3×15' },
      ]},
      { day: 'Tue', label: 'Z2 Run · 6–8 km', type: 'run', detail: 'Volume holds. Pace will naturally improve as body comp shifts.' },
      { day: 'Wed', label: 'Lower', type: 'strength', detail: 'Same as Phase 3. Protect legs in deficit — quality over volume.', exercises: [
        { name: 'Squat', sets: '4×5', note: 'Quality over volume in deficit' },
        { name: 'RDL', sets: '4×6' },
        { name: 'Leg Press', sets: '3×10' },
        { name: 'Hamstring Curl', sets: '3×12' },
        { name: 'Calf Raises', sets: '4×15' },
        { name: 'Core', sets: '3×15' },
      ]},
      { day: 'Thu', label: 'Speed / Tempo · 5–6 km', type: 'run', detail: 'Alternate weeks: intervals one week, tempo the next.' },
      { day: 'Fri', label: 'Pull', type: 'strength', detail: 'Same as Phase 3. Pull-up progression is the long-term flex.', exercises: [
        { name: 'Deadlift', sets: '3×5' },
        { name: 'Weighted Pull-ups', sets: '4×6', note: 'Long-term progression focus' },
        { name: 'Barbell Row', sets: '4×8' },
        { name: 'Bicep Curls', sets: '3×10–12' },
        { name: 'Rear Delt Fly', sets: '3×15' },
      ]},
      { day: 'Sat', label: 'Long Z2 · 10–12 km', type: 'run', detail: 'Race-prep distance. Sub-65 10K validation around week 16.' },
      { day: 'Sun', label: 'Rest', type: 'rest', detail: 'Sacred. Weigh in Sunday morning before water/coffee.' },
    ],
  },
];

const MILESTONES: Milestone[] = [
  { id: 'm1', sessions: 6, emoji: '🌱', title: 'Reentry complete', sub: 'Phase 1 done. Body remembers.' },
  { id: 'm2', sessions: 14, emoji: '🔥', title: 'First tempo run', sub: 'Aerobic engine waking up.' },
  { id: 'm3', sessions: 28, emoji: '⚙️', title: 'Full hybrid unlocked', sub: 'Phase 3 reached. 4-day split active.' },
  { id: 'm4', sessions: 56, emoji: '⚡', title: 'Sub-65 10K window', sub: 'Race-ready aerobic base built.' },
  { id: 'm5', sessions: 96, emoji: '🎯', title: 'Waist target 85cm', sub: 'Body comp goal in striking range.' },
  { id: 'm6', sessions: 168, emoji: '👑', title: 'Protocol complete', sub: '8 months. 15–17% BF. Lean & strong.' },
];

const NUTRITION = {
  calories: '1900–2100 kcal',
  protein: '150–170 g',
  carbs: '220–260 g',
  fat: '55–65 g',
};

// Plan start date
const START_DATE = new Date('2026-05-15T00:00:00');

// ----- HELPERS -----
const STORAGE_KEY = 'rebuild-protocol-state';

function getWeekNumber(date: Date = new Date()): number {
  const diff = date.getTime() - START_DATE.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.floor(days / 7) + 1);
}

function getDayIndex(date: Date = new Date()): number {
  // Monday = 0, Sunday = 6
  const d = date.getDay();
  return d === 0 ? 6 : d - 1;
}

function getPhaseForWeek(week: number): Phase {
  for (const p of PHASES) {
    if (week >= p.weekRange[0] && week <= p.weekRange[1]) return p;
  }
  return PHASES[PHASES.length - 1];
}

function sessionKey(week: number, dayIdx: number): string {
  return `w${week}-d${dayIdx}`;
}

// ----- MAIN COMPONENT -----
export default function RebuildProtocol(): React.ReactElement {
  const [tab, setTab] = useState<'today' | 'plan' | 'progress'>('today');
  const [completed, setCompleted] = useState<CompletedMap>({});
  const [loaded, setLoaded] = useState<boolean>(false);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  // Load from window.storage
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY);
        if (res && res.value) {
          setCompleted(JSON.parse(res.value) as CompletedMap);
        }
      } catch (e) {
        // key doesn't exist yet, that's fine
      }
      setLoaded(true);
    })();
  }, []);

  // Save to window.storage on change
  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify(completed));
      } catch (e) {
        console.error('storage error', e);
      }
    })();
  }, [completed, loaded]);

  const toggleSession = (week: number, dayIdx: number): void => {
    const k = sessionKey(week, dayIdx);
    setCompleted((c) => ({ ...c, [k]: !c[k] }));
  };

  const resetAll = async (): Promise<void> => {
    if (!confirm('Reset all progress? This cannot be undone.')) return;
    setCompleted({});
    try {
      await window.storage.delete(STORAGE_KEY);
    } catch (e) {}
  };

  const totalSessions = Object.values(completed).filter(Boolean).length;
  const currentWeek = getWeekNumber();
  const currentDay = getDayIndex();
  const currentPhase = getPhaseForWeek(currentWeek);
  const todaySession = currentPhase.weeklyTemplate[currentDay];
  const todayKey = sessionKey(currentWeek, currentDay);
  const todayDone = !!completed[todayKey];

  // Streak: consecutive completed sessions counting backward from yesterday
  const computeStreak = (): number => {
    let streak = 0;
    const today = new Date();
    for (let i = 1; i < 60; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      if (d < START_DATE) break;
      const w = getWeekNumber(d);
      const di = getDayIndex(d);
      const phase = getPhaseForWeek(w);
      const sess = phase.weeklyTemplate[di];
      if (sess.type === 'rest') continue; // rest days don't break streak
      const k = sessionKey(w, di);
      if (completed[k]) streak++;
      else break;
    }
    return streak;
  };
  const streak = computeStreak();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap');

        * { box-sizing: border-box; }

        .rp-root {
          font-family: 'Inter', sans-serif;
          background: #0a0e14;
          background-image:
            radial-gradient(circle at 20% 10%, rgba(34,211,238,0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(251,146,60,0.05) 0%, transparent 50%);
          min-height: 100vh;
          color: #e2e8f0;
          padding: 20px 16px 80px;
        }

        .rp-syne { font-family: 'Syne', sans-serif; letter-spacing: -0.02em; }
        .rp-mono { font-family: 'JetBrains Mono', monospace; }

        .rp-shell { max-width: 720px; margin: 0 auto; }

        .rp-header {
          padding: 8px 4px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 24px;
        }

        .rp-title {
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          line-height: 1;
          margin: 0;
        }
        .rp-title-accent {
          background: linear-gradient(120deg, #22d3ee 0%, #a78bfa 50%, #fb923c 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .rp-subtitle {
          font-size: 11px;
          color: #64748b;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-top: 8px;
          font-family: 'JetBrains Mono', monospace;
        }

        .rp-tabs {
          display: flex;
          gap: 4px;
          background: rgba(255,255,255,0.03);
          padding: 4px;
          border-radius: 10px;
          margin-bottom: 24px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .rp-tab {
          flex: 1;
          padding: 10px 12px;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          background: transparent;
          border: none;
          cursor: pointer;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: all 0.18s ease;
          font-family: 'JetBrains Mono', monospace;
        }
        .rp-tab.active {
          background: rgba(255,255,255,0.06);
          color: #fff;
          box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset;
        }
        .rp-tab:hover:not(.active) { color: #cbd5e1; }

        .rp-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 18px;
          margin-bottom: 14px;
        }

        .rp-card-label {
          font-size: 10px;
          color: #64748b;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 10px;
        }

        .rp-today-hero {
          background: linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(167,139,250,0.06) 100%);
          border: 1px solid rgba(34,211,238,0.18);
          border-radius: 16px;
          padding: 22px;
          margin-bottom: 16px;
        }

        .rp-today-day {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #22d3ee;
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 8px;
        }

        .rp-today-session {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 14px;
        }

        .rp-today-detail {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 18px;
        }

        .rp-done-btn {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
          font-family: 'JetBrains Mono', monospace;
        }
        .rp-done-btn.pending {
          background: #fff;
          color: #0a0e14;
        }
        .rp-done-btn.pending:hover { background: #22d3ee; }
        .rp-done-btn.done {
          background: rgba(74,222,128,0.12);
          color: #4ade80;
          border: 1px solid rgba(74,222,128,0.3);
        }

        .rp-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }

        .rp-stat-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 14px;
        }
        .rp-stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }
        .rp-stat-label {
          font-size: 10px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-top: 6px;
          font-family: 'JetBrains Mono', monospace;
        }

        .rp-phase-strip {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 14px;
          border-radius: 12px;
          margin-bottom: 14px;
          border: 1px solid;
        }
        .rp-phase-name {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
        }
        .rp-phase-meta {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.08em;
        }
        .rp-phase-intent {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 6px;
          line-height: 1.5;
        }

        .rp-week-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          margin-bottom: 8px;
          cursor: pointer;
        }
        .rp-week-header:hover { background: rgba(255,255,255,0.05); }
        .rp-week-title {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }
        .rp-week-progress {
          font-size: 11px;
          color: #64748b;
          font-family: 'JetBrains Mono', monospace;
        }

        .rp-day-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 12px;
          background: rgba(255,255,255,0.015);
          border-left: 2px solid;
          margin-bottom: 4px;
          border-radius: 0 6px 6px 0;
          font-size: 12px;
        }
        .rp-day-row.done {
          opacity: 0.4;
          text-decoration: line-through;
        }
        .rp-day-checkbox {
          width: 22px;
          height: 22px;
          min-width: 22px;
          margin-top: 1px;
          border-radius: 6px;
          border: 2px solid #64748b;
          background: rgba(255,255,255,0.04);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: #4ade80;
          font-weight: 700;
          transition: all 0.15s ease;
        }
        .rp-day-checkbox:hover { border-color: #94a3b8; background: rgba(255,255,255,0.08); }
        .rp-day-checkbox.checked {
          background: rgba(74,222,128,0.2);
          border-color: #4ade80;
        }
        .rp-day-day {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #64748b;
          letter-spacing: 0.1em;
          width: 28px;
        }
        .rp-day-content { flex: 1; }
        .rp-day-label { color: #e2e8f0; font-weight: 500; }
        .rp-day-detail { color: #64748b; font-size: 11px; margin-top: 2px; line-height: 1.5; }

        .rp-milestone {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          margin-bottom: 8px;
        }
        .rp-milestone.unlocked {
          background: rgba(74,222,128,0.06);
          border-color: rgba(74,222,128,0.2);
        }
        .rp-milestone-emoji {
          font-size: 22px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.04);
          border-radius: 8px;
        }
        .rp-milestone.unlocked .rp-milestone-emoji { background: rgba(74,222,128,0.12); }
        .rp-milestone-title {
          font-size: 13px;
          font-weight: 600;
          color: #cbd5e1;
        }
        .rp-milestone.unlocked .rp-milestone-title { color: #4ade80; }
        .rp-milestone-sub {
          font-size: 11px;
          color: #64748b;
          margin-top: 2px;
        }

        .rp-nutrition {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .rp-nutrition-row {
          padding: 10px 12px;
          background: rgba(255,255,255,0.02);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.04);
        }
        .rp-nutrition-key {
          font-size: 10px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: 'JetBrains Mono', monospace;
        }
        .rp-nutrition-val {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          margin-top: 4px;
        }

        .rp-reset {
          margin-top: 30px;
          padding: 10px;
          background: transparent;
          border: 1px solid rgba(239,68,68,0.2);
          color: rgba(239,68,68,0.7);
          border-radius: 8px;
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          width: 100%;
        }
        .rp-reset:hover { background: rgba(239,68,68,0.05); color: #ef4444; }

        .rp-progress-bar {
          height: 4px;
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 10px;
        }
        .rp-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #22d3ee, #a78bfa, #fb923c);
          transition: width 0.5s ease;
        }
      `}</style>

      <div className="rp-root">
        <div className="rp-shell">
          {/* Header */}
          <div className="rp-header">
            <h1 className="rp-title rp-syne">
              REBUILD <span className="rp-title-accent">PROTOCOL</span>
            </h1>
            <div className="rp-subtitle">8 months · lean + strong + runs</div>
          </div>

          {/* Tabs */}
          <div className="rp-tabs">
            <button className={`rp-tab ${tab === 'today' ? 'active' : ''}`} onClick={() => setTab('today')}>Today</button>
            <button className={`rp-tab ${tab === 'plan' ? 'active' : ''}`} onClick={() => setTab('plan')}>Plan</button>
            <button className={`rp-tab ${tab === 'progress' ? 'active' : ''}`} onClick={() => setTab('progress')}>Progress</button>
          </div>

          {/* TODAY TAB */}
          {tab === 'today' && (
            <>
              <div className="rp-today-hero">
                <div className="rp-today-day">
                  Week {currentWeek} · {currentPhase.name} · {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][currentDay]}
                </div>
                <div className="rp-today-session rp-syne">{todaySession.label}</div>
                <div className="rp-today-detail">{todaySession.detail}</div>
                {todaySession.exercises && (
                  <div style={{ marginBottom: 18 }}>
                    {todaySession.exercises.map((ex, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        padding: '8px 0',
                        borderBottom: i < todaySession.exercises!.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      }}>
                        <div>
                          <span style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500 }}>{ex.name}</span>
                          {ex.note && <span style={{ fontSize: 11, color: '#64748b', marginLeft: 8 }}>{ex.note}</span>}
                        </div>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#22d3ee', fontWeight: 600 }}>{ex.sets}</span>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  className={`rp-done-btn ${todayDone ? 'done' : 'pending'}`}
                  onClick={() => toggleSession(currentWeek, currentDay)}
                >
                  {todayDone ? '✓ Done' : todaySession.type === 'rest' ? 'Mark Rest Taken' : 'Mark Done'}
                </button>
              </div>

              <div className="rp-stats-grid">
                <div className="rp-stat-card">
                  <div className="rp-stat-value rp-syne">{totalSessions}</div>
                  <div className="rp-stat-label">Sessions logged</div>
                </div>
                <div className="rp-stat-card">
                  <div className="rp-stat-value rp-syne">{streak}</div>
                  <div className="rp-stat-label">Current streak</div>
                </div>
              </div>

              <div className="rp-card">
                <div className="rp-card-label">Daily Nutrition · Cut Phase</div>
                <div className="rp-nutrition">
                  <div className="rp-nutrition-row">
                    <div className="rp-nutrition-key">Calories</div>
                    <div className="rp-nutrition-val">{NUTRITION.calories}</div>
                  </div>
                  <div className="rp-nutrition-row">
                    <div className="rp-nutrition-key">Protein</div>
                    <div className="rp-nutrition-val">{NUTRITION.protein}</div>
                  </div>
                  <div className="rp-nutrition-row">
                    <div className="rp-nutrition-key">Carbs</div>
                    <div className="rp-nutrition-val">{NUTRITION.carbs}</div>
                  </div>
                  <div className="rp-nutrition-row">
                    <div className="rp-nutrition-key">Fat</div>
                    <div className="rp-nutrition-val">{NUTRITION.fat}</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* PLAN TAB */}
          {tab === 'plan' && (
            <>
              {PHASES.map((phase) => (
                <div key={phase.id}>
                  <div
                    className="rp-phase-strip"
                    style={{
                      background: `${phase.color}10`,
                      borderColor: `${phase.color}40`,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div className="rp-phase-name" style={{ color: phase.color }}>
                        {phase.name}
                      </div>
                      <div className="rp-phase-meta" style={{ color: phase.color }}>
                        WK {phase.weeks}
                      </div>
                    </div>
                    <div className="rp-phase-intent">{phase.intent}</div>
                  </div>

                  {/* Render each week in this phase */}
                  {Array.from({ length: phase.weekRange[1] - phase.weekRange[0] + 1 }).map((_, i) => {
                    const wk = phase.weekRange[0] + i;
                    if (phase.id === 'p4' && wk > 12 && wk !== 16 && wk !== 24 && wk !== 32) return null;
                    const doneCount = phase.weeklyTemplate.filter(
                      (s, idx) => s.type !== 'rest' && completed[sessionKey(wk, idx)]
                    ).length;
                    const totalCount = phase.weeklyTemplate.filter((s) => s.type !== 'rest').length;
                    const isExpanded = expandedWeek === wk;

                    return (
                      <div key={wk} style={{ marginBottom: 12 }}>
                        <div className="rp-week-header" onClick={() => setExpandedWeek(isExpanded ? null : wk)}>
                          <div className="rp-week-title">
                            Week {wk} {wk === currentWeek && <span style={{ color: '#22d3ee', fontSize: 10, marginLeft: 6 }}>· NOW</span>}
                          </div>
                          <div className="rp-week-progress">
                            {doneCount}/{totalCount} · {isExpanded ? '−' : '+'}
                          </div>
                        </div>
                        {isExpanded && (
                          <div style={{ marginBottom: 8 }}>
                            {phase.weeklyTemplate.map((sess, idx) => {
                              const k = sessionKey(wk, idx);
                              const done = !!completed[k];
                              const dayKey = `${wk}-${idx}`;
                              const isExpanded = expandedDay === dayKey;
                              return (
                                <div
                                  key={idx}
                                  className={`rp-day-row ${done ? 'done' : ''}`}
                                  style={{ borderLeftColor: phase.color + '70', flexDirection: 'column', gap: 0 }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, width: '100%' }}>
                                    <div
                                      className={`rp-day-checkbox ${done ? 'checked' : ''}`}
                                      onClick={(e) => { e.stopPropagation(); toggleSession(wk, idx); }}
                                    >
                                      {done ? '✓' : ''}
                                    </div>
                                    <div className="rp-day-day">{sess.day}</div>
                                    <div
                                      className="rp-day-content"
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => setExpandedDay(isExpanded ? null : dayKey)}
                                    >
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="rp-day-label">{sess.label}</div>
                                        <div style={{ fontSize: 10, color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
                                          {isExpanded ? '−' : '+'}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {isExpanded && (
                                    <div style={{
                                      marginTop: 12,
                                      padding: '18px',
                                      background: `linear-gradient(135deg, ${phase.color}12 0%, ${phase.color}06 100%)`,
                                      border: `1px solid ${phase.color}30`,
                                      borderRadius: 12,
                                    }}>
                                      <div style={{
                                        fontSize: 10,
                                        letterSpacing: '0.18em',
                                        textTransform: 'uppercase',
                                        color: phase.color,
                                        fontFamily: 'JetBrains Mono, monospace',
                                        marginBottom: 8,
                                      }}>
                                        Week {wk} · {phase.name} · {sess.day}
                                      </div>
                                      <div style={{
                                        fontFamily: 'Syne, sans-serif',
                                        fontSize: 22,
                                        fontWeight: 700,
                                        color: '#fff',
                                        lineHeight: 1.1,
                                        marginBottom: 12,
                                      }}>
                                        {sess.label}
                                      </div>
                                      <div style={{
                                        fontSize: 13,
                                        color: '#94a3b8',
                                        lineHeight: 1.6,
                                        marginBottom: sess.exercises ? 12 : 16,
                                      }}>
                                        {sess.detail}
                                      </div>
                                      {sess.exercises && (
                                        <div style={{ marginBottom: 16 }}>
                                          {sess.exercises.map((ex, ei) => (
                                            <div key={ei} style={{
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              alignItems: 'baseline',
                                              padding: '7px 0',
                                              borderBottom: ei < sess.exercises!.length - 1 ? `1px solid ${phase.color}18` : 'none',
                                            }}>
                                              <div>
                                                <span style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500 }}>{ex.name}</span>
                                                {ex.note && <span style={{ fontSize: 11, color: '#64748b', marginLeft: 8 }}>{ex.note}</span>}
                                              </div>
                                              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: phase.color, fontWeight: 600 }}>{ex.sets}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      <button
                                        className={`rp-done-btn ${done ? 'done' : 'pending'}`}
                                        onClick={(e) => { e.stopPropagation(); toggleSession(wk, idx); }}
                                      >
                                        {done ? '✓ Done' : sess.type === 'rest' ? 'Mark Rest Taken' : 'Mark Done'}
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {phase.id === 'p4' && (
                    <div style={{ fontSize: 11, color: '#475569', fontStyle: 'italic', padding: '4px 14px', marginBottom: 16 }}>
                      Showing weeks 9–12 + checkpoints (16, 24, 32). Phase 4 repeats the same template — log via Today tab.
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* PROGRESS TAB */}
          {tab === 'progress' && (
            <>
              <div className="rp-stats-grid">
                <div className="rp-stat-card">
                  <div className="rp-stat-value rp-syne">{totalSessions}</div>
                  <div className="rp-stat-label">Total sessions</div>
                </div>
                <div className="rp-stat-card">
                  <div className="rp-stat-value rp-syne">{currentWeek}</div>
                  <div className="rp-stat-label">Current week</div>
                </div>
                <div className="rp-stat-card">
                  <div className="rp-stat-value rp-syne" style={{ color: currentPhase.color }}>
                    {currentPhase.name}
                  </div>
                  <div className="rp-stat-label">Active phase</div>
                </div>
                <div className="rp-stat-card">
                  <div className="rp-stat-value rp-syne">{streak}</div>
                  <div className="rp-stat-label">Streak</div>
                </div>
              </div>

              <div className="rp-card">
                <div className="rp-card-label">Plan Completion</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <div className="rp-syne" style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>
                    {totalSessions} / 168
                  </div>
                  <div style={{ fontSize: 11, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>
                    {Math.round((totalSessions / 168) * 100)}%
                  </div>
                </div>
                <div className="rp-progress-bar">
                  <div
                    className="rp-progress-fill"
                    style={{ width: `${Math.min(100, (totalSessions / 168) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="rp-card">
                <div className="rp-card-label">Milestones</div>
                {MILESTONES.map((m) => {
                  const unlocked = totalSessions >= m.sessions;
                  return (
                    <div key={m.id} className={`rp-milestone ${unlocked ? 'unlocked' : ''}`}>
                      <div className="rp-milestone-emoji">{unlocked ? m.emoji : '🔒'}</div>
                      <div style={{ flex: 1 }}>
                        <div className="rp-milestone-title">{m.title}</div>
                        <div className="rp-milestone-sub">
                          {unlocked ? m.sub : `${m.sessions - totalSessions} sessions to unlock`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rp-card" style={{ background: 'rgba(34,211,238,0.04)', borderColor: 'rgba(34,211,238,0.15)' }}>
                <div className="rp-card-label" style={{ color: '#22d3ee' }}>The reality check</div>
                <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7 }}>
                  168 sessions over 32 weeks = ~5.25 sessions/week. Miss a session and the gap closes by skipping a future rest day or doubling up. Miss a week and you fall behind the body comp curve. Consistency &gt; intensity. The hardest part isn't the workouts — it's the kitchen.
                </div>
              </div>

              <button className="rp-reset" onClick={resetAll}>Reset all progress</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
