import type { ReactNode } from "react";
import { COLORS } from "../constants";

interface VerdictCardProps {
  children: ReactNode;
}

export default function VerdictCard({ children }: VerdictCardProps) {
  return (
    <div style={{
      background: COLORS.surface2, borderLeft: `3px solid ${COLORS.accent}`,
      padding: "16px 20px", margin: "20px 0", borderRadius: "0 8px 8px 0",
      fontSize: "0.88rem", lineHeight: 1.75, color: "#c8c6c2",
    }}>
      {children}
    </div>
  );
}
