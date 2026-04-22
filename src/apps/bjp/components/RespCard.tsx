import { COLORS } from "../constants";

interface RespCardProps {
  title: string;
  color: string;
  items: string[];
}

export default function RespCard({ title, color, items }: RespCardProps) {
  return (
    <div style={{
      background: COLORS.surface, border: `1px solid ${COLORS.border}`,
      borderTop: `3px solid ${color}`, borderRadius: 10, padding: 16,
      flex: "1 1 280px", minWidth: 260,
    }}>
      <h4 style={{ fontSize: "0.88rem", fontWeight: 600, marginBottom: 10, color: "#e8e6e3" }}>
        {title}
      </h4>
      {items.map((item, i) => (
        <div key={i} style={{
          fontSize: "0.82rem", color: COLORS.dim, padding: "6px 0",
          borderBottom: i < items.length - 1 ? `1px solid ${COLORS.border}` : "none",
          lineHeight: 1.55,
        }}>
          {item}
        </div>
      ))}
    </div>
  );
}
