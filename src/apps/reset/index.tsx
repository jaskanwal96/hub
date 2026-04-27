import { useState, useEffect, useCallback } from 'react';
import type { Task } from './types';
import { TRACK_META, TIME_BLOCK_META } from './types';
import { DAYS } from './data';

const LS_TASKS = 'reset-tasks';
const LS_SUBTASKS = 'reset-subtasks';

function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveSet(key: string, s: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...s]));
}

function getTodayDayNum(): number {
  const start = new Date('2026-04-28T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return Math.max(1, Math.min(15, diff + 1));
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function TrackPill({ track }: { track: Task['track'] }) {
  const m = TRACK_META[track];
  return (
    <span style={{
      fontSize: 9, letterSpacing: '0.07em', padding: '2px 7px', borderRadius: 3,
      border: `1px solid ${m.color}33`, color: m.color, background: `${m.color}11`,
      whiteSpace: 'nowrap',
    }}>
      {m.icon} {m.label.toUpperCase()}
    </span>
  );
}

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div onClick={onChange} style={{
      width: 18, height: 18, borderRadius: 4, flexShrink: 0, cursor: 'pointer',
      border: `1px solid ${checked ? '#60a5fa' : '#334155'}`,
      background: checked ? 'rgba(96,165,250,0.15)' : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'border-color 0.12s, background 0.12s',
    }}>
      {checked && <span style={{ color: '#60a5fa', fontSize: 11, lineHeight: 1 }}>✓</span>}
    </div>
  );
}

function TaskRow({
  task, done, onToggle, subtasksDone, onToggleSub,
}: {
  task: Task;
  done: boolean;
  onToggle: () => void;
  subtasksDone: Set<string>;
  onToggleSub: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px',
        background: done ? 'rgba(96,165,250,0.03)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${done ? 'rgba(96,165,250,0.12)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 8,
      }}>
        <div style={{ paddingTop: 1 }}><Checkbox checked={done} onChange={onToggle} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 13, fontWeight: 600,
              color: done ? '#475569' : '#e2e8f0',
              textDecoration: done ? 'line-through' : 'none',
            }}>
              {task.title}
            </span>
            <TrackPill track={task.track} />
          </div>
          {task.desc && (
            <div style={{ fontSize: 11, color: '#475569', marginTop: 4, lineHeight: 1.6 }}>
              {task.desc}
            </div>
          )}
          {task.subtasks && task.subtasks.length > 0 && (
            <button onClick={() => setOpen(o => !o)} style={{
              marginTop: 6, fontSize: 10, color: '#60a5fa', background: 'none',
              border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'monospace',
              letterSpacing: '0.05em',
            }}>
              {open ? '▾ hide subtasks' : `▸ ${task.subtasks.length} subtasks`}
            </button>
          )}
          {open && task.subtasks && (
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {task.subtasks.map(st => {
                const stDone = subtasksDone.has(st.id);
                return (
                  <div key={st.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Checkbox checked={stDone} onChange={() => onToggleSub(st.id)} />
                    <span style={{
                      fontSize: 11,
                      color: stDone ? '#475569' : '#94a3b8',
                      textDecoration: stDone ? 'line-through' : 'none',
                    }}>
                      {st.title}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BlockSection({
  block, tasks, done, onToggle, subtasksDone, onToggleSub,
}: {
  block: Task['timeBlock'];
  tasks: Task[];
  done: Set<string>;
  onToggle: (id: string) => void;
  subtasksDone: Set<string>;
  onToggleSub: (id: string) => void;
}) {
  const m = TIME_BLOCK_META[block];
  const doneCount = tasks.filter(t => done.has(t.id)).length;

  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 15 }}>{m.icon}</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.12em' }}>
          {m.label.toUpperCase()}
        </span>
        <span style={{ fontSize: 9, color: '#334155' }}>{m.time}</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: '#475569' }}>
          {doneCount}/{tasks.length}
        </span>
      </div>
      {tasks.map(task => (
        <TaskRow
          key={task.id}
          task={task}
          done={done.has(task.id)}
          onToggle={() => onToggle(task.id)}
          subtasksDone={subtasksDone}
          onToggleSub={onToggleSub}
        />
      ))}
    </div>
  );
}

function ProgressBar({ value, color = '#60a5fa' }: { value: number; color?: string }) {
  return (
    <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${Math.round(value * 100)}%`,
        background: color, borderRadius: 2, transition: 'width 0.3s ease',
      }} />
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function Reset() {
  const [done, setDone] = useState<Set<string>>(() => loadSet(LS_TASKS));
  const [subsDone, setSubsDone] = useState<Set<string>>(() => loadSet(LS_SUBTASKS));
  const [view, setView] = useState<'day' | 'stats'>('day');
  const [selectedDay, setSelectedDay] = useState(getTodayDayNum);

  useEffect(() => { saveSet(LS_TASKS, done); }, [done]);
  useEffect(() => { saveSet(LS_SUBTASKS, subsDone); }, [subsDone]);

  const toggleTask = useCallback((id: string) => {
    setDone(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleSub = useCallback((id: string) => {
    setSubsDone(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const todayNum = getTodayDayNum();
  const day = DAYS[selectedDay - 1];
  const blocks: Task['timeBlock'][] = ['morning', 'midday', 'afternoon', 'evening'];

  // Stats
  const allTasks = DAYS.flatMap(d => d.tasks);
  const completedCount = allTasks.filter(t => done.has(t.id)).length;
  const overallPct = allTasks.length > 0 ? completedCount / allTasks.length : 0;

  const trackStats = (Object.keys(TRACK_META) as Task['track'][]).map(track => {
    const tasks = allTasks.filter(t => t.track === track);
    return { track, total: tasks.length, done: tasks.filter(t => done.has(t.id)).length };
  });

  function calcStreak(track: Task['track']): number {
    let streak = 0;
    for (const d of DAYS) {
      if (d.day > todayNum) break;
      const tasks = d.tasks.filter(t => t.track === track);
      if (tasks.length === 0) continue;
      if (tasks.every(t => done.has(t.id))) streak++;
      else break;
    }
    return streak;
  }

  const japStreak = calcStreak('japanese');
  const fitStreak = calcStreak('fitness');
  const daysLeft = Math.max(0, 15 - todayNum + 1);

  const todayTasks = DAYS[todayNum - 1]?.tasks ?? [];
  const focus = todayTasks.filter(t => !done.has(t.id)).slice(0, 3);

  return (
    <div style={{ minHeight: '100vh', background: '#07070f', color: '#e2e8f0', fontFamily: 'monospace', paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 20px',
        position: 'sticky', top: 0, background: '#07070f', zIndex: 10,
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 8, color: '#334155', letterSpacing: '0.2em' }}>CHANDIGARH RESET · APR 28 – MAY 12</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9', marginTop: 1 }}>15-Day Sprint</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['day', 'stats'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '5px 12px', fontSize: 9, letterSpacing: '0.1em', borderRadius: 5,
                border: '1px solid', cursor: 'pointer', fontFamily: 'monospace',
                background: view === v ? 'rgba(96,165,250,0.12)' : 'transparent',
                borderColor: view === v ? 'rgba(96,165,250,0.35)' : 'rgba(255,255,255,0.1)',
                color: view === v ? '#60a5fa' : '#475569',
              }}>
                {v === 'day' ? 'DAILY' : 'STATS'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 20px' }}>

        {/* ── Daily view ── */}
        {view === 'day' && (
          <>
            {/* Day navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 0 8px' }}>
              <button
                onClick={() => setSelectedDay(d => Math.max(1, d - 1))}
                disabled={selectedDay === 1}
                style={{
                  background: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6,
                  color: selectedDay === 1 ? '#1e293b' : '#94a3b8',
                  padding: '6px 12px', cursor: selectedDay === 1 ? 'default' : 'pointer',
                  fontFamily: 'monospace', fontSize: 13,
                }}
              >←</button>

              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: '#334155', letterSpacing: '0.15em' }}>DAY {selectedDay} OF 15</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', marginTop: 2 }}>{day.label}</div>
                {selectedDay === todayNum && (
                  <div style={{ fontSize: 9, color: '#60a5fa', marginTop: 2, letterSpacing: '0.1em' }}>TODAY</div>
                )}
              </div>

              <button
                onClick={() => setSelectedDay(d => Math.min(15, d + 1))}
                disabled={selectedDay === 15}
                style={{
                  background: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6,
                  color: selectedDay === 15 ? '#1e293b' : '#94a3b8',
                  padding: '6px 12px', cursor: selectedDay === 15 ? 'default' : 'pointer',
                  fontFamily: 'monospace', fontSize: 13,
                }}
              >→</button>
            </div>

            {selectedDay !== todayNum && (
              <div style={{ textAlign: 'center', marginBottom: 14 }}>
                <button onClick={() => setSelectedDay(todayNum)} style={{
                  fontSize: 10, color: '#60a5fa', background: 'none', border: 'none',
                  cursor: 'pointer', fontFamily: 'monospace', letterSpacing: '0.08em',
                }}>
                  → JUMP TO TODAY (DAY {todayNum})
                </button>
              </div>
            )}

            <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', margin: '12px 0 20px' }} />

            {blocks.map(block => {
              const tasks = day.tasks.filter(t => t.timeBlock === block);
              if (tasks.length === 0) return null;
              return (
                <BlockSection
                  key={block}
                  block={block}
                  tasks={tasks}
                  done={done}
                  onToggle={toggleTask}
                  subtasksDone={subsDone}
                  onToggleSub={toggleSub}
                />
              );
            })}
          </>
        )}

        {/* ── Stats view ── */}
        {view === 'stats' && (
          <div style={{ paddingTop: 20 }}>

            {/* Overall + days left */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
              <div style={{
                flex: 1, padding: '14px 16px',
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10,
              }}>
                <div style={{ fontSize: 9, color: '#475569', letterSpacing: '0.15em', marginBottom: 8 }}>OVERALL PROGRESS</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#f1f5f9' }}>{Math.round(overallPct * 100)}%</div>
                <div style={{ margin: '10px 0 6px' }}><ProgressBar value={overallPct} /></div>
                <div style={{ fontSize: 10, color: '#475569' }}>{completedCount} / {allTasks.length} tasks</div>
              </div>
              <div style={{
                width: 100, padding: '14px 16px', textAlign: 'center',
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10,
              }}>
                <div style={{ fontSize: 9, color: '#475569', letterSpacing: '0.15em', marginBottom: 8 }}>DAYS LEFT</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#fbbf24' }}>{daysLeft}</div>
              </div>
            </div>

            {/* Streaks */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
              {[
                { label: 'FITNESS STREAK', value: fitStreak, color: '#f97316' },
                { label: 'JAPANESE STREAK', value: japStreak, color: '#f43f5e' },
              ].map(s => (
                <div key={s.label} style={{
                  flex: 1, padding: '12px 14px',
                  background: 'rgba(255,255,255,0.02)', border: `1px solid ${s.color}22`, borderRadius: 10,
                }}>
                  <div style={{ fontSize: 9, color: '#475569', letterSpacing: '0.12em' }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: s.color, marginTop: 5 }}>
                    {s.value}<span style={{ fontSize: 11, color: '#475569', marginLeft: 4 }}>days</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Today's focus */}
            {focus.length > 0 && (
              <div style={{
                marginBottom: 20, padding: '14px 16px',
                background: 'rgba(96,165,250,0.03)', border: '1px solid rgba(96,165,250,0.14)', borderRadius: 10,
              }}>
                <div style={{ fontSize: 9, color: '#60a5fa', letterSpacing: '0.15em', marginBottom: 12 }}>
                  TODAY'S FOCUS — DAY {todayNum}
                </div>
                {focus.map(t => (
                  <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Checkbox checked={done.has(t.id)} onChange={() => toggleTask(t.id)} />
                    <span style={{ fontSize: 12, color: '#e2e8f0', flex: 1 }}>{t.title}</span>
                    <TrackPill track={t.track} />
                  </div>
                ))}
              </div>
            )}

            {/* Per-track breakdown */}
            <div style={{ fontSize: 9, color: '#475569', letterSpacing: '0.15em', marginBottom: 14 }}>PROGRESS BY TRACK</div>
            {trackStats.filter(s => s.total > 0).map(s => {
              const m = TRACK_META[s.track];
              const pct = s.total > 0 ? s.done / s.total : 0;
              return (
                <div key={s.track} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 14 }}>{m.icon}</span>
                    <span style={{ fontSize: 11, color: '#94a3b8', flex: 1 }}>{m.label}</span>
                    <span style={{ fontSize: 10, color: '#475569' }}>{s.done}/{s.total}</span>
                    <span style={{ fontSize: 10, color: m.color, width: 34, textAlign: 'right', fontWeight: 700 }}>
                      {Math.round(pct * 100)}%
                    </span>
                  </div>
                  <ProgressBar value={pct} color={m.color} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
