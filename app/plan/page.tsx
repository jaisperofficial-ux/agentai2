"use client";
import React, { useEffect, useMemo, useState } from "react";

type Plan = {
  title: string;
  summary: { label: string; value: string }[];
  campaigns: { name: string; objective: string; targeting: string }[];
  creativeKit: { hooks: string[]; ctas: string[]; angles: string[] };
  landing: string[];
  kpis: string[];
  prereqs: string[];
  automation: string[];
};

function Shell({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-blue-600" />
            <span className="text-sm font-medium text-gray-600">AI Marketing Agent</span>
          </div>
          <a href="/flow" className="text-sm text-blue-600 hover:underline">Restart flow</a>
        </header>
        <h1 className="mb-4 text-2xl font-semibold">{title}</h1>
        {children}
        <footer className="mt-10 text-center text-xs text-gray-500">No credit card required. You can edit/delete your data anytime.</footer>
      </div>
    </main>
  );
}

export default function PlanPage() {
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ai_plan");
      if (raw) setPlan(JSON.parse(raw));
    } catch {}
  }, []);

  const demoPlan: Plan = useMemo(
    () => ({
      title: "Your tailored plan",
      summary: [
        { label: "Goal", value: "Lead generation" },
        { label: "Maturity", value: "Posting sometimes" },
        { label: "Budget", value: "€1,500/mo" },
        { label: "Creative", value: "Mix of all" },
      ],
      campaigns: [
        { name: "Campaign 1 — Core Audience", objective: "Lead Generation", targeting: "Job titles (Manager+), key industries, 10–500 employees, exclude customers." },
        { name: "Campaign 2 — Problem-Aware", objective: "Traffic", targeting: "Interests + lookalikes, optimize for CTR." },
        { name: "Campaign 3 — Retargeting", objective: "Website Conversions", targeting: "Visitors + 50% video viewers; strong CTA." },
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
      landing: ["Single CTA above the fold, social proof row, 4-field form max.", "Create a focused landing route for ads."],
      kpis: ["CTR: 0.6–1.5% (first 14 days)", "CPC: €2–€8 depending on geo/industry", "CPL: set guardrail by LTV and demo capacity", "Rotate creatives every 5–7 days if underperforming"],
      prereqs: ["Create LinkedIn Company Page", "Connect LinkedIn Ads Account"],
      automation: ["Daily report at 09:00", "Alerts: CTR drop >15% d/d; CPL >25% vs baseline", "Auto-rotate creatives"],
    }),
    []
  );

  const data = plan ?? demoPlan;

  return (
    <Shell title="Strategy result">
      <div className="rounded-2xl border border-gray-200 p-5">
        <h2 className="mb-2 text-xl font-semibold">{data.title}</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          {data.summary.map((s) => (
            <span key={s.label} className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700">
              <span className="font-medium">{s.label}:</span> {s.value}
            </span>
          ))}
        </div>

        <div className="space-y-4">
          <section>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">Campaign Structure</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
              {data.campaigns.map((c) => (
                <li key={c.name}><span className="font-medium">{c.name}:</span> {c.objective} — {c.targeting}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">Creative Kit</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <div className="text-xs font-medium text-gray-600">Hooks</div>
                <ul className="mt-1 list-disc pl-5 text-sm text-gray-700">
                  {data.creativeKit.hooks.map((h, i) => (<li key={i}>{h}</li>))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-600">CTAs</div>
                <ul className="mt-1 list-disc pl-5 text-sm text-gray-700">
                  {data.creativeKit.ctas.map((c, i) => (<li key={i}>{c}</li>))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-600">Angles</div>
                <ul className="mt-1 list-disc pl-5 text-sm text-gray-700">
                  {data.creativeKit.angles.map((c, i) => (<li key={i}>{c}</li>))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">Landing Guidance</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
              {data.landing.map((l, i) => (<li key={i}>{l}</li>))}
            </ul>
          </section>

          <section>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">KPI Targets</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
              {data.kpis.map((k, i) => (<li key={i}>{k}</li>))}
            </ul>
          </section>

          {data.prereqs.length > 0 && (
            <section>
              <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">Prerequisites</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                {data.prereqs.map((p, i) => (<li key={i}>{p}</li>))}
              </ul>
            </section>
          )}

          <section>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">Automation</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
              {data.automation.map((a, i) => (<li key={i}>{a}</li>))}
            </ul>
          </section>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <a href="/connect" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Activate automation</a>
          <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50" onClick={() => { try { navigator.clipboard.writeText(JSON.stringify(data, null, 2)); } catch {} }}>Copy JSON</button>
          <a href="/flow" className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50">Edit answers</a>
        </div>
      </div>
    </Shell>
  );
}
