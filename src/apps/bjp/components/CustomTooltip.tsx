import { COLORS } from "../constants";

interface TooltipPayloadItem {
  name: string;
  value: number | string;
  color?: string;
  stroke?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

export default function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(17,17,24,0.96)", border: "1px solid #2a2a3a", borderRadius: 10,
      padding: "10px 14px", fontSize: 13, lineHeight: 1.6, maxWidth: 240,
      backdropFilter: "blur(12px)",
    }}>
      <div style={{ fontWeight: 600, color: "#e8e6e3", marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || p.stroke || COLORS.accent }}>
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong>
        </div>
      ))}
    </div>
  );
}
