import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Design System Colors
const COLORS = {
  background: "#09090F",
  primary: "#7C5CFC",
  secondary: "#00D4AA",
  textPrimary: "#E8E8F0",
  textMuted: "#5A5A78",
  cardBg: "#0F0F1A",
  cardBorder: "#1E1E30",
  amber: "#F59E0B",
  green: "#10B981",
};

export default function Landing() {
  return (
    <div
      className="min-h-screen font-sans antialiased"
      style={{ backgroundColor: COLORS.background, color: COLORS.textPrimary }}
    >
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: `radial-gradient(circle, ${COLORS.primary}30 0%, transparent 70%)`,
            top: "-20%",
            left: "-10%",
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: `radial-gradient(circle, ${COLORS.secondary}30 0%, transparent 70%)`,
            bottom: "-10%",
            right: "-5%",
            animation: "float 25s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]"
          style={{
            background: `radial-gradient(circle, ${COLORS.primary}20 0%, transparent 70%)`,
            top: "50%",
            left: "50%",
            animation: "pulse 15s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .font-sans {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.05); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        .gradient-text {
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .glow-purple {
          box-shadow: 0 0 20px rgba(124, 92, 252, 0.4);
        }
        .glow-purple-hover:hover {
          box-shadow: 0 0 24px rgba(124, 92, 252, 0.6);
        }
        .card-glow {
          box-shadow: 0 0 16px rgba(124, 92, 252, 0.2);
        }
        .hero-title {
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
        }
        h2 {
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        h3 {
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        p {
          font-weight: 400;
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 36px !important; }
        }
      `}</style>

      {/* SECTION 1 — NAVBAR */}
      <nav
        className="sticky top-0 z-50 border-b backdrop-blur-xl"
        style={{
          backgroundColor: `${COLORS.background}80`,
          borderColor: COLORS.cardBorder,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: COLORS.primary }}
              >
                IM
              </div>
              <span className="font-semibold text-lg" style={{ color: COLORS.textPrimary }}>
                IntentMesh
              </span>
            </div>

            {/* Open Application Button - PRESERVED ROUTING */}
            <Link to="/dashboard">
              <Button
                className="glow-purple glow-purple-hover transition-all duration-300"
                style={{
                  backgroundColor: COLORS.primary,
                  color: "#fff",
                }}
              >
                Open Application
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* SECTION 2 — HERO */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Headline */}
          <h1
            className="hero-title font-bold tracking-tight mb-4"
            style={{ fontSize: "56px", lineHeight: 1.1 }}
          >
            Say what you want.
            <br />
            <span className="gradient-text">Solana handles the rest.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="max-w-2xl mx-auto mb-8"
            style={{ fontSize: "18px", color: COLORS.textMuted }}
          >
            IntentMesh is the first AI-powered intent trading layer on Solana. Type what you want to do —
            competing solver agents execute it on-chain, atomically, non-custodially.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {/* Open Application - PRESERVED ROUTING */}
            <Link to="/dashboard">
              <Button
                size="lg"
                className="h-14 px-8 text-lg glow-purple glow-purple-hover transition-all duration-300"
                style={{ backgroundColor: COLORS.primary, color: "#fff" }}
              >
                Open Application →
              </Button>
            </Link>
            {/* Read the Docs - No functionality */}
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg transition-all duration-300"
              style={{
                backgroundColor: "transparent",
                borderColor: COLORS.cardBorder,
                color: COLORS.textMuted,
              }}
              onClick={(e) => e.preventDefault()}
            >
              Read the Docs
            </Button>
          </div>

          {/* Stat Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { icon: "⚡", text: "400ms Settlement" },
              { icon: "🤖", text: "Powered by AI model" },
              { icon: "🔐", text: "Non-Custodial" },
            ].map((badge, i) => (
              <div
                key={i}
                className="px-4 py-2 text-sm border"
                style={{
                  backgroundColor: COLORS.cardBg,
                  borderColor: COLORS.cardBorder,
                  color: COLORS.textMuted,
                }}
              >
                {badge.icon} {badge.text}
              </div>
            ))}
          </div>

          {/* Terminal/Chat Demo Card */}
          <div
            className="max-w-2xl mx-auto p-6 border card-glow"
            style={{
              backgroundColor: COLORS.cardBg,
              borderColor: COLORS.primary,
            }}
          >
            <p className="text-xs mb-3" style={{ color: COLORS.textMuted }}>
              What do you want to do?
            </p>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border"
              style={{ backgroundColor: COLORS.background, borderColor: COLORS.cardBorder }}
            >
              <p
                className="flex-1 text-sm italic text-left"
                style={{ color: COLORS.textMuted }}
              >
                "Swap 1 SOL for the best meme token, skip anything that looks like a rug..."
              </p>
              <Button
                size="sm"
                style={{ backgroundColor: COLORS.primary, color: "#fff" }}
                onClick={(e) => e.preventDefault()}
              >
                Parse Intent →
              </Button>
            </div>
            <p className="mt-3 text-sm text-left" style={{ color: COLORS.secondary }}>
              ✓ 48,291 BONK landed in your wallet — 6.2 seconds
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: COLORS.cardBorder }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Label */}
          <div className="text-center mb-12">
            <span
              className="inline-block px-3 py-1 text-xs font-medium mb-4"
              style={{ backgroundColor: COLORS.primary, color: "#fff" }}
            >
              THE PROCESS
            </span>
            <h2 className="text-3xl font-bold">How IntentMesh Works</h2>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", icon: "🗣️", title: "You Type an Intent", desc: "Describe what you want in plain English. No slippage settings, no route selection, no DeFi jargon required." },
              { num: "02", icon: "🤖", title: "AI model Parses It", desc: "Our AI converts your words into a validated, structured on-chain instruction. Every field verified before touching the blockchain." },
              { num: "03", icon: "🛡️", title: "Risk Scan Runs", desc: "Automatic token safety check — honeypot detection, liquidity depth, holder concentration — shown to you before you sign anything." },
              { num: "04", icon: "✍️", title: "You Sign Once", desc: "Review the exact simulation output. One wallet signature locks your intent into a secure on-chain escrow. That's it." },
              { num: "05", icon: "⚡", title: "Solvers Compete", desc: "Permissionless solver agents bid against each other to give you the best price across all Solana DEXes." },
              { num: "06", icon: "✅", title: "Tokens Arrive", desc: "Atomic settlement. Your tokens land in your wallet with an on-chain proof. Average time: under 8 seconds." },
            ].map((step, i) => (
              <div
                key={i}
                className="relative p-6 border transition-all duration-300 hover:card-glow group"
                style={{
                  backgroundColor: COLORS.cardBg,
                  borderColor: COLORS.cardBorder,
                }}
              >
                <span
                  className="absolute top-4 right-4 text-sm font-mono"
                  style={{ color: COLORS.textMuted }}
                >
                  {step.num}
                </span>
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm" style={{ color: COLORS.textMuted }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURES / WHY INTENTMESH */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: COLORS.cardBorder }}>
        <div className="max-w-6xl mx-auto">
          {/* Section Label */}
          <div className="text-center mb-12">
            <span
              className="inline-block px-3 py-1 text-xs font-medium mb-4"
              style={{ backgroundColor: COLORS.primary, color: "#fff" }}
            >
              WHY INTENTMESH
            </span>
            <h2 className="text-3xl font-bold">Built Different. By Design.</h2>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "🧠", title: "Intent-Native UX", desc: "The first Solana protocol where users express outcomes, not transactions. No DEX knowledge required. Just say what you want.", color: COLORS.primary, borderColor: COLORS.primary },
              { icon: "⚡", title: "Real-Time Solver Auction", desc: "Competing AI agents bid on every order in real time. The winner gives you the best price — better than any manual route.", color: COLORS.secondary, borderColor: COLORS.secondary },
              { icon: "🛡️", title: "AI-Powered Risk Scan", desc: "Every unfamiliar token gets scanned for honeypots, rug patterns, and liquidity risks — before a single lamport moves.", color: COLORS.amber, borderColor: COLORS.amber },
              { icon: "🔐", title: "Non-Custodial by Architecture", desc: "The AI never holds your keys. Funds are locked in a Solana PDA controlled by code, not humans. Cancel anytime.", color: COLORS.green, borderColor: COLORS.green },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: COLORS.cardBg,
                  borderLeft: `4px solid ${feature.borderColor}`,
                }}
              >
                <div className="text-2xl mb-3" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm" style={{ color: COLORS.textMuted }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — STATS BAR */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8 border-y"
        style={{ borderColor: COLORS.cardBorder, backgroundColor: COLORS.cardBg }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "< 8s", label: "Avg Settlement Time" },
              { value: "0.05%", label: "Protocol Fee" },
              { value: "4+", label: "Active Solver Agents" },
              { value: "0", label: "Direct Competitors" },
            ].map((stat, i, arr) => (
              <div
                key={i}
                className={`text-center ${i < arr.length - 1 ? 'md:border-r' : ''}`}
                style={{ borderColor: COLORS.cardBorder }}
              >
                <div
                  className="text-5xl font-bold mb-2"
                  style={{
                    color: i % 2 === 0 ? COLORS.primary : COLORS.secondary,
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: COLORS.textMuted }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — TECH STACK STRIP */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b" style={{ borderColor: COLORS.cardBorder }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm mb-6" style={{ color: COLORS.textMuted }}>
            Powered By
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Solana", "Anchor", "AI model", "Jupiter V6", "Helius", "Next.js", "Rust"].map((tech, i) => (
              <div
                key={i}
                className="px-4 py-2 text-sm border transition-all duration-300 hover:glow-purple"
                style={{
                  backgroundColor: COLORS.cardBg,
                  borderColor: COLORS.cardBorder,
                  color: COLORS.textMuted,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL CTA */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Purple radial gradient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${COLORS.primary}15 0%, transparent 60%)`,
          }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to trade by intention?</h2>
          <p className="mb-8" style={{ color: COLORS.textMuted }}>
            Connect your wallet and make your first intent-powered trade on Solana devnet.
          </p>

          {/* Open Application Button - PRESERVED ROUTING */}
          <Link to="/dashboard">
            <Button
              size="lg"
              className="h-16 px-10 text-lg glow-purple glow-purple-hover transition-all duration-300"
              style={{ backgroundColor: COLORS.primary, color: "#fff" }}
            >
              Open Application
            </Button>
          </Link>

          {/* Disclaimer */}
          <p className="mt-6 text-sm" style={{ color: COLORS.textMuted }}>
            ⚠️ Currently on Solana devnet. No real funds. Unaudited — for demonstration only.
          </p>
        </div>
      </section>

      {/* SECTION 8 — FOOTER */}
      <footer className="border-t py-12 px-4 sm:px-6 lg:px-8" style={{ borderColor: COLORS.cardBorder, backgroundColor: COLORS.cardBg }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            {/* Left: Logo + Tagline */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  IM
                </div>
                <span className="font-semibold text-lg">IntentMesh</span>
              </div>
              <p className="text-sm" style={{ color: COLORS.textMuted }}>
                Say what you want. Solana handles the rest.
              </p>
            </div>

            {/* Right: Links */}
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm transition-colors hover:text-white"
                style={{ color: COLORS.textMuted }}
                onClick={(e) => e.preventDefault()}
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-sm transition-colors hover:text-white"
                style={{ color: COLORS.textMuted }}
                onClick={(e) => e.preventDefault()}
              >
                Docs
              </a>
              {/* Devnet App - Uses same routing as Open Application */}
              <Link
                to="/dashboard"
                className="text-sm transition-colors hover:text-white"
                style={{ color: COLORS.primary }}
              >
                Devnet App
              </Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="text-center pt-8 border-t" style={{ borderColor: COLORS.cardBorder }}>
            <p className="text-xs" style={{ color: COLORS.textMuted }}>
              © 2025 IntentMesh · Built on Solana · Hackathon Edition
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

