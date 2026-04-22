import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { COLORS } from "../constants";
import { freedomData, pressData } from "../data";
import StatBox from "./StatBox";
import ChartCard from "./ChartCard";
import VerdictCard from "./VerdictCard";
import CustomTooltip from "./CustomTooltip";

export default function Communal() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>
        Communal Tensions & Religious Freedom
      </h2>
      <p style={{ color: COLORS.dim, marginBottom: 24 }}>
        NCRB numbers show declining riots, but international indices and qualitative data tell a different story.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <StatBox value="97%" label="Cow-related hate crimes occurred after 2014" type="bad" />
        <StatBox value="668" label="Hate speech events targeting Muslims (2023)" type="bad" />
        <StatBox value="740K" label="Lost homes to bulldozer demolitions (2022-23)" type="bad" />
        <StatBox value="260+" label="Killed in Manipur violence (2023-25)" type="bad" />
      </div>
      <ChartCard
        title="Freedom House Score: India"
        subtitle="Score out of 100 (higher = freer). Green zone = Free, Yellow = Partly Free"
        note="India downgraded from 'Free' to 'Partly Free' in 2021 — first since 1975 Emergency."
      >
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={freedomData}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="year" tick={{ fill: COLORS.dim, fontSize: 10 }} />
            <YAxis tick={{ fill: COLORS.dim, fontSize: 10 }} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={60}
              stroke={COLORS.accent}
              strokeDasharray="6 3"
              label={{ value: "FREE ↑ / PARTLY FREE ↓", position: "right", fill: COLORS.dim, fontSize: 10 }}
            />
            <Area
              type="monotone"
              dataKey="score"
              name="Freedom Score"
              stroke={COLORS.orange}
              fill={COLORS.orange}
              fillOpacity={0.12}
              strokeWidth={2.5}
              dot={{ fill: COLORS.orange, r: 4, stroke: "#0a0a0f", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard
        title="Press Freedom Index Ranking"
        subtitle="Position among 180 countries — lower is better"
        note="Source: Reporters Without Borders (RSF). Category: 'Very Serious' since 2023."
      >
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={pressData}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="year" tick={{ fill: COLORS.dim, fontSize: 10 }} />
            <YAxis tick={{ fill: COLORS.dim, fontSize: 10 }} domain={[120, 170]} reversed />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="rank"
              name="Rank (of 180)"
              stroke={COLORS.red}
              strokeWidth={2.5}
              dot={{ fill: COLORS.red, r: 4, stroke: "#0a0a0f", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
      <VerdictCard>
        <strong style={{ color: COLORS.accent }}>Two datasets in tension:</strong> NCRB riot incidents fell from 1,227→378. But cow vigilante lynchings (97% post-2014), bulldozer demolitions, hate speech events, and every international index point to deterioration. NCRB depends on FIR filing (police discretion); incidents may be reclassified.
      </VerdictCard>
    </div>
  );
}
