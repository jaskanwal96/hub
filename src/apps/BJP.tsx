import React, { useState } from "react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart, Cell, ReferenceLine } from "recharts";

const COLORS = {
  accent: "#f0c040",
  green: "#34d399",
  red: "#f87171",
  blue: "#60a5fa",
  purple: "#a78bfa",
  orange: "#fb923c",
  cyan: "#22d3ee",
  pink: "#f472b6",
  dim: "#6b6b80",
  border: "#1e1e2e",
  surface: "#111118",
  surface2: "#16161f",
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number | string; color?: string; stroke?: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(17,17,24,0.96)", border: "1px solid #2a2a3a", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.6, maxWidth: 240, backdropFilter: "blur(12px)" }}>
      <div style={{ fontWeight: 600, color: "#e8e6e3", marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || p.stroke || COLORS.accent }}>
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

// ─── DATA ───
const gdpData = [
  { year: "10-11", growth: 8.5, era: "UPA" }, { year: "11-12", growth: 5.2, era: "UPA" },
  { year: "12-13", growth: 5.4, era: "UPA" }, { year: "13-14", growth: 6.4, era: "UPA" },
  { year: "14-15", growth: 7.4, era: "NDA" }, { year: "15-16", growth: 8.0, era: "NDA" },
  { year: "16-17", growth: 8.3, era: "NDA" }, { year: "17-18", growth: 6.8, era: "NDA" },
  { year: "18-19", growth: 6.5, era: "NDA" }, { year: "19-20", growth: 3.9, era: "NDA" },
  { year: "20-21", growth: -6.6, era: "COVID" }, { year: "21-22", growth: 8.7, era: "NDA" },
  { year: "22-23", growth: 7.0, era: "NDA" }, { year: "23-24", growth: 8.2, era: "NDA" },
  { year: "24-25", growth: 6.5, era: "NDA" },
];

const wealthData = [
  { year: "2014", Adani: 7, Ambani: 18.6 }, { year: "2015", Adani: 5.3, Ambani: 18 },
  { year: "2016", Adani: 5, Ambani: 19 }, { year: "2017", Adani: 6, Ambani: 23 },
  { year: "2018", Adani: 8, Ambani: 40 }, { year: "2019", Adani: 8.5, Ambani: 50 },
  { year: "2020", Adani: 12, Ambani: 53 }, { year: "2021", Adani: 50, Ambani: 85 },
  { year: "2022", Adani: 156, Ambani: 90 }, { year: "2023", Adani: 47, Ambani: 92 },
  { year: "2024", Adani: 84, Ambani: 113 }, { year: "2025", Adani: 58, Ambani: 95 },
];

const adaniSectors = [
  { sector: "Airports (pax share)", pct: 25 }, { sector: "Ports (cargo)", pct: 35 },
  { sector: "Power Transmission", pct: 20 }, { sector: "Renewable Energy", pct: 18 },
  { sector: "Coal Mining", pct: 15 },
];

const jioData = [
  { year: "2015", price: 270 }, { year: "2016 (Jio launch)", price: 120 },
  { year: "2017", price: 50 }, { year: "2018", price: 18 },
  { year: "2020", price: 12 }, { year: "2023", price: 11 }, { year: "2025", price: 14 },
];

const upiData = [
  { year: "2017", txn: 0.9 }, { year: "2018", txn: 5.4 }, { year: "2019", txn: 12.5 },
  { year: "2020", txn: 22.3 }, { year: "2021", txn: 38.7 }, { year: "2022", txn: 74 },
  { year: "2023", txn: 117.6 }, { year: "2024", txn: 172.2 }, { year: "2025", txn: 228.3 },
];

const infraData = [
  { item: "Highways (K km)", before: 91, after: 146 },
  { item: "Airports", before: 74, after: 148 },
  { item: "Metro Cities", before: 5, after: 21 },
  { item: "Rail Elec. (K km)", before: 5, after: 45 },
  { item: "Startups (K)", before: 0.5, after: 198 },
];

const freedomData = [
  { year: "2014", score: 77 }, { year: "2016", score: 72 }, { year: "2018", score: 67 },
  { year: "2020", score: 67 }, { year: "2021", score: 56 }, { year: "2022", score: 53 },
  { year: "2023", score: 50 }, { year: "2024", score: 49 },
];

const pressData = [
  { year: "2014", rank: 140 }, { year: "2016", rank: 133 }, { year: "2018", rank: 138 },
  { year: "2020", rank: 142 }, { year: "2022", rank: 150 }, { year: "2023", rank: 161 },
  { year: "2024", rank: 159 }, { year: "2025", rank: 151 },
];

const unemploymentData = [
  { year: "17-18", PLFS: 6.1, CMIE: 6.5 }, { year: "18-19", PLFS: 5.8, CMIE: 7.4 },
  { year: "19-20", PLFS: 4.8, CMIE: 8.0 }, { year: "20-21", PLFS: 4.2, CMIE: 9.1 },
  { year: "21-22", PLFS: 4.1, CMIE: 8.3 }, { year: "22-23", PLFS: 3.2, CMIE: 7.7 },
  { year: "23-24", PLFS: 3.2, CMIE: 8.0 },
];

const jobQuality = [
  { type: "Self-employed", y2014: 52, y2024: 57 },
  { type: "Casual Labour", y2014: 25, y2024: 21 },
  { type: "Regular Wage", y2014: 17, y2024: 14 },
  { type: "Unpaid Family", y2014: 6, y2024: 8 },
];

const radarData = [
  { subject: "Digital Infra", score: 95 }, { subject: "GDP Growth", score: 55 },
  { subject: "Inflation Ctrl", score: 72 }, { subject: "Jobs Quality", score: 30 },
  { subject: "Press Freedom", score: 20 }, { subject: "Communal Peace", score: 35 },
  { subject: "Infrastructure", score: 82 }, { subject: "Global Standing", score: 78 },
  { subject: "Institutions", score: 28 }, { subject: "Equality", score: 25 },
];

const rupeeData = [
  { year: "2014", rate: 60 }, { year: "2016", rate: 67 }, { year: "2018", rate: 69 },
  { year: "2020", rate: 74 }, { year: "2022", rate: 79 }, { year: "2024", rate: 84 },
  { year: "2026", rate: 93 },
];

const sensexData = [
  { year: "2014", val: 24000 }, { year: "2016", val: 26600 }, { year: "2018", val: 36000 },
  { year: "2020", val: 47000 }, { year: "2022", val: 60000 }, { year: "2024", val: 78100 },
  { year: "2025", val: 74100 },
];

const covidData = [
  { source: "Official", deaths: 0.53 }, { source: "WHO Est.", deaths: 4.74 },
  { source: "Lancet Est.", deaths: 4.07 },
];

const demoData = [
  { goal: "Eliminate black money", promise: 100, reality: 5 },
  { goal: "Keep cash out", promise: 70, reality: 1 },
  { goal: "Sustain GDP growth", promise: 90, reality: 45 },
  { goal: "Stop terror funding", promise: 85, reality: 10 },
  { goal: "Boost digital pay", promise: 60, reality: 90 },
];

const attributionData = [
  { policy: "UPI / Digital Payments", Modi: 40, UPA: 35, External: 25 },
  { policy: "GDP Growth Rate", Modi: 25, UPA: 15, External: 60 },
  { policy: "Demonetization", Modi: 95, UPA: 0, External: 5 },
  { policy: "COVID Death Toll", Modi: 50, UPA: 0, External: 50 },
  { policy: "Infrastructure Boom", Modi: 65, UPA: 15, External: 20 },
  { policy: "Press Freedom ↓", Modi: 70, UPA: 5, External: 25 },
  { policy: "Adani Wealth Surge", Modi: 45, UPA: 5, External: 50 },
  { policy: "Communal Tensions", Modi: 55, UPA: 10, External: 35 },
  { policy: "Startup Ecosystem", Modi: 30, UPA: 10, External: 60 },
  { policy: "Farm Law Failure", Modi: 90, UPA: 0, External: 10 },
];

// ─── COMPONENTS ───
const StatBox = ({ value, label, type = "" }: { value: string; label: string; type?: string }) => {
  const colorMap: Record<string, string> = { good: COLORS.green, bad: COLORS.red, neutral: COLORS.blue };
  return (
    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "16px 18px", flex: "1 1 180px", minWidth: 170 }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.5rem", fontWeight: 600, color: colorMap[type] || COLORS.accent }}>{value}</div>
      <div style={{ fontSize: "0.78rem", color: COLORS.dim, marginTop: 4, lineHeight: 1.5 }}>{label}</div>
    </div>
  );
};

const ChartCard = ({ title, subtitle, note, children }: { title?: string; subtitle?: string; note?: string; children: React.ReactNode }) => (
  <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "20px 20px 16px", marginBottom: 20, overflow: "hidden" }}>
    {title && <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: 0 }}>{title}</h3>}
    {subtitle && <p style={{ fontSize: "0.8rem", color: COLORS.dim, margin: "4px 0 14px" }}>{subtitle}</p>}
    {children}
    {note && <p style={{ fontSize: "0.72rem", color: COLORS.dim, marginTop: 10, fontStyle: "italic", opacity: 0.7 }}>{note}</p>}
  </div>
);

const VerdictCard = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: COLORS.surface2, borderLeft: `3px solid ${COLORS.accent}`, padding: "16px 20px", margin: "20px 0", borderRadius: "0 8px 8px 0", fontSize: "0.88rem", lineHeight: 1.75, color: "#c8c6c2" }}>
    {children}
  </div>
);

const TimelineItem = ({ year, desc, type = "bad" }: { year: string; desc: string; type?: string }) => (
  <div style={{ position: "relative", paddingLeft: 28, marginBottom: 20 }}>
    <div style={{ position: "absolute", left: 0, top: 6, width: 12, height: 12, borderRadius: "50%", background: type === "bad" ? COLORS.red : COLORS.green, border: `2px solid #0a0a0f` }} />
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: type === "bad" ? COLORS.red : COLORS.green, marginBottom: 3 }}>{year}</div>
    <div style={{ fontSize: "0.86rem", color: COLORS.dim, lineHeight: 1.65 }}>{desc}</div>
  </div>
);

const RespCard = ({ title, color, items }: { title: string; color: string; items: string[] }) => (
  <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${color}`, borderRadius: 10, padding: 16, flex: "1 1 280px", minWidth: 260 }}>
    <h4 style={{ fontSize: "0.88rem", fontWeight: 600, marginBottom: 10, color: "#e8e6e3" }}>{title}</h4>
    {items.map((item, i) => (
      <div key={i} style={{ fontSize: "0.82rem", color: COLORS.dim, padding: "6px 0", borderBottom: i < items.length - 1 ? `1px solid ${COLORS.border}` : "none", lineHeight: 1.55 }}>{item}</div>
    ))}
  </div>
);

// ─── TABS ───
const TABS = [
  { id: "overview", label: "Overview" },
  { id: "economy", label: "GDP & Economy" },
  { id: "welfare", label: "Welfare & Digital" },
  { id: "blunders", label: "Blunders" },
  { id: "communal", label: "Communal Tensions" },
  { id: "corporates", label: "Adani & Ambani" },
  { id: "jobs", label: "Unemployment" },
  { id: "responsibility", label: "Responsibility" },
];

export default function ModiEraDashboard() {
  const [tab, setTab] = useState("overview");

  return (
    <div style={{ background: "#0a0a0f", color: "#e8e6e3", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* HERO */}
      <div style={{ minHeight: "55vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "2rem", position: "relative", background: "radial-gradient(ellipse at 30% 50%, rgba(240,192,64,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(96,165,250,0.04) 0%, transparent 50%)" }}>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 800 }}>
          The <span style={{ color: COLORS.accent }}>Modi Era</span><br />2014 – 2026
        </h1>
        <p style={{ fontSize: "1.05rem", color: COLORS.dim, maxWidth: 550, marginTop: 16, lineHeight: 1.7 }}>
          An interactive, data-driven analysis of twelve years — achievements, failures, contested numbers, and who was really responsible.
        </p>
      </div>

      {/* NAV */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,10,15,0.88)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${COLORS.border}`, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <div style={{ display: "flex", maxWidth: 1100, margin: "0 auto", gap: 0 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: "none", border: "none", color: tab === t.id ? COLORS.accent : COLORS.dim,
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 500,
              padding: "14px 16px", cursor: "pointer", whiteSpace: "nowrap", position: "relative",
              borderBottom: tab === t.id ? `2px solid ${COLORS.accent}` : "2px solid transparent",
              transition: "all 0.2s"
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 80px" }}>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>The Scorecard at a Glance</h2>
            <p style={{ color: COLORS.dim, marginBottom: 24, fontSize: "0.92rem" }}>Hover over charts for detail. Green = clear win. Red = clear failure.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
              <StatBox value="228B" label="UPI transactions in 2025 — from zero in 2016" type="good" />
              <StatBox value="5th" label="Largest economy globally (was 10th in 2014)" type="good" />
              <StatBox value="~4.7M" label="Estimated excess COVID deaths (WHO)" type="bad" />
              <StatBox value="159th" label="Press Freedom ranking 2024 (was 140th)" type="bad" />
              <StatBox value="6.1%" label="Avg GDP growth (vs 7.0% under UPA)" type="neutral" />
              <StatBox value="99.3%" label="Demonetized cash returned — goal failed" type="bad" />
            </div>
            <ChartCard title="India's Report Card" subtitle="Score out of 100 across key dimensions — higher is better">
              <ResponsiveContainer width="100%" height={380}>
                <RadarChart data={radarData} cx="50%" cy="50%">
                  <PolarGrid stroke={COLORS.border} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: COLORS.dim, fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: COLORS.dim, fontSize: 9 }} />
                  <Radar name="Score" dataKey="score" stroke={COLORS.accent} fill={COLORS.accent} fillOpacity={0.2} strokeWidth={2} />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {/* ECONOMY */}
        {tab === "economy" && (
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>GDP & Economic Growth</h2>
            <p style={{ color: COLORS.dim, marginBottom: 24, fontSize: "0.92rem" }}>Real numbers, contested methodology, and how much credit belongs to any PM.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
              <StatBox value="~6.1%" label="Avg GDP growth 2014-25 (incl. COVID)" type="neutral" />
              <StatBox value="₹60→93" label="Rupee vs USD depreciation (55%)" type="bad" />
              <StatBox value="₹22L Cr" label="Record GST collection FY2024-25" type="good" />
              <StatBox value="85,707" label="Sensex peak (Nov 2025)" type="good" />
            </div>
            <ChartCard title="GDP Growth Rate: Year by Year" subtitle="Real GDP growth (%) — color-coded by government" note="Source: MoSPI, World Bank. Former CEA Subramanian argues 2011-17 growth was overestimated by ~2.5pp.">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={gdpData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="year" tick={{ fill: COLORS.dim, fontSize: 10 }} angle={-45} textAnchor="end" height={50} />
                  <YAxis tick={{ fill: COLORS.dim, fontSize: 10 }} tickFormatter={(v: number) => v + "%"} domain={[-8, 10]} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={0} stroke={COLORS.dim} strokeDasharray="4 4" />
                  <Bar dataKey="growth" name="GDP Growth %" radius={[4, 4, 0, 0]}>
                    {gdpData.map((d, i) => (
                      <Cell key={i} fill={d.era === "UPA" ? COLORS.blue : d.era === "COVID" ? COLORS.red : COLORS.accent} opacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <ChartCard title="Rupee vs USD" subtitle="Depreciation trajectory">
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={rupeeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                    <XAxis dataKey="year" tick={{ fill: COLORS.dim, fontSize: 10 }} />
                    <YAxis tick={{ fill: COLORS.dim, fontSize: 10 }} domain={[55, 100]} reversed tickFormatter={(v: number) => "₹" + v} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="rate" name="₹ per USD" stroke={COLORS.red} fill={COLORS.red} fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Sensex / Stock Market" subtitle="BSE Sensex yearly close">
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={sensexData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                    <XAxis dataKey="year" tick={{ fill: COLORS.dim, fontSize: 10 }} />
                    <YAxis tick={{ fill: COLORS.dim, fontSize: 10 }} tickFormatter={(v: number) => (v / 1000) + "K"} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="val" name="Sensex" stroke={COLORS.green} fill={COLORS.green} fillOpacity={0.08} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
            <VerdictCard>
              <strong style={{ color: COLORS.accent }}>The contested picture:</strong> India grew, but at roughly the same pace as the prior decade. Oil prices crashing from $107→$28 (2014-16) handed Modi a ~$48B annual windfall captured via excise hikes. Stock market tripled, but 91% of retail F&O traders lost money per SEBI data.
            </VerdictCard>
          </div>
        )}

        {/* WELFARE */}
        {tab === "welfare" && (
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>Welfare & Digital India</h2>
            <p style={{ color: COLORS.dim, marginBottom: 24 }}>The most unambiguously positive dimension — though built on pre-2014 foundations.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
              <StatBox value="56 Cr" label="Jan Dhan bank accounts opened" type="good" />
              <StatBox value="₹44L Cr" label="Direct Benefit Transfers disbursed" type="good" />
              <StatBox value="120M+" label="Toilets built (Swachh Bharat)" type="good" />
              <StatBox value="10.3 Cr" label="LPG connections (Ujjwala)" type="good" />
            </div>
            <ChartCard title="UPI Transaction Growth" subtitle="Billions of transactions per year" note="India handles 49% of global real-time digital payments. But Aadhaar (2009), NPCI (2008) were UPA-era foundations.">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={upiData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="year" tick={{ fill: COLORS.dim, fontSize: 10 }} />
                  <YAxis tick={{ fill: COLORS.dim, fontSize: 10 }} tickFormatter={(v: number) => v + "B"} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="txn" name="Transactions (B)" fill={COLORS.green} radius={[6, 6, 0, 0]} opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Infrastructure: Before vs After Modi" subtitle="Key metrics comparison">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={infraData} layout="vertical" barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis type="number" tick={{ fill: COLORS.dim, fontSize: 10 }} />
                  <YAxis dataKey="item" type="category" tick={{ fill: COLORS.dim, fontSize: 11 }} width={130} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="before" name="Pre-2014" fill={COLORS.dim} opacity={0.45} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="after" name="Current" fill={COLORS.green} opacity={0.8} radius={[0, 4, 4, 0]} />
                  <Legend wrapperStyle={{ fontSize: 12, color: COLORS.dim }} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {/* BLUNDERS */}
        {tab === "blunders" && (
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>Major Blunders</h2>
            <p style={{ color: COLORS.dim, marginBottom: 24 }}>Three episodes of governance failure with enormous human cost.</p>
            <div style={{ position: "relative", paddingLeft: 8, borderLeft: `2px solid ${COLORS.border}`, marginLeft: 6, marginBottom: 28 }}>
              <TimelineItem year="Nov 2016 — Demonetization" desc="86% of currency invalidated with 4 hours' notice. RBI warned of 'no material impact on black money' 2.5 hours before. 99.3% cash returned. ~1.5M jobs lost. 100+ deaths in bank queues." />
              <TimelineItem year="Mar 2020 — COVID Lockdown" desc="4-hour notice lockdown. ~35 million migrant workers walked home. 244+ died en route. No transport, food, or shelter arranged." />
              <TimelineItem year="Apr-May 2021 — Second Wave" desc="WHO estimates 4.74M excess deaths (official: 524K). Oxygen crisis. Bodies in the Ganges. Kumbh Mela allowed. Election rallies continued." />
              <TimelineItem year="2020-2021 — Farm Laws" desc="Three laws passed without farmer consultation. 5,200+ protests, ~35M participants. 700-750 protester deaths. Repealed before UP elections." />
              <TimelineItem year="2017-2024 — Electoral Bonds" desc="₹16,518 Cr in anonymous political donations. BJP got ~55-57%. Supreme Court struck it down unanimously in Feb 2024." />
            </div>
            <ChartCard title="Demonetization: Promise vs Reality" subtitle="Scored 0-100 on achievement of stated goals">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={demoData} layout="vertical" barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: COLORS.dim, fontSize: 10 }} />
                  <YAxis dataKey="goal" type="category" tick={{ fill: COLORS.dim, fontSize: 10 }} width={160} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="promise" name="Promise" fill={COLORS.accent} opacity={0.35} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="reality" name="Reality" radius={[0, 4, 4, 0]}>
                    {demoData.map((d, i) => (
                      <Cell key={i} fill={d.reality >= d.promise ? COLORS.green : COLORS.red} opacity={0.75} />
                    ))}
                  </Bar>
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="COVID Deaths: Official vs Estimated" subtitle="Millions of deaths through Dec 2021" note="Sources: MoHFW (official), WHO excess mortality, Lancet. Government disputes estimates.">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={covidData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="source" tick={{ fill: COLORS.dim, fontSize: 11 }} />
                  <YAxis tick={{ fill: COLORS.dim, fontSize: 10 }} tickFormatter={(v: number) => v + "M"} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="deaths" name="Deaths (millions)" radius={[6, 6, 0, 0]}>
                    {covidData.map((d, i) => (
                      <Cell key={i} fill={[COLORS.accent, COLORS.red, COLORS.orange][i]} opacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {/* COMMUNAL */}
        {tab === "communal" && (
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>Communal Tensions & Religious Freedom</h2>
            <p style={{ color: COLORS.dim, marginBottom: 24 }}>NCRB numbers show declining riots, but international indices and qualitative data tell a different story.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
              <StatBox value="97%" label="Cow-related hate crimes occurred after 2014" type="bad" />
              <StatBox value="668" label="Hate speech events targeting Muslims (2023)" type="bad" />
              <StatBox value="740K" label="Lost homes to bulldozer demolitions (2022-23)" type="bad" />
              <StatBox value="260+" label="Killed in Manipur violence (2023-25)" type="bad" />
            </div>
            <ChartCard title="Freedom House Score: India" subtitle="Score out of 100 (higher = freer). Green zone = Free, Yellow = Partly Free" note="India downgraded from 'Free' to 'Partly Free' in 2021 — first since 1975 Emergency.">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={freedomData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="year" tick={{ fill: COLORS.dim, fontSize: 10 }} />
                  <YAxis tick={{ fill: COLORS.dim, fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={60} stroke={COLORS.accent} strokeDasharray="6 3" label={{ value: "FREE ↑ / PARTLY FREE ↓", position: "right", fill: COLORS.dim, fontSize: 10 }} />
                  <Area type="monotone" dataKey="score" name="Freedom Score" stroke={COLORS.orange} fill={COLORS.orange} fillOpacity={0.12} strokeWidth={2.5} dot={{ fill: COLORS.orange, r: 4, stroke: "#0a0a0f", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Press Freedom Index Ranking" subtitle="Position among 180 countries — lower is better" note="Source: Reporters Without Borders (RSF). Category: 'Very Serious' since 2023.">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={pressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="year" tick={{ fill: COLORS.dim, fontSize: 10 }} />
                  <YAxis tick={{ fill: COLORS.dim, fontSize: 10 }} domain={[120, 170]} reversed />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="rank" name="Rank (of 180)" stroke={COLORS.red} strokeWidth={2.5} dot={{ fill: COLORS.red, r: 4, stroke: "#0a0a0f", strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
            <VerdictCard>
              <strong style={{ color: COLORS.accent }}>Two datasets in tension:</strong> NCRB riot incidents fell from 1,227→378. But cow vigilante lynchings (97% post-2014), bulldozer demolitions, hate speech events, and every international index point to deterioration. NCRB depends on FIR filing (police discretion); incidents may be reclassified.
            </VerdictCard>
          </div>
        )}

        {/* CORPORATES */}
        {tab === "corporates" && (
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>Adani & Ambani: Oligarchy or Progress?</h2>
            <p style={{ color: COLORS.dim, marginBottom: 24 }}>Two conglomerates that grew spectacularly under Modi — one transformed consumer access, the other raises serious crony-capitalism questions.</p>

            <ChartCard title="Wealth Trajectory: Adani vs Ambani" subtitle="Net worth in $ billions — hover for detail" note="Source: Bloomberg Billionaires Index, Forbes. Adani peaked at ~$156B (world #2) in 2022. Hindenburg report wiped $109B. US DOJ indictment Nov 2024.">
              <ResponsiveContainer width="100%" height={360}>
                <LineChart data={wealthData} margin={{ top: 10, right: 20, bottom: 5, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="year" tick={{ fill: COLORS.dim, fontSize: 11 }} />
                  <YAxis tick={{ fill: COLORS.dim, fontSize: 11 }} tickFormatter={(v: number) => "$" + v + "B"} domain={[0, 170]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 13 }} />
                  <ReferenceLine x="2023" stroke={COLORS.red} strokeDasharray="6 3" label={{ value: "Hindenburg Report", position: "top", fill: COLORS.red, fontSize: 11 }} />
                  <Line type="monotone" dataKey="Adani" name="Gautam Adani ($B)" stroke={COLORS.green} strokeWidth={3} dot={{ fill: COLORS.green, r: 5, stroke: "#0a0a0f", strokeWidth: 2 }} activeDot={{ r: 7 }} />
                  <Line type="monotone" dataKey="Ambani" name="Mukesh Ambani ($B)" stroke={COLORS.blue} strokeWidth={3} dot={{ fill: COLORS.blue, r: 5, stroke: "#0a0a0f", strokeWidth: 2 }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <ChartCard title="Adani Group: Sector Dominance" subtitle="% share of India's infrastructure in each sector">
                <ResponsiveContainer width="100%" height={230}>
                  <BarChart data={adaniSectors} layout="vertical" barCategoryGap="22%">
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                    <XAxis type="number" tick={{ fill: COLORS.dim, fontSize: 10 }} tickFormatter={(v: number) => v + "%"} domain={[0, 45]} />
                    <YAxis dataKey="sector" type="category" tick={{ fill: COLORS.dim, fontSize: 10 }} width={130} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="pct" name="Market Share %" fill={COLORS.orange} opacity={0.8} radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Jio Effect: Data Price Crash" subtitle="Cost per GB of mobile data (₹) — 95% drop">
                <ResponsiveContainer width="100%" height={230}>
                  <BarChart data={jioData} barCategoryGap="18%">
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                    <XAxis dataKey="year" tick={{ fill: COLORS.dim, fontSize: 9 }} angle={-20} textAnchor="end" height={40} />
                    <YAxis tick={{ fill: COLORS.dim, fontSize: 10 }} tickFormatter={(v: number) => "₹" + v} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="price" name="₹ per GB" radius={[6, 6, 0, 0]}>
                      {jioData.map((d, i) => (
                        <Cell key={i} fill={i === 0 ? COLORS.red : COLORS.cyan} opacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <VerdictCard>
              <strong style={{ color: COLORS.accent }}>The nuance:</strong> Jio genuinely democratized internet — 700M+ users, data costs down 95%. That's transformative for hundreds of millions. But Adani's rise correlates uncomfortably with government contracts (8 airports, 15 ports, coal, power). The Economist's Crony Capitalism Index: India ranked 10th of 43 nations. UC Berkeley's Pranab Bardhan notes Indian conglomerates haven't produced globally competitive exporters unlike Korean chaebols — they dominate rent-heavy domestic sectors.
            </VerdictCard>

            <ChartCard title="Key Timeline: Adani Controversies">
              <div style={{ paddingLeft: 8, borderLeft: `2px solid ${COLORS.border}`, marginLeft: 6 }}>
                <TimelineItem year="Jan 2023 — Hindenburg Report" desc="Alleged stock manipulation & accounting fraud. Wiped $150B+ from market cap. Adani denied all charges." type="bad" />
                <TimelineItem year="Sep 2025 — SEBI Orders" desc="SEBI dismissed some specific Hindenburg allegations. Many investigations remain unresolved." type="bad" />
                <TimelineItem year="Nov 2024 — US DOJ Indictment" desc="Adani, nephew, and others charged with conspiring to pay $250M+ in bribes to Indian officials for solar contracts. Case ongoing." type="bad" />
              </div>
            </ChartCard>
          </div>
        )}

        {/* JOBS */}
        {tab === "jobs" && (
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>The Unemployment Puzzle</h2>
            <p style={{ color: COLORS.dim, marginBottom: 24 }}>Government and independent data tell contradictory stories. The truth lies in job quality.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
              <StatBox value="3.2%" label="PLFS unemployment (2023-24)" type="good" />
              <StatBox value="7-10%" label="CMIE unemployment (same period)" type="bad" />
              <StatBox value="17.3%" label="Graduate unemployment (CMIE)" type="bad" />
              <StatBox value="<1%" label="Annual rural real wage growth (2014-23)" type="bad" />
            </div>
            <ChartCard title="Two Versions of Unemployment" subtitle="PLFS (govt) vs CMIE (independent) — %" note="Key difference: PLFS counts ~50M unpaid family workers as 'employed.' The 2019 NSSO report showing 45-year-high unemployment was suppressed before elections.">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={unemploymentData} barCategoryGap="18%">
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="year" tick={{ fill: COLORS.dim, fontSize: 10 }} />
                  <YAxis tick={{ fill: COLORS.dim, fontSize: 10 }} tickFormatter={(v: number) => v + "%"} domain={[0, 11]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="PLFS" name="PLFS (Govt)" fill={COLORS.accent} opacity={0.85} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="CMIE" name="CMIE (Independent)" fill={COLORS.red} opacity={0.75} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Job Quality Shift: 2014 vs 2024" subtitle="Share of total employment by type (%)" note="Regular wage/salaried jobs shrank from 17%→14%. Self-employment and unpaid family work grew. Manufacturing stuck at 12-14% of workforce.">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={jobQuality} layout="vertical" barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis type="number" tick={{ fill: COLORS.dim, fontSize: 10 }} tickFormatter={(v: number) => v + "%"} domain={[0, 65]} />
                  <YAxis dataKey="type" type="category" tick={{ fill: COLORS.dim, fontSize: 11 }} width={120} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="y2014" name="2014" fill={COLORS.dim} opacity={0.5} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="y2024" name="2024" fill={COLORS.orange} opacity={0.8} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <VerdictCard>
              <strong style={{ color: COLORS.accent }}>The real crisis:</strong> Even where employment numbers improved, composition shifted toward self-employment and unpaid work — away from salaried jobs. Real rural wages grew &lt;1%/year vs 6%+ under UPA. The richest 1% hold 40% of wealth; bottom 50% own 3%. Modi promised 2 crore jobs/year — central govt employment is at its lowest since 2010.
            </VerdictCard>
          </div>
        )}

        {/* RESPONSIBILITY */}
        {tab === "responsibility" && (
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>Who's Actually Responsible?</h2>
            <p style={{ color: COLORS.dim, marginBottom: 24 }}>Distinguishing Modi's personal decisions from structural momentum, inherited foundations, and external factors.</p>
            <ChartCard title="Attribution Matrix" subtitle="Stacked bars show % responsibility — hover for verdict">
              <ResponsiveContainer width="100%" height={420}>
                <BarChart data={attributionData} layout="vertical" barCategoryGap="18%" stackOffset="expand" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis type="number" tick={{ fill: COLORS.dim, fontSize: 10 }} tickFormatter={(v: number) => Math.round(v * 100) + "%"} />
                  <YAxis dataKey="policy" type="category" tick={{ fill: COLORS.dim, fontSize: 10 }} width={150} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="Modi" name="Modi's Role" stackId="a" fill={COLORS.accent} opacity={0.85} />
                  <Bar dataKey="UPA" name="UPA Foundation" stackId="a" fill={COLORS.blue} opacity={0.6} />
                  <Bar dataKey="External" name="External Factors" stackId="a" fill={COLORS.purple} opacity={0.5} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 24 }}>
              <RespCard title="🎯 Modi's Personal Decisions (Direct)" color={COLORS.red} items={[
                "Demonetization — bypassed RBI advice, 2.5hr notice",
                "Article 370 abrogation — centralized decision",
                "Farm laws introduction & repeal",
                "CAA/NRC — his government's legislative agenda",
                "COVID lockdown — 4-hour notice, no preparation",
                "Electoral Bonds scheme design",
                "75-day silence on Manipur",
                "G20 presidency branding & execution",
              ]} />
              <RespCard title="🏗️ Built on UPA Foundations" color={COLORS.blue} items={[
                "Aadhaar — created 2009, BJP initially opposed",
                "GST — first proposed 1999, UPA bill 2011",
                "NPCI / India Stack — conceived pre-2014",
                "RBI inflation targeting — Rajan's framework",
                "MGNREGA, Food Security Act — UPA programs",
                "RTI Act — UPA era, now weakened",
                "Metro rail — many projects initiated under UPA",
              ]} />
              <RespCard title="🌍 External Tailwinds" color={COLORS.green} items={[
                "Oil crash $107→$28 saved ~$48B/year",
                "Global low interest rates (2014-21)",
                "China+1 strategy — US-China trade war benefit",
                "India's demographic dividend — structural",
                "Tech sector growth — global phenomenon",
                "Russia-Ukraine inflation — external shock",
              ]} />
              <RespCard title="✅ Genuinely Modi's Achievements" color={COLORS.purple} items={[
                "Insolvency & Bankruptcy Code (2016) — widely praised",
                "Scaling DBT via JAM Trinity — 16x increase",
                "Infrastructure capex push — 6x from UPA II",
                "PLI scheme — smart China+1 response",
                "Swachh Bharat execution at scale",
                "Diplomatic elevation — India's global profile",
                "Startup India ecosystem nurturing",
              ]} />
            </div>
            <VerdictCard>
              <strong style={{ color: COLORS.accent }}>The pattern:</strong> Modi's most consequential personal decisions — demonetization, Article 370, farm laws, COVID lockdown — share a common trait: dramatic, centralized action with minimal institutional consultation, producing mixed-to-negative outcomes measured against stated goals. His most durable legacy may lie in quieter, incremental scaling of existing systems (DBT, digital payments, infrastructure) — ironically built on foundations of predecessors he sought to discredit.
            </VerdictCard>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "40px 20px", color: COLORS.dim, fontSize: "0.74rem", borderTop: `1px solid ${COLORS.border}`, maxWidth: 700, margin: "0 auto", lineHeight: 1.8 }}>
        <p>Data from: World Bank, IMF, RBI, MoSPI, PLFS, CMIE, NCRB, Freedom House, RSF, V-Dem, USCIRF, WHO, Lancet, ILO, Bloomberg, Forbes, PIB, SEBI, Hindenburg Research, Reuters, BBC, The Hindu, Indian Express, The Economist.</p>
        <p style={{ marginTop: 8 }}>This dashboard presents multiple perspectives and contested data points. Readers should consult original sources for full context.</p>
      </div>
    </div>
  );
}