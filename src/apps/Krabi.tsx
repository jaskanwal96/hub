import { useState, useEffect, useMemo } from 'react';
import { Plus, X, Trash2, Calendar, RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'ao-nang-itinerary-v1';

type Activity = {
  id: string;
  time: string;
  title: string;
  notes: string;
};

type Day = {
  id: string;
  dayNumber: number;
  title: string;
  activities: Activity[];
};

type TripData = {
  tripTitle: string;
  subtitle: string;
  startDate: string | null;
  days: Day[];
};

type TripCtx =
  | { status: 'pre-trip' }
  | { status: 'scheduled'; daysUntil: number }
  | { status: 'done' }
  | { status: 'in-trip'; dayIndex: number; currentActivityId: string | null; nextActivityId: string | null };

const INITIAL: TripData = {
  tripTitle: 'Ao Nang',
  subtitle: 'three nights, solo',
  startDate: null,
  days: [
    {
      id: 'd1',
      dayNumber: 1,
      title: 'Arrival & Railay sunset',
      activities: [
        { id: 'a1', time: '14:00', title: 'Check in at Nomads', notes: 'Drop bags. Chat to reception about booking tours for Day 2 & 3 — cheaper and a good way to meet people.' },
        { id: 'a2', time: '15:30', title: 'Ao Nang Beach + longtail', notes: 'Walk the promenade, then grab a longtail from the pier — 200฿ return to Railay. Boats leave when full.' },
        { id: 'a3', time: '16:00', title: 'Railay West Beach for sunset', notes: 'The postcard beach. Walk across the peninsula to Phra Nang Cave Beach if time allows.' },
        { id: 'a4', time: '19:30', title: 'Ao Nang Landmark Night Market', notes: 'Dinner — grilled seafood, pad thai, mango sticky rice. Fire show most nights. 5 min walk from Nomads.' },
        { id: 'a5', time: '22:00', title: 'Hostel bar — lock in plans', notes: 'Find people for tomorrow\'s island tour.' },
      ],
    },
    {
      id: 'd2',
      dayNumber: 2,
      title: '4 Islands tour',
      activities: [
        { id: 'b1', time: '08:00', title: 'Tour pickup from Nomads', notes: 'Full day. Bring swimwear, reef-safe sunscreen, 500฿ cash for park fees.' },
        { id: 'b2', time: '09:00', title: 'Phra Nang Cave Beach', notes: 'First stop — swim, see the shrine cave.' },
        { id: 'b3', time: '10:30', title: 'Chicken Island + Tup Island', notes: 'Sandbar walk at low tide. Snorkel stop.' },
        { id: 'b4', time: '12:30', title: 'Ko Poda — lunch + snorkel', notes: 'Clearest water of the day.' },
        { id: 'b5', time: '17:00', title: 'Back to Ao Nang — shower & rest', notes: '' },
        { id: 'b6', time: '19:00', title: 'Krabi Town Night Market', notes: 'Fri/Sat/Sun only — more local and cheaper than Ao Nang\'s market. Otherwise: beachfront bars on Ao Nang.' },
      ],
    },
    {
      id: 'd3',
      dayNumber: 3,
      title: 'Dragon Crest & jungle pools',
      activities: [
        { id: 'c1', time: '06:00', title: 'Dragon Crest hike (Khao Ngon Nak)', notes: '3–4 hrs round trip. Start at dawn before the heat. 360° view at the top is unreal. Grippy shoes, 2L water, snacks. Officially 8am–2pm but hikers often start earlier and pay on the way back. ~30 min from Ao Nang.' },
        { id: 'c2', time: '12:00', title: 'Lunch + shower back in Ao Nang', notes: 'You\'ll earn it.' },
        { id: 'c3', time: '14:00', title: 'Emerald Pool + Blue Pool', notes: 'Short forest walk to a turquoise jungle pool. Tight to fit with Dragon Crest — consider swapping for Tiger Cave Temple instead, or skipping.' },
        { id: 'c4', time: '16:30', title: 'Krabi Hot Springs', notes: 'Natural warm pools to wind down. Only if you have the energy.' },
        { id: 'c5', time: '19:30', title: 'Farewell dinner + drinks', notes: 'Ao Nang beach bars or the hostel bar.' },
      ],
    },
  ],
};

function uid() { return Math.random().toString(36).slice(2, 9); }

function formatTime(hhmm: string): string {
  if (!hhmm) return '';
  const [h, m] = hhmm.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

export default function AoNangItinerary() {
  const [data, setData] = useState<TripData>(INITIAL);
  const [loaded, setLoaded] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [editing, setEditing] = useState<{ dayId: string; activity: Activity | null } | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY);
        if (res && res.value) setData(JSON.parse(res.value) as TripData);
      } catch (e) { /* use initial */ }
      finally { setLoaded(true); }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try { await window.storage.set(STORAGE_KEY, JSON.stringify(data)); }
      catch (e) { /* ignore */ }
    })();
  }, [data, loaded]);

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(i);
  }, []);

  const ctx = useMemo<TripCtx>(() => {
    if (!data.startDate) return { status: 'pre-trip' };
    const start = new Date(data.startDate + 'T00:00:00');
    const nowMid = new Date(now);
    nowMid.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((nowMid.getTime() - start.getTime()) / 86400000);
    if (diffDays < 0) return { status: 'scheduled', daysUntil: -diffDays };
    if (diffDays >= data.days.length) return { status: 'done' };

    const today = data.days[diffDays];
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const sorted = [...today.activities].sort((a, b) => a.time.localeCompare(b.time));
    let cur: string | null = null, nxt: string | null = null;
    for (const act of sorted) {
      const [h, m] = act.time.split(':').map(Number);
      const actMin = h * 60 + m;
      if (nowMinutes >= actMin) cur = act.id;
      else if (!nxt) nxt = act.id;
    }
    return { status: 'in-trip', dayIndex: diffDays, currentActivityId: cur, nextActivityId: nxt };
  }, [data, now]);

  useEffect(() => {
    if (ctx.status === 'in-trip' && ctx.dayIndex != null) setActiveDay(ctx.dayIndex);
  }, [ctx.status === 'in-trip' ? ctx.dayIndex : undefined, ctx.status]);

  const saveActivity = (dayId: string, activity: Activity) => {
    setData(d => ({
      ...d,
      days: d.days.map(day => {
        if (day.id !== dayId) return day;
        const exists = day.activities.some(a => a.id === activity.id);
        return {
          ...day,
          activities: exists
            ? day.activities.map(a => a.id === activity.id ? activity : a)
            : [...day.activities, activity],
        };
      }),
    }));
  };

  const deleteActivity = (dayId: string, activityId: string) => {
    setData(d => ({
      ...d,
      days: d.days.map(day => day.id === dayId
        ? { ...day, activities: day.activities.filter(a => a.id !== activityId) }
        : day),
    }));
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center">
        <div className="text-[#1A2332]/40 text-sm" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Loading…</div>
      </div>
    );
  }

  const day = data.days[activeDay];
  const sortedActivities = [...day.activities].sort((a, b) => a.time.localeCompare(b.time));
  const ctxInTrip = ctx.status === 'in-trip' ? ctx : null;

  return (
    <div className="min-h-screen bg-[#FDF8F0] text-[#1A2332] pb-24" style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500;1,9..144,600&family=Instrument+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }
        .grain {
          background-image: radial-gradient(circle at 1px 1px, rgba(26,35,50,0.05) 1px, transparent 0);
          background-size: 14px 14px;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .slide-up { animation: slideUp 200ms cubic-bezier(0.32, 0.72, 0, 1); }
      `}</style>

      {/* Header */}
      <header className="relative overflow-hidden border-b border-[#1A2332]/10">
        <div className="absolute inset-0 grain opacity-70"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#D97548]/15 blur-3xl"></div>
        <div className="relative px-5 pt-8 pb-7">
          <div className="flex items-center justify-between mb-5">
            <div className="text-[10px] tracking-[0.22em] uppercase text-[#D97548] font-semibold">
              Krabi · Thailand
            </div>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="p-1.5 text-[#1A2332]/40 hover:text-[#1A2332] transition-colors"
              aria-label="Reset itinerary"
            >
              <RefreshCw size={14} />
            </button>
          </div>
          <h1 className="font-display text-5xl leading-[0.92] tracking-tight font-normal">
            <span className="italic">{data.tripTitle}</span>
          </h1>
          <p className="font-display text-2xl leading-tight text-[#1A2332]/55 italic font-normal mt-1">
            {data.subtitle}
          </p>

          <button
            onClick={() => setShowDatePicker(true)}
            className="mt-6 inline-flex items-center gap-2 text-xs text-[#1A2332]/60 border border-[#1A2332]/15 rounded-full px-3.5 py-1.5 hover:border-[#D97548] hover:text-[#D97548] transition-all"
          >
            <Calendar size={12} />
            {data.startDate ? (
              <>
                Starts {new Date(data.startDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                {ctx.status === 'scheduled' && <> · in {ctx.daysUntil}d</>}
                {ctx.status === 'done' && <> · complete</>}
              </>
            ) : (
              <>Set trip start date</>
            )}
          </button>
        </div>
      </header>

      {/* Now / Next banner */}
      {ctxInTrip && (ctxInTrip.currentActivityId || ctxInTrip.nextActivityId) && (
        <CurrentBanner
          data={data}
          dayIndex={ctxInTrip.dayIndex}
          currentActivityId={ctxInTrip.currentActivityId}
          nextActivityId={ctxInTrip.nextActivityId}
          now={now}
          onJump={() => setActiveDay(ctxInTrip.dayIndex)}
        />
      )}

      {/* Day tabs */}
      <nav className="sticky top-0 bg-[#FDF8F0]/95 backdrop-blur-md z-20 border-b border-[#1A2332]/10">
        <div className="flex px-5">
          {data.days.map((d, i) => {
            const isActive = i === activeDay;
            const isToday = ctxInTrip?.dayIndex === i;
            return (
              <button
                key={d.id}
                onClick={() => setActiveDay(i)}
                className={`relative py-3.5 pr-5 first:pl-0 pl-5 transition-colors ${
                  isActive ? 'text-[#1A2332]' : 'text-[#1A2332]/35'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-lg italic">Day {d.dayNumber}</span>
                  {isToday && <span className="w-1.5 h-1.5 rounded-full bg-[#D97548]"></span>}
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-5 right-5 h-[2px] bg-[#1A2332]"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Day content */}
      <main className="px-5 py-7">
        <div className="mb-7">
          <div className="text-[10px] tracking-[0.22em] uppercase text-[#1A2332]/40 font-semibold mb-1.5">
            Day {day.dayNumber} · {sortedActivities.length} {sortedActivities.length === 1 ? 'thing' : 'things'}
          </div>
          <h2 className="font-display text-3xl leading-[1.1] font-normal">
            {day.title}
          </h2>
        </div>

        {sortedActivities.length === 0 ? (
          <div className="text-center py-12 text-[#1A2332]/40 text-sm">
            Nothing planned yet.
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-[22px] top-2 bottom-2 w-px bg-[#1A2332]/10"></div>
            <div className="space-y-1.5">
              {sortedActivities.map((act) => {
                const isCurrent = act.id === ctxInTrip?.currentActivityId && ctxInTrip?.dayIndex === activeDay;
                const isNext = act.id === ctxInTrip?.nextActivityId && ctxInTrip?.dayIndex === activeDay;
                return (
                  <ActivityCard
                    key={act.id}
                    activity={act}
                    isCurrent={isCurrent}
                    isNext={isNext}
                    onClick={() => setEditing({ dayId: day.id, activity: act })}
                  />
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={() => setEditing({ dayId: day.id, activity: null })}
          className="w-full mt-5 flex items-center justify-center gap-2 py-3.5 border border-dashed border-[#1A2332]/25 rounded-xl text-[#1A2332]/55 hover:border-[#D97548] hover:text-[#D97548] hover:bg-[#D97548]/5 transition-all text-sm"
        >
          <Plus size={15} />
          Add activity
        </button>
      </main>

      {editing && (
        <EditSheet
          editing={editing}
          onClose={() => setEditing(null)}
          onSave={(a) => { saveActivity(editing.dayId, a); setEditing(null); }}
          onDelete={(id) => { deleteActivity(editing.dayId, id); setEditing(null); }}
        />
      )}

      {showDatePicker && (
        <DatePickerSheet
          startDate={data.startDate}
          onSave={(d) => { setData(x => ({ ...x, startDate: d })); setShowDatePicker(false); }}
          onClear={() => { setData(x => ({ ...x, startDate: null })); setShowDatePicker(false); }}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {showResetConfirm && (
        <ConfirmSheet
          title="Reset itinerary?"
          body="Your edits will be discarded and the original 3-day plan restored."
          confirmLabel="Reset"
          onConfirm={() => { setData({ ...INITIAL, startDate: data.startDate }); setShowResetConfirm(false); }}
          onCancel={() => setShowResetConfirm(false)}
        />
      )}
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function CurrentBanner({ data, dayIndex, currentActivityId, nextActivityId, now, onJump }: {
  data: TripData;
  dayIndex: number;
  currentActivityId: string | null;
  nextActivityId: string | null;
  now: Date;
  onJump: () => void;
}) {
  const day = data.days[dayIndex];
  const sorted = [...day.activities].sort((a, b) => a.time.localeCompare(b.time));
  const currentAct = sorted.find(a => a.id === currentActivityId);
  const nextAct = sorted.find(a => a.id === nextActivityId);
  const act = currentAct ?? nextAct;
  if (!act) return null;

  const label = currentAct ? 'Happening now' : 'Up next';
  let timeDelta = '';
  if (nextAct) {
    const [h, m] = nextAct.time.split(':').map(Number);
    const diff = (h * 60 + m) - (now.getHours() * 60 + now.getMinutes());
    if (diff > 0 && diff < 180) timeDelta = `in ${diff} min`;
  }

  return (
    <div className="px-5 pt-5 pb-1">
      <button
        onClick={onJump}
        className="w-full text-left bg-[#1A2332] text-[#FDF8F0] rounded-2xl p-5 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#D97548]/25 blur-3xl -translate-y-1/3 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#4A8B7C]/15 blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[#D97548] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97548] animate-pulse"></span>
              {label}
            </span>
            <span className="text-xs opacity-60 tabular-nums">
              {formatTime(act.time)}{timeDelta && !currentAct ? ` · ${timeDelta}` : ''}
            </span>
          </div>
          <h3 className="font-display text-2xl leading-[1.15] mb-1.5 font-normal">{act.title}</h3>
          {act.notes && <p className="text-sm opacity-65 line-clamp-2 leading-relaxed">{act.notes}</p>}
        </div>
      </button>
    </div>
  );
}

function ActivityCard({ activity, isCurrent, isNext, onClick }: {
  activity: Activity;
  isCurrent: boolean;
  isNext: boolean;
  onClick: () => void;
}) {
  const ring = isCurrent
    ? 'bg-[#D97548]/8 ring-2 ring-[#D97548]/40'
    : isNext
      ? 'bg-[#1A2332]/3 ring-1 ring-[#1A2332]/15'
      : 'hover:bg-[#1A2332]/4';

  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left flex gap-4 p-3.5 pl-0 rounded-xl transition-all ${ring}`}
    >
      <div className="flex-shrink-0 w-12 flex flex-col items-center">
        <div className={`relative mt-1 w-3 h-3 rounded-full border-2 ${
          isCurrent ? 'bg-[#D97548] border-[#D97548]' :
          isNext ? 'bg-[#FDF8F0] border-[#1A2332]' :
          'bg-[#FDF8F0] border-[#1A2332]/30'
        }`}>
          {isCurrent && <div className="absolute inset-0 rounded-full bg-[#D97548] animate-ping opacity-40"></div>}
        </div>
      </div>
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-baseline gap-2 mb-0.5">
          <div className={`text-xs font-semibold tabular-nums ${isCurrent ? 'text-[#D97548]' : 'text-[#1A2332]/55'}`}>
            {formatTime(activity.time)}
          </div>
          {isCurrent && <span className="text-[9px] tracking-[0.22em] uppercase font-bold text-[#D97548]">Now</span>}
          {isNext && <span className="text-[9px] tracking-[0.22em] uppercase font-bold text-[#1A2332]/50">Next</span>}
        </div>
        <h4 className="font-display text-lg leading-snug mb-1 font-normal">
          {activity.title}
        </h4>
        {activity.notes && (
          <p className="text-sm text-[#1A2332]/60 leading-relaxed">
            {activity.notes}
          </p>
        )}
      </div>
    </button>
  );
}

function Sheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#1A2332]/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#FDF8F0] w-full max-w-md rounded-t-3xl p-6 pb-10 max-h-[92vh] overflow-y-auto slide-up"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function EditSheet({ editing, onClose, onSave, onDelete }: {
  editing: { dayId: string; activity: Activity | null };
  onClose: () => void;
  onSave: (a: Activity) => void;
  onDelete: (id: string) => void;
}) {
  const isNew = !editing.activity;
  const [time, setTime] = useState(editing.activity?.time ?? '12:00');
  const [title, setTitle] = useState(editing.activity?.title ?? '');
  const [notes, setNotes] = useState(editing.activity?.notes ?? '');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const save = () => {
    if (!title.trim()) return;
    onSave({ id: editing.activity?.id ?? uid(), time, title: title.trim(), notes: notes.trim() });
  };

  return (
    <Sheet onClose={onClose}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-2xl italic font-normal">{isNew ? 'New activity' : 'Edit activity'}</h3>
        <button onClick={onClose} className="p-1 text-[#1A2332]/40 hover:text-[#1A2332]">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] tracking-[0.22em] uppercase font-semibold text-[#1A2332]/50 mb-2">Time</label>
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#1A2332]/15 rounded-xl text-base focus:outline-none focus:border-[#D97548] focus:ring-2 focus:ring-[#D97548]/20"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.22em] uppercase font-semibold text-[#1A2332]/50 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="What's happening?"
            autoFocus={isNew}
            className="w-full px-4 py-3 bg-white border border-[#1A2332]/15 rounded-xl text-base focus:outline-none focus:border-[#D97548] focus:ring-2 focus:ring-[#D97548]/20"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.22em] uppercase font-semibold text-[#1A2332]/50 mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Add details, tips, reminders…"
            rows={4}
            className="w-full px-4 py-3 bg-white border border-[#1A2332]/15 rounded-xl text-sm focus:outline-none focus:border-[#D97548] focus:ring-2 focus:ring-[#D97548]/20 resize-none"
          />
        </div>
      </div>

      <div className="mt-7 flex gap-3">
        <button
          onClick={save}
          disabled={!title.trim()}
          className="flex-1 bg-[#1A2332] text-[#FDF8F0] py-3.5 rounded-xl font-semibold text-sm hover:bg-[#D97548] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isNew ? 'Add activity' : 'Save changes'}
        </button>
        {!isNew && (
          <button
            onClick={() => setConfirmDelete(true)}
            className="px-4 py-3.5 text-[#1A2332]/50 hover:text-red-600 hover:bg-red-50 border border-[#1A2332]/15 hover:border-red-200 rounded-xl transition-all"
            aria-label="Delete activity"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {confirmDelete && editing.activity && (
        <div className="mt-5 p-4 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-sm text-red-900 mb-3">Delete "{editing.activity.title}"?</p>
          <div className="flex gap-2">
            <button
              onClick={() => onDelete(editing.activity!.id)}
              className="flex-1 bg-red-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="flex-1 border border-red-200 text-red-900 py-2.5 rounded-lg text-sm hover:bg-red-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Sheet>
  );
}

function DatePickerSheet({ startDate, onSave, onClear, onClose }: {
  startDate: string | null;
  onSave: (d: string) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  const [date, setDate] = useState(startDate ?? new Date().toISOString().slice(0, 10));
  return (
    <Sheet onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-2xl italic font-normal">Trip starts on</h3>
        <button onClick={onClose} className="p-1 text-[#1A2332]/40 hover:text-[#1A2332]">
          <X size={20} />
        </button>
      </div>
      <p className="text-sm text-[#1A2332]/60 mb-5 leading-relaxed">
        Setting this lets the app highlight what's happening right now on each day of your trip.
      </p>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="w-full px-4 py-3 bg-white border border-[#1A2332]/15 rounded-xl text-base focus:outline-none focus:border-[#D97548] focus:ring-2 focus:ring-[#D97548]/20"
      />
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => onSave(date)}
          className="flex-1 bg-[#1A2332] text-[#FDF8F0] py-3.5 rounded-xl font-semibold text-sm hover:bg-[#D97548] transition-colors"
        >
          Save
        </button>
        {startDate && (
          <button
            onClick={onClear}
            className="px-4 py-3.5 text-[#1A2332]/50 hover:text-[#1A2332] border border-[#1A2332]/15 rounded-xl transition-colors text-sm"
          >
            Clear
          </button>
        )}
      </div>
    </Sheet>
  );
}

function ConfirmSheet({ title, body, confirmLabel, onConfirm, onCancel }: {
  title: string;
  body: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Sheet onClose={onCancel}>
      <h3 className="font-display text-2xl italic font-normal mb-2">{title}</h3>
      <p className="text-sm text-[#1A2332]/60 mb-6 leading-relaxed">{body}</p>
      <div className="flex gap-3">
        <button
          onClick={onConfirm}
          className="flex-1 bg-red-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors"
        >
          {confirmLabel}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 border border-[#1A2332]/15 text-[#1A2332] py-3.5 rounded-xl text-sm hover:bg-[#1A2332]/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </Sheet>
  );
}
