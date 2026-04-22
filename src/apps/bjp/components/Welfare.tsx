import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { COLORS } from "../constants";
import { upiData, infraData } from "../data";
import StatBox from "./StatBox";
import ChartCard from "./ChartCard";
import CustomTooltip from "./CustomTooltip";

export default function Welfare() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.2rem", fontWeight: 400, marginBottom: 8 }}>
        Welfare & Digital India
      </h2>
      <p style={{ color: COLORS.dim, marginBottom: 24 }}>
        The most unambiguously positive dimension — though built on pre-2014 foundations.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <StatBox value="56 Cr" label="Jan Dhan bank accounts opened" type="good" />
        <StatBox value="₹44L Cr" label="Direct Benefit Transfers disbursed" type="good" />
        <StatBox value="120M+" label="Toilets built (Swachh Bharat)" type="good" />
        <StatBox value="10.3 Cr" label="LPG connections (Ujjwala)" type="good" />
      </div>
      <ChartCard
        title="UPI Transaction Growth"
        subtitle="Billions of transactions per year"
        note="India handles 49% of global real-time digital payments. But Aadhaar (2009), NPCI (2008) were UPA-era foundations."
      >
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
  );
}
