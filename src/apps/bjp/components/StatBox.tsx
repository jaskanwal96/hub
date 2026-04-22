import { COLORS } from "../constants";

interface StatBoxProps {
  value: string;
  label: string;
  type?: string;
}

const colorMap: Record<string, string> = {
  good: COLORS.green,
  bad: COLORS.red,
  neutral: COLORS.blue,
};

export default function StatBox({ value, label, type }: StatBoxProps) {
  return (
    <div style={{
      background: COLORS.surface, border: `1px solid ${COLORS.border}`,
      borderRadius: 10, padding: "16px 18px", flex: "1 1 180px", minWidth: 170,
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: "1.5rem",
        fontWeight: 600, color: colorMap[type] || COLORS.accent,
      }}>
        {value}
      </div>
      <div style={{ fontSize: "0.78rem", color: COLORS.dim, marginTop: 4, lineHeight: 1.5 }}>
        {label}
      </div>
    </div>
  );
}
