"use client";
import React, { useMemo } from "react";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5">
      <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">{title}</div>
      {children}
    </div>
  );
}

function Metric({ label, value, delta }: { label: string; value: string; delta: number }) {
  const positive = delta >= 0;
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      <div className={"mt-1 text-xs " + (positive ? "text-green-600" : "text-red-600")}>{positive ? "+" : ""}{delta}% vs 7d</div>
    </div>
  );
}

function Sparkline({ points }: { points: number[] }) {
  const path = useMemo(() => {
    const w = 160, h = 40;
    const max = Math.max(...points), min = Math.min(...points);
    const scaleX = (i: number) => (i / (points.length - 1)) * w;
    const scaleY = (v: number) => h - ((v - min) / (max - min || 1)) * h;
    return points.map((p, i) => `${i === 0 ? "M" : "L"}${scaleX(i)},${scaleY(p)}`).join(" ");
  }, [points]);
  return (
    <svg viewBox="0 0 160 40" className="h-10 w-40">
      <path d={path} fill="none" stroke="currentColor" className="text-blue-600" strokeWidth="2" />
    </svg>
  );
}

export default function DashboardDemoPage() {
  const series = { spend: [210, 230, 240, 260, 255, 270, 290], ctr: [0.6, 0.7, 0.65, 0.8, 0.82, 0.78, 0.9], leads: [4, 5, 7, 6, 8, 9, 11] };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-blue-600" />
            <span className="text-sm font-medium text-gray-600">AI Marketing Agent</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a className="text-gray-600 hover:text-gray-900" href="/">Home</a>
            <a className="rounded-xl bg-gray-900 px-3 py-1.5 font-medium text-white hover:bg-black" href="/flow">Generate my plan</a>
          </nav>
        </header>

        <h1 className="mb-2 text-2xl font-semibold">Analytics (Sample)</h1>
        <p className="mb-6 text-sm text-gray-600">Daily emails at 09:00. Alerts on CTR/CPL changes. Data below is mocked for demo purposes.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Metric label="Spend (7d)" value="€1,815" delta={+6} />
          <Metric label="CTR" value="0.84%" delta={+12} />
          <Metric label="Leads" value="44" delta={+18} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card title="Spend">
            <Sparkline points={series.spend} />
            <div className="mt-2 text-xs text-gray-600">Trend last 7 days</div>
          </Card>
          <Card title="CTR">
            <Sparkline points={series.ctr.map((v) => v * 100)} />
            <div className="mt-2 text-xs text-gray-600">Trend last 7 days</div>
          </Card>
          <Card title="Leads">
            <Sparkline points={series.leads} />
            <div className="mt-2 text-xs text-gray-600">Trend last 7 days</div>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4">
          <Card title="Recent alerts">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• CTR down 18% on Campaign 1 — rotating copy v3</li>
              <li>• Leads +12% after audience expansion on Campaign 2</li>
              <li>• CPC higher than guardrail on Retargeting — pausing lowest CTR creative</li>
            </ul>
          </Card>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between rounded-2xl border border-gray-200 p-4">
          <div className="text-sm text-gray-700">Like what you see? Generate a plan from your inputs and connect your tools.</div>
          <div className="flex gap-2">
            <a href="/flow" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Generate my plan</a>
            <a href="/plan" className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50">View plan</a>
          </div>
        </div>
      </div>
    </main>
  );
}
