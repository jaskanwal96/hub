import type { ReactNode } from "react";
import { COLORS } from "../constants";

interface ChartCardProps {
  title?: string;
  subtitle?: string;
  note?: string;
  children: ReactNode;
}

export default function ChartCard({ title, subtitle, note, children }: ChartCardProps) {
  return (
    <div style={{
      background: COLORS.surface, border: `1px solid ${COLORS.border}`,
      borderRadius: 12, padding: "20px 20px 16px", marginBottom: 20, overflow: "hidden",
    }}>
      {title && <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: 0 }}>{title}</h3>}
      {subtitle && <p style={{ fontSize: "0.8rem", color: COLORS.dim, margin: "4px 0 14px" }}>{subtitle}</p>}
      {children}
      {note && (
        <p style={{ fontSize: "0.72rem", color: COLORS.dim, marginTop: 10, fontStyle: "italic", opacity: 0.7 }}>
          {note}
        </p>
      )}
    </div>
  );
}
