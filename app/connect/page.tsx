"use client";
import React, { useState } from "react";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">{title}</h3>
      {children}
    </div>
  );
}

export default function ConnectPage() {
  const [checks, setChecks] = useState({ page: false, ads: false, tag: false, email: false });

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-blue-600" />
            <span className="text-sm font-medium text-gray-600">AI Marketing Agent</span>
          </div>
          <a href="/plan" className="text-sm text-blue-600 hover:underline">Back to plan</a>
        </header>

        <h1 className="mb-4 text-2xl font-semibold">Connect your tools</h1>
        <p className="mb-6 text-sm text-gray-600">Once connected, your agent can generate creatives, launch drafts, and send daily insights.</p>

        <div className="grid grid-cols-1 gap-4">
          <Card title="LinkedIn Company Page">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-800">Connect your Company Page</div>
                <div className="text-xs text-gray-500">Required for publishing and reporting</div>
              </div>
              <button onClick={() => setChecks((c) => ({ ...c, page: true }))} className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black">
                {checks.page ? "Connected" : "Connect"}
              </button>
            </div>
          </Card>

          <Card title="LinkedIn Ads Account">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-800">Connect Campaign Manager</div>
                <div className="text-xs text-gray-500">Create/attach ad account, grant permissions</div>
              </div>
              <button onClick={() => setChecks((c) => ({ ...c, ads: true }))} className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black">
                {checks.ads ? "Connected" : "Connect"}
              </button>
            </div>
          </Card>

          <Card title="Insight Tag / Web Pixel">
            <div className="space-y-3">
              <div className="text-sm text-gray-800">Install the tracking snippet on your site</div>
              <pre className="overflow-auto rounded-xl bg-gray-50 p-3 text-xs text-gray-700">
{`<script>
  // Example placeholder — replace with real pixel snippet
  (function(){console.log('Insight Tag installed')})()
</script>`}
              </pre>
              <div className="flex justify-end">
                <button onClick={() => setChecks((c) => ({ ...c, tag: true }))} className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black">
                  {checks.tag ? "Marked as installed" : "Mark installed"}
                </button>
              </div>
            </div>
          </Card>

          <Card title="Daily Reports">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-800">Email to receive reports at 09:00</div>
                <div className="text-xs text-gray-500">Adjust later in settings</div>
              </div>
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement & { email: HTMLInputElement };
                  if (form.email.value) { setChecks((c) => ({ ...c, email: true })); }
                }}
              >
                <input name="email" type="email" placeholder="you@company.com" className="w-56 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
                <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black">Save</button>
              </form>
            </div>
          </Card>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-200 p-4">
          <div className="text-sm text-gray-700">
            Status: {Object.values(checks).every(Boolean) ? (
              <span className="font-medium text-green-600">Ready</span>
            ) : (
              <span className="font-medium text-yellow-600">Incomplete</span>
            )}
          </div>
          <div className="flex gap-2">
            <a href="/dashboard-demo" className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50">View sample dashboard</a>
            <button disabled={!Object.values(checks).every(Boolean)} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">Start trial</button>
          </div>
        </div>
      </div>
    </main>
  );
}
