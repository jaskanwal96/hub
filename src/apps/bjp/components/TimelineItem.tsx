import { COLORS } from "../constants";

interface TimelineItemProps {
  year: string;
  desc: string;
  type?: "good" | "bad";
}

export default function TimelineItem({ year, desc, type = "bad" }: TimelineItemProps) {
  const color = type === "bad" ? COLORS.red : COLORS.green;
  return (
    <div style={{ position: "relative", paddingLeft: 28, marginBottom: 20 }}>
      <div style={{
        position: "absolute", left: 0, top: 6, width: 12, height: 12,
        borderRadius: "50%", background: color, border: "2px solid #0a0a0f",
      }} />
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color, marginBottom: 3 }}>
        {year}
      </div>
      <div style={{ fontSize: "0.86rem", color: COLORS.dim, lineHeight: 1.65 }}>
        {desc}
      </div>
    </div>
  );
}
