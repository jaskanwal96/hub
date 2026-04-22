import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { COLORS } from "../constants";
import { demoData, covidData } from "../data";
import ChartCard from "./ChartCard";
import TimelineItem from "./TimelineItem";
import CustomTooltip from "./CustomTooltip";

export default function Blunders() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>
        Major Blunders
      </h2>
      <p style={{ color: COLORS.dim, marginBottom: 24 }}>
        Three episodes of governance failure with enormous human cost.
      </p>
      <div style={{ position: "relative", paddingLeft: 8, borderLeft: `2px solid ${COLORS.border}`, marginLeft: 6, marginBottom: 28 }}>
        <TimelineItem year="Nov 2016 — Demonetization" desc="86% of currency invalidated with 4 hours' notice. RBI warned of 'no material impact on black money' 2.5 hours before. 99.3% cash returned. ~1.5M jobs lost. 100+ deaths in bank queues." />
        <TimelineItem year="Mar 2020 — COVID Lockdown" desc="4-hour notice lockdown. ~35 million migrant workers walked home. 244+ died en route. No transport, food, or shelter arranged." />
        <TimelineItem year="Apr-May 2021 — Second Wave" desc="WHO estimates 4.74M excess deaths (official: 524K). Oxygen crisis. Bodies in the Ganges. Kumbh Mela allowed. Election rallies continued." />
        <TimelineItem year="2020-2021 — Farm Laws" desc="Three laws passed without farmer consultation. 5,200+ protests, ~35M participants. 700-750 protester deaths. Repealed before UP elections." />
        <TimelineItem year="2017-2024 — Electoral Bonds" desc="₹16,518 Cr in anonymous political donations. BJP got ~55-57%. Supreme Court struck it down unanimously in Feb 2024." />
      </div>
      <ChartCard
        title="Demonetization: Promise vs Reality"
        subtitle="Scored 0-100 on achievement of stated goals"
      >
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
      <ChartCard
        title="COVID Deaths: Official vs Estimated"
        subtitle="Millions of deaths through Dec 2021"
        note="Sources: MoHFW (official), WHO excess mortality, Lancet. Government disputes estimates."
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={covidData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="source" tick={{ fill: COLORS.dim, fontSize: 11 }} />
            <YAxis tick={{ fill: COLORS.dim, fontSize: 10 }} tickFormatter={(v: number) => v + "M"} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="deaths" name="Deaths (millions)" radius={[6, 6, 0, 0]}>
              {covidData.map((_, i) => (
                <Cell key={i} fill={[COLORS.accent, COLORS.red, COLORS.orange][i]} opacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
