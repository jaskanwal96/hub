import { Link } from "react-router-dom";

const apps = [
  {
    slug: "fitness",
    icon: "🏃",
    name: "5K Finish Strong",
    desc: "40-day gym + running plan for Tokyo race.",
    color: "#22d3ee",
    border: "rgba(34,211,238,0.22)",
    bg: "rgba(34,211,238,0.06)",
    status: "active",
  },
  {
    slug: "flow",
    icon: "🔀",
    name: "Flow",
    desc: "Inspired by react flow",
    color: "#22d3ee",
    border: "rgba(34,211,238,0.22)",
    bg: "rgba(34,211,238,0.06)",
    status: "active",
  },
  {
    slug: "bjp",
    icon: "🏛️",
    name: "BJP",
    desc: "Inspired by react flow",
    color: "#22d3ee",
    border: "rgba(34,211,238,0.22)",
    bg: "rgba(34,211,238,0.06)",
    status: "active",
  },
  {
    slug: "krabi",
    icon: "🌴",
    name: "Krabi",
    desc: "Inspired by react flow",
    color: "#22d3ee",
    border: "rgba(34,211,238,0.22)",
    bg: "rgba(34, 184, 238, 0.06)",
    status: "active",
  },
  {
    slug: "reset",
    icon: "⚡",
    name: "Chandigarh Reset",
    desc: "15-day sprint · Apr 28 – May 12. Fitness, roadmap, deep work.",
    color: "#f97316",
    border: "rgba(249,115,22,0.22)",
    bg: "rgba(249,115,22,0.05)",
    status: "active",
  },
  // Add more apps here
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#07070f", color: "#e2e8f0", fontFamily: "monospace", padding: "40px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "#334155", marginBottom: 8 }}>PERSONAL HUB</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em", lineHeight: 1.1 }}>My Apps</div>
        <div style={{ fontSize: 11, color: "#334155", marginTop: 6 }}>Small tools built for me.</div>
      </div>

      <div className="home-grid">
        {apps.map((app) => (
          <Link
            key={app.slug}
            to={`/${app.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div style={{
              display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
              background: app.bg, border: `1px solid ${app.border}`, borderRadius: 12,
              transition: "opacity 0.15s", cursor: "pointer", minHeight: 100,
            }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{app.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", marginBottom: 3 }}>{app.name}</div>
                <div style={{ fontSize: 10, color: "#475569", lineHeight: 1.5 }}>{app.desc}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                <div style={{ fontSize: 8, color: app.color, border: `1px solid ${app.border}`, borderRadius: 3, padding: "2px 6px", letterSpacing: "0.1em" }}>
                  {app.status.toUpperCase()}
                </div>
                <div style={{ fontSize: 10, color: "#334155" }}>OPEN →</div>
              </div>
            </div>
          </Link>
        ))}

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          padding: "16px 18px", border: "1px dashed rgba(255,255,255,0.06)", borderRadius: 12,
          color: "#1e2d3d", fontSize: 10, letterSpacing: "0.1em",
        }}>
          + MORE APPS COMING
        </div>
      </div>
    </div>
  );
}
