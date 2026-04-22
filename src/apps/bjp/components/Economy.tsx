import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { COLORS } from "../constants";
import { gdpData, rupeeData, sensexData } from "../data";
import StatBox from "./StatBox";
import ChartCard from "./ChartCard";
import VerdictCard from "./VerdictCard";
import CustomTooltip from "./CustomTooltip";

export default function Economy() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>
        GDP & Economic Growth
      </h2>
      <p style={{ color: COLORS.dim, marginBottom: 24, fontSize: "0.92rem" }}>
        Real numbers, contested methodology, and how much credit belongs to any PM.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <StatBox value="~6.1%" label="Avg GDP growth 2014-25 (incl. COVID)" type="neutral" />
        <StatBox value="₹60→93" label="Rupee vs USD depreciation (55%)" type="bad" />
        <StatBox value="₹22L Cr" label="Record GST collection FY2024-25" type="good" />
        <StatBox value="85,707" label="Sensex peak (Nov 2025)" type="good" />
      </div>
      <ChartCard
        title="GDP Growth Rate: Year by Year"
        subtitle="Real GDP growth (%) — color-coded by government"
        note="Source: MoSPI, World Bank. Former CEA Subramanian argues 2011-17 growth was overestimated by ~2.5pp."
      >
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
  );
}
