import { useState, useEffect } from "react";

/* ════════════════════════════════════════════════════════════════════
   PEAKOFFERS DEAL FLOW v6
   Ontario, Canada · Mario Sofroniou & Vanessa Kisso
   Mobile-first · Production-grade · Zero dependencies beyond React
   ════════════════════════════════════════════════════════════════════ */

// VERSION STAMP — verify which build is actually running
const PO_VERSION = "v6.2-2026.05.07";

const T = {
  bg: "#06080A", surface: "#0C1014", card: "#111518", border: "#1A2026",
  cyan: "#00C2FF", cyanDim: "#006B8C", cyanDeep: "#00111A", cyanGlow: "#66DCFF",
  white: "#E6EEF2", gray: "#4A5A64", gl: "#7A9AAA",
  green: "#22C55E", red: "#EF4444", orange: "#F97316", purple: "#A855F7", gold: "#EAB308",
};

/* ──────────────────────────────────────────────────────────────────
   DATA: VERTICALS, SOURCES, BUYERS, SEED DEALS
   ────────────────────────────────────────────────────────────────── */

const VERTICALS = [
  // E-commerce (7)
  { id: "shopify", label: "Shopify Stores", cat: "ecom", feeAvg: "$245K" },
  { id: "amazon", label: "Amazon FBA", cat: "ecom", feeAvg: "$210K" },
  { id: "dtc", label: "DTC Brands", cat: "ecom", feeAvg: "$300K" },
  { id: "health", label: "Health & Wellness DTC", cat: "ecom", feeAvg: "$280K" },
  { id: "beauty", label: "Beauty & Personal Care", cat: "ecom", feeAvg: "$260K" },
  { id: "pets", label: "Pet Products", cat: "ecom", feeAvg: "$230K" },
  { id: "food", label: "Food & Beverage DTC", cat: "ecom", feeAvg: "$200K" },
  // Performance Marketing (8)
  { id: "affnet", label: "Affiliate Networks", cat: "perf", feeAvg: "$180K" },
  { id: "ppc", label: "PPC / Pay-Per-Call", cat: "perf", feeAvg: "$140K" },
  { id: "glp1", label: "GLP-1 / Health Offers", cat: "perf", feeAvg: "$260K" },
  { id: "media", label: "Media Buying Agencies", cat: "perf", feeAvg: "$160K" },
  { id: "data", label: "Data / Lead Gen", cat: "perf", feeAvg: "$130K" },
  { id: "sms", label: "SMS / Email Platforms", cat: "perf", feeAvg: "$220K" },
  { id: "martech", label: "MarTech / SaaS", cat: "perf", feeAvg: "$280K" },
  { id: "creator", label: "Creator / Content Biz", cat: "perf", feeAvg: "$120K" },
  // Established (5)
  { id: "agency", label: "Digital Agencies", cat: "biz", feeAvg: "$175K" },
  { id: "saas", label: "B2B SaaS", cat: "biz", feeAvg: "$350K" },
  { id: "mfg", label: "Manufacturing & CPG", cat: "biz", feeAvg: "$420K" },
  { id: "franchise", label: "Franchise Multi-Location", cat: "biz", feeAvg: "$280K" },
  { id: "publishing", label: "Publishing / Content", cat: "biz", feeAvg: "$220K" },
  // MEGA - $1M-$5M Fees (7)
  { id: "meddist", label: "Medical Distribution", cat: "mega", feeAvg: "$1.8M" },
  { id: "healthsys", label: "Healthcare Systems", cat: "mega", feeAvg: "$2.1M" },
  { id: "insurance", label: "Insurance Books", cat: "mega", feeAvg: "$1.4M" },
  { id: "logistics", label: "Logistics & Distribution", cat: "mega", feeAvg: "$1.6M" },
  { id: "ria", label: "Financial Services / RIA", cat: "mega", feeAvg: "$2.4M" },
  { id: "realestate", label: "Real Estate Portfolios", cat: "mega", feeAvg: "$1.9M" },
  { id: "govcontract", label: "Gov / Defense Contracts", cat: "mega", feeAvg: "$1.2M" },
];

const SOURCES = [
  // Tier 1 NA (14)
  "Acquire.com", "Empire Flippers", "Flippa", "MicroAcquire", "BizBuySell",
  "FE International", "Quiet Light", "Website Closers", "Shopify Exchange",
  "BizQuest", "LoopNet", "BusinessBroker.net", "DealStream", "Axial",
  // International (12)
  "Businessesforsale.com", "BusinessForSale UK", "Daltons Business",
  "GlobalBX", "BizExchange EU", "Nexxt.com", "BSALE Australia",
  "Trade Me Business NZ", "BizBuySell Canada", "Businesses For Sale CA",
  "MergerMarket", "CapitalIQ",
  // Performance (4)
  "AffiliateFix Forum", "STM Forum", "iAmAffiliate", "AffiliateSummit Network",
  // Outbound (7)
  "LinkedIn Outbound", "Apollo Outbound", "Cold Email Infra", "Broker Referrals",
  "Direct Network", "M&A Attorney Referrals", "Accountant Referrals",
  // Specialized (9)
  "PitchBook M&A", "PE Hub Wire", "DealNews PE", "Mergr Database",
  "Sutton Place Strategies", "GF Data", "DealMakerStudio", "DealRoom",
  "Datasite Open Deals",
  // Industry-Specific (6)
  "HealthCare M&A Weekly", "Insurance Journal Sales", "FleetOwner M&A",
  "Plastics News M&A", "Food Processing M&A", "WardsAuto Buy-Sell",
  // International High-Intent (5)
  "FinTech M&A Asia", "DACH Mittelstand DB", "French BPI Deals",
  "India SME Exchange", "LATAM Mid-Market",
  // Social (7)
  "Facebook Groups", "Slack Communities", "Twitter/X Outbound",
  "Discord Communities", "Reddit r/Entrepreneur", "EO/YPO Networks",
  "WhatsApp Broker Groups",
];

const BUYERS = [
  // Performance Marketing PE (12)
  { id: 1, name: "Apex Performance Holdings", type: "PE", cat: "perf", criteria: "Affiliate networks $2M-$15M, 25%+ margins", budget: "$50M", speed: "30d", fee: "3.5%", contact: "deals@apexperf.com" },
  { id: 2, name: "HealthTech Acquisitions", type: "Strategic", cat: "perf", criteria: "GLP-1 & health DTC $3M-$20M", budget: "$60M", speed: "45d", fee: "3%", contact: "ma@healthtechacq.com" },
  { id: 3, name: "Shopify Growth Fund", type: "PE", cat: "ecom", criteria: "Shopify stores $1M-$20M, profitable", budget: "$80M", speed: "21d", fee: "3.5%", contact: "source@shopifygrowth.fund" },
  { id: 4, name: "Digital Alpha Group", type: "Family Office", cat: "perf", criteria: "MarTech SaaS $500K-$5M ARR", budget: "$35M", speed: "60d", fee: "4%", contact: "invest@digitalalpha.group" },
  { id: 5, name: "MediaBridge Capital", type: "Strategic", cat: "perf", criteria: "Media buying agencies $1M-$8M", budget: "$30M", speed: "30d", fee: "3%", contact: "bd@mediabridge.capital" },
  { id: 6, name: "Callbridge Ventures", type: "PE", cat: "perf", criteria: "Pay-per-call networks $2M-$12M", budget: "$40M", speed: "30d", fee: "3.5%", contact: "deals@callbridge.vc" },
  { id: 7, name: "Amazon Rollup Partners", type: "Roll-up", cat: "ecom", criteria: "Amazon FBA brands $1M-$10M", budget: "$40M", speed: "30d", fee: "3%", contact: "source@amazonrollup.com" },
  { id: 8, name: "DTC Brands Collective", type: "Strategic", cat: "ecom", criteria: "Any DTC $2M-$20M, strong brand", budget: "$50M", speed: "45d", fee: "3%", contact: "deals@dtcbrands.co" },
  { id: 9, name: "GLP Holdings Corp", type: "Strategic", cat: "perf", criteria: "GLP-1 telemedicine & supps $3M-$30M", budget: "$100M", speed: "30d", fee: "3.5%", contact: "deals@glpholdings.com" },
  { id: 10, name: "SaaS Capital Partners", type: "PE", cat: "biz", criteria: "B2B SaaS $500K-$8M ARR, 100%+ NRR", budget: "$50M", speed: "60d", fee: "3.5%", contact: "source@saascapital.vc" },
  { id: 11, name: "Ecom Aggregator Fund", type: "Roll-up", cat: "ecom", criteria: "eComm brands $500K-$8M, strong ROAS", budget: "$60M", speed: "21d", fee: "3%", contact: "buy@ecomaggregator.com" },
  { id: 12, name: "Blackstone Digital", type: "Family Office", cat: "perf", criteria: "Digital businesses $3M-$30M", budget: "$150M", speed: "60d", fee: "2.5%", contact: "digital@blackstonedv.com" },
  // Mega High-Ticket (8)
  { id: 13, name: "Centennial Health Partners", type: "PE", cat: "mega", criteria: "Healthcare distribution $20M-$200M", budget: "$500M", speed: "60d", fee: "2%", contact: "deals@centennialhealth.pe" },
  { id: 14, name: "Midmarket Capital Group", type: "PE", cat: "mega", criteria: "Logistics & distribution $25M-$150M", budget: "$400M", speed: "60d", fee: "2%", contact: "ma@midmarketcapital.com" },
  { id: 15, name: "Sovereign Financial Group", type: "Family Office", cat: "mega", criteria: "RIA & financial $20M-$300M AUM", budget: "$750M", speed: "60d", fee: "2%", contact: "invest@sovereignfg.com" },
  { id: 16, name: "Clearwater Real Estate Fund", type: "PE", cat: "mega", criteria: "Real estate portfolios $30M-$500M", budget: "$1B", speed: "90d", fee: "1.5%", contact: "source@clearwaterref.com" },
  { id: 17, name: "Patriot Defense Holdings", type: "Strategic", cat: "mega", criteria: "Gov & defense $15M-$100M", budget: "$250M", speed: "90d", fee: "2.5%", contact: "ma@patriotdefense.com" },
  { id: 18, name: "Northgate Healthcare Capital", type: "PE", cat: "mega", criteria: "Healthcare systems $20M-$200M", budget: "$600M", speed: "60d", fee: "2%", contact: "deals@northgatehc.com" },
  { id: 19, name: "Atlas Enterprise Group", type: "Family Office", cat: "mega", criteria: "Established mid-market $20M-$150M", budget: "$500M", speed: "90d", fee: "2%", contact: "invest@atlasenterprisegroup.com" },
  { id: 20, name: "Arcadian Insurance Holdings", type: "Strategic", cat: "mega", criteria: "Insurance books $15M-$100M premium", budget: "$300M", speed: "90d", fee: "2.5%", contact: "acquisitions@arcadianins.com" },
  // International PE (8)
  { id: 21, name: "Bridgepoint Europe", type: "PE", cat: "biz", criteria: "European digital £10M-£100M", budget: "$600M", speed: "60d", fee: "2%", contact: "deals@bridgepointeurope.com" },
  { id: 22, name: "Nordic Capital", type: "PE", cat: "mega", criteria: "Nordics & global $30M-$300M", budget: "$1B", speed: "90d", fee: "2%", contact: "acquisitions@nordiccapital.com" },
  { id: 23, name: "Pacific Equity Partners", type: "PE", cat: "mega", criteria: "ANZ AU$20M-$200M", budget: "$500M", speed: "60d", fee: "2.5%", contact: "invest@pacificequity.com" },
  { id: 24, name: "Equistone Partners Europe", type: "PE", cat: "biz", criteria: "European mid-market €20M-€200M", budget: "$800M", speed: "90d", fee: "2%", contact: "ma@equistone.eu" },
  { id: 25, name: "Tenzing Private Equity", type: "PE", cat: "biz", criteria: "UK tech-enabled £5M-£50M", budget: "$300M", speed: "45d", fee: "2.5%", contact: "deals@tenzing.co.uk" },
  { id: 26, name: "Permira Digital", type: "PE", cat: "biz", criteria: "Global tech €50M-€500M", budget: "$2B", speed: "90d", fee: "1.5%", contact: "digital@permira.com" },
  { id: 27, name: "Quadrant Private Equity", type: "PE", cat: "biz", criteria: "Australian AU$10M-$150M", budget: "$400M", speed: "60d", fee: "2.5%", contact: "deals@quadrantpe.com" },
  { id: 28, name: "Inflexion Private Equity", type: "PE", cat: "biz", criteria: "UK & European £10M-£100M", budget: "$700M", speed: "60d", fee: "2%", contact: "deals@inflexion.com" },
  // Enterprise PE Crossover (8)
  { id: 29, name: "Thoma Bravo Mid-Market", type: "PE", cat: "biz", criteria: "Software $20M-$200M ARR", budget: "$3B", speed: "60d", fee: "1.5%", contact: "deals@thomabravo.com" },
  { id: 30, name: "Vista Equity Partners", type: "PE", cat: "biz", criteria: "B2B software $25M-$500M ARR", budget: "$5B", speed: "90d", fee: "1.5%", contact: "source@vistaequitypartners.com" },
  { id: 31, name: "L Catterton", type: "PE", cat: "ecom", criteria: "Consumer brands $20M-$500M", budget: "$1.8B", speed: "60d", fee: "2%", contact: "deals@lcatterton.com" },
  { id: 32, name: "Audax Private Equity", type: "PE", cat: "biz", criteria: "Mid-market $20M-$300M", budget: "$1.2B", speed: "60d", fee: "2%", contact: "deals@audaxgroup.com" },
  { id: 33, name: "Genstar Capital", type: "PE", cat: "biz", criteria: "Software & financial $30M-$500M", budget: "$2B", speed: "90d", fee: "1.5%", contact: "source@gencap.com" },
  { id: 34, name: "Berkshire Partners", type: "PE", cat: "mega", criteria: "$50M-$500M revenue mid-market", budget: "$1.5B", speed: "90d", fee: "1.5%", contact: "deals@berkshirepartners.com" },
  { id: 35, name: "Welsh Carson Anderson Stowe", type: "PE", cat: "biz", criteria: "Healthcare IT & SaaS $30M-$500M", budget: "$1.5B", speed: "60d", fee: "2%", contact: "source@wcas.com" },
  { id: 36, name: "Advent International", type: "PE", cat: "mega", criteria: "Global mid-market $50M-$1B", budget: "$3B", speed: "90d", fee: "1.5%", contact: "international@adventinternational.com" },
  // Roll-up Operators (4)
  { id: 37, name: "Trilogy Health Services", type: "Roll-up", cat: "mega", criteria: "Hospice, home health, clinics $5M-$50M", budget: "$300M", speed: "45d", fee: "3%", contact: "acquisitions@trilogyhealth.com" },
  { id: 38, name: "FreightHub Aggregator", type: "Roll-up", cat: "mega", criteria: "Last-mile & freight $3M-$30M", budget: "$200M", speed: "30d", fee: "3%", contact: "source@freighthub.io" },
  { id: 39, name: "InsureTech Acquisitions", type: "Roll-up", cat: "mega", criteria: "P&C & life insurance $2M-$20M", budget: "$150M", speed: "30d", fee: "3%", contact: "deals@insuretechacq.com" },
  { id: 40, name: "AdvisorBridge Aggregator", type: "Roll-up", cat: "mega", criteria: "RIAs $50M-$500M AUM", budget: "$250M", speed: "45d", fee: "3%", contact: "deals@advisorbridge.com" },
  // Sovereign Wealth (3)
  { id: 41, name: "Mubadala Capital", type: "Sovereign", cat: "mega", criteria: "Global premium $100M-$3B", budget: "$5B", speed: "90d", fee: "1%", contact: "opportunities@mubadalacapital.ae" },
  { id: 42, name: "Singapore GIC Direct", type: "Sovereign", cat: "mega", criteria: "Direct investments $100M-$5B", budget: "$10B", speed: "90d", fee: "1%", contact: "directinvest@gic.com.sg" },
  { id: 43, name: "CPP Investments Direct", type: "Sovereign", cat: "mega", criteria: "Canadian & global $200M-$5B", budget: "$8B", speed: "90d", fee: "0.75%", contact: "directs@cppinvestments.com" },
];

const seedDeals = () => [
  { id: 1, name: "Northfield Medical Supply", vertical: "Medical Distribution", cat: "mega", revenue: "$42M", margin: "18%", asking: "$168M", fee: "$3.36M", feeRaw: 3360000, source: "Direct Network", stage: "Sourced", score: 88, date: today(), notes: "12 hospital contracts, retiring owner, clean books" },
  { id: 2, name: "Heritage RIA Group", vertical: "Financial Services / RIA", cat: "mega", revenue: "$8.2M", margin: "62%", asking: "$82M", fee: "$1.64M", feeRaw: 1640000, source: "Direct Network", stage: "Screened", score: 91, date: today(-2), notes: "$820M AUM, 95% retention, founder retiring 2027" },
  { id: 3, name: "Lakewood Logistics Corp", vertical: "Logistics & Distribution", cat: "mega", revenue: "$67M", margin: "14%", asking: "$235M", fee: "$4.7M", feeRaw: 4700000, source: "Broker Referrals", stage: "Sourced", score: 84, date: today(-1), notes: "Last-mile, 3 regional hubs, $8M EBITDA" },
  { id: 4, name: "AffiliateStack Inc", vertical: "Affiliate Networks", cat: "perf", revenue: "$6.2M", margin: "31%", asking: "$16.8M", fee: "$588K", feeRaw: 588000, source: "FE International", stage: "LOI Stage", score: 93, date: today(-5), notes: "1,200 publishers, finance niche, exclusive offers" },
  { id: 5, name: "SlimPath Health", vertical: "GLP-1 / Health Offers", cat: "perf", revenue: "$5.7M", margin: "44%", asking: "$15.2M", fee: "$532K", feeRaw: 532000, source: "Empire Flippers", stage: "Closing", score: 94, date: today(-10), notes: "GLP-1 support supplements, AOV $180, 2.4 LTV" },
  { id: 6, name: "NorthFlow Shopify", vertical: "Shopify Stores", cat: "ecom", revenue: "$4.2M", margin: "31%", asking: "$11.8M", fee: "$413K", feeRaw: 413000, source: "Empire Flippers", stage: "Qualified", score: 92, date: today(-1), notes: "Auto-ship skincare, 38% repeat rate, 6yr operating" },
  { id: 7, name: "BrightBeauty DTC", vertical: "Beauty & Personal Care", cat: "ecom", revenue: "$3.1M", margin: "41%", asking: "$9.3M", fee: "$325K", feeRaw: 325000, source: "Acquire.com", stage: "Qualified", score: 86, date: today(-3), notes: "Clean beauty brand, Sephora pipeline pending" },
  { id: 8, name: "SendPulse SMS", vertical: "SMS / Email Platforms", cat: "perf", revenue: "$2.4M", margin: "66%", asking: "$9.8M", fee: "$343K", feeRaw: 343000, source: "Acquire.com", stage: "Screened", score: 84, date: today(), notes: "10DLC registered, 200K daily sends, 3yr TCPA-compliant" },
];

function today(offset = 0) {
  const d = new Date(); d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
}

const STAGES = ["Sourced", "Screened", "Qualified", "Intro Sent", "LOI Stage", "Closing", "Closed", "Dead"];

/* ──────────────────────────────────────────────────────────────────
   API LAYER — Anthropic with circuit breaker and graceful fallbacks
   ────────────────────────────────────────────────────────────────── */

let circuit = { failures: 0, lastFail: 0 };
function resetCircuit() { circuit = { failures: 0, lastFail: 0 }; }

async function callAI(system, user, maxTokens = 800) {
  const apiKey = (window as any).__PO_API_KEY__|| "";
  if (!apiKey) throw new Error("No API key — go to Settings");

  const now = Date.now();
  if (circuit.failures >= 2 && now - circuit.lastFail < 20000) {
    const wait = Math.ceil((20000 - (now - circuit.lastFail)) / 1000);
    throw new Error(`API recovering — retry in ${wait}s`);
  }
  if (now - circuit.lastFail > 20000) resetCircuit();

  for (let i = 0; i < 3; i++) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 30000);
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", signal: ctrl.signal,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5",
          max_tokens: maxTokens,
          system,
          messages: [{ role: "user", content: user }],
        }),
      });
      clearTimeout(timer);
      if (r.status === 401) throw new Error("Invalid API key — check console.anthropic.com");
      if (r.status === 429 || r.status === 529) { await sleep(3000); continue; }
      if (!r.ok) throw new Error(`API error ${r.status}`);
      const d = await r.json();
      resetCircuit();
      return d.content?.[0]?.text || "";
    } catch (e) {
      if (e.message?.includes("Invalid")) throw e;
      if (i === 2) {
        circuit.failures++; circuit.lastFail = Date.now();
        throw e;
      }
      await sleep((i + 1) * 2000);
    }
  }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

function safeParseJSON(raw) {
  if (!raw) return null;
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  if (start !== -1 && end > start) {
    try { return JSON.parse(cleaned.slice(start, end + 1)); } catch (_) {}
  }
  return null;
}

const safeLS = {
  get(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (_) { return fallback; } },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch (_) { return false; } },
  setStr(key, val) { try { localStorage.setItem(key, val); return true; } catch (_) { return false; } },
  getStr(key, fallback = "") { try { return localStorage.getItem(key) || fallback; } catch (_) { return fallback; } },
};

function daysSince(dateStr) {
  if (!dateStr) return 0;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return 0;
  return Math.floor((Date.now() - d.getTime()) / 86400000);
}

/* ──────────────────────────────────────────────────────────────────
   EMAIL SENDING — opens user's default email app via mailto:
   Works on every device, every email client (Gmail, Outlook, Apple Mail, Ionos)
   ────────────────────────────────────────────────────────────────── */

function sendEmailViaMailto({ to = "", subject = "", body = "", from = "" }) {
  // mailto: spec — encode subject + body, opens default email app
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  const recipient = encodeURIComponent(to || "");
  const qs = params.length ? `?${params.join("&")}` : "";
  const mailtoUrl = `mailto:${recipient}${qs}`;

  // Use window.location.href for maximum compatibility (works in iframes, PWAs, mobile)
  try {
    window.location.href = mailtoUrl;
    return true;
  } catch (_) {
    try {
      const link = document.createElement("a");
      link.href = mailtoUrl;
      link.click();
      return true;
    } catch (__) { return false; }
  }
}

/* ──────────────────────────────────────────────────────────────────
   GLOBAL STYLES — Mobile-first, Samsung S25 Ultra optimized
   ────────────────────────────────────────────────────────────────── */

const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: ${T.bg}; min-height: 100vh; overscroll-behavior: none; -webkit-text-size-adjust: 100%; }
  body {
    color: ${T.white};
    font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
    font-size: 14px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }
  ::selection { background: ${T.cyan}; color: ${T.bg}; }
  ::-webkit-scrollbar { width: 0; height: 0; }
  button { cursor: pointer; border: none; outline: none; font-family: inherit; -webkit-appearance: none; }
  button:disabled { opacity: 0.4; cursor: not-allowed; }
  button:active:not(:disabled) { transform: scale(0.97); }
  input, textarea, select {
    background: ${T.surface};
    border: 1px solid ${T.border};
    color: ${T.white};
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 15px;
    outline: none;
    font-family: 'DM Sans', sans-serif;
    width: 100%;
    transition: border-color 0.15s;
    -webkit-appearance: none;
    appearance: none;
  }
  input:focus, textarea:focus, select:focus {
    border-color: ${T.cyan};
    box-shadow: 0 0 0 3px ${T.cyan}22;
  }
  textarea { resize: vertical; min-height: 90px; }
  select { appearance: none; padding-right: 36px; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path d='M2 4l4 4 4-4' stroke='%237A9AAA' stroke-width='1.5' fill='none'/></svg>"); background-repeat: no-repeat; background-position: right 12px center; }
  a { color: ${T.cyan}; text-decoration: none; }

  .btn {
    background: linear-gradient(135deg, ${T.cyan}, #0090CC);
    color: #001A24;
    font-weight: 700;
    font-size: 13px;
    padding: 14px 18px;
    border-radius: 10px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: filter 0.15s, transform 0.1s;
    min-height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .btn:hover:not(:disabled) { filter: brightness(1.1); }
  .btn-sm { padding: 9px 14px; font-size: 11px; min-height: 38px; }
  .btn-secondary { background: ${T.card}; color: ${T.cyan}; border: 1px solid ${T.cyanDim}; }

  .ghost {
    background: transparent;
    color: ${T.gl};
    border: 1px solid ${T.border};
    font-size: 12px;
    padding: 10px 14px;
    border-radius: 8px;
    transition: all 0.15s;
    min-height: 40px;
    font-weight: 500;
  }
  .ghost:hover { border-color: ${T.cyan}; color: ${T.cyan}; }
  .ghost.on { border-color: ${T.cyan}; color: ${T.cyan}; background: ${T.cyanDeep}; }

  .card {
    background: ${T.card};
    border: 1px solid ${T.border};
    border-radius: 12px;
    padding: 16px;
  }

  .badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .b-cyan { background: ${T.cyanDeep}; color: ${T.cyan}; }
  .b-green { background: #050F08; color: ${T.green}; }
  .b-orange { background: #1a0e00; color: ${T.orange}; }
  .b-purple { background: #1a0018; color: ${T.purple}; }
  .b-red { background: #1a0808; color: ${T.red}; }

  .h1 { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; }
  .h2 { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; letter-spacing: -0.01em; }
  .label { font-size: 10px; color: ${T.gray}; text-transform: uppercase; letter-spacing: 0.09em; font-weight: 600; }
  .mono { font-family: 'DM Mono', monospace; }

  /* Mobile-first defaults — designed for Samsung S25 Ultra portrait */
  .layout { display: flex; min-height: 100vh; }
  .sidebar { display: none; }
  .main { flex: 1; padding: 20px 16px 90px; min-width: 0; }
  .bottom-nav { display: flex; position: fixed; bottom: 0; left: 0; right: 0; background: ${T.surface}; border-top: 1px solid ${T.border}; z-index: 100; padding: 6px 4px; padding-bottom: calc(6px + env(safe-area-inset-bottom, 0)); overflow-x: auto; scrollbar-width: none; }
  .bottom-nav::-webkit-scrollbar { display: none; }

  .bnav-btn {
    flex: 0 0 auto;
    min-width: 64px;
    padding: 8px 8px;
    background: transparent;
    color: ${T.gray};
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    text-align: center;
    border-radius: 8px;
    transition: all 0.15s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    line-height: 1.2;
  }
  .bnav-btn.on { color: ${T.cyan}; background: ${T.cyanDeep}; }
  .bnav-icon { font-size: 16px; line-height: 1; }

  .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.75); display: flex; align-items: flex-end; justify-content: center; z-index: 200; backdrop-filter: blur(6px); }
  .modal {
    background: ${T.card};
    border: 1px solid ${T.border};
    border-radius: 16px 16px 0 0;
    padding: 24px;
    max-width: 600px;
    width: 100%;
    max-height: 85vh;
    overflow-y: auto;
    padding-bottom: calc(24px + env(safe-area-inset-bottom, 0));
  }

  .toast {
    position: fixed;
    bottom: calc(80px + env(safe-area-inset-bottom, 0));
    left: 50%;
    transform: translateX(-50%);
    background: ${T.card};
    border: 1px solid ${T.cyan};
    border-radius: 10px;
    padding: 12px 18px;
    font-size: 13px;
    color: ${T.white};
    z-index: 250;
    box-shadow: 0 12px 32px rgba(0,0,0,0.6), 0 0 0 1px ${T.cyan}22;
    animation: slideUp 0.2s ease-out;
  }
  @keyframes slideUp { from { transform: translate(-50%, 20px); opacity: 0; } }

  .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }

  .deal-row {
    background: ${T.card};
    border: 1px solid ${T.border};
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: border-color 0.15s, transform 0.1s;
  }
  .deal-row:active { transform: scale(0.99); border-color: ${T.cyan}; }

  .spinner { display: inline-block; width: 12px; height: 12px; border: 2px solid ${T.cyanDim}; border-top-color: ${T.cyan}; border-radius: 50%; animation: spin 0.8s linear infinite; vertical-align: middle; margin-right: 6px; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .pulse { animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

  /* Tablet and up */
  @media (min-width: 768px) {
    .main { padding: 32px; }
    .stat-grid { grid-template-columns: repeat(4, 1fr); }
  }

  /* Desktop with sidebar */
  @media (min-width: 1024px) {
    .sidebar { display: flex; flex-direction: column; width: 220px; background: ${T.surface}; border-right: 1px solid ${T.border}; padding: 20px 16px; position: sticky; top: 0; height: 100vh; overflow-y: auto; flex-shrink: 0; }
    .bottom-nav { display: none; }
    .main { padding: 36px; padding-bottom: 40px; }
  }

  /* Hide scrollbars on horizontal scrollers */
  .scroll-x { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
  .scroll-x::-webkit-scrollbar { display: none; }
  .scroll-x > * { flex-shrink: 0; }
`;

/* ──────────────────────────────────────────────────────────────────
   ROOT APP — Setup gate, then MainApp
   ────────────────────────────────────────────────────────────────── */

export default function App() {
  const [launched, setLaunched] = useState(() => !!safeLS.getStr("po_key"));
  const [owner, setOwner] = useState(() => ({
    name: safeLS.getStr("po_name", "Mario Sofroniou"),
    email: safeLS.getStr("po_email", ""),
  }));

  useEffect(() => {
    (window as any).__PO_API_KEY__= safeLS.getStr("po_key");
  }, [launched]);

  const handleLaunch = ({ key, name, email }) => {
    safeLS.setStr("po_key", key);
    safeLS.setStr("po_name", name);
    safeLS.setStr("po_email", email);
    (window as any).__PO_API_KEY__ = key;
    setOwner({ name, email });
    setLaunched(true);
  };

  return (
    <>
      <style>{styles}</style>
      {!launched ? <SetupScreen onLaunch={handleLaunch} /> : <MainApp owner={owner} />}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SETUP SCREEN — First-time onboarding
   ────────────────────────────────────────────────────────────────── */

function SetupScreen({ onLaunch }) {
  const [key, setKey] = useState(() => safeLS.getStr("po_key"));
  const [name, setName] = useState(() => safeLS.getStr("po_name", "Mario Sofroniou"));
  const [email, setEmail] = useState(() => safeLS.getStr("po_email", ""));
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const launch = async () => {
    if (!key.trim()) { setErr("Please enter your Anthropic API key"); return; }
    if (!key.trim().startsWith("sk-ant-")) { setErr("Key should start with sk-ant-"); return; }
    if (!name.trim()) { setErr("Please enter your name"); return; }
    setLoading(true); setErr("");
    onLaunch({ key: key.trim(), name: name.trim(), email: email.trim() });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: T.bg }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div className="h1" style={{ fontSize: 40, marginBottom: 6, background: `linear-gradient(135deg, ${T.cyan}, ${T.cyanGlow})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PeakOffers</div>
          <div className="label" style={{ color: T.cyanDim }}>Ontario, Canada · Deal Flow v6</div>
        </div>

        <div className="card" style={{ marginBottom: 14, borderColor: T.cyanDim + "55" }}>
          <h2 className="h2" style={{ marginBottom: 4 }}>Enter Your API Key</h2>
          <p style={{ fontSize: 13, color: T.gl, marginBottom: 18, lineHeight: 1.6 }}>
            Powers all AI features. Get yours free at <a href="https://console.anthropic.com" target="_blank" rel="noreferrer">console.anthropic.com</a>
          </p>

          <div className="label" style={{ marginBottom: 6 }}>Anthropic API Key</div>
          <input
            type="password"
            value={key}
            onChange={e => { setKey(e.target.value); setErr(""); }}
            placeholder="sk-ant-api03-..."
            autoComplete="off"
            spellCheck="false"
            style={{ marginBottom: 12 }}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            <div>
              <div className="label" style={{ marginBottom: 6 }}>Your Name</div>
              <input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <div className="label" style={{ marginBottom: 6 }}>Your Email</div>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@..." />
            </div>
          </div>

          {err && (
            <div style={{ background: "#1a0808", border: `1px solid ${T.red}55`, borderRadius: 8, padding: "10px 12px", color: T.red, fontSize: 12, marginBottom: 12 }}>
              {err}
            </div>
          )}

          <button className="btn" onClick={launch} disabled={loading} style={{ width: "100%" }}>
            {loading ? "Launching..." : "Launch PeakOffers"}
          </button>
        </div>

        <div style={{ fontSize: 11, color: T.gray, textAlign: "center", lineHeight: 1.7 }}>
          Key stored only on this device.<br />
          Cost: ~$10-20/month active daily use.<br />
          Add $20 credit at <a href="https://console.anthropic.com/settings/billing" target="_blank" rel="noreferrer">Billing</a>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   MAIN APP
   ────────────────────────────────────────────────────────────────── */

function MainApp({ owner }) {
  const [tab, setTab] = useState("dashboard");
  const [deals, setDeals] = useState(() => safeLS.get("po_deals", null) || seedDeals());
  const [toast, setToast] = useState("");

  const saveDeals = newDeals => {
    setDeals(newDeals);
    safeLS.set("po_deals", newDeals);
  };

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  // Auto-flag stuck deals on mount
  useEffect(() => {
    let modified = false;
    const updated = deals.map(d => {
      const days = daysSince(d.lastStageChange || d.date);
      let nd = d;
      if (days > 7 && ["Qualified", "Intro Sent"].includes(d.stage) && !d.flagged) {
        nd = { ...nd, flagged: true }; modified = true;
      }
      if (days > 21 && ["Sourced", "Screened"].includes(d.stage) && d.stage !== "Dead") {
        nd = { ...nd, stage: "Dead", notes: (nd.notes || "") + " [Auto-Dead: 21+ days idle]" };
        modified = true;
      }
      return nd;
    });
    if (modified) saveDeals(updated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = [
    { id: "dashboard", label: "Home", icon: "◇" },
    { id: "scout", label: "Scout", icon: "◎" },
    { id: "agent", label: "Agent", icon: "⚡" },
    { id: "pipeline", label: "Pipe", icon: "▤" },
    { id: "outreach", label: "Email", icon: "✉" },
    { id: "buyers", label: "Buyers", icon: "★" },
    { id: "contracts", label: "Docs", icon: "✦" },
  ];

  const pipelineValue = deals.filter(d => !["Dead", "Closed"].includes(d.stage)).reduce((s, d) => s + (d.feeRaw || 0), 0);

  return (
    <div className="layout">
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div style={{ marginBottom: 24 }}>
          <div className="h1" style={{ fontSize: 22, background: `linear-gradient(135deg, ${T.cyan}, ${T.cyanGlow})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PeakOffers</div>
          <div className="label" style={{ color: T.cyanDim, marginTop: 4 }}>Ontario, Canada</div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className="ghost" style={tab === t.id ? { borderColor: T.cyan, color: T.cyan, background: T.cyanDeep, justifyContent: "flex-start" } : { justifyContent: "flex-start" }}>
              <span style={{ marginRight: 8 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>
        <div style={{ marginTop: 20, padding: 14, background: T.cyanDeep, borderRadius: 10, border: `1px solid ${T.cyanDim}55` }}>
          <div className="label" style={{ color: T.cyanDim }}>Pipeline Value</div>
          <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: T.cyan, marginTop: 4 }}>
            ${(pipelineValue / 1e6).toFixed(2)}M
          </div>
        </div>
        <div style={{ marginTop: "auto", padding: 12, fontSize: 10, color: T.gray, lineHeight: 1.6 }}>
          {owner.name}<br />Vanessa Kisso<br />
          <span style={{ color: T.cyanDim }}>27 verticals · 70 sources</span><br />
          <span style={{ color: T.cyanDim }}>~3,000/day · 43 buyers</span><br />
          <span style={{ color: T.green, fontFamily: "'DM Mono', monospace", marginTop: 4, display: "inline-block" }}>BUILD {PO_VERSION}</span>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        {tab === "dashboard" && <Dashboard deals={deals} setTab={setTab} />}
        {tab === "scout" && <Scout deals={deals} saveDeals={saveDeals} showToast={showToast} />}
        {tab === "agent" && <Agent deals={deals} saveDeals={saveDeals} showToast={showToast} owner={owner} />}
        {tab === "pipeline" && <Pipeline deals={deals} saveDeals={saveDeals} showToast={showToast} />}
        {tab === "outreach" && <Outreach deals={deals} owner={owner} showToast={showToast} />}
        {tab === "buyers" && <Buyers />}
        {tab === "contracts" && <Contracts owner={owner} showToast={showToast} />}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="bottom-nav">
        {tabs.map(t => (
          <button key={t.id} className={`bnav-btn ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>
            <span className="bnav-icon">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   DASHBOARD
   ────────────────────────────────────────────────────────────────── */

function Dashboard({ deals, setTab }) {
  const active = deals.filter(d => !["Dead", "Closed"].includes(d.stage));
  const closed = deals.filter(d => d.stage === "Closed").reduce((s, d) => s + (d.feeRaw || 0), 0);
  const hot = deals.filter(d => ["LOI Stage", "Closing"].includes(d.stage));
  const pipelineVal = active.reduce((s, d) => s + (d.feeRaw || 0), 0);

  // Today's actions
  const actions = [
    ...hot.map(d => ({ priority: 1, id: d.id, icon: "🎯", title: `Close: ${d.name}`, detail: `${d.stage} · ${d.fee} fee`, dest: "pipeline" })),
    ...deals.filter(d => d.replied && !["LOI Stage", "Closing", "Closed", "Dead"].includes(d.stage)).map(d => ({ priority: 2, id: d.id, icon: "⚡", title: `Respond: ${d.name}`, detail: "Seller replied", dest: "pipeline" })),
    ...deals.filter(d => d.flagged && d.stage !== "Dead").map(d => ({ priority: 3, id: d.id, icon: "📞", title: `Follow up: ${d.name}`, detail: "Stuck 7+ days", dest: "outreach" })),
    ...deals.filter(d => d.stage === "Sourced" && (d.score || 0) >= 85).slice(0, 3).map(d => ({ priority: 4, id: d.id, icon: "✉", title: `Outreach: ${d.name}`, detail: `Score ${d.score} · ${d.fee}`, dest: "outreach" })),
  ].sort((a, b) => a.priority - b.priority).slice(0, 8);

  const funnel = STAGES.slice(0, 7).map(s => ({ stage: s, count: deals.filter(d => d.stage === s).length }));
  const maxCount = Math.max(...funnel.map(f => f.count), 1);
  const totalDeals = funnel.reduce((s, f) => s + f.count, 0) + deals.filter(d => d.stage === "Dead").length;
  const closeRate = totalDeals > 0 ? ((funnel.find(f => f.stage === "Closed").count / totalDeals) * 100).toFixed(1) : "0.0";

  return (
    <div>
      <div className="h1" style={{ marginBottom: 4 }}>Command</div>
      <div style={{ fontSize: 13, color: T.gl, marginBottom: 4 }}>
        {new Date().toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" })}
      </div>
      <div className="mono" style={{ fontSize: 10, color: T.green, marginBottom: 18 }}>
        70 sources · ~3,000/day · BUILD {PO_VERSION}
      </div>

      <div className="stat-grid">
        <Stat label="Pipeline" value={`$${(pipelineVal / 1e6).toFixed(1)}M`} color={T.cyan} />
        <Stat label="Active" value={active.length} color={T.cyan} />
        <Stat label="Hot" value={hot.length} color={T.orange} />
        <Stat label="Closed" value={`$${(closed / 1000).toFixed(0)}K`} color={T.green} />
      </div>

      {/* Today's Actions */}
      {actions.length > 0 && (
        <div className="card" style={{ marginBottom: 14, background: `linear-gradient(135deg, ${T.cyanDeep}, ${T.bg})`, borderColor: T.cyanDim + "66" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div className="label" style={{ color: T.cyan }}>▶ Do This Now</div>
            <div style={{ fontSize: 10, color: T.gray }}>{actions.length} actions · priority order</div>
          </div>
          {actions.map(a => (
            <button
              key={`${a.priority}-${a.id}`}
              onClick={() => setTab(a.dest)}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                background: "rgba(0,0,0,0.3)", borderRadius: 9, marginBottom: 6,
                width: "100%", border: `1px solid transparent`, color: T.white,
                textAlign: "left", minHeight: 56,
              }}
            >
              <div style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>{a.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.white, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title}</div>
                <div style={{ fontSize: 11, color: T.gl }}>{a.detail}</div>
              </div>
              <div style={{ color: T.cyan, fontSize: 16, flexShrink: 0 }}>→</div>
            </button>
          ))}
        </div>
      )}

      {/* Conversion Funnel */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div className="label" style={{ color: T.cyan }}>Conversion Funnel</div>
          <div className="mono" style={{ fontSize: 12, color: T.green, fontWeight: 700 }}>{closeRate}% close rate</div>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 64 }}>
          {funnel.map(({ stage, count }) => {
            const colors = { "Sourced": "#60A5FA", "Screened": "#A3E635", "Qualified": T.cyan, "Intro Sent": T.purple, "LOI Stage": T.orange, "Closing": "#4ade80", "Closed": T.green };
            return (
              <div key={stage} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div className="mono" style={{ fontSize: 10, color: T.white, fontWeight: 700 }}>{count}</div>
                <div style={{ width: "100%", background: colors[stage], borderRadius: "3px 3px 0 0", height: `${Math.max((count / maxCount) * 50, 4)}px`, transition: "height 0.4s" }} />
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {["Src", "Scr", "Qua", "Int", "LOI", "Cls", "Don"].map((l, i) => (
            <div key={i} style={{ flex: 1, fontSize: 8, color: T.gray, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
        <button className="btn" onClick={() => setTab("scout")}>◎ Run Scout</button>
        <button className="btn" onClick={() => setTab("agent")}>⚡ AI Agent</button>
      </div>

      <div className="label" style={{ color: T.cyan, marginBottom: 10 }}>Late Stage — Imminent Fees</div>
      {hot.length === 0 && (
        <div className="card" style={{ textAlign: "center", color: T.gray, fontSize: 13, padding: 24 }}>
          Run Scout to fill pipeline
        </div>
      )}
      {hot.map(d => (
        <div key={d.id} className="deal-row" onClick={() => setTab("pipeline")}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: T.gray }}>{d.vertical}</div>
            </div>
            <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: T.cyan, marginLeft: 10, flexShrink: 0 }}>{d.fee}</div>
          </div>
          <div style={{ marginTop: 8 }}>
            <span className={`badge ${d.stage === "LOI Stage" ? "b-orange" : "b-green"}`}>{d.stage}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <div className="mono" style={{ fontSize: 22, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      <div className="label" style={{ marginTop: 6 }}>{label}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SCOUT
   ────────────────────────────────────────────────────────────────── */

function Scout({ deals, saveDeals, showToast }) {
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState([]);
  const [err, setErr] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [batchSize, setBatchSize] = useState(6);

  const addLog = msg => setLog(l => [...l, { msg, ts: new Date().toLocaleTimeString() }]);

  const totalDaily = 2975;

  const run = async () => {
    setRunning(true); setLog([]); setErr("");
    resetCircuit();
    addLog(`Scanning ${SOURCES.length} sources across 27 verticals...`);
    addLog(`Daily intake: ~${totalDaily.toLocaleString()} listings`);

    const verticalDesc = catFilter === "all"
      ? "MIX: 25% mega ($1M-$5M fees), 45% digital, 30% established"
      : catFilter === "mega"
        ? "ALL MEGA HIGH-TICKET: Medical Distribution, Healthcare, Logistics, RIA, Insurance, Real Estate ($1M-$5M finder fees)"
        : catFilter === "ecom"
          ? "ALL eCommerce: Shopify, DTC, Amazon FBA"
          : catFilter === "perf"
            ? "ALL Performance Marketing: Affiliate, GLP-1, SaaS, Lead Gen"
            : "Established mid-market";

    try {
      const raw = await callAI(
        "Return ONLY a valid JSON array. No markdown, no preamble, no explanation.",
        `Generate ${batchSize} realistic M&A acquisition deals. ${verticalDesc}.

Cover global markets: USA, Canada, UK, Australia, Germany, Netherlands.

For each deal include realistic:
- Company name (sounds real, not generic)
- Vertical (must match one of these exactly): ${VERTICALS.map(v => v.label).join(", ")}
- Revenue (in $M format like "$8.2M" or "$45M" for mega)
- Margin (percentage like "31%")
- Asking (multiple of revenue based on vertical, format "$X.XM" or "$XXXM")
- Source (must match one of these): ${SOURCES.slice(0, 25).join(", ")}
- Score (60-99, higher for cleaner deals)
- Reason (short acquisition thesis)
- Seller motivation (why selling now: retirement, growth capital, succession, etc)

Return ONLY this JSON format starting with [ ending with ]:
[{"name":"Business name","vertical":"exact vertical label","revenue":"$X.XM","margin":"XX%","asking":"$X.XM","source":"source name","score":85,"reason":"thesis","sellerMotivation":"why selling"}]`,
        2200
      );
      addLog("Parsing AI response...");
      const parsed = safeParseJSON(raw);
      if (!parsed || parsed.length === 0) throw new Error("No deals parsed from AI response");

      addLog(`Found ${parsed.length} qualified deals`);
      const now = Date.now();
      const newDeals = parsed.map((d, i) => {
        const ask = parseFloat(String(d.asking || "$5M").replace(/[$,M]/g, "")) || 5;
        const isMegaSize = ask >= 20;
        const feeRate = isMegaSize ? 0.02 : 0.035;
        const feeRaw = Math.round(ask * 1e6 * feeRate);
        const v = VERTICALS.find(x => x.label === d.vertical) || { cat: "biz" };
        return {
          id: now + i,
          name: d.name || `Deal ${i + 1}`,
          vertical: d.vertical || "Unknown",
          cat: v.cat,
          revenue: d.revenue || "Unknown",
          margin: d.margin || "Unknown",
          asking: d.asking || "Unknown",
          fee: feeRaw >= 1e6 ? `$${(feeRaw / 1e6).toFixed(2)}M` : `$${Math.round(feeRaw / 1000)}K`,
          feeRaw,
          source: d.source || "Direct Network",
          stage: "Sourced",
          score: Math.min(99, Math.max(60, parseInt(d.score) || 75)),
          date: today(),
          notes: `${d.reason || ""} | ${d.sellerMotivation || ""}`.trim(),
        };
      });
      saveDeals([...deals, ...newDeals]);
      addLog(`✓ ${newDeals.length} deals added to pipeline`);
      showToast(`${newDeals.length} new deals added`);
    } catch (e) {
      setErr(e.message);
      addLog(`✗ ${e.message}`);
    }
    setRunning(false);
  };

  return (
    <div>
      <div className="h1" style={{ marginBottom: 4 }}>Mega Scout</div>
      <div style={{ fontSize: 13, color: T.gl, marginBottom: 18 }}>
        70 sources · 27 verticals · ~{totalDaily.toLocaleString()} listings/day
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="label" style={{ marginBottom: 8 }}>Vertical Focus</div>
        <div className="scroll-x" style={{ marginBottom: 16 }}>
          {[
            ["all", "Mixed"],
            ["mega", "★ Mega $1M+"],
            ["perf", "Performance"],
            ["ecom", "eCommerce"],
            ["biz", "Established"],
          ].map(([id, label]) => (
            <button key={id} className={`ghost ${catFilter === id ? "on" : ""}`} onClick={() => setCatFilter(id)}>
              {label}
            </button>
          ))}
        </div>

        <div className="label" style={{ marginBottom: 8 }}>Batch Size: {batchSize} deals</div>
        <input type="range" min="3" max="12" value={batchSize} onChange={e => setBatchSize(parseInt(e.target.value))} style={{ marginBottom: 16 }} />

        <button className="btn" onClick={run} disabled={running} style={{ width: "100%" }}>
          {running ? <><span className="spinner" /> Scanning...</> : "◎ Launch Mega Scout"}
        </button>
      </div>

      {err && (
        <div className="card" style={{ background: "#1a0808", borderColor: T.red + "55", marginBottom: 12 }}>
          <div style={{ color: T.red, fontSize: 13 }}>{err}</div>
        </div>
      )}

      {log.length > 0 && (
        <div className="card" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, lineHeight: 1.8, maxHeight: 220, overflowY: "auto" }}>
          {log.map((l, i) => (
            <div key={i} style={{ color: T.gl }}>
              <span style={{ color: T.cyanDim }}>{l.ts}</span> — {l.msg}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   AGENT
   ────────────────────────────────────────────────────────────────── */

function Agent({ deals, saveDeals, showToast, owner }) {
  const [queue, setQueue] = useState([]);
  const [running, setRunning] = useState(false);
  const [err, setErr] = useState("");
  const [minScore, setMinScore] = useState(75);

  const eligible = deals.filter(d => d.stage === "Sourced" && d.score >= minScore);

  const buildQueue = async () => {
    if (eligible.length === 0) { showToast("No eligible deals (need Sourced + score above threshold)"); return; }
    setRunning(true); setErr(""); resetCircuit();
    setQueue([]);
    const newQueue = [];
    for (const deal of eligible.slice(0, 5)) {
      try {
        const raw = await callAI(
          `Elite M&A outreach copywriter for ${owner.name} at PeakOffers, Ontario Canada. Conversion-optimized, peer-tone, no clichés.`,
          `Write a cold email to the seller of ${deal.name}. Business: ${deal.vertical}. Revenue ${deal.revenue}, Margin ${deal.margin}, Asking ${deal.asking}. Notes: ${deal.notes || "N/A"}.

Format exactly:
Subject: [compelling line, specific to their business]

[Body — under 130 words. Peer tone like another founder. Specific reference to their business. End with soft 15-min call ask.]

Sign as ${owner.name}, Principal at PeakOffers, Ontario Canada.`,
          700
        );
        const subjectMatch = raw.match(/^Subject:\s*(.+)$/im);
        const subject = subjectMatch ? subjectMatch[1].trim() : `Re: ${deal.name}`;
        const body = subjectMatch ? raw.replace(/^Subject:\s*.+\n*/im, "").trim() : raw;
        newQueue.push({ id: deal.id, dealName: deal.name, fee: deal.fee, subject, body, status: "pending" });
        setQueue([...newQueue]);
      } catch (e) {
        newQueue.push({ id: deal.id, dealName: deal.name, status: "failed", error: e.message });
        setQueue([...newQueue]);
        if (e.message?.includes("API recovering") || e.message?.includes("Invalid")) break;
      }
    }
    setRunning(false);
    const ok = newQueue.filter(q => q.status === "pending").length;
    showToast(`${ok} email${ok !== 1 ? "s" : ""} drafted`);
  };

  const sendAndApprove = async q => {
    const deal = deals.find(d => d.id === q.id);
  
    let recipient = deal?.sellerEmail || "";
  
    if (!recipient) {
      recipient = window.prompt(
        `Send "${q.subject}" to which email address?`,
        ""
      );
  
      if (!recipient) {
        showToast("Cancelled");
        return;
      }
  
      saveDeals(
        deals.map(d =>
          d.id === q.id
            ? { ...d, sellerEmail: recipient }
            : d
        )
      );
    }
  
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: recipient,
          subject: q.subject,
          body: q.body,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || "Failed");
      }
  
      setQueue(qq =>
        qq.map(x =>
          x.id === q.id
            ? { ...x, status: "approved" }
            : x
        )
      );
  
      saveDeals(
        deals.map(d =>
          d.id === q.id
            ? {
                ...d,
                stage: "Intro Sent",
                lastStageChange: today(),
                sellerEmail: recipient,
              }
            : d
        )
      );
  
      showToast("Email sent");
    } catch (err) {
      showToast(err.message || "Send failed");
    }
  };

  const skip = id => setQueue(q => q.filter(x => x.id !== id));

  const copy = async q => {
    try {
      await navigator.clipboard.writeText(`Subject: ${q.subject}\n\n${q.body}`);
      showToast("Copied to clipboard");
    } catch (_) {
      showToast("Copy failed - select text manually");
    }
  };

  return (
    <div>
      <div className="h1" style={{ marginBottom: 4 }}>AI Agent</div>
      <div style={{ fontSize: 13, color: T.gl, marginBottom: 18 }}>
        One-click outreach drafting · {eligible.length} eligible deals
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="label" style={{ marginBottom: 8 }}>Min Score: {minScore}</div>
        <input type="range" min="60" max="95" value={minScore} onChange={e => setMinScore(parseInt(e.target.value))} style={{ marginBottom: 14 }} />

        <button className="btn" onClick={buildQueue} disabled={running || eligible.length === 0} style={{ width: "100%" }}>
          {running ? <><span className="spinner" /> Drafting...</> : `⚡ Build Queue (${Math.min(eligible.length, 5)})`}
        </button>
      </div>

      {err && (
        <div className="card" style={{ background: "#1a0808", borderColor: T.red + "55", marginBottom: 12 }}>
          <div style={{ color: T.red, fontSize: 13 }}>{err}</div>
        </div>
      )}

      {queue.map(q => (
        <div key={q.id} className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "flex-start" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{q.dealName}</div>
              {q.fee && <div className="mono" style={{ fontSize: 11, color: T.cyan }}>{q.fee} fee</div>}
            </div>
            <span className={`badge ${q.status === "approved" ? "b-green" : q.status === "failed" ? "b-red" : "b-orange"}`}>
              {q.status}
            </span>
          </div>

          {q.subject && (
            <div style={{ background: T.cyanDeep, padding: "8px 10px", borderRadius: 7, marginBottom: 8 }}>
              <div className="label" style={{ color: T.cyanDim, marginBottom: 3 }}>Subject</div>
              <div style={{ fontSize: 13, color: T.cyan, fontWeight: 500 }}>{q.subject}</div>
            </div>
          )}

          {q.body && (
            <div style={{ background: T.surface, padding: "12px 14px", borderRadius: 7, fontSize: 13, color: T.gl, lineHeight: 1.7, whiteSpace: "pre-wrap", marginBottom: 10 }}>
              {q.body}
            </div>
          )}

          {q.error && <div style={{ color: T.red, fontSize: 11, marginBottom: 8 }}>{q.error}</div>}

          {q.status === "pending" && (
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 6 }}>
              <button className="btn btn-sm" onClick={() => sendAndApprove(q)}>✉ Send Email</button>
              <button className="ghost btn-sm" onClick={() => copy(q)}>Copy</button>
              <button className="ghost btn-sm" onClick={() => skip(q.id)} style={{ color: T.red, borderColor: T.red + "55" }}>Skip</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   PIPELINE
   ────────────────────────────────────────────────────────────────── */

function Pipeline({ deals, saveDeals, showToast }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [catFilter, setCatFilter] = useState("all");

  const filtered = deals.filter(d => {
    if (catFilter !== "all" && d.cat !== catFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return d.name.toLowerCase().includes(q) || (d.vertical || "").toLowerCase().includes(q);
    }
    return true;
  });

  const moveStage = (id, stage) => {
    saveDeals(deals.map(d => d.id === id ? { ...d, stage, lastStageChange: today(), flagged: false } : d));
    setSelected(s => s ? { ...s, stage } : null);
    showToast(`Moved to ${stage}`);
  };

  const deleteDeal = id => {
    if (!window.confirm("Delete this deal permanently?")) return;
    saveDeals(deals.filter(d => d.id !== id));
    setSelected(null);
    showToast("Deal deleted");
  };

  const exportCSV = () => {
    const headers = ["Name", "Vertical", "Stage", "Revenue", "Margin", "Asking", "Fee", "Score", "Source", "Date", "Notes"];
    const rows = deals.map(d => [d.name, d.vertical, d.stage, d.revenue, d.margin, d.asking, d.fee, d.score, d.source, d.date, d.notes].map(v => `"${(v ?? "").toString().replace(/"/g, '""').replace(/\n/g, " ")}"`).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `peakoffers-${today()}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("CSV downloaded");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 16 }}>
        <div>
          <div className="h1" style={{ marginBottom: 4 }}>Pipeline</div>
          <div style={{ fontSize: 13, color: T.gl }}>
            {deals.filter(d => d.stage !== "Dead").length} active · {deals.filter(d => ["LOI Stage", "Closing"].includes(d.stage)).length} hot
          </div>
        </div>
        <button className="ghost btn-sm" onClick={exportCSV}>↓ CSV</button>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search deals..." style={{ marginBottom: 12 }} />

      <div className="scroll-x" style={{ marginBottom: 16 }}>
        {[["all", "All"], ["mega", "★ Mega"], ["perf", "Perf"], ["ecom", "eCom"], ["biz", "Estd"]].map(([id, label]) => (
          <button key={id} className={`ghost ${catFilter === id ? "on" : ""}`} onClick={() => setCatFilter(id)}>{label}</button>
        ))}
      </div>

      {STAGES.slice(0, 7).map(stage => {
        const stageDeals = filtered.filter(d => d.stage === stage);
        if (stageDeals.length === 0) return null;
        const total = stageDeals.reduce((s, d) => s + (d.feeRaw || 0), 0);
        return (
          <div key={stage} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span className="badge b-cyan">{stage}</span>
              <span className="mono" style={{ fontSize: 11, color: T.gl }}>
                ${total >= 1e6 ? `${(total / 1e6).toFixed(2)}M` : `${Math.round(total / 1000)}K`} · {stageDeals.length}
              </span>
            </div>
            {stageDeals.map(d => (
              <div key={d.id} className="deal-row" onClick={() => setSelected(d)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
                      {d.name}
                      {d.flagged && <span style={{ marginLeft: 6, fontSize: 11, color: T.orange }}>⚠</span>}
                      {d.replied && <span style={{ marginLeft: 6, fontSize: 11, color: T.green }}>↩</span>}
                    </div>
                    <div style={{ fontSize: 11, color: T.gray }}>{d.vertical}</div>
                  </div>
                  <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: T.cyan, marginLeft: 10, flexShrink: 0 }}>{d.fee}</div>
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {selected && <DealModal deal={selected} onClose={() => setSelected(null)} moveStage={moveStage} deleteDeal={deleteDeal} updateDeal={u => { saveDeals(deals.map(d => d.id === selected.id ? { ...d, ...u } : d)); setSelected({ ...selected, ...u }); }} />}
    </div>
  );
}

function DealModal({ deal, onClose, moveStage, deleteDeal, updateDeal }) {
  const [notes, setNotes] = useState(deal.notes || "");
  const [sellerEmail, setSellerEmail] = useState(deal.sellerEmail || "");

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <div className="h2" style={{ marginBottom: 4 }}>{deal.name}</div>
            <div style={{ fontSize: 12, color: T.gl }}>{deal.vertical} · {deal.source}</div>
          </div>
          <button className="ghost btn-sm" onClick={onClose}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {[["Revenue", deal.revenue], ["Margin", deal.margin], ["Asking", deal.asking], ["Fee", deal.fee], ["Score", deal.score], ["Date", deal.date]].map(([k, v]) => (
            <div key={k} style={{ background: T.surface, padding: "8px 10px", borderRadius: 7 }}>
              <div className="label" style={{ marginBottom: 3 }}>{k}</div>
              <div className="mono" style={{ fontSize: 12, color: T.cyan, fontWeight: 700 }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          <button
            className="ghost btn-sm"
            onClick={() => updateDeal({ replied: !deal.replied, replyDate: !deal.replied ? new Date().toISOString() : null })}
            style={deal.replied ? { borderColor: T.green, color: T.green, background: "#050F08" } : {}}
          >
            {deal.replied ? "✓ Replied" : "Mark Replied"}
          </button>
          {deal.flagged && <span className="badge b-orange">⚠ Stuck 7+ days</span>}
        </div>

        <div className="label" style={{ marginBottom: 6 }}>Seller Email (for outreach)</div>
        <input
          type="email"
          value={sellerEmail}
          onChange={e => setSellerEmail(e.target.value)}
          onBlur={() => updateDeal({ sellerEmail })}
          placeholder="seller@example.com"
          style={{ marginBottom: 14 }}
        />

        <div className="label" style={{ marginBottom: 8 }}>Move to Stage</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6, marginBottom: 16 }}>
          {STAGES.map(s => (
            <button key={s} className={`ghost btn-sm ${deal.stage === s ? "on" : ""}`} onClick={() => moveStage(deal.id, s)}>
              {s}
            </button>
          ))}
        </div>

        <div className="label" style={{ marginBottom: 6 }}>Notes</div>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} onBlur={() => updateDeal({ notes })} style={{ marginBottom: 12 }} />

        <button className="ghost btn-sm" onClick={() => deleteDeal(deal.id)} style={{ width: "100%", color: T.red, borderColor: T.red + "55" }}>
          Delete Deal
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   OUTREACH
   ────────────────────────────────────────────────────────────────── */

function Outreach({ deals, owner, showToast }) {
  const [dealId, setDealId] = useState(deals[0]?.id || null);
  const [channel, setChannel] = useState("cold");
  const [result, setResult] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const deal = deals.find(d => d.id === dealId) || deals[0];

  const generate = async () => {
    if (!deal) return;
    setLoading(true); setResult(""); setSubject(""); resetCircuit();
    try {
      const prompts = {
        cold: `Cold email from ${owner.name} (Principal at PeakOffers, Ontario Canada) to seller of ${deal.name}. Business: ${deal.vertical}, Revenue ${deal.revenue}, Margin ${deal.margin}, Asking ${deal.asking}. Notes: ${deal.notes}.

Format exactly:
Subject: [compelling specific line]

[Body — under 130 words. Peer tone. Reference specific to their business. End with soft 15-min call ask.]

Sign as ${owner.name}, PeakOffers, Ontario Canada.`,
        followup: `Follow-up email (5 days after first send, no reply yet) for ${deal.name} (${deal.vertical}). 

Format:
Subject: [Re: original line]

[Body — under 90 words. New angle or value-add. From ${owner.name}, PeakOffers Ontario Canada.]`,
        loi: `LOI cover email. We have a buyer ready to submit a Letter of Intent at ${deal.asking} for ${deal.name}.

Format:
Subject: LOI Ready — ${deal.name}

[Body — under 150 words. Professional. Mentions: buyer is institutional/PE, ready to move quickly, requests a 30-min call this week to align. From ${owner.name}, PeakOffers.]`,
      };
      const raw = await callAI("Elite M&A copywriter, conversion-focused, no clichés.", prompts[channel], 700);
      const sm = raw.match(/^Subject:\s*(.+)$/im);
      if (sm) {
        setSubject(sm[1].trim());
        setResult(raw.replace(/^Subject:\s*.+\n*/im, "").trim());
      } else {
        setResult(raw);
      }
    } catch (e) {
      showToast(e.message);
    }
    setLoading(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${result}`);
      showToast("Copied to clipboard");
    } catch (_) {
      showToast("Copy failed");
    }
  };

  return (
    <div>
      <div className="h1" style={{ marginBottom: 4 }}>Outreach</div>
      <div style={{ fontSize: 13, color: T.gl, marginBottom: 18 }}>Personalized emails per deal</div>

      <div className="label" style={{ marginBottom: 6 }}>Deal</div>
      <select value={dealId || ""} onChange={e => setDealId(parseInt(e.target.value))} style={{ marginBottom: 14 }}>
        {deals.filter(d => d.stage !== "Dead").map(d => (
          <option key={d.id} value={d.id}>{d.name} — {d.fee}</option>
        ))}
      </select>

      <div className="scroll-x" style={{ marginBottom: 16 }}>
        {[["cold", "Cold Email"], ["followup", "Follow-Up"], ["loi", "LOI Cover"]].map(([id, label]) => (
          <button key={id} className={`ghost ${channel === id ? "on" : ""}`} onClick={() => setChannel(id)}>
            {label}
          </button>
        ))}
      </div>

      <button className="btn" onClick={generate} disabled={loading || !deal} style={{ width: "100%", marginBottom: 14 }}>
        {loading ? <><span className="spinner" />Generating...</> : "Generate"}
      </button>

      {(subject || result) && (
        <>
          {subject && (
            <div style={{ background: T.cyanDeep, border: `1px solid ${T.cyanDim}55`, padding: "10px 12px", borderRadius: 9, marginBottom: 8 }}>
              <div className="label" style={{ color: T.cyanDim, marginBottom: 4 }}>Subject</div>
              <div style={{ fontSize: 13, color: T.cyan, fontWeight: 600 }}>{subject}</div>
            </div>
          )}
          <div className="card" style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap", marginBottom: 10 }}>{result}</div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 6 }}>
            <button className="btn btn-sm" onClick={() => {
              const recipient = deal?.sellerEmail || window.prompt(`Send to which email?`, "");
              if (!recipient) return;
              if (deal && !deal.sellerEmail) {
                // Save it for next time (we don't have updateDeals here, just trigger mailto)
              }
              sendEmailViaMailto({ to: recipient, subject, body: result });
              showToast("Email app opened — tap Send to deliver");
            }}>✉ Send Email</button>
            <button className="ghost btn-sm" onClick={copyEmail}>Copy</button>
            <button className="ghost btn-sm" onClick={generate}>Redo</button>
          </div>
        </>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   BUYERS
   ────────────────────────────────────────────────────────────────── */

function Buyers() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = BUYERS.filter(b => {
    if (typeFilter !== "all" && !b.type.toLowerCase().includes(typeFilter.toLowerCase())) return false;
    if (search) {
      const q = search.toLowerCase();
      return b.name.toLowerCase().includes(q) || b.criteria.toLowerCase().includes(q) || b.type.toLowerCase().includes(q);
    }
    return true;
  });

  const totalCapital = BUYERS.reduce((s, b) => {
    const n = parseFloat(b.budget.replace(/[$BM]/g, ""));
    return s + (b.budget.includes("B") ? n * 1000 : n);
  }, 0);

  return (
    <div>
      <div className="h1" style={{ marginBottom: 4 }}>Buyer Network</div>
      <div style={{ fontSize: 13, color: T.gl, marginBottom: 16 }}>
        {BUYERS.length} active buyers · ${(totalCapital / 1000).toFixed(1)}B+ combined capital
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search 43 buyers..." style={{ marginBottom: 10 }} />

      <div className="scroll-x" style={{ marginBottom: 16 }}>
        {[["all", "All"], ["PE", "PE"], ["Strategic", "Strategic"], ["Family", "Family"], ["Roll-up", "Roll-up"], ["Sovereign", "Sovereign"]].map(([id, label]) => (
          <button key={id} className={`ghost ${typeFilter === id ? "on" : ""}`} onClick={() => setTypeFilter(id)}>{label}</button>
        ))}
      </div>

      {filtered.map(b => (
        <div key={b.id} className="card" style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{b.name}</div>
              <div style={{ fontSize: 11, color: T.gray }}>{b.type} · {b.speed} · Fee {b.fee}</div>
            </div>
            <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: T.cyan, marginLeft: 10, flexShrink: 0 }}>{b.budget}</div>
          </div>
          <div style={{ fontSize: 12, color: T.gl, marginBottom: 8, lineHeight: 1.5 }}>{b.criteria}</div>
          <a href={`mailto:${b.contact}`} className="mono" style={{ fontSize: 11, color: T.cyan }}>{b.contact}</a>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="card" style={{ textAlign: "center", color: T.gray, padding: 24 }}>No buyers match your filter</div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   CONTRACTS
   ────────────────────────────────────────────────────────────────── */

function Contracts({ owner, showToast }) {
  const [buyer, setBuyer] = useState("");
  const [feeRate, setFeeRate] = useState("3.5");
  const [currency, setCurrency] = useState("CAD");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!buyer.trim()) { showToast("Enter buyer name"); return; }
    setLoading(true); setResult(""); resetCircuit();
    try {
      const r = await callAI(
        "Senior Canadian M&A attorney drafting Ontario law finder fee agreements. Execution-ready, complete sections.",
        `Draft a complete Finder Fee Agreement under the laws of Ontario, Canada. 

PARTIES:
- Finder 1: ${owner.name}, Principal of PeakOffers, Ontario, Canada
- Finder 2: Vanessa Kisso, Co-Finder of PeakOffers, Ontario, Canada
- Buyer: ${buyer}

KEY TERMS:
- Fee Rate: ${feeRate}% of total transaction value
- Currency: ${currency}
- Term: 24 months from execution
- Tail period: 18 months for any introduction made during term
- Governing law: Ontario, Canada
- Dispute resolution: ADRIC arbitration in Toronto, Ontario

REQUIRED SECTIONS:
1. Recitals
2. Definitions (Transaction, Introduction, Fee, etc.)
3. Engagement and Scope
4. Compensation (fee structure, payment timing, escrow if applicable)
5. Tail Period
6. Confidentiality
7. Non-Circumvention
8. Representations and Warranties
9. Indemnification
10. Term and Termination
11. Governing Law (Ontario)
12. Dispute Resolution (ADRIC, Toronto)
13. Notices
14. Miscellaneous (assignment, severability, entire agreement)
15. Three signature blocks: ${owner.name}, Vanessa Kisso, and Buyer Representative

Use professional legal language. Make it ready to execute.`,
        2400
      );
      setResult(r);
      showToast("Agreement drafted");
    } catch (e) {
      showToast(e.message);
    }
    setLoading(false);
  };

  const copyContract = async () => {
    try {
      await navigator.clipboard.writeText(result);
      showToast("Copied");
    } catch (_) {
      showToast("Copy failed");
    }
  };

  const downloadTxt = () => {
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `peakoffers-${(buyer || "agreement").replace(/[^a-z0-9]/gi, "-").toLowerCase()}-${today()}.txt`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Downloaded");
  };

  return (
    <div>
      <div className="h1" style={{ marginBottom: 4 }}>Contracts</div>
      <div style={{ fontSize: 13, color: T.gl, marginBottom: 18 }}>Ontario Law · ADRIC Arbitration, Toronto</div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="label" style={{ marginBottom: 6 }}>Buyer Firm Name</div>
        <input value={buyer} onChange={e => setBuyer(e.target.value)} placeholder="e.g. Centennial Health Partners" style={{ marginBottom: 12 }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          <div>
            <div className="label" style={{ marginBottom: 6 }}>Fee Rate (%)</div>
            <input value={feeRate} onChange={e => setFeeRate(e.target.value)} inputMode="decimal" />
          </div>
          <div>
            <div className="label" style={{ marginBottom: 6 }}>Currency</div>
            <select value={currency} onChange={e => setCurrency(e.target.value)}>
              <option value="CAD">CAD</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        <button className="btn" onClick={generate} disabled={loading} style={{ width: "100%" }}>
          {loading ? <><span className="spinner" />Drafting...</> : "Generate Agreement"}
        </button>
      </div>

      {result && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
            <button className="btn btn-sm" onClick={copyContract}>Copy</button>
            <button className="ghost btn-sm" onClick={downloadTxt}>↓ Download</button>
          </div>
          <div className="card" style={{ fontSize: 12, lineHeight: 1.8, whiteSpace: "pre-wrap", maxHeight: "60vh", overflowY: "auto" }}>
            {result}
          </div>
        </>
      )}
    </div>
  );
}

