import React, { useState } from "react";
import { COLORS, TABS } from "./constants";
import Overview from "./components/Overview";
import Economy from "./components/Economy";
import Welfare from "./components/Welfare";
import Blunders from "./components/Blunders";
import Communal from "./components/Communal";
import Corporates from "./components/Corporates";
import Jobs from "./components/Jobs";
import Responsibility from "./components/Responsibility";

const TAB_CONTENT: Record<string, React.ReactElement> = {
  overview: <Overview />,
  economy: <Economy />,
  welfare: <Welfare />,
  blunders: <Blunders />,
  communal: <Communal />,
  corporates: <Corporates />,
  jobs: <Jobs />,
  responsibility: <Responsibility />,
};

export default function ModiEraDashboard() {
  const [tab, setTab] = useState("overview");

  return (
    <div style={{ background: "#0a0a0f", color: "#e8e6e3", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* HERO */}
      <div style={{
        minHeight: "55vh", display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center", padding: "2rem", position: "relative",
        background: "radial-gradient(ellipse at 30% 50%, rgba(240,192,64,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(96,165,250,0.04) 0%, transparent 50%)",
      }}>
        <h1 style={{
          fontFamily: "'Instrument Serif', serif", fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
          fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 800,
        }}>
          The <span style={{ color: COLORS.accent }}>Modi Era</span><br />2014 – 2026
        </h1>
        <p style={{ fontSize: "1.05rem", color: COLORS.dim, maxWidth: 550, marginTop: 16, lineHeight: 1.7 }}>
          An interactive, data-driven analysis of twelve years — achievements, failures, contested numbers, and who was really responsible.
        </p>
      </div>

      {/* NAV */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,10,15,0.88)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${COLORS.border}`, overflowX: "auto",
        WebkitOverflowScrolling: "touch",
      }}>
        <div style={{ display: "flex", maxWidth: 1100, margin: "0 auto" }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: "none", border: "none",
                color: tab === t.id ? COLORS.accent : COLORS.dim,
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 500,
                padding: "14px 16px", cursor: "pointer", whiteSpace: "nowrap",
                borderBottom: tab === t.id ? `2px solid ${COLORS.accent}` : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 80px" }}>
        {TAB_CONTENT[tab]}
      </div>

      {/* FOOTER */}
      <div style={{
        textAlign: "center", padding: "40px 20px", color: COLORS.dim, fontSize: "0.74rem",
        borderTop: `1px solid ${COLORS.border}`, maxWidth: 700, margin: "0 auto", lineHeight: 1.8,
      }}>
        <p>Data from: World Bank, IMF, RBI, MoSPI, PLFS, CMIE, NCRB, Freedom House, RSF, V-Dem, USCIRF, WHO, Lancet, ILO, Bloomberg, Forbes, PIB, SEBI, Hindenburg Research, Reuters, BBC, The Hindu, Indian Express, The Economist.</p>
        <p style={{ marginTop: 8 }}>This dashboard presents multiple perspectives and contested data points. Readers should consult original sources for full context.</p>
      </div>
    </div>
  );
}
