import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, ReferenceLine } from "recharts";
import { COLORS } from "../constants";
import { wealthData, adaniSectors, jioData } from "../data";
import ChartCard from "./ChartCard";
import VerdictCard from "./VerdictCard";
import TimelineItem from "./TimelineItem";
import CustomTooltip from "./CustomTooltip";

export default function Corporates() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>
        Adani & Ambani: Oligarchy or Progress?
      </h2>
      <p style={{ color: COLORS.dim, marginBottom: 24 }}>
        Two conglomerates that grew spectacularly under Modi — one transformed consumer access, the other raises serious crony-capitalism questions.
      </p>
      <ChartCard
        title="Wealth Trajectory: Adani vs Ambani"
        subtitle="Net worth in $ billions — hover for detail"
        note="Source: Bloomberg Billionaires Index, Forbes. Adani peaked at ~$156B (world #2) in 2022. Hindenburg report wiped $109B. US DOJ indictment Nov 2024."
      >
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
                {jioData.map((_, i) => (
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
          <TimelineItem year="Jan 2023 — Hindenburg Report" desc="Alleged stock manipulation & accounting fraud. Wiped $150B+ from market cap. Adani denied all charges." />
          <TimelineItem year="Sep 2025 — SEBI Orders" desc="SEBI dismissed some specific Hindenburg allegations. Many investigations remain unresolved." />
          <TimelineItem year="Nov 2024 — US DOJ Indictment" desc="Adani, nephew, and others charged with conspiring to pay $250M+ in bribes to Indian officials for solar contracts. Case ongoing." />
        </div>
      </ChartCard>
    </div>
  );
}
