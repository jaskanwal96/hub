import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { COLORS } from "../constants";
import { unemploymentData, jobQuality } from "../data";
import StatBox from "./StatBox";
import ChartCard from "./ChartCard";
import VerdictCard from "./VerdictCard";
import CustomTooltip from "./CustomTooltip";

export default function Jobs() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>
        The Unemployment Puzzle
      </h2>
      <p style={{ color: COLORS.dim, marginBottom: 24 }}>
        Government and independent data tell contradictory stories. The truth lies in job quality.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <StatBox value="3.2%" label="PLFS unemployment (2023-24)" type="good" />
        <StatBox value="7-10%" label="CMIE unemployment (same period)" type="bad" />
        <StatBox value="17.3%" label="Graduate unemployment (CMIE)" type="bad" />
        <StatBox value="<1%" label="Annual rural real wage growth (2014-23)" type="bad" />
      </div>
      <ChartCard
        title="Two Versions of Unemployment"
        subtitle="PLFS (govt) vs CMIE (independent) — %"
        note="Key difference: PLFS counts ~50M unpaid family workers as 'employed.' The 2019 NSSO report showing 45-year-high unemployment was suppressed before elections."
      >
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
      <ChartCard
        title="Job Quality Shift: 2014 vs 2024"
        subtitle="Share of total employment by type (%)"
        note="Regular wage/salaried jobs shrank from 17%→14%. Self-employment and unpaid family work grew. Manufacturing stuck at 12-14% of workforce."
      >
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
  );
}
