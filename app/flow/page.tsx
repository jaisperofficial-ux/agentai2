"use client";

import React, { useEffect, useMemo, useState } from "react";

type Option = { label: string; value: string };

type Answers = {
  goal?: string;
  profile?: string;
  maturity?: string;
  budget?: number;
  website?: { have?: string; url?: string };
  page?: string;
  ads?: string;
  creative?: string;
  voice?: string;
};

function classNames(...arr: (string | false | null | undefined)[]) {
  return arr.filter(Boolean).join(" ");
}
function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

function computePlan(a: Answers) {
  const goal = a.goal ?? "Lead generation";
  const maturity = a.maturity ?? "New to paid";
  const budget = a.budget ?? 1500;
  const creative = a.creative ?? "Mix of all";
  const needPage = a.page !== "yes";
  const needAds = a.ads !== "yes";
  const prereqs: string[] = [];
  if (needPage) prereqs.push("Create LinkedIn Company Page");
  if (needAds) prereqs.push("Create/Connect LinkedIn Ads Account");

  const kpiHint = goal.toLowerCase().includes("lead")
    ? "CPL benchmark varies by industry; start within 10–25% of platform averages."
    : "Track CTR/CPC in first 7 days; optimize for engagement before conversion objectives.";

  return {
    title: "Your tailored plan",
    summary: [
      { label: "Goal", value: goal },
      { label: "Maturity", value: maturity },
      { label: "Budget", value: `€${budget.toLocaleString()}/mo` },
      { label: "Creative", value: creative },
    ],
    campaigns: [
      {
        name: "Campaign 1 — Core Audience",
        objective: goal.toLowerCase().includes("lead") ? "Lead Generation" : "Website Conversions",
        targeting: "Job titles (Manager+), relevant industries, 10–500 employees, exclude existing customers.",
      },
      {
        name: "Campaign 2 — Problem-Aware",
        objective: "Traffic",
        targeting: "Broader interests + lookalikes; optimize for CTR to feed retargeting pools.",
      },
      {
        name: "Campaign 3 — Retargeting",
        objective: "Website Conversions",
        targeting: "Site visitors + video viewers 50%+; stronger CTA.",
      },
    ],
    creativeKit: {
      hooks: [
        "What would 20% more qualified demos mean this quarter?",
        "Stop guessing audiences — let AI learn your best buyers.",
        "From scroll to scheduled call in 3 clicks.",
      ],
      ctas: ["Book a demo", "Get the playbook", "Start free"],
      angles: ["Pain → Promise → Proof", "Insight-led carousel", "30s founder video"],
    },
    landing: [
      "Single CTA above the fold, social proof row, 4-field form max.",
      a.website?.url ? `Use ${a.website.url} /landing as destination.` : "Create a focused landing route for ads.",
    ],
    kpis: [
      "CTR: 0.6–1.5% (first 14 days)",
      "CPC: €2–€8 depending on geo/industry",
      goal.toLowerCase().includes("lead") ? "CPL: set guardrail by LTV and demo capacity" : "Time on page: >45s",
      kpiHint,
    ],
    prereqs,
    automation: [
      "Daily report at 09:00 with CTR, CPC, CPL trends",
      "Alerts: CTR drop >15% d/d; CPL >25% vs. baseline",
      "Auto-rotate creatives every 5–7 days if underperforming",
    ],
  };
}

const STEPS: {
  id: keyof Answers | "_intro" | "_process" | "_plan";
  prompt: string;
  type: "options" | "slider" | "input-url";
  options?: Option[];
  min?: number;
  max?: number;
  step?: number;
}[] = [
  { id: "_intro", prompt: "Hey there 👋 I’ll build your plan in under 2 minutes.", type: "options", options: [{ label: "Let’s start", value: "start" }] },
  {
    id: "goal",
    prompt: "What’s your main goal?",
    type: "options",
    options: [
      { label: "Generate leads", value: "Lead generation" },
      { label: "Brand visibility", value: "Brand visibility" },
      { label: "Recruiting", value: "Recruiting" },
      { label: "Something else", value: "Other" },
    ],
  },
  {
    id: "profile",
    prompt: "Which best describes you?",
    type: "options",
    options: [
      { label: "Agency", value: "Agency" },
      { label: "Coach / Consultant", value: "Consultant" },
      { label: "SaaS / Business", value: "Business" },
    ],
  },
  {
    id: "maturity",
    prompt: "Where are you today?",
    type: "options",
    options: [
      { label: "New to paid", value: "New to paid" },
      { label: "Posting sometimes", value: "Posting sometimes" },
      { label: "Running ads", value: "Running ads" },
      { label: "Scaling", value: "Scaling" },
    ],
  },
  { id: "budget", prompt: "Rough monthly budget?", type: "slider", min: 500, max: 20000, step: 100 },
  {
    id: "website",
    prompt: "Do you have a website?",
    type: "options",
    options: [
      { label: "Yes", value: "yes" },
      { label: "Not yet", value: "no" },
      { label: "In progress", value: "wip" },
    ],
  },
  { id: "_website_url" as any, prompt: "What’s your website URL?", type: "input-url" },
  {
    id: "page",
    prompt: "Do you have a LinkedIn Company Page?",
    type: "options",
    options: [
      { label: "Yes", value: "yes" },
      { label: "Not yet", value: "no" },
      { label: "Not sure", value: "unsure" },
    ],
  },
  {
    id: "ads",
    prompt: "Do you already have a LinkedIn Ads account connected?",
    type: "options",
    options: [
      { label: "Yes", value: "yes" },
      { label: "Not yet", value: "no" },
      { label: "Agency account", value: "agency" },
    ],
  },
  {
    id: "creative",
    prompt: "What should we create first?",
    type: "options",
    options: [
      { label: "AI Video", value: "Video" },
      { label: "Carousel / Image", value: "Carousel" },
      { label: "Text / Sponsored", value: "Text" },
      { label: "Mix of all", value: "Mix of all" },
    ],
  },
  {
    id: "voice",
    prompt: "Do you have a brand voice to follow?",
    type: "options",
    options: [
      { label: "Upload later / Create one", value: "create" },
      { label: "I’ll describe it", value: "describe" },
      { label: "Yes, follow my guide", value: "have" },
    ],
  },
  { id: "_process", prompt: "Analyzing your inputs… mapping audiences… shaping your funnel…", type: "options", options: [{ label: "Generate plan", value: "go" }] },
  { id: "_plan", prompt: "Plan ready", type: "options", options: [] },
];

function ChatBubble({ role, children }: { role: "agent" | "user"; children: React.ReactNode }) {
  const isAgent = role === "agent";
  return (
    <div className={classNames("flex w-full", isAgent ? "justify-start" : "justify-end")}>
      <div className={classNames("max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed", isAgent ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-white")}>
        {children}
      </div>
    </div>
  );
}

function OptionGrid({ options, onSelect }: { options: Option[]; onSelect: (o: Option) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
      {options.map((o) => (
        <button key={o.value} onClick={() => onSelect(o)} className="rounded-xl border border-gray-200 px-4 py-3 text-left hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
          <div className="font-medium">{o.label}</div>
          <div className="text-xs text-gray-500">{o.value}</div>
        </button>
      ))}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-gray-100">
      <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}

export default function FlowPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ website: {} });
  const [messages, setMessages] = useState<{ role: "agent" | "user"; text: string }[]>([]);
  const [budgetDraft, setBudgetDraft] = useState(1500);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [plan, setPlan] = useState<ReturnType<typeof computePlan> | null>(null);
  const current = STEPS[stepIndex];

  useEffect(() => {
    if (!current) return;
    if (current.id === "_plan") return;
    setMessages((m) => [...m, { role: "agent", text: current.prompt }]);
    if (current.id === ("_website_url" as any) && answers.website?.have !== "yes") {
      setStepIndex((i) => i + 1);
    }
  }, [stepIndex]);

  const progressPct = useMemo(() => {
    const total = STEPS.length - 2;
    const idx = Math.min(stepIndex, total);
    return Math.round((idx / total) * 100);
  }, [stepIndex]);

  async function handleOptionSelect(o: Option) {
    const id = current.id;
    setMessages((m) => [...m, { role: "user", text: o.label }]);
    if (id === "_intro") { setStepIndex((i) => i + 1); return; }
    if (id === "goal" || id === "profile" || id === "maturity" || id === "creative" || id === "voice") {
      setAnswers((a) => ({ ...a, [id]: o.value } as any));
    }
    if (id === "website") {
      setAnswers((a) => ({ ...a, website: { ...(a.website ?? {}), have: o.value } }));
    }
    if (id === "page") setAnswers((a) => ({ ...a, page: o.value }));
    if (id === "ads") setAnswers((a) => ({ ...a, ads: o.value }));
    setStepIndex((i) => i + 1);
  }

  async function handleNextFromSlider() {
    setMessages((m) => [...m, { role: "user", text: `€${budgetDraft}/mo` }]);
    setAnswers((a) => ({ ...a, budget: budgetDraft }));
    setStepIndex((i) => i + 1);
  }

  async function handleUrlSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const url = String(data.get("url") || "").trim();
    if (url.length > 1) {
      setMessages((m) => [...m, { role: "user", text: url }]);
      setAnswers((a) => ({ ...a, website: { ...(a.website ?? {}), url } }));
      setStepIndex((i) => i + 1);
    }
  }

  async function generatePlan() {
    setProcessing(true);
    setPlan(null);
    setProgress(0);
    for (const v of [20, 45, 70, 100]) { setProgress(v); await sleep(350); }
    const p = computePlan(answers);
    setPlan(p);
    setProcessing(false);
    localStorage.setItem("ai_plan", JSON.stringify(p)); // save for /plan
    window.location.href = "/plan";
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-blue-600" />
            <span className="text-sm font-medium text-gray-600">AI Marketing Agent</span>
          </div>
          <div className="text-sm text-gray-500">Progress</div>
        </header>

        <div className="mb-6"><ProgressBar value={progressPct} /></div>

        <section className="space-y-3">
          {messages.map((m, i) => (<ChatBubble key={i} role={m.role}>{m.text}</ChatBubble>))}

          {current && current.id !== "_plan" && (
            <div className="mt-2">
              {current.type === "options" && current.options && (<OptionGrid options={current.options} onSelect={handleOptionSelect} />)}
              {current.type === "slider" && (
                <div className="rounded-2xl border border-gray-200 p-4">
                  <div className="text-sm text-gray-600">€{budgetDraft}/mo</div>
                  <input type="range" min={current.min} max={current.max} step={current.step} value={budgetDraft} onChange={(e) => setBudgetDraft(parseInt(e.target.value))} className="mt-2 w-full" />
                  <div className="mt-3 flex justify-end">
                    <button onClick={handleNextFromSlider} className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black">Continue</button>
                  </div>
                </div>
              )}
              {current.type === "input-url" && (
                <form onSubmit={handleUrlSubmit} className="rounded-2xl border border-gray-200 p-4">
                  <label className="block text-sm text-gray-600">Website URL</label>
                  <input name="url" type="url" placeholder="https://example.com" className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                  <div className="mt-3 flex justify-end gap-2">
                    <button type="button" onClick={() => setStepIndex((i) => i + 1)} className="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Skip</button>
                    <button type="submit" className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black">Continue</button>
                  </div>
                </form>
              )}
              {current.id === "_process" && (
                <div className="rounded-2xl border border-gray-200 p-4">
                  <div className="mb-3 text-sm text-gray-600">We’ll create your plan based on your answers.</div>
                  <button onClick={generatePlan} disabled={processing} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60">{processing ? "Generating…" : "Generate my plan"}</button>
                  {processing && (<div className="mt-4"><ProgressBar value={progress} /></div>)}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
