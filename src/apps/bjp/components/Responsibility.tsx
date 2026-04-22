import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { COLORS } from "../constants";
import { attributionData } from "../data";
import ChartCard from "./ChartCard";
import VerdictCard from "./VerdictCard";
import RespCard from "./RespCard";
import CustomTooltip from "./CustomTooltip";

export default function Responsibility() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>
        Who's Actually Responsible?
      </h2>
      <p style={{ color: COLORS.dim, marginBottom: 24 }}>
        Distinguishing Modi's personal decisions from structural momentum, inherited foundations, and external factors.
      </p>
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
  );
}
