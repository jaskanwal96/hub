import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const gymExercises = {
  push: [
    { name: "Flat Barbell / DB Bench Press", sets: "4 × 8–10", note: "Primary chest builder. Control the descent." },
    { name: "Incline DB Press", sets: "3 × 10–12", note: "Upper chest. Don't flare elbows." },
    { name: "Cable Chest Fly", sets: "3 × 12–15", note: "Squeeze at the top. Light weight, full stretch." },
    { name: "Seated DB Shoulder Press", sets: "3 × 10–12", note: "Neutral grip if shoulders feel tight." },
    { name: "Lateral Raises", sets: "3 × 15–20", note: "Slow and controlled. Ego kills this exercise." },
    { name: "Tricep Rope Pushdown", sets: "3 × 12–15", note: "Elbows pinned. Full extension at the bottom." },
    { name: "Overhead Tricep Extension", sets: "3 × 12", note: "Long head emphasis. Great for arm size." },
  ],
  pull: [
    { name: "Pull-ups / Lat Pulldown", sets: "4 × 8–10", note: "Full range. Squeeze lats at the bottom." },
    { name: "Seated Cable Row", sets: "3 × 10–12", note: "Drive elbows back, not hands. Chest tall." },
    { name: "Single-Arm DB Row", sets: "3 × 10 each", note: "Full stretch at the bottom. Big range of motion." },
    { name: "Face Pulls", sets: "3 × 15–20", note: "Rear delts + rotator cuff. Light weight always." },
    { name: "Rear Delt Fly (cable or DB)", sets: "3 × 15", note: "Often neglected. Key for shoulder health." },
    { name: "Barbell / DB Curl", sets: "3 × 10–12", note: "Supinate at the top. Don't swing." },
    { name: "Hammer Curl", sets: "2 × 12", note: "Brachialis focus. Good for arm thickness." },
  ],
  legs: [
    { name: "Barbell Back Squat", sets: "4 × 8–10", note: "King of leg exercises. Depth > weight." },
    { name: "Romanian Deadlift (RDL)", sets: "3 × 10–12", note: "Hamstring stretch is the goal. Hinge, don't squat." },
    { name: "Leg Press", sets: "3 × 12–15", note: "Feet high = hamstrings. Feet low = quads." },
    { name: "Walking Lunges", sets: "3 × 12 each leg", note: "Great for glutes and balance. Go slow." },
    { name: "Leg Curl (machine)", sets: "3 × 12–15", note: "Hamstring isolation. Don't rush the reps." },
    { name: "Calf Raises", sets: "4 × 15–20", note: "Slow eccentric. Most people rush these." },
    { name: "Core: Plank or Dead Bug", sets: "3 × 30–45s", note: "Running needs a strong core. Don't skip." },
  ],
};

const weeks = [
  {
    label: "Wk 1–2", subtitle: "Foundation & Recovery",
    days: [
      { day: "Mon", type: "gym",  label: "Push Day",      detail: "Moderate weight, full range. Not a PR session — build the pattern.", exercises: gymExercises.push },
      { day: "Tue", type: "run",  label: "Z2 Easy Run",   detail: "3km at 6:30–7:30/km. Embarrassingly slow. Talk test.", zone: "Z2" },
      { day: "Wed", type: "gym",  label: "Pull Day",      detail: "Focus on mind-muscle connection. Feel the stretch on every rep.", exercises: gymExercises.pull },
      { day: "Thu", type: "rest", label: "Rest / Walk",   detail: "Light 20min walk or full rest. No guilt." },
      { day: "Fri", type: "run",  label: "Z4 Tempo",      detail: "1km warmup Z2 → 2km at Z4 (5:13–5:34/km) → cooldown.", zone: "Z4" },
      { day: "Sat", type: "gym",  label: "Legs Day",      detail: "Avoid failure. Leave 2 reps in the tank on every set.", exercises: gymExercises.legs },
      { day: "Sun", type: "rest", label: "Rest",          detail: "Full recovery. Sleep. Eat well." },
    ]
  },
  {
    label: "Wk 3–4", subtitle: "Build Aerobic Base",
    days: [
      { day: "Mon", type: "gym",  label: "Push Day",        detail: "Progress weights slightly. Same exercises, slightly heavier.", exercises: gymExercises.push },
      { day: "Tue", type: "run",  label: "Z2 Easy Run",     detail: "3km Z2. Same pace. Consistency > intensity here.", zone: "Z2" },
      { day: "Wed", type: "rest", label: "Rest / Walk",     detail: "Active recovery — stretch, foam roll, 20min walk." },
      { day: "Thu", type: "run",  label: "Z4–Z5 Intervals", detail: "400m at Z5 pace × 4 reps, 90s rest. Then 1km Z2 cooldown.", zone: "Z5" },
      { day: "Fri", type: "gym",  label: "Pull Day",        detail: "Back · Biceps. Keep it controlled, no ego lifting.", exercises: gymExercises.pull },
      { day: "Sat", type: "run",  label: "Z2 Long-ish",    detail: "4–5km easy. First time going beyond 3km. Stay Z2.", zone: "Z2" },
      { day: "Sun", type: "rest", label: "Rest",            detail: "Full rest. This is when fitness actually builds." },
    ]
  },
  {
    label: "Wk 5–6", subtitle: "Race Sharpening",
    days: [
      { day: "Mon", type: "gym",  label: "Push (maintain)", detail: "Reduce volume by 1 set each. Maintain, don't build.", exercises: gymExercises.push.slice(0,5) },
      { day: "Tue", type: "run",  label: "Z4 Tempo",        detail: "2km warmup → 2km at goal race pace → 1km cooldown.", zone: "Z4" },
      { day: "Wed", type: "rest", label: "Rest",            detail: "Full rest. Legs need to be fresh." },
      { day: "Thu", type: "run",  label: "Z2 Easy",         detail: "Easy 3km. Shake out the legs, keep confidence.", zone: "Z2" },
      { day: "Fri", type: "gym",  label: "Pull (light)",    detail: "Drop weight 20%, high reps. No legs at all.", exercises: gymExercises.pull.slice(0,5) },
      { day: "Sat", type: "run",  label: "Race Prep Run",   detail: "2km easy + 4× 20s strides at race pace. Stay loose.", zone: "Z2" },
      { day: "Sun", type: "race", label: "🏁 RACE DAY",     detail: "Warm up 10min easy. Go out controlled. Finish strong." },
    ]
  }
];

const allTrainingDays = weeks.flatMap((w, wi) =>
  w.days.map((d, di) => ({ ...d, id: `${wi}-${di}` })).filter(d => d.type !== "rest")
);

const expectedCurve = [0,8,15,21,27,32,37,41,45,49,52,55,58,60,63,65,67,69,71,72,74,75,76,78,79,80,81,82,83,84,85,86,87,88,89,89,90,91,92,93,94,95,96,97,98,99,100];

const TYPE = {
  gym:  { color: "#fb923c", bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.22)",  icon: "🏋️", tag: "GYM" },
  run:  { color: "#22d3ee", bg: "rgba(34,211,238,0.07)",  border: "rgba(34,211,238,0.22)",  icon: "🏃", tag: "RUN" },
  rest: { color: "#475569", bg: "rgba(71,85,105,0.06)",   border: "rgba(71,85,105,0.15)",   icon: "😴", tag: "REST" },
  race: { color: "#fbbf24", bg: "rgba(251,191,36,0.09)",  border: "rgba(251,191,36,0.32)",  icon: "🏁", tag: "RACE" },
};
const ZC = { Z2: "#60a5fa", Z4: "#fb923c", Z5: "#f87171" };

export default function App() {
  const [tab, setTab] = useState("schedule");
  const [activeWeek, setActiveWeek] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem("fitness-done") || "{}"); }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem("fitness-done", JSON.stringify(done));
  }, [done]);

  const toggle = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDone(p => ({ ...p, [id]: !p[id] }));
  };

  const total = allTrainingDays.length;
  const doneCount = allTrainingDays.filter(d => done[d.id]).length;
  const pct = Math.round((doneCount / total) * 100);
  const gain = expectedCurve[Math.min(doneCount, expectedCurve.length - 1)] || 0;
  const week = weeks[activeWeek];

  const S = {
    root: { minHeight: "100vh", background: "#07070f", color: "#e2e8f0", fontFamily: "monospace" },
    header: { background: "rgba(7,7,15,0.97)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 20px 13px" },
    tabs: { display: "flex", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "#07070f" },
  };

  return (
    <div style={S.root}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
      {/* HEADER */}
      <div style={S.header}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 9, color: "#334155", textDecoration: "none", letterSpacing: "0.1em", marginBottom: 12 }}>
          ← HUB
        </Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 11 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "#22d3ee", marginBottom: 3 }}>40-DAY PLAN · TOKYO</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>5K Finish Strong</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#22d3ee", lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontSize: 9, color: "#334155", marginTop: 2 }}>{doneCount}/{total} sessions</div>
          </div>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,#0e7490,#22d3ee)", borderRadius: 2, transition: "width 0.5s" }} />
        </div>
      </div>

      {/* TABS */}
      <div style={S.tabs}>
        {[["schedule","SCHEDULE"],["checklist","CHECKLIST"],["progress","PROGRESS"]].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: "11px 4px", background: "none", border: "none",
            borderBottom: `2px solid ${tab===k?"#22d3ee":"transparent"}`,
            color: tab===k?"#22d3ee":"#334155", fontSize: 9, cursor: "pointer",
            fontFamily: "monospace", letterSpacing: "0.12em",
          }}>{l}</button>
        ))}
      </div>

      {/* ── SCHEDULE ── */}
      {tab === "schedule" && (
        <div style={{ padding: "12px 20px 40px" }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 4 }}>
            {weeks.map((w, i) => (
              <button key={i} onClick={() => { setActiveWeek(i); setExpanded(null); }} style={{
                flex: 1, padding: "7px 4px", borderRadius: 6, fontSize: 9, fontFamily: "monospace",
                border: `1px solid ${activeWeek===i?"rgba(34,211,238,0.45)":"rgba(255,255,255,0.07)"}`,
                background: activeWeek===i?"rgba(34,211,238,0.08)":"transparent",
                color: activeWeek===i?"#22d3ee":"#3d5066", cursor: "pointer",
              }}>{w.label}</button>
            ))}
          </div>
          <div style={{ fontSize: 9, color: "#2d3f52", letterSpacing: "0.12em", marginBottom: 10, textTransform: "uppercase" }}>{week.subtitle}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {week.days.map((d, i) => {
              const cfg = TYPE[d.type as keyof typeof TYPE];
              const isExp = expanded === i;
              const id = `${activeWeek}-${i}`;
              const isDone = !!done[id];
              const isRest = d.type === "rest";
              return (
                <div key={i} onClick={() => setExpanded(isExp ? null : i)} style={{
                  background: isExp ? cfg.bg : isDone ? "rgba(34,197,94,0.05)" : isRest ? "transparent" : "rgba(255,255,255,0.015)",
                  border: `1px solid ${isExp ? cfg.border : isDone ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 10, padding: "12px 14px", cursor: "pointer", opacity: isRest && !isExp ? 0.4 : 1,
                  transition: "all 0.18s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ fontSize: 9, color: "#2d3f52", width: 22, flexShrink: 0 }}>{d.day}</div>
                    <div style={{ fontSize: 15 }}>{cfg.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: isDone?"#4ade80":isExp?cfg.color:"#cbd5e1", textDecoration: isDone?"line-through":"none", opacity: isDone?0.6:1 }}>{d.label}</span>
                        <span style={{ fontSize: 8, color: cfg.color, border: `1px solid ${cfg.border}`, borderRadius: 3, padding: "1px 4px" }}>{cfg.tag}</span>
                      </div>
                      {isExp && (
                        <div style={{ marginTop: 10 }}>
                          <div style={{ fontSize: 11, color: "#7f96b0", lineHeight: 1.7, marginBottom: 10 }}>{d.detail}</div>
                          {d.exercises && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
                              {d.exercises.map((ex, ei) => (
                                <div key={ei} style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 7, padding: "9px 11px" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                                    <div style={{ fontSize: 11, fontWeight: 600, color: "#e2e8f0" }}>{ex.name}</div>
                                    <div style={{ fontSize: 8, color: cfg.color, border: `1px solid ${cfg.border}`, borderRadius: 3, padding: "2px 5px", whiteSpace: "nowrap", flexShrink: 0 }}>{ex.sets}</div>
                                  </div>
                                  <div style={{ fontSize: 10, color: "#3d5066", marginTop: 3, lineHeight: 1.5 }}>{ex.note}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          {!isRest && (
                            <button onClick={e => toggle(id, e)} style={{
                              padding: "7px 14px", borderRadius: 7, fontSize: 10, fontFamily: "monospace", cursor: "pointer",
                              background: isDone?"rgba(34,197,94,0.1)":"rgba(34,211,238,0.08)",
                              border: `1px solid ${isDone?"rgba(34,197,94,0.3)":"rgba(34,211,238,0.25)"}`,
                              color: isDone?"#4ade80":"#22d3ee",
                            }}>{isDone ? "✓  LOGGED" : "MARK DONE"}</button>
                          )}
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      {d.zone && <div style={{ fontSize: 8, fontWeight: 700, color: ZC[d.zone as keyof typeof ZC], border: `1px solid ${ZC[d.zone as keyof typeof ZC]}40`, borderRadius: 3, padding: "1px 5px" }}>{d.zone}</div>}
                      {isDone && !isExp && <span style={{ fontSize: 10, color: "#4ade80" }}>✓</span>}
                      <span style={{ color: "#1e2d3d", fontSize: 9, display: "inline-block", transform: isExp?"rotate(180deg)":"none", transition: "transform 0.2s" }}>▼</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 20, padding: "15px", background: "rgba(34,211,238,0.03)", border: "1px solid rgba(34,211,238,0.09)", borderRadius: 10 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.18em", color: "#22d3ee", marginBottom: 10, textTransform: "uppercase" }}>Key Rules</div>
            {[["Z2 pace","6:30–7:30/km. Can't hold a sentence? Slow down."],["Z4 pace","5:13–5:34/km. Comfortably hard."],["Z5 pace","4:54–5:13/km. Hard but not sprinting."],["Football","Replace Legs day. Rest day after."],["Week 6","Cut gym volume. Protect legs before race."]].map(([t,desc],i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: i<4?7:0, fontSize: 10 }}>
                <div style={{ color: "#22d3ee", flexShrink: 0, minWidth: 62 }}>{t}</div>
                <div style={{ color: "#3d5066", lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CHECKLIST ── */}
      {tab === "checklist" && (
        <div style={{ padding: "14px 20px 40px" }}>
          <div style={{ fontSize: 10, color: "#2d3f52", marginBottom: 18, lineHeight: 1.7 }}>Tap a session to log it. Every tick counts.</div>
          {weeks.map((w, wi) => (
            <div key={wi} style={{ marginBottom: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ fontSize: 9, letterSpacing: "0.15em", color: "#3d5066", textTransform: "uppercase" }}>{w.label}</div>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
                <div style={{ fontSize: 9, color: "#1e2d3d" }}>{w.subtitle}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {w.days.map((d, di) => {
                  if (d.type === "rest") return null;
                  const id = `${wi}-${di}`;
                  const isDone = !!done[id];
                  const cfg = TYPE[d.type as keyof typeof TYPE];
                  return (
                    <div key={di} onClick={() => toggle(id)} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", borderRadius: 8, cursor: "pointer",
                      background: isDone?"rgba(34,197,94,0.06)":"rgba(255,255,255,0.013)",
                      border: `1px solid ${isDone?"rgba(34,197,94,0.2)":"rgba(255,255,255,0.05)"}`,
                      transition: "all 0.15s",
                    }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, border: `1.5px solid ${isDone?"#4ade80":"rgba(255,255,255,0.1)"}`, background: isDone?"rgba(34,197,94,0.15)":"transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#4ade80" }}>{isDone?"✓":""}</div>
                      <div style={{ fontSize: 14 }}>{cfg.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: isDone?"#4ade80":"#cbd5e1", textDecoration: isDone?"line-through":"none", opacity: isDone?0.55:1 }}>{d.day} — {d.label}</div>
                        <div style={{ fontSize: 9, color: "#1e2d3d", marginTop: 1 }}>{w.label}</div>
                      </div>
                      {d.zone && <div style={{ fontSize: 8, fontWeight: 700, color: ZC[d.zone as keyof typeof ZC], border: `1px solid ${ZC[d.zone as keyof typeof ZC]}35`, borderRadius: 3, padding: "1px 5px" }}>{d.zone}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── PROGRESS ── */}
      {tab === "progress" && (
        <div style={{ padding: "18px 20px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
            {[
              { label: "Sessions Done",  value: doneCount,       sub: `of ${total}`,        color: "#22d3ee" },
              { label: "Plan Complete",  value: `${pct}%`,       sub: "sessions logged",    color: "#60a5fa" },
              { label: "Fitness Gained", value: `${gain}%`,      sub: "of your potential",  color: "#4ade80" },
              { label: "Sessions Left",  value: total-doneCount, sub: "to race day",        color: "#fb923c" },
            ].map((c, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "14px" }}>
                <div style={{ fontSize: 8, color: "#2d3f52", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: c.color, lineHeight: 1 }}>{c.value}</div>
                <div style={{ fontSize: 9, color: "#1e2d3d", marginTop: 4 }}>{c.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "16px", marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0", marginBottom: 2 }}>Fitness Gain Curve</div>
            <div style={{ fontSize: 9, color: "#2d3f52", marginBottom: 14 }}>Expected vs your actual progress</div>
            <svg viewBox="0 0 300 115" style={{ width: "100%", overflow: "visible" }}>
              <defs>
                <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0e7490"/>
                  <stop offset="100%" stopColor="#4ade80"/>
                </linearGradient>
              </defs>
              {[0,25,50,75,100].map(y => (
                <g key={y}>
                  <line x1="0" y1={100-y} x2="300" y2={100-y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                  <text x="-3" y={103-y} fontSize="6" fill="#1e2d3d" textAnchor="end">{y}</text>
                </g>
              ))}
              <polyline
                points={expectedCurve.map((v,i)=>`${(i/(expectedCurve.length-1))*300},${100-v}`).join(" ")}
                fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" opacity="0.4"
              />
              {doneCount > 0 && (
                <polyline
                  points={Array.from({length:doneCount+1},(_,i)=>`${(i/total)*300},${100-(expectedCurve[i]||0)}`).join(" ")}
                  fill="none" stroke="url(#lg2)" strokeWidth="2.5" strokeLinecap="round"
                />
              )}
              {doneCount > 0
                ? <circle cx={(doneCount/total)*300} cy={100-gain} r="4" fill="#4ade80" stroke="#07070f" strokeWidth="2"/>
                : <circle cx="0" cy="100" r="3.5" fill="#334155" stroke="#07070f" strokeWidth="1.5"/>
              }
              {["Start","Wk 2","Wk 4","Race"].map((l,i)=>(
                <text key={i} x={i*100} y="113" fontSize="6" fill="#1e2d3d" textAnchor="middle">{l}</text>
              ))}
            </svg>
            <div style={{ display: "flex", gap: 14, marginTop: 9 }}>
              {[["#3b82f6","Expected"],["#4ade80","Your progress"]].map(([c,l])=>(
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9, color: "#3d5066" }}>
                  <div style={{ width: 14, height: 2, background: c, borderRadius: 1 }}/>{l}
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 9, letterSpacing: "0.15em", color: "#3d5066", textTransform: "uppercase", marginBottom: 8 }}>Milestones</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 16 }}>
            {[
              { s: 4,  r: "Aerobic engine warming up",      e: "🔥" },
              { s: 8,  r: "Z2 pace starts feeling natural", e: "🫁" },
              { s: 14, r: "Halfway — body has adapted",     e: "⚡" },
              { s: 20, r: "Race pace feels controlled",     e: "🎯" },
              { s: 24, r: "Race ready. Trust the training.", e: "🏁" },
            ].map(m => {
              const unlocked = doneCount >= m.s;
              return (
                <div key={m.s} style={{
                  display: "flex", alignItems: "center", gap: 11, padding: "11px 13px", borderRadius: 8,
                  background: unlocked?"rgba(34,197,94,0.06)":"rgba(255,255,255,0.013)",
                  border: `1px solid ${unlocked?"rgba(34,197,94,0.18)":"rgba(255,255,255,0.05)"}`,
                }}>
                  <div style={{ fontSize: 18 }}>{unlocked?m.e:"🔒"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: unlocked?"#4ade80":"#2d3f52" }}>{m.r}</div>
                    <div style={{ fontSize: 9, color: "#1e2d3d", marginTop: 2 }}>
                      {m.s} sessions {unlocked?"— unlocked ✓":`— ${m.s-doneCount} to go`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: "13px", background: "rgba(34,211,238,0.04)", border: "1px solid rgba(34,211,238,0.09)", borderRadius: 8, fontSize: 10, color: "#3d5066", lineHeight: 1.8 }}>
            💡 <span style={{ color: "#22d3ee" }}>The science:</span> With VO2 max at 45, you're not starting from zero. 80% consistency (~19/24 sessions) is enough to race well. Missing 1–2 sessions won't hurt. Missing a whole week will. Show up more than you don't.
          </div>
        </div>
      )}
    </div>
      </div>
  );
}