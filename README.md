<div align="center">

```
██╗███╗   ██╗████████╗███████╗███╗   ██╗████████╗███╗   ███╗███████╗███████╗██╗  ██╗
██║████╗  ██║╚══██╔══╝██╔════╝████╗  ██║╚══██╔══╝████╗ ████║██╔════╝██╔════╝██║  ██║
██║██╔██╗ ██║   ██║   █████╗  ██╔██╗ ██║   ██║   ██╔████╔██║█████╗  ███████╗███████║
██║██║╚██╗██║   ██║   ██╔══╝  ██║╚██╗██║   ██║   ██║╚██╔╝██║██╔══╝  ╚════██║██╔══██║
██║██║ ╚████║   ██║   ███████╗██║ ╚████║   ██║   ██║ ╚═╝ ██║███████╗███████║██║  ██║
╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
```

### **The Intentional Trading Layer on Solana**
*Say what you want. Solana handles the rest.*

<br/>

[![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF?style=for-the-badge&logo=solana&logoColor=white)](https://solana.com)
[![Built with Anchor](https://img.shields.io/badge/Anchor-0.30.0-FF6B35?style=for-the-badge)](https://www.anchor-lang.com/)
[![Powered by Grok](https://img.shields.io/badge/AI-Grok_xAI-00D4AA?style=for-the-badge)](https://x.ai)
[![Jupiter V6](https://img.shields.io/badge/DEX-Jupiter_V6-E84142?style=for-the-badge)](https://jup.ag)
[![License](https://img.shields.io/badge/License-MIT-7C5CFC?style=for-the-badge)](LICENSE)
[![Hackathon](https://img.shields.io/badge/Solana-Hackathon_2025-gold?style=for-the-badge)](https://solana.com)

<br/>

> **IntentMesh** is a decentralized, AI-powered trading and payment protocol on Solana.  
> Users express financial goals in **plain English** — competing solver agents fulfill them **on-chain, atomically, and non-custodially**.

<br/>

[**Live Demo**](#-demo) · [**Architecture**](#-architecture) · [**Quick Start**](#-quick-start) · [**How It Works**](#-how-it-works) · [**Tech Stack**](#-tech-stack)

</div>

---

## 📌 The Problem

Every existing Solana DEX forces users to think in **transactions**. To make a simple swap today you need to:

```
Select DEX → Configure slippage → Choose route → Understand liquidity depth
→ Identify rug tokens → Set deadline → Approve → Hope for the best
```

This excludes **95% of potential users** who don't speak "DeFi."  
Meanwhile, retail traders consistently get **worse prices** than bots that scan all venues simultaneously.

---

## ✨ The Solution

IntentMesh lets users think in **outcomes**, not transactions.

```
User types:  "Swap 1 SOL for the best meme token right now,
              skip anything with less than $500k liquidity or looks like a rug"

IntentMesh:  ✓ Parses intent with Grok AI
             ✓ Scans token safety on-chain
             ✓ Simulates transaction (shows exact output before signing)
             ✓ Runs solver auction — 4 agents compete for best price
             ✓ Atomic settlement on Solana
             ✓ Verifiable proof on-chain
             
Result:      48,291 BONK lands in your wallet in 6.2 seconds.
```

---

## 🏗 Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           INTENTMESH SYSTEM                             │
│                                                                         │
│  ┌─────────────┐    ┌──────────────────┐    ┌───────────────────────┐  │
│  │   USER      │    │   AI LAYER       │    │   BLOCKCHAIN LAYER    │  │
│  │  (Frontend) │    │   (Off-Chain)    │    │   (Solana On-Chain)   │  │
│  └──────┬──────┘    └────────┬─────────┘    └──────────┬────────────┘  │
│         │                   │                          │               │
│         │  Natural Language  │                          │               │
│         │─────────────────► │                          │               │
│         │                   │  Grok AI Parse           │               │
│         │                   │  ┌─────────────────┐     │               │
│         │                   │  │ Intent Object   │     │               │
│         │                   │  │ JSON Schema     │     │               │
│         │                   │  │ Validation      │     │               │
│         │                   │  └────────┬────────┘     │               │
│         │                   │           │              │               │
│         │                   │  Risk Scan│              │               │
│         │                   │  ┌────────▼────────┐     │               │
│         │                   │  │ Contract Check  │     │               │
│         │                   │  │ Liquidity Scan  │     │               │
│         │                   │  │ Holder Analysis │     │               │
│         │                   │  └────────┬────────┘     │               │
│         │◄──────────────────│           │              │               │
│         │  Risk Report +    │           │              │               │
│         │  Simulation       │           │              │               │
│         │                   │           │              │               │
│         │  User Signs ──────────────────────────────► │               │
│         │  (1 tx only)      │                          │               │
│         │                   │                ┌─────────▼─────────┐    │
│         │                   │                │  PDA ESCROW       │    │
│         │                   │                │  ┌─────────────┐  │    │
│         │                   │                │  │ Funds locked│  │    │
│         │                   │                │  │ Intent data │  │    │
│         │                   │                │  │ Spend limits│  │    │
│         │                   │                │  │ Deadline    │  │    │
│         │                   │                │  └─────────────┘  │    │
│         │                   │                └─────────┬─────────┘    │
│         │                   │                          │               │
│         │                   │              ┌───────────▼───────────┐  │
│         │                   │              │   SOLVER AUCTION      │  │
│         │                   │              │                       │  │
│         │                   │              │  sol-0x4f2a ──► bid   │  │
│         │                   │              │  sol-0x8c1d ──► bid   │  │
│         │                   │              │  sol-0x2e9b ──► bid   │  │
│         │                   │              │  sol-0x7f3c ──► bid   │  │
│         │                   │              │                       │  │
│         │                   │              │  Best bid wins →      │  │
│         │                   │              │  Atomic execution via │  │
│         │                   │              │  Jupiter V6           │  │
│         │                   │              └───────────┬───────────┘  │
│         │                   │                          │               │
│         │◄─────────────────────────────────────────────               │
│         │  Tokens arrive in wallet + Explorer proof                    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### The 3 Layers

```
┌──────────────────────────────────────────────────────────────────────┐
│  LAYER 1 — AI INTENT PARSER                             [OFF-CHAIN]  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Input:  "Buy me the best meme token, skip rugs, $500k+ liquidity"  │
│                            │                                         │
│                            ▼  Grok AI API                           │
│  Output: {                                                           │
│    "action": "buy",                                                  │
│    "token_in": "SOL",                                                │
│    "token_out": "auto",                                              │
│    "token_criteria": {                                               │
│      "category": "meme",                                             │
│      "sort_by": "24h_performance",                                   │
│      "min_liquidity_usd": 500000,                                    │
│      "rug_check": true                                               │
│    },                                                                │
│    "amount_in": null,          ← asks user to clarify               │
│    "max_slippage_bps": 50,                                           │
│    "deadline_seconds": 60                                            │
│  }                                                                   │
│                            │                                         │
│                            ▼  Zod Schema Validator                  │
│                       ✓ VALID / ✗ REJECT                            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────────┐
│  LAYER 2 — ON-CHAIN ESCROW PDA                          [ON-CHAIN]  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   User deposits funds ──► PDA (Program Derived Address)             │
│                                                                      │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  PDA ACCOUNT                                                 │  │
│   │  ─────────────────────────────────────────────────────────   │  │
│   │  owner:          IntentMesh Program                          │  │
│   │  depositor:      User wallet pubkey                          │  │
│   │  intent_data:    Serialized IntentObject                     │  │
│   │  amount_locked:  1.0 SOL                                     │  │
│   │  spend_cap:      1.0 SOL (cannot exceed)                     │  │
│   │  max_slippage:   50 bps                                      │  │
│   │  deadline:       Unix timestamp + 60s                        │  │
│   │  state:          OPEN | FILLED | CANCELLED | EXPIRED         │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│   Rules enforced by program code (not humans):                       │
│   • No solver can route more than spend_cap                          │
│   • No human (incl. team) can withdraw without user consent          │
│   • After deadline → auto-refund to user                             │
│   • Solver rewarded ONLY if output ≥ declared minimum                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────────┐
│  LAYER 3 — SOLVER AGENT NETWORK                  [OFF + ON-CHAIN]   │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   1. Solver stakes SOL on-chain (skin in the game)                  │
│   2. Monitors open intents via Helius webhooks                       │
│   3. Simulates execution across Jupiter / Raydium / Orca             │
│   4. Submits bid on-chain: "I deliver X tokens for Y fee"           │
│   5. Winner executes atomically (own capital → user → reimbursed)   │
│   6. Outcome verified by program → reputation score updated          │
│   7. Bad outcome → stake slashed                                     │
│                                                                      │
│   Solver Reputation Score:                                           │
│   ┌─────────┬──────────────┬───────────┬───────────┬─────────────┐  │
│   │ Solver  │ Fills        │ Avg Delta │ Slash     │ Score       │  │
│   ├─────────┼──────────────┼───────────┼───────────┼─────────────┤  │
│   │ 0x4f2a  │ 1,204        │ +0.12%    │ 0         │ ████████ 98 │  │
│   │ 0x8c1d  │ 876          │ +0.08%    │ 1         │ ███████  91 │  │
│   │ 0x2e9b  │ 432          │ -0.02%    │ 0         │ █████    78 │  │
│   │ 0x7f3c  │ 201          │ +0.19%    │ 2         │ ████     65 │  │
│   └─────────┴──────────────┴───────────┴───────────┴─────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

### Intent Lifecycle Flow

```
                        INTENT LIFECYCLE
                        ───────────────

 ┌──────────┐
 │   USER   │
 └────┬─────┘
      │
      │  "Swap 1 SOL for best meme, skip rugs"
      │
      ▼
 ┌──────────────────────┐
 │  1. PARSE            │  Grok AI → Intent JSON
 │     (off-chain)      │  Zod schema validation
 └──────────┬───────────┘
            │
            ▼
 ┌──────────────────────┐
 │  2. RISK SCAN        │  Contract honeypot check
 │     (off-chain)      │  Liquidity depth analysis
 └──────────┬───────────┘  Holder concentration scan
            │              RugCheck.xyz + Helius API
            ▼
 ┌──────────────────────┐
 │  3. SIMULATE         │  simulateTransaction RPC
 │     (off-chain)      │  Shows exact output, fee,
 └──────────┬───────────┘  slippage BEFORE signing
            │
            │  User reviews & approves ✓
            ▼
 ┌──────────────────────┐
 │  4. DEPOSIT          │  User signs 1 transaction
 │     (on-chain)       │  Funds locked in PDA
 └──────────┬───────────┘  Intent data stored on-chain
            │
            ▼
 ┌──────────────────────┐
 │  5. SOLVER AUCTION   │  Multiple solvers bid
 │     (on-chain)       │  Best price wins
 └──────────┬───────────┘  10-second window
            │
            ▼
 ┌──────────────────────┐
 │  6. EXECUTION        │  Atomic: solver buys token
 │     (on-chain)       │  using own capital →
 └──────────┬───────────┘  delivers to user →
            │              receives reimbursement
            ▼              All in one transaction
 ┌──────────────────────┐
 │  7. VERIFY           │  Program checks:
 │     (on-chain)       │  output ≥ min_amount?
 └──────────┬───────────┘  YES → solver paid + reputation++
            │              NO  → revert + stake slashed
            ▼
 ┌──────────────────────┐
 │  8. COMPLETE         │  Tokens in user wallet
 │                      │  Explorer tx link shown
 └──────────────────────┘  PDA closed, rent returned

      ── At any point between steps 4–6 ──
      User can call CANCEL → full refund from PDA
```

---

## 🔐 Trust & Safety Model

```
┌─────────────────────────────────────────────────────────────────────┐
│                    WHAT THE AI CAN & CANNOT DO                      │
├─────────────────────────────┬───────────────┬───────────────────────┤
│  Action                     │  AI Can Do?   │  On-Chain Enforced?   │
├─────────────────────────────┼───────────────┼───────────────────────┤
│  Hold your private key      │  ✗  NEVER     │  N/A                  │
│  Sign transactions for you  │  ✗  NEVER     │  Wallet required      │
│  Move more than cap         │  ✗  NEVER     │  ✓ PDA hard limit     │
│  Change destination addr    │  ✗  NEVER     │  ✓ Locked at deposit  │
│  Parse natural language      │  ✓  Yes       │  N/A (no funds yet)   │
│  Run token risk scan        │  ✓  Yes       │  Advisory only        │
│  Suggest execution route    │  ✓  Yes       │  User confirms first  │
│  Execute after approval     │  ✓  Via solver│  ✓ Atomic + verified  │
│  Cancel / refund you        │  ✗  You only  │  ✓ User instruction   │
└─────────────────────────────┴───────────────┴───────────────────────┘

Key principle: The AI proposes. You sign. The blockchain enforces.
```

---

## ⚡ Quick Start

### Prerequisites

```bash
node >= 18.0.0
rust >= 1.75.0
solana-cli >= 1.18.0
anchor >= 0.30.0
```

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/intentmesh.git
cd intentmesh
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# AI Layer
GROK_API_KEY=your_grok_api_key_here
GROK_MODEL=grok-3

# Solana Network
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_RPC_URL=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
HELIUS_API_KEY=your_helius_api_key

# Program
NEXT_PUBLIC_PROGRAM_ID=YOUR_DEPLOYED_PROGRAM_ID

# Token Safety
RUGCHECK_API_KEY=your_rugcheck_api_key
```

### 3. Deploy the Solana Program

```bash
# Build the Anchor program
anchor build

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Run tests
anchor test
```

### 4. Start the Frontend

```bash
npm run dev
```

Visit `http://localhost:3000` — connect Phantom wallet (devnet) and start trading by intent.

### 5. Run a Solver Agent

```bash
cd solver-agent
npm install
npm run start:devnet
```

---

## 📁 Project Structure

```
intentmesh/
│
├── programs/                    # Solana smart contracts (Rust + Anchor)
│   └── intentmesh/
│       └── src/
│           ├── lib.rs           # Program entry point
│           ├── instructions/
│           │   ├── deposit.rs   # Lock funds into PDA
│           │   ├── fulfill.rs   # Solver fulfills intent
│           │   ├── cancel.rs    # User cancels & refunds
│           │   └── slash.rs     # Slash underperforming solver
│           ├── state/
│           │   ├── intent.rs    # IntentAccount struct
│           │   └── solver.rs    # SolverAccount + reputation
│           └── errors.rs        # Custom program errors
│
├── app/                         # Next.js 14 frontend
│   ├── page.tsx                 # Main trading interface
│   ├── api/
│   │   ├── parse-intent/        # Grok AI intent parsing endpoint
│   │   │   └── route.ts
│   │   ├── risk-scan/           # Token safety analysis
│   │   │   └── route.ts
│   │   └── simulate/            # Transaction simulation
│   │       └── route.ts
│   └── components/
│       ├── IntentInput.tsx      # Natural language input
│       ├── ParsedIntent.tsx     # JSON display card
│       ├── RiskScan.tsx         # Risk analysis display
│       ├── SimulationCard.tsx   # Pre-sign simulation
│       ├── SolverAuction.tsx    # Live solver bids
│       └── Portfolio.tsx        # Token balances
│
├── solver-agent/                # Solver bot (TypeScript)
│   ├── src/
│   │   ├── index.ts             # Bot entry point
│   │   ├── monitor.ts           # Watch on-chain intents
│   │   ├── router.ts            # Jupiter V6 route finding
│   │   ├── executor.ts          # Submit fulfillment tx
│   │   └── reputation.ts        # Track solver score
│   └── package.json
│
├── lib/
│   ├── grok.ts                  # Grok AI client + system prompt
│   ├── schema.ts                # Intent JSON schema (Zod)
│   ├── rugcheck.ts              # Token safety scanner
│   ├── helius.ts                # RPC + webhook client
│   └── jupiter.ts               # Jupiter V6 SDK wrapper
│
├── tests/
│   ├── intentmesh.ts            # Anchor program tests
│   └── solver.test.ts           # Solver logic tests
│
├── Anchor.toml                  # Anchor config
├── Cargo.toml                   # Rust workspace
└── package.json
```

---

## 🤖 AI Integration — Grok System Prompt

The exact system prompt used to parse user intents:

```typescript
// lib/grok.ts

const INTENT_SYSTEM_PROMPT = `
You are the IntentMesh intent parser running on Solana.

Your ONLY job: convert user financial intent sentences into a valid JSON object.

RULES:
- Respond ONLY with raw JSON. No markdown. No explanation. No preamble.
- Never ask clarifying questions — set missing required fields to null.
- Never invent amounts the user didn't specify — set amount_in to null if unclear.
- Default slippage: 50 bps. Default deadline: 60 seconds.
- Default rug_check_required: true for all buy actions.

OUTPUT SCHEMA:
{
  "action": "buy" | "sell" | "send" | "stake" | "swap",
  "token_in": string | null,
  "token_out": string | null,
  "amount_in": number | null,
  "max_slippage_bps": number,
  "destination_address": string | null,
  "deadline_seconds": number,
  "rug_check_required": boolean,
  "token_criteria": {
    "category": string,
    "sort_by": "24h_performance" | "volume" | "liquidity",
    "min_liquidity_usd": number,
    "max_holder_concentration": number
  } | null,
  "recurring": {
    "frequency": "daily" | "weekly" | "monthly",
    "end_date": string | null
  } | null
}
`;

export async function parseIntent(userInput: string) {
  const response = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROK_API_KEY}`
    },
    body: JSON.stringify({
      model: "grok-3",
      messages: [
        { role: "system", content: INTENT_SYSTEM_PROMPT },
        { role: "user", content: userInput }
      ],
      temperature: 0
    })
  });

  const data = await response.json();
  const raw = data.choices[0].message.content;

  // Validate against Zod schema before any blockchain interaction
  return IntentSchema.parse(JSON.parse(raw));
}
```

---

## 🧪 Example Intents

```bash
# Simple swap
"Swap 1 SOL for USDC"

# AI-guided token selection
"Buy the best performing meme token today, skip anything under $500k liquidity"

# Conditional / limit order
"Buy $100 of SOL if price drops below $130"

# Payment
"Send $50 USDC equivalent to wallet 7xKm...a4Bc by tonight"

# Recurring
"Buy $20 of SOL every Monday at market price"

# Risk-aware
"Sell all my BONK only if it's up more than 20% today"

# Cross-protocol
"Stake 2 SOL for maximum yield across available validators"
```

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Blockchain** | Solana Mainnet-Beta | Settlement, speed (400ms blocks) |
| **Smart Contracts** | Rust + Anchor 0.30 | PDA escrow, solver auction, slashing |
| **AI Parser** | Grok AI (xAI) | Natural language → Intent JSON |
| **Schema Validation** | Zod (TypeScript) | Guard between AI and blockchain |
| **DEX Routing** | Jupiter V6 API | Best-price swap execution |
| **Liquidity** | Raydium + Orca SDKs | Deep liquidity sources |
| **Token Safety** | RugCheck.xyz + Helius | Honeypot & rug detection |
| **RPC** | Helius | Fast RPC + webhooks for solver |
| **Frontend** | Next.js 14 + Tailwind | Trading interface |
| **Wallet** | Solana Wallet Adapter | Phantom, Solflare, Backpack |
| **Solver Bot** | TypeScript + Node.js | Off-chain execution agent |

---

## 📊 How Solvers Work

```
SOLVER ECONOMICS
─────────────────

  User locks:    1.0 SOL
  User gets:     48,291 BONK  (at market rate)

  Solver flow:
  ┌─────────────────────────────────────────────┐
  │  1. Solver spends own capital to buy BONK   │
  │  2. Delivers 48,291 BONK to user wallet     │
  │  3. PDA releases 1.0 SOL to solver          │
  │  4. Solver keeps 0.1–0.2% as margin         │
  │  5. IntentMesh takes 0.05% protocol fee     │
  └─────────────────────────────────────────────┘

  Why solvers compete:
  More competition = better prices for users = more users
  = more volume = more fees for solvers

  Self-reinforcing flywheel ↑
```

---

## 🔒 Security

- **Non-custodial**: Private keys never leave the user's wallet
- **Spend-capped PDAs**: On-chain hard limits on every intent
- **Atomic execution**: Trades either fully complete or fully revert — no partial fills
- **Transaction simulation**: Users see exact output before signing
- **Solver slashing**: Underperforming solvers lose staked SOL
- **Cancel anytime**: Users can reclaim funds from PDA before fulfillment
- **Audit status**: `⚠️ Devnet only — unaudited. Do not use with real funds.`

> For production deployment, a professional smart contract audit is required (recommended: OtterSec, Neodyme, or Trail of Bits).

---

## 🗺 Roadmap

```
Phase 1 — Hackathon MVP (NOW)
├── ✅ Intent parser (Grok AI)
├── ✅ Risk scan (RugCheck + Helius)
├── ✅ Transaction simulation
├── ✅ PDA escrow program (Anchor)
├── ✅ Solver agent (Jupiter V6)
└── ✅ Frontend (Next.js + Wallet Adapter)

Phase 2 — Post-Hackathon
├── ⬜ Professional smart contract audit
├── ⬜ Permissionless solver registration
├── ⬜ Solver reputation system (on-chain)
├── ⬜ Recurring intents (DCA)
├── ⬜ Cross-border payments module
└── ⬜ Mainnet deployment

Phase 3 — Scale
├── ⬜ Mobile app (React Native)
├── ⬜ Telegram bot integration
├── ⬜ Multi-language intent parsing
├── ⬜ Solver SDK (let anyone build a solver)
└── ⬜ DAO governance for protocol parameters
```

---

## 🆚 Competitive Landscape

```
┌─────────────────┬──────────┬──────────┬─────────┬──────────┬────────────┐
│                 │ Natural  │ AI Risk  │ Solver  │ Solana   │ Payments   │
│ Protocol        │ Language │ Scan     │ Auction │ Native   │ Module     │
├─────────────────┼──────────┼──────────┼─────────┼──────────┼────────────┤
│ Jupiter         │    ✗     │    ✗     │    ✗    │    ✓     │     ✗      │
│ CoW Protocol    │    ✗     │    ✗     │    ✓    │    ✗     │     ✗      │
│ UniswapX        │    ✗     │    ✗     │    ✓    │    ✗     │     ✗      │
│ Dialect/Blinks  │    ~     │    ✗     │    ✗    │    ✓     │     ~      │
├─────────────────┼──────────┼──────────┼─────────┼──────────┼────────────┤
│ IntentMesh      │    ✓     │    ✓     │    ✓    │    ✓     │     ✓      │
└─────────────────┴──────────┴──────────┴─────────┴──────────┴────────────┘

The exact combination: NL intent + AI risk + solver auction + Solana = 0 competitors.
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

```bash
# Run linting
npm run lint

# Run tests
npm run test

# Run Anchor tests
anchor test

# Build
npm run build
```

---

## ⚠️ Disclaimer

IntentMesh is **experimental software** deployed on Solana **devnet only**.

- Smart contracts have **not been professionally audited**
- Do **not** use with real funds until a security audit is complete
- This project was built for **hackathon demonstration purposes**
- DeFi carries inherent risks — always do your own research

---

## 📄 License

MIT © 2025 IntentMesh

---

<div align="center">

**Built on Solana · Built by Matt · Zero Competitors**

*Say what you want. Solana handles the rest.*

</div>
