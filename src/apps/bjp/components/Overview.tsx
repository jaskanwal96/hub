import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from "recharts";
import { COLORS } from "../constants";
import { radarData } from "../data";
import StatBox from "./StatBox";
import ChartCard from "./ChartCard";
import CustomTooltip from "./CustomTooltip";

export default function Overview() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>
        The Scorecard at a Glance
      </h2>
      <p style={{ color: COLORS.dim, marginBottom: 24, fontSize: "0.92rem" }}>
        Hover over charts for detail. Green = clear win. Red = clear failure.
      </p>
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
  );
}
